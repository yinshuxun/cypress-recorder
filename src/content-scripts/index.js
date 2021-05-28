import eventsToRecord from "../code-generator/dom-events-to-record";
import { defaultBindTags } from "../code-generator/elements-to-bind-to";
// import { finder } from "../code-generator/alauda-finder";
import finder from "@medv/finder";
import pptrActions from "../code-generator/pptr-actions";

import * as delegate from "delegate";

// note: 需要尽量避免aui-input的匹配
export const matchClassNames = [
  "aui-search",
  "aui-button",
  "aui-select",
  "aui-accordion",
  "aui-breadcrumb",
  "aui-nav",
  "aui-form",
  "aui-icon",
  "aui-tab",
  "aui-tooltip",
  "aui-option",
  "acl-disabled-container",
  "acl-",
  "rc-",
];

// need add pre command lines elements
export const needAddPreCLElements = [
  
]


class EventRecorder {
  constructor() {
    this.eventLog = [];
    this.previousEvent = null;
    this.previousRouter = null;
  }

  start() {
    chrome.storage.local.get(["options"], ({ options }) => {
      const { dataAttribute } = options ? options.code : {};
      const startContext = this;
      if (dataAttribute) {
        this.dataAttribute = dataAttribute;
      }

      // yintest 监听 pushstate
      // const _historyWrap = function(type) {
      //   const orig = window.history[type];
      //   const e = new Event(type);
      //   return function() {
      //     const rv = orig.apply(this, arguments);
      //     e.arguments = arguments;
      //     window.dispatchEvent(e);
      //     return rv;
      //   };
      // };
      // window.history.pushState = _historyWrap("pushState");
      // window.history.replaceState = _historyWrap("replaceState");

      // window.addEventListener("pushState", function(e) {
      //   console.log("change pushState", e);
      // });
      // window.addEventListener("replaceState", function(e) {
      //   console.log("change replaceState", e);
      // });

      const events = Object.values(eventsToRecord);
      if (!window.pptRecorderAddedControlListeners) {
        this.addAllListeners(defaultBindTags, events);
        window.pptRecorderAddedControlListeners = true;
      }

      if (
        !window.document.pptRecorderAddedControlListeners &&
        chrome.runtime &&
        chrome.runtime.onMessage
      ) {
        const boundedGetCurrentUrl = this.getCurrentUrl.bind(this);
        const boundedGetViewPortSize = this.getViewPortSize.bind(this);
        chrome.runtime.onMessage.addListener(boundedGetCurrentUrl);
        chrome.runtime.onMessage.addListener(boundedGetViewPortSize);
        window.document.pptRecorderAddedControlListeners = true;
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
      if (window._cy_navigate) {
        console.log("_cy_navigate", window._cy_navigate);
      }
    });
  }

  addAllListeners(elements, events) {
    const boundedRecordEvent = this.recordEvent.bind(this);
    events.forEach((type) => {
      window.addEventListener(type, boundedRecordEvent, true);
    });
  }

  sendMessage(msg) {
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

  getCurrentUrl(msg) {
    if (msg.control && msg.control === "get-current-url") {
      console.debug("sending current url:", window.location.href);
      this.sendMessage({
        control: msg.control,
        origin: window.location.origin,
        href: window.location.href,
      });
    }
  }

  getViewPortSize(msg) {
    if (msg.control && msg.control === "get-viewport-size") {
      console.debug("sending current viewport size");
      this.sendMessage({
        control: msg.control,
        coordinates: { width: window.innerWidth, height: window.innerHeight },
      });
    }
  }

  recordEvent(e) {
    if (this.previousEvent && this.previousEvent.timeStamp === e.timeStamp)
      return;
    this.previousEvent = e;
    // yintest 判断url是否发生了改变
    if (window.location.href !== this.previousRouter) {
      this.previousRouter = window.location.href;

      this.sendMessage({
        action: pptrActions.NAVIGATE,
        href: this.previousRouter,
      });
    }

    const baseOptions = {
      className: (name) => matchClassNames.some((item) => name.includes(item)),
      tagName: (name) => matchClassNames.some((item) => name.includes(item)),
      attr: (name, value) => name.includes("data-cy"),
      idName: (name) => !name.includes("cdk-"),
    };

    const selector =
      e.target.hasAttribute && e.target.hasAttribute(this.dataAttribute)
        ? formatDataSelector(e.target, this.dataAttribute)
        : finder(e.target, {
            ...baseOptions,
            seedMinLength: 1,
            optimizedMinLength: 2,
          });

    const msg = {
      selector: selector,
      fullSelector: finder(e.target, {
        ...baseOptions,
        seedMinLength: 10,
        optimizedMinLength: 10,
      }),
      value: e.target.value,
      tagName: e.target.tagName,
      targetType: e.target.type,
      action: e.type,
      keyCode: e.keyCode ? e.keyCode : null,
      href: e.target.href ? e.target.href : null,
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

function getCoordinates(evt) {
  const eventsWithCoordinates = {
    mouseup: true,
    mousedown: true,
    mousemove: true,
    mouseover: true,
  };
  return eventsWithCoordinates[evt.type]
    ? { x: evt.clientX, y: evt.clientY }
    : null;
}

function formatDataSelector(element, attribute) {
  return `[${attribute}=${element.getAttribute(attribute)}]`;
}

window.eventRecorder = new EventRecorder();
window.eventRecorder.start();
