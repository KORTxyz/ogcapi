import { EventEmitter } from '../../stencil-public-runtime';
export declare class kortxyzGps {
  gpsEl: HTMLElement;
  state: string;
  navigator: any;
  mapMoved: EventEmitter;
  notFixed(): void;
  private icon;
  private stopGPS;
  private startGPS;
  private onPosition;
  private toogle;
  render(): any[];
}
