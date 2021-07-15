import { PPTR_ACTIONS } from "./pptr-actions";
import Block from "./Block";
import * as Url from "url-parse";
import {
  wrapDescribeHeader,
  wrapDescribeFooter,
  wrapItHeader,
  wrapItFooter,
  getClickCommands,
} from "../custom/template";
export const defaults = {
  wrapDescribe: true,
  blankLinesBetweenBlocks: true,
  dataAttribute: "",
};

import configs from "../custom/config";
import { CodeEvent, RequestDetail } from "../custom/types/index";
import { DOM_EVENTS } from "./dom-events-to-record";
import { acLog } from "../custom/util";

export default class CodeGenerator {
  _options: any;
  _blocks: Array<Block> = [];
  _frame = "cy";
  _frameId = 0;
  _allFrames: string[] = [];
  _origin = "";
  _hasNavigation = false;

  constructor(options: any) {
    this._options = Object.assign(defaults, options);
  }

  generate(events: CodeEvent[]) {
    return this._getHeader() + this._parseEvents(events) + this._getFooter();
  }

  _getHeader() {
    let newLine = "";

    if (this._options.blankLinesBetweenBlocks) {
      newLine = `\n`;
    }

    let describeHeader = this._options.wrapDescribe
      ? wrapDescribeHeader + newLine
      : "";
    return describeHeader + wrapItHeader + newLine;
  }

  _getFooter() {
    let newLine = "";

    if (this._options.blankLinesBetweenBlocks) {
      newLine = `\n`;
    }

    //return this._options.wrapAsync ? wrappedFooter : footer
    let describeFooter = this._options.wrapDescribe
      ? wrapDescribeFooter + newLine
      : "";
    return wrapItFooter + newLine + describeFooter;
  }

  _parseEvents(events: CodeEvent[]) {
    let result = "";

    for (let i = 0; i < events.length; i++) {
      const {
        action,
        href,
        keyCode,
        tagName,
        targetType,
        frameId,
        frameUrl,
        detail,
      } = events[i];

      // we need to keep a handle on what frames events originate from
      this._setFrames(frameId, frameUrl);

      // 免除一些副作用，比如原生的radio、checkbox
      if (
        configs.disabledNativeElements &&
        configs.disabledNativeElements.includes(targetType || "")
      ) {
        break;
      }

      acLog.info("events/", events[i]);

      // 添加 指定组件的前置条件 commands
      switch (action) {
        case "keydown":
          if (keyCode === 9) {
            //this._blocks.push(this._handleKeyDown(selector, value, keyCode))
          }
          break;
        case "click":
          this._blocks.push(this._handleClick(events[i]));
          break;
        case "change":
          if (tagName === "SELECT") {
            this._blocks.push(this._handleChange(events[i]));
          }
          if (tagName === "INPUT") {
            if (targetType) {
              this._blocks.push(this._handleChange(events[i]));
            } else {
              this._blocks.push(this._handleChange(events[i]));
            }
          }

          break;
        case "goto*":
          this._blocks.push(this._handleGoto(events[i]));
          break;
        case "viewport*":
          this._blocks.push(this._handleViewport(events[i]));
          break;
        case "navigation*":
          this._blocks.push(this._handleWaitForNavigation());
          this._blocks.push(this._handleGoto(events[i]));
          this._hasNavigation = true;
          break;

        case "request*": {
          const block = this._handleRequest(detail!);
          if (!!block) {
            this._blocks.push(block);
          }
          break;
        }
        case "navigate*": {
          this._blocks.push(this._handleNavigate(href!));
          break;
        }
      }
    }

    const indent = this._options.wrapDescribe ? "    " : "   ";
    let newLine = `\n`;

    if (this._options.blankLinesBetweenBlocks && this._blocks.length > 0) {
      newLine = `\n \n`;
    }

    for (let block of this._blocks) {
      const lines = block.getLines();
      for (let line of lines) {
        result += indent + line.value + newLine;
      }
    }

    return result;
  }

  _setFrames(frameId: number, frameUrl: string) {
    if (frameId && frameId !== 0) {
      this._frameId = frameId;
      this._frame = `frame_${frameId}`;
      this._allFrames[frameId] = frameUrl;
    } else {
      this._frameId = 0;
      this._frame = "cy";
    }
  }

  _postProcess() {
    // when events are recorded from different frames, we want to add a frame setter near the code that uses that frame
    if (Object.keys(this._allFrames).length > 0) {
      this._postProcessSetFrames();
    }

    if (this._options.blankLinesBetweenBlocks && this._blocks.length > 0) {
      this._postProcessAddBlankLines();
    }
  }

  _handleKeyDown(selector: string, value: any) {
    const block = new Block(this._frameId);
    block.addLine({
      type: DOM_EVENTS.KEYDOWN,
      value: `${this._frame}.get('${selector}').type('${value}')`,
    });
    return block;
  }

  _handleClick(event: CodeEvent) {
    const block = new Block(this._frameId);
    block.addLine({
      type: DOM_EVENTS.CLICK,
      value: getClickCommands({
        event,
        frame: this._frame,
      }),
    });
    return block;
  }

  _handleChange({ tagName, selector, value, targetType }: CodeEvent) {
    if (tagName === "INPUT") {
      if (targetType === "checkbox") {
        return new Block(this._frameId, {
          type: DOM_EVENTS.CHANGE,
          value: `${this._frame}.get('${selector}').check('${value}')`,
        });
      }
      return new Block(this._frameId, {
        type: DOM_EVENTS.CHANGE,
        value: `${this._frame}.get('${selector}').type('${value}')`,
      });
    }

    return new Block(this._frameId, {
      type: DOM_EVENTS.CHANGE,
      value: `${this._frame}.get('${selector}').select('${value}')`,
    });
  }

  _handleGoto({ href, origin }: CodeEvent) {
    console.log("handle goto", href, origin);
    this._origin = origin || "";
    return new Block(this._frameId, {
      type: PPTR_ACTIONS.GOTO,
      value: `${this._frame}.visit('${new Url(href || "").pathname}')`,
    });
  }

  _handleViewport(event: CodeEvent) {
    const { width, height } = event.value;
    return new Block(this._frameId, {
      type: PPTR_ACTIONS.VIEWPORT,
      value: `${this._frame}.viewport(${width}, ${height})`,
    });
  }

  _handleWaitForNavigation() {
    const block = new Block(this._frameId);
    return block;
  }

  /**
    * 
    * @param 
    * params example:  frameId: 0
                    initiator: "http://localhost:4200"
                    method: "POST"
                    type: "xmlhttprequest"
                    url: "http://localhost:4200/api-gateway/acp/v1/kubernetes/calico/namespaces/cpaas-system/applications"
    * @returns 
    */
  _handleRequest({ method, initiator, url }: RequestDetail) {
    if (["POST", "PUT", "DELETE"].includes(method)) {
      const matchPath = url.split("?")[0].replace(initiator, "");
      return new Block(this._frameId, {
        type: PPTR_ACTIONS.REQUEST,
        value: `cy.intercept('${method}',/${matchPath}/).as('${matchPath}').wait('@${matchPath}');`,
      });
    }
    return null;
  }

  _handleNavigate(href: string) {
    return new Block(this._frameId, {
      type: PPTR_ACTIONS.NAVIGATE,
      value: `cy.url().should('contains', '${new Url(href).pathname}')`,
    });
  }

  _postProcessSetFrames() {
    for (let [i, block] of (this._blocks as any).entries()) {
      const lines = block.getLines();
      for (let line of lines) {
        if (
          line.frameId &&
          Object.keys(this._allFrames).includes(line.frameId.toString())
        ) {
          const declaration = `const frame_${
            line.frameId
          } = frames.find(f => f.url() === '${this._allFrames[line.frameId]}')`;
          this._blocks[i].addLineToTop({
            type: PPTR_ACTIONS.FRAME_SET,
            value: declaration,
          });
          this._blocks[i].addLineToTop({
            type: PPTR_ACTIONS.FRAME_SET,
            value: "let frames = await page.frames()",
          });
          delete this._allFrames[line.frameId];
          break;
        }
      }
    }
  }

  _postProcessAddBlankLines() {
    let i = 0;
    while (i <= this._blocks.length) {
      const blankLine = new Block();
      blankLine.addLine({ type: "", value: "" });
      this._blocks.splice(i, 0, blankLine);
      i += 2;
    }
  }
}
