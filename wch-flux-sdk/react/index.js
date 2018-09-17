/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
export { WchPage } from './wchPage';
export { WchContent } from './wchContent';
import { withLayout } from './wchLayout';
import { WchInlineEdit } from './wchInlineEdit';

let editService = null;

let ComponentRegistry = {};
let ComponentRegistryByLayout = {};
let _cachedRegistryByName = {};
let _cachedRegistryByLayout = {};
export let ComponentIDRegistry = {};
export function registerComponent(name, func, layoutMapping) {
	ComponentRegistry = Object.assign({}, ComponentRegistry, { [name]: func });
	ComponentRegistryByLayout = Object.assign({}, ComponentRegistryByLayout, { [layoutMapping]: {component: func, name: name} });
}

export function getComponentByName(name) {
	if (ComponentRegistry[name]) {
		if (_cachedRegistryByName[name]) {
			return _cachedRegistryByName[name];
		} else {
			_cachedRegistryByName[name] = ComponentRegistry[name]().then((component) => {
				return withLayout(component[name])
			});
			return _cachedRegistryByName[name]
		}

	} else {
		return new Promise((resolve, reject) => {
			reject('Component not found');
		});
	}
}

export function getComponentByLayout(layout) {
	console.error(`Getting content by layout`, layout);
	if (ComponentRegistryByLayout[layout]) {
		if (_cachedRegistryByLayout[layout]) {
			return _cachedRegistryByLayout[layout]
		} else {
			_cachedRegistryByLayout[layout] = ComponentRegistryByLayout[layout].component().then((component) => {
				return withLayout(component[ComponentRegistryByLayout[layout].name]);
			});
			return _cachedRegistryByLayout[layout]
		}

	

	} else {
		return new Promise((resolve, reject) => {
			reject('Component not found');
		});
	}
}

export function registerComponentContentId(name, id) {
	ComponentIDRegistry = Object.assign({}, ComponentIDRegistry, { [name]: id });
}

export function getEditService() {
	if (!editService) {
		editService = new WchInlineEdit();
	}

	return editService;
}

export function layoutHOC(component) {
	return withLayout(component);
}