export type CodeEvent = {
  action?: string; // 当前动作，如：click、goto、change
  value?: any; // 如果当前操作的对象已经有值了，返回value
  href?: string; //
  origin?: string; // location.origin
  keyCode?: number; // 键盘事件的话，会有keycode返回
  tagName?: string; // 当前selector 的tag
  targetType?: string; // eventTarget 的类型
  targetText?: string; // eventTarget 的值
  frameId: number; // 当前视图的 id
  frameUrl: string; // 当前视图的 url
  selector?: string; // 如click的 选择器，已经经过dom event处理过了
  fullSelector: string; // 返回的没有经过 dom event处理过的值
  detail?: RequestDetail; // request 请求可能会用到的值
};

export type RequestDetail = {
  method: string;
  initiator: any;
  url: string;
};

export type CommandInput = {
  event: CodeEvent;
  frame?: string;
};

export type HTMLElementEvent<T extends HTMLElement> = Event & {
  target: T;
  // probably you might want to add the currentTarget as well
  // currentTarget: T;
};

export type StringMap<T> = Record<string, T>;
