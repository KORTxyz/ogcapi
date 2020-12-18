export declare class kortxyzTabbar {
  tabbarEl: HTMLElement;
  private activetab;
  private tabs;
  private contents;
  setActiveTab(tab: any): Promise<void>;
  getActiveTab(): Promise<any>;
  addTab(collection: any, index?: any): Promise<void>;
  removeTab(tab: any): Promise<void>;
  private onDrop;
  render(): any[];
}
