import { DOM_EVENTS } from "../code-generator/dom-events-to-record";
import { defaultBindTags } from "../code-generator/elements-to-bind-to";
// import { finder } from "../code-generator/alauda-finder";
import finder from "@medv/finder";
import { PPTR_ACTIONS } from "../code-generator/pptr-actions";
import { matchClassNames } from "../custom/template";
import { CodeEvent, HTMLElementEvent, StringMap } from "../custom/types";

export type ContextMessage = Partial<CodeEvent> & {
  control?: string;
  origin?: string;
  href?: string;
  coordinates?: StringMap<string | number | boolean>;
  targetObject?: StringMap<any>;
};

class EventRecorder {
  eventLog: ContextMessage[] = [];
  previousEvent!: Event;
  previousRouter!: string;
  dataAttribute!: string;

  start() {
    chrome.storage.local.get(["options"], ({ options }) => {
      const { dataAttribute }: any = options ? options.code : {};
      const startContext = this;
      if (dataAttribute) {
        this.dataAttribute = dataAttribute;
      }

      const events = Object.values(DOM_EVENTS);
      if (!window.pptRecorderAddedControlListeners) {
        this.addAllListeners(defaultBindTags, events);
        window.pptRecorderAddedControlListeners = true;
      }

      if (
        !(window.document as any).pptRecorderAddedControlListeners &&
        chrome.runtime &&
        chrome.runtime.onMessage
      ) {
        const boundedGetCurrentUrl = this.getCurrentUrl.bind(this);
        const boundedGetViewPortSize = this.getViewPortSize.bind(this);
        chrome.runtime.onMessage.addListener(boundedGetCurrentUrl);
        chrome.runtime.onMessage.addListener(boundedGetViewPortSize);
        (window.document as any).pptRecorderAddedControlListeners = true;
      }

      chrome.storage.local.get("firstRun", function(items) {
        if (!items.hasOwnProperty("firstRun")) {
          chrome.storage.local.set({ firstRun: 0 });
          items.firstRun = 0;
        }

        if (items.hasOwnProperty("firstRun") && !items.firstRun) {
          startContext.sendMessage({
            control: "get-viewport-size",
            coordinates: {
              width: window.innerWidth,
              height: window.innerHeight,
            },
          });
          startContext.sendMessage({
            control: "get-current-url",
            origin: window.location.origin,
            href: window.location.href,
          });
          chrome.storage.local.set({ firstRun: 1 });
        }
      });

      this.sendMessage({ control: "event-recorder-started" });
      console.debug("Cypress Recorder in-page EventRecorder started");

      // 绑定angular event router end
      if (!!window._cy_navigate) {
        // yintodo
      }
    });
  }

  addAllListeners(elements: string[], events: string[]) {
    const boundedRecordEvent = this.recordEvent.bind(this);
    events.forEach((type) => {
      window.addEventListener<any>(type, boundedRecordEvent, true);
    });
  }

  sendMessage(msg: ContextMessage) {
    console.debug("sending message", msg);
    try {
      // poor man's way of detecting whether this script was injected by an actual extension, or is loaded for
      // testing purposes
      if (chrome.runtime && chrome.runtime.onMessage) {
        chrome.runtime.sendMessage(msg);
      } else {
        this.eventLog.push(msg);
      }
    } catch (err) {
      console.debug("caught error", err);
    }
  }

  getCurrentUrl(msg: ContextMessage) {
    if (msg.control && msg.control === "get-current-url") {
      console.debug("sending current url:", window.location.href);
      this.sendMessage({
        control: msg.control,
        origin: window.location.origin,
        href: window.location.href,
      });
    }
  }

  getViewPortSize(msg: ContextMessage) {
    if (msg.control && msg.control === "get-viewport-size") {
      console.debug("sending current viewport size");
      this.sendMessage({
        control: msg.control,
        coordinates: { width: window.innerWidth, height: window.innerHeight },
      });
    }
  }

  recordEvent(
    e: HTMLElementEvent<HTMLInputElement & HTMLLinkElement> &
      KeyboardEvent &
      MouseEvent
  ) {
    if (this.previousEvent && this.previousEvent.timeStamp === e.timeStamp)
      return;
    this.previousEvent = e;

    // router 变化之后需要价格 router 变化的断言
    if (window.location.href !== this.previousRouter) {
      this.previousRouter = window.location.href;

      this.sendMessage({
        action: PPTR_ACTIONS.NAVIGATE,
        href: this.previousRouter,
      });
    }

    const finderOptions = {
      className: (name: string) =>
        matchClassNames.some((item) => name.includes(item)),
      tagName: (name: string) =>
        matchClassNames.some((item) => name.includes(item)),
      attr: (name: string, _value: any) => name.includes("data-cy"),
      idName: (name: string) => !name.includes("cdk-"),
    };

    const selector =
      e.target?.hasAttribute &&
      e.target.hasAttribute(this.dataAttribute as string)
        ? formatDataSelector(e.target, this.dataAttribute as any)
        : finder(e.target, {
            ...finderOptions,
            seedMinLength: 1,
            optimizedMinLength: 2,
          });

    const msg: ContextMessage = {
      selector: selector,
      fullSelector: finder(e.target, {
        ...finderOptions,
        seedMinLength: 10,
        optimizedMinLength: 10,
      }),
      value: e.target.value,
      tagName: e.target.tagName,
      targetType: e.target.type,
      action: e.type,
      keyCode: e.keyCode ?? e.keyCode,
      href: e.target.href ?? e.target.href,
      coordinates: getCoordinates(e),
      targetObject: e.target,
      targetText: e.target.innerText,
    };

    this.sendMessage(msg);
  }

  getEventLog() {
    return this.eventLog;
  }

  clearEventLog() {
    this.eventLog = [];
  }
}

function getCoordinates(evt: MouseEvent) {
  const eventsWithCoordinates = {
    mouseup: true,
    mousedown: true,
    mousemove: true,
    mouseover: true,
  };
  return eventsWithCoordinates[evt.type as keyof typeof eventsWithCoordinates]
    ? {
        x: evt.clientX,
        y: evt.clientY,
      }
    : undefined;
}

function formatDataSelector(element: Element, attribute: string) {
  return `[${attribute}=${element.getAttribute(attribute)}]`;
}

window.eventRecorder = new EventRecorder();
window.eventRecorder.start();
