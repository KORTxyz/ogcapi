import{r as t,h as e,g as n,c as i}from"./p-2069e38c.js";import{c as o}from"./p-3e8ff66b.js";const r=class{constructor(e){t(this,e),this.showJson=()=>{window.open(window.location.origin+"/collections?f=json","_newtab"+Date.now())}}componentDidRender(){this.uploadEl.url=window.location.origin+"/collections"}render(){return[e("div",{onClick:()=>this.uploadEl.openDialog()},"Upload dataset"),e("hr",null),e("div",{onClick:()=>this.showJson()},"Show json"),e("kortxyz-uploader",{ref:t=>this.uploadEl=t})]}get collectionsmenuEl(){return n(this)}};r.style="kortxyz-collectionsmenu{height:100%;width:100%;display:flex;flex:1;flex-direction:column;margin:4px 0 4px 0}kortxyz-collectionsmenu>div{font-family:'Roboto Mono', monospace;font-size:12px;color:#BBB;line-height:20px;padding:0 20px 0 20px;cursor:pointer}kortxyz-collectionsmenu>div:hover{background:#094771;color:#FFF}kortxyz-collectionsmenu>hr{width:calc(100% - 20px);height:1px;background:#616162;border:0;margin:4px 10px 4px 10px}";var s=o((function(t,e){Object.defineProperty(e,"__esModule",{value:!0});const n=new WeakMap,i=new WeakMap;function o(t){const e=n.get(t);return console.assert(null!=e,"'this' is expected an Event object, but got",t),e}function r(t,e){n.set(this,{eventTarget:t,event:e,eventPhase:2,currentTarget:t,canceled:!1,stopped:!1,passiveListener:null,timeStamp:e.timeStamp||Date.now()}),Object.defineProperty(this,"isTrusted",{value:!1,enumerable:!0});const i=Object.keys(e);for(let t=0;t<i.length;++t){const e=i[t];e in this||Object.defineProperty(this,e,s(e))}}function s(t){return{get(){return o(this).event[t]},set(e){o(this).event[t]=e},configurable:!0,enumerable:!0}}function l(t){return{value(){const e=o(this).event;return e[t].apply(e,arguments)},configurable:!0,enumerable:!0}}function u(t){if(null==t||t===Object.prototype)return r;let e=i.get(t);return null==e&&(e=function(t,e){const n=Object.keys(e);if(0===n.length)return t;function i(e,n){t.call(this,e,n)}i.prototype=Object.create(t.prototype,{constructor:{value:i,configurable:!0,writable:!0}});for(let o=0;o<n.length;++o){const r=n[o];if(!(r in t.prototype)){const t=Object.getOwnPropertyDescriptor(e,r);Object.defineProperty(i.prototype,r,"function"==typeof t.value?l(r):s(r))}}return i}(u(Object.getPrototypeOf(t)),t),i.set(t,e)),e}function h(t){return o(t).stopped}function c(t,e){o(t).passiveListener=e}r.prototype={get type(){return o(this).event.type},get target(){return o(this).eventTarget},get currentTarget(){return o(this).currentTarget},composedPath(){const t=o(this).currentTarget;return null==t?[]:[t]},get NONE(){return 0},get CAPTURING_PHASE(){return 1},get AT_TARGET(){return 2},get BUBBLING_PHASE(){return 3},get eventPhase(){return o(this).eventPhase},stopPropagation(){const t=o(this);"function"==typeof t.event.stopPropagation&&t.event.stopPropagation()},stopImmediatePropagation(){const t=o(this);t.stopped=!0,"function"==typeof t.event.stopImmediatePropagation&&t.event.stopImmediatePropagation()},get bubbles(){return Boolean(o(this).event.bubbles)},get cancelable(){return Boolean(o(this).event.cancelable)},preventDefault(){const t=o(this);null==t.passiveListener?t.event.cancelable&&(t.canceled=!0,"function"==typeof t.event.preventDefault&&t.event.preventDefault()):console.warn("Event#preventDefault() was called from a passive listener:",t.passiveListener)},get defaultPrevented(){return o(this).canceled},get composed(){return Boolean(o(this).event.composed)},get timeStamp(){return o(this).timeStamp}},Object.defineProperty(r.prototype,"constructor",{value:r,configurable:!0,writable:!0}),"undefined"!=typeof window&&void 0!==window.Event&&(Object.setPrototypeOf(r.prototype,window.Event.prototype),i.set(window.Event.prototype,r));const a=new WeakMap;function f(t){return null!==t&&"object"==typeof t}function p(t){const e=a.get(t);if(null==e)throw new TypeError("'this' is expected an EventTarget object, but got another value.");return e}function d(t,e){Object.defineProperty(t,"on"+e,function(t){return{get(){let e=p(this).get(t);for(;null!=e;){if(3===e.listenerType)return e.listener;e=e.next}return null},set(e){"function"==typeof e||f(e)||(e=null);const n=p(this);let i=null,o=n.get(t);for(;null!=o;)3===o.listenerType?null!==i?i.next=o.next:null!==o.next?n.set(t,o.next):n.delete(t):i=o,o=o.next;if(null!==e){const o={listener:e,listenerType:3,passive:!1,once:!1,next:null};null===i?n.set(t,o):i.next=o}},configurable:!0,enumerable:!0}}(e))}function w(t){function e(){b.call(this)}e.prototype=Object.create(b.prototype,{constructor:{value:e,configurable:!0,writable:!0}});for(let n=0;n<t.length;++n)d(e.prototype,t[n]);return e}function b(){if(!(this instanceof b)){if(1===arguments.length&&Array.isArray(arguments[0]))return w(arguments[0]);if(arguments.length>0){const t=new Array(arguments.length);for(let e=0;e<arguments.length;++e)t[e]=arguments[e];return w(t)}throw new TypeError("Cannot call a class as a function")}a.set(this,new Map)}b.prototype={addEventListener(t,e,n){if(null==e)return!1;if("function"!=typeof e&&!f(e))throw new TypeError("'listener' should be a function or an object.");const i=p(this),o=f(n),r=(o?Boolean(n.capture):Boolean(n))?1:2,s={listener:e,listenerType:r,passive:o&&Boolean(n.passive),once:o&&Boolean(n.once),next:null};let l=i.get(t);if(void 0===l)return i.set(t,s),!0;let u=null;for(;null!=l;){if(l.listener===e&&l.listenerType===r)return!1;u=l,l=l.next}return u.next=s,!0},removeEventListener(t,e,n){if(null==e)return!1;const i=p(this),o=(f(n)?Boolean(n.capture):Boolean(n))?1:2;let r=null,s=i.get(t);for(;null!=s;){if(s.listener===e&&s.listenerType===o)return null!==r?r.next=s.next:null!==s.next?i.set(t,s.next):i.delete(t),!0;r=s,s=s.next}return!1},dispatchEvent(t){if(null==t||"string"!=typeof t.type)throw new TypeError('"event.type" should be a string.');const e=p(this),n=t.type;let i=e.get(n);if(null==i)return!0;const r=function(t,e){return new(u(Object.getPrototypeOf(e)))(t,e)}(this,t);let s=null;for(;null!=i;){if(i.once?null!==s?s.next=i.next:null!==i.next?e.set(n,i.next):e.delete(n):s=i,c(r,i.passive?i.listener:null),"function"==typeof i.listener)try{i.listener.call(this,r)}catch(t){"undefined"!=typeof console&&"function"==typeof console.error&&console.error(t)}else 3!==i.listenerType&&"function"==typeof i.listener.handleEvent&&i.listener.handleEvent(r);if(h(r))break;i=i.next}return c(r,null),function(t){o(t).eventPhase=0}(r),function(t){o(t).currentTarget=null}(r),!r.defaultPrevented}},Object.defineProperty(b.prototype,"constructor",{value:b,configurable:!0,writable:!0}),"undefined"!=typeof window&&void 0!==window.EventTarget&&Object.setPrototypeOf(b.prototype,window.EventTarget.prototype),e.defineEventAttribute=d,e.EventTarget=b,e.default=b,t.exports=b,t.exports.EventTarget=t.exports.default=b,t.exports.defineEventAttribute=d}));class l{constructor(t){this.endpoint=t.endpoint,this.file=t.file,this.headers=t.headers||{},this.postParams=t.postParams,this.chunkSize=t.chunkSize||10,this.retries=t.retries||5,this.delayBeforeRetry=t.delayBeforeRetry||5,this.start=0,this.chunk=null,this.chunkCount=0,this.totalChunks=Math.ceil(this.file.size/(1e3*this.chunkSize*1e3)),this.retriesCount=0,this.offline=!1,this.paused=!1,this.headers["uploader-file-id"]=this._uniqid(this.file),this.headers["uploader-chunks-total"]=this.totalChunks,this._reader=new FileReader,this._eventTarget=new s.EventTarget,this._validateParams(),this._sendChunks(),window.addEventListener("online",(()=>{this.offline&&(this.offline=!1,this._eventTarget.dispatchEvent(new Event("online")),this._sendChunks())})),window.addEventListener("offline",(()=>{this.offline=!0,this._eventTarget.dispatchEvent(new Event("offline"))}))}on(t,e){this._eventTarget.addEventListener(t,e)}_validateParams(){if(!this.endpoint||!this.endpoint.length)throw new TypeError("endpoint must be defined");if(this.file instanceof File==0)throw new TypeError("file must be a File object");if(this.headers&&"object"!=typeof this.headers)throw new TypeError("headers must be null or an object");if(this.postParams&&"object"!=typeof this.postParams)throw new TypeError("postParams must be null or an object");if(this.chunkSize&&("number"!=typeof this.chunkSize||0===this.chunkSize))throw new TypeError("chunkSize must be a positive number");if(this.retries&&("number"!=typeof this.retries||0===this.retries))throw new TypeError("retries must be a positive number");if(this.delayBeforeRetry&&"number"!=typeof this.delayBeforeRetry)throw new TypeError("delayBeforeRetry must be a positive number")}_uniqid(){return Math.floor(1e8*Math.random())+Date.now()+this.file.size}_getChunk(){return new Promise((t=>{const e=1===this.totalChunks?this.file.size:1e3*this.chunkSize*1e3,n=e*this.chunkCount;this._reader.onload=()=>{this.chunk=new Blob([this._reader.result],{type:"application/octet-stream"}),t()},this._reader.readAsArrayBuffer(this.file.slice(n,n+e))}))}_sendChunk(){const t=new FormData;return this.chunkCount+1===this.totalChunks&&this.postParams&&Object.keys(this.postParams).forEach((e=>t.append(e,this.postParams[e]))),t.append("file",this.chunk),this.headers["uploader-chunk-number"]=this.chunkCount,fetch(this.endpoint,{method:"POST",headers:this.headers,body:t})}_manageRetries(){if(this.retriesCount++<this.retries)return setTimeout((()=>this._sendChunks()),1e3*this.delayBeforeRetry),void this._eventTarget.dispatchEvent(new CustomEvent("fileRetry",{detail:{message:`An error occured uploading chunk ${this.chunkCount}. ${this.retries-this.retriesCount} retries left`,chunk:this.chunkCount,retriesLeft:this.retries-this.retriesCount}}));this._eventTarget.dispatchEvent(new CustomEvent("error",{detail:`An error occured uploading chunk ${this.chunkCount}. No more retries, stopping upload`}))}_sendChunks(){this.paused||this.offline||this._getChunk().then((()=>this._sendChunk())).then((t=>{if(200===t.status||201===t.status||204===t.status){++this.chunkCount<this.totalChunks?this._sendChunks():this._eventTarget.dispatchEvent(new Event("finish"));const t=Math.round(100/this.totalChunks*this.chunkCount);this._eventTarget.dispatchEvent(new CustomEvent("progress",{detail:t}))}else if([408,502,503,504].includes(t.status)){if(this.paused||this.offline)return;this._manageRetries()}else{if(this.paused||this.offline)return;this._eventTarget.dispatchEvent(new CustomEvent("error",{detail:`Server responded with ${t.status}. Stopping upload`}))}})).catch((()=>{this.paused||this.offline||this._manageRetries()}))}togglePause(){this.paused=!this.paused,this.paused||this._sendChunks()}}const u=class{constructor(e){t(this,e),this.uploadStatus=i(this,"uploadStatus",7),this.url="http://80.241.215.222/collections"}async openDialog(){this.inputEl.click()}upload(t){t.target.files.length>0&&[...t.target.files].forEach((t=>{const e=new l({endpoint:this.url,file:t,postParams:{name:t.name,group:"uploads"}});e.on("error",(t=>this.uploadStatus.emit({code:"error",value:t.detail}))),e.on("progress",(t=>this.uploadStatus.emit({code:"progress",value:t.detail}))),e.on("finish",(t=>this.uploadStatus.emit({code:"progress",value:t.detail})))}))}render(){return[e("input",{multiple:!0,ref:t=>this.inputEl=t,type:"file",name:"file",id:"file",onChange:t=>this.upload(t)})]}get dropzoneEl(){return n(this)}};u.style="kortxyz-uploader{height:100%;width:100%;display:none;flex:1}";export{r as kortxyz_collectionsmenu,u as kortxyz_uploader}