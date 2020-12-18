export declare class kortxyzTab {
  tabEl: HTMLElement;
  tabid: number;
  active: boolean;
  icon: string;
  name: string;
  collection: any;
  droparea: boolean;
  private setActive;
  removeTab(): Promise<void>;
  private onauxclick;
  private onDragStart;
  dragCounter: number;
  private onDragEnter;
  private onDragLeave;
  splitView(): Promise<void>;
  render(): any;
}
