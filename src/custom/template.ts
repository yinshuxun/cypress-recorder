import { CommandInput } from "./types/index";

export const wrapDescribeHeader = `describe('describe 名称', () => {\n`;

export const wrapDescribeFooter = `})`;

export const wrapItHeader = ` it('case 名称', () => {\n`;

export const wrapItFooter = ` })\n`;

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

// for-alauda 自定义commands
export const getClickCommands = ({ event, frame }: CommandInput) => {
  const { action, targetText, fullSelector, selector } = event;
  switch (action) {
    case "click": {
      // 针对 disabled container wrapper，需要允许点击才能点击
      let hasDisabledField = fullSelector.includes("acl-disabled-container");

      if (targetText && targetText.trim()) {
        if (selector && selector.includes("aui-nav-item")) {
          return `${frame}.getAludaUiNav('${targetText.trim()}').click({force:true})`;
        }
        // note: 这里需要针对 acl-disabled-container 添加处理逻辑
        return `${frame}.get('${
          hasDisabledField ? "[ng-reflect-is-allowed=true] " : ""
        }${selector}').contains('${targetText.trim()}').click()`;
      }

      return `${frame}.get('${
        hasDisabledField ? "[ng-reflect-is-allowed=true] " : ""
      }${selector}').click()`;
    }

    default:
      return "";
  }
};

// 去除 finder 这个库 生成的 selector 里有 * 或者 > 层级选择器的情况
export const filterSelector = (selector: string) => {
  return selector
    ? selector
        .replaceAll(" >", "")
        .split(" ")
        .filter((str) => !str.startsWith("*"))
        .join(" ")
    : selector;
};
