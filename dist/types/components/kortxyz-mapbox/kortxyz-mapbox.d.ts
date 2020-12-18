import { EventEmitter } from '../../stencil-public-runtime';
import mapboxgl from 'mapbox-gl';
import ResizeObserver from "resize-observer-polyfill";
export declare class kortxyzMapbox {
  mapEl: HTMLElement;
  ro: ResizeObserver;
  map: mapboxgl.Map;
  mapstyle: any;
  bbox: any;
  accesstoken: string;
  hover: {
    id: any;
    layer: any;
  };
  mapMoved: EventEmitter;
  inFocus: boolean;
  handleScroll(ev: any): void;
  initResizeObsersver(): Promise<void>;
  componentDidLoad(): void;
  popup: mapboxgl.Popup;
  renderPopup(features: any): string;
  disconnectedCallback(): void;
  render(): any;
}
