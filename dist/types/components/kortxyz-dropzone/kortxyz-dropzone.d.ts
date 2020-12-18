import { EventEmitter } from '../../stencil-public-runtime';
export declare class kortxyzDropzone {
  dropzoneEl: HTMLElement;
  filesDropped: EventEmitter;
  textDropped: EventEmitter;
  private onDragEnter;
  private onDragLeave;
  private onDrop;
  render(): any;
}
