export declare class kortxyzCollections {
  collectionsEl: HTMLElement;
  originalcollections: Array<any>;
  collections: Array<any>;
  fetchCollections(url: any): Promise<void>;
  private filterCollections;
  componentWillLoad(): void;
  render(): any[];
}
