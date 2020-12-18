/* KortxyzComponents custom elements bundle */

import { Components, JSX } from "../types/components";

interface KortxyzCollection extends Components.KortxyzCollection, HTMLElement {}
export const KortxyzCollection: {
  prototype: KortxyzCollection;
  new (): KortxyzCollection;
};

interface KortxyzCollections extends Components.KortxyzCollections, HTMLElement {}
export const KortxyzCollections: {
  prototype: KortxyzCollections;
  new (): KortxyzCollections;
};

interface KortxyzCoordinates extends Components.KortxyzCoordinates, HTMLElement {}
export const KortxyzCoordinates: {
  prototype: KortxyzCoordinates;
  new (): KortxyzCoordinates;
};

interface KortxyzDropzone extends Components.KortxyzDropzone, HTMLElement {}
export const KortxyzDropzone: {
  prototype: KortxyzDropzone;
  new (): KortxyzDropzone;
};

interface KortxyzEmpty extends Components.KortxyzEmpty, HTMLElement {}
export const KortxyzEmpty: {
  prototype: KortxyzEmpty;
  new (): KortxyzEmpty;
};

interface KortxyzFooter extends Components.KortxyzFooter, HTMLElement {}
export const KortxyzFooter: {
  prototype: KortxyzFooter;
  new (): KortxyzFooter;
};

interface KortxyzGps extends Components.KortxyzGps, HTMLElement {}
export const KortxyzGps: {
  prototype: KortxyzGps;
  new (): KortxyzGps;
};

interface KortxyzMapbox extends Components.KortxyzMapbox, HTMLElement {}
export const KortxyzMapbox: {
  prototype: KortxyzMapbox;
  new (): KortxyzMapbox;
};

interface KortxyzMenu extends Components.KortxyzMenu, HTMLElement {}
export const KortxyzMenu: {
  prototype: KortxyzMenu;
  new (): KortxyzMenu;
};

interface KortxyzProcesses extends Components.KortxyzProcesses, HTMLElement {}
export const KortxyzProcesses: {
  prototype: KortxyzProcesses;
  new (): KortxyzProcesses;
};

interface KortxyzSidebar extends Components.KortxyzSidebar, HTMLElement {}
export const KortxyzSidebar: {
  prototype: KortxyzSidebar;
  new (): KortxyzSidebar;
};

interface KortxyzSideitem extends Components.KortxyzSideitem, HTMLElement {}
export const KortxyzSideitem: {
  prototype: KortxyzSideitem;
  new (): KortxyzSideitem;
};

interface KortxyzSplitview extends Components.KortxyzSplitview, HTMLElement {}
export const KortxyzSplitview: {
  prototype: KortxyzSplitview;
  new (): KortxyzSplitview;
};

interface KortxyzStyles extends Components.KortxyzStyles, HTMLElement {}
export const KortxyzStyles: {
  prototype: KortxyzStyles;
  new (): KortxyzStyles;
};

interface KortxyzTab extends Components.KortxyzTab, HTMLElement {}
export const KortxyzTab: {
  prototype: KortxyzTab;
  new (): KortxyzTab;
};

interface KortxyzTabbar extends Components.KortxyzTabbar, HTMLElement {}
export const KortxyzTabbar: {
  prototype: KortxyzTabbar;
  new (): KortxyzTabbar;
};

interface MyComponent extends Components.MyComponent, HTMLElement {}
export const MyComponent: {
  prototype: MyComponent;
  new (): MyComponent;
};

/**
 * Utility to define all custom elements within this package using the tag name provided in the component's source. 
 * When defining each custom element, it will also check it's safe to define by:
 *
 * 1. Ensuring the "customElements" registry is available in the global context (window).
 * 2. The component tag name is not already defined.
 *
 * Use the standard [customElements.define()](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define) 
 * method instead to define custom elements individually, or to provide a different tag name.
 */
export declare const defineCustomElements: (opts?: any) => void;

/**
 * Used to manually set the base path where assets can be found.
 * If the script is used as "module", it's recommended to use "import.meta.url",
 * such as "setAssetPath(import.meta.url)". Other options include
 * "setAssetPath(document.currentScript.src)", or using a bundler's replace plugin to
 * dynamically set the path at build time, such as "setAssetPath(process.env.ASSET_PATH)".
 * But do note that this configuration depends on how your script is bundled, or lack of
 * bunding, and where your assets can be loaded from. Additionally custom bundling
 * will have to ensure the static assets are copied to its build directory.
 */
export declare const setAssetPath: (path: string) => void;

export { Components, JSX };

export * from '../types';
