import { getAPIUrl } from '../index';
const sitesInline = `inline-edit.js`;
const configUrl = `rendering/config`;
const modules = [];
let registryPromise;


export class WchInlineEdit {
	/*
	 * The wchEditable attribute should register component with this service.
	 */
	constructor() {

	}

	getRegistry() {
		if (!registryPromise) {
			registryPromise = new Promise((resolve, reject) => {
				this.getSiteConfig().then((res) => {
					this.loadSitesInline(`${res.authoringUIBaseUrl.href}authoring-sites-ui/inline-edit/`).then((res) => {
						resolve(res);
					});
				}).catch(err => reject(err))
			})
		}
		return registryPromise;
	}

	handleClick(e) {
		console.log('RAVE in service handleClick');
	}

	registerComponent(nativeElement, accessor, onRenderingContext, contentId) {
		this.getRegistry().then((registry) => {
			let id = this._getParentId(nativeElement);
			if(id && id === contentId) {
				registry.register(nativeElement, accessor, onRenderingContext);
			}
		});

	}
	
	_getParentId(node) {
		let id;
		let tempNode = node;
		while(!id && tempNode.parentNode ) {
			id = tempNode.dataset.renderingcontextId;
			if(!id) {
				tempNode = tempNode.parentNode;
			}
		}

		return id;
	}

	_getAbsoluteUrl(base, relative) {
		// remove everything after #
		const hashPosition = base.indexOf('#');
		if (hashPosition > 0) {
			base = base.slice(0, hashPosition);
		}

		// the rest of the function is taken from http://stackoverflow.com/a/14780463
		// http://stackoverflow.com/a/25833886 - this doesn't work in cordova
		// http://stackoverflow.com/a/14781678 - this doesn't work in cordova
		const stack = base.split('/'),
			parts = relative.split('/');
		stack.pop(); // remove current file name (or empty string)
		// (omit if "base" is the current folder without trailing slash)
		for (let i = 0; i < parts.length; i++) {
			if (parts[i] === '..') {
				stack.pop();
			} else if (parts[i] !== '.') {
				stack.push(parts[i]);
			}
		}
		return stack.join('/');
	}

	_loadFile(baseUrl, aRelUrl) {
		// use the HTTP service to load the file
		return fetch(this._getAbsoluteUrl(baseUrl, aRelUrl), {responseType: 'text'})
	}


	async loadSitesInline(baseUrl) {
		return this.getSitesCode(baseUrl).then((body) => {
			const /** @type {?} */ f = new Function('self', 'module', 'require', `'use strict';return ${body}`);
			return f.call(global, global, global, (aModule) => {
				return modules[aModule] || (modules[aModule] = this._loadFile(baseUrl, aModule));
			});
		})
	}


	getSitesCode(baseUrl) {

		return fetch(this._getAbsoluteUrl(baseUrl, sitesInline), {responseType: 'text'}).then(res => res.text());

		/*
		 const sitesui = await fetch(this._getAbsoluteUrl(baseUrl, sitesInline), {responseType: 'text'});
		 let reader = sitesui.body.getReader();
		 let body = '';
		 return reader.read().then(function processText({done, value}) {
		 if (done) {
		 console.log('Stream Complete');
		 return;
		 }
		 let decode = new TextDecoder("utf-8").decode(value);
		 body += decode;
		 return reader.read().then(processText);
		 }).then(() => body);
		 */


	}

	getSiteConfig() {
		return new Promise((resolve, reject) => {
			fetch(`${getAPIUrl()}${configUrl}`, {
				mode: 'cors',
				responseType: 'application/json',
				credentials: 'include'
			}).then((res) => {
				modules[`wch-config`] = res.json();
				resolve(modules[`wch-config`]);
			}).catch((err) => {
				console.error(`Error getting config: ${err}`);
				reject(err);
			})
		})

	}
}