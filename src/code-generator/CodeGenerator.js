import domEvents from "./dom-events-to-record";
import pptrActions from "./pptr-actions";
import Block from "./Block";
import Url from "url-parse";

const wrapDescribeHeader = `describe('describe 名称', () => {\n`;

const wrapDescribeFooter = `})`;

const wrapItHeader = ` it('case 名称', () => {\n`;

const wrapItFooter = ` })\n`;

export const defaults = {
  wrapDescribe: true,
  blankLinesBetweenBlocks: true,
  dataAttribute: "",
};

export default class CodeGenerator {
  constructor(options) {
    this._options = Object.assign(defaults, options);
    this._blocks = [];
    this._frame = "cy";
    this._frameId = 0;
    this._allFrames = {};
    this._origin = "";

    this._hasNavigation = false;
  }

  generate(events) {
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

  _parseEvents(events) {
    let result = "";

    for (let i = 0; i < events.length; i++) {
      const {
        action,
        selector,
        value,
        href,
        keyCode,
        tagName,
        targetType,
        targetText,
        frameId,
        frameUrl,
        detail,
      } = events[i];

      // we need to keep a handle on what frames events originate from
      this._setFrames(frameId, frameUrl);

      // 去除 finder 这个库 生成的 selector 里有 * 或者 > 层级选择器的情况
      const filterSelector = selector
        ? selector
            .replaceAll(" >", "")
            .split(" ")
            .filter((str) => !str.startsWith("*"))
            .join(" ")
        : selector;

      // 添加 指定组件的前置条件 commands


      switch (action) {
        case "keydown":
          if (keyCode === 9) {
            //this._blocks.push(this._handleKeyDown(selector, value, keyCode))
          }
          break;
        case "click":
          this._blocks.push(this._handleClick(filterSelector, events[i]));
          break;
        case "change":
          //note: 移除 aui-radio aui-checkbox的影响

          if (["radio", "checkbox"].includes(targetType)) {
            break;
          }
          if (tagName === "SELECT") {
            this._blocks.push(
              this._handleChange(tagName, filterSelector, value)
            );
          }
          if (tagName === "INPUT") {
            if (targetType) {
              this._blocks.push(
                this._handleChange(tagName, filterSelector, value, targetType)
              );
            } else {
              this._blocks.push(
                this._handleChange(tagName, filterSelector, value)
              );
            }
          }

          break;
        case "goto*":
          this._blocks.push(this._handleGoto(events[i], frameId));
          break;
        case "viewport*":
          this._blocks.push(this._handleViewport(value.width, value.height));
          break;
        case "navigation*":
          this._blocks.push(this._handleWaitForNavigation());
          this._blocks.push(this._handleGoto(events[i], frameId));
          this._hasNavigation = true;
          break;

        case "request*": {
          const block = this._handleRequest(detail);
          if (!!block) {
            this._blocks.push(block);
          }
          break;
        }
        case "navigate*": {
          this._blocks.push(this._handleNavigate(href));
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

  _setFrames(frameId, frameUrl) {
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

  _handleKeyDown(selector, value) {
    const block = new Block(this._frameId);
    block.addLine({
      type: domEvents.KEYDOWN,
      value: `${this._frame}.get('${selector}').type('${value}')`,
    });
    return block;
  }

  _handleClick(selector, event) {
    const block = new Block(this._frameId);
    block.addLine({
      type: domEvents.CLICK,
      value: this._getCommands(selector, event),
    });
    return block;
  }

  // foralauda
  _getCommands(selector, { action, targetText, fullSelector }) {
    switch (action) {
      case "click": {
        // 针对 disabled container wrapper，需要允许点击才能点击
        let hasDisabledField = fullSelector.includes("acl-disabled-container");

        if (targetText && targetText.trim()) {
          if (selector.includes("aui-nav-item")) {
            return `${
              this._frame
            }.getAludaUiNav('${targetText.trim()}').click({force:true})`;
          }
          // note: 这里需要针对 acl-disabled-container 添加处理逻辑
          return `${this._frame}.get('${
            hasDisabledField ? "[ng-reflect-is-allowed=true] " : ""
          }${selector}').contains('${targetText.trim()}').click()`;
        }

        return `${this._frame}.get('${
          hasDisabledField ? "[ng-reflect-is-allowed=true] " : ""
        }${selector}').click()`;
      }

      default:
        return "";
    }
  }

  _handleChange(tagName, selector, value, targetType) {
    if (tagName === "INPUT") {
      if (targetType === "checkbox") {
        return new Block(this._frameId, {
          type: domEvents.CHANGE,
          value: `${this._frame}.get('${selector}').check('${value}')`,
        });
      }
      return new Block(this._frameId, {
        type: domEvents.CHANGE,
        value: `${this._frame}.get('${selector}').type('${value}')`,
      });
    }

    return new Block(this._frameId, {
      type: domEvents.CHANGE,
      value: `${this._frame}.get('${selector}').select('${value}')`,
    });
  }

  _handleGoto({ href, origin }) {
    console.log("handle goto", href, origin);
    this._origin = origin;
    return new Block(this._frameId, {
      type: pptrActions.GOTO,
      value: `${this._frame}.visit('${new Url(href).pathname}')`,
    });
  }

  _handleViewport(width, height) {
    return new Block(this._frameId, {
      type: pptrActions.VIEWPORT,
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
  _handleRequest({ method, initiator, url }) {
    console.log("test01", method, initiator, url, this._origin);
    if (["POST", "PUT", "DELETE"].includes(method)) {
      const matchPath = url.split("?")[0].replace(initiator, "");
      return new Block(this._frameId, {
        type: pptrActions.REQUEST,
        value: `cy.intercept('${method}',/${matchPath}/).as('${matchPath}').wait('@${matchPath}');`,
      });
    }
    return null;
  }

  _handleNavigate(href) {
    return new Block(this._frameId, {
      type: pptrActions.NAVIGATE,
      value: `cy.url().should('contains', '${new Url(href).pathname}')`,
    });
  }

  _postProcessSetFrames() {
    for (let [i, block] of this._blocks.entries()) {
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
            type: pptrActions.FRAME_SET,
            value: declaration,
          });
          this._blocks[i].addLineToTop({
            type: pptrActions.FRAME_SET,
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
      blankLine.addLine({ type: null, value: "" });
      this._blocks.splice(i, 0, blankLine);
      i += 2;
    }
  }
}
