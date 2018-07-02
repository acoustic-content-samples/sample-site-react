/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
export {WchPage} from './wchPage';
export {WchContent} from './wchContent';
import { withLayout } from './wchLayout';
import { WchInlineEdit } from './wchInlineEdit';

let editService = null;

export let ComponentRegistry = {};
export let ComponentRegistryByLayout = {};
export let ComponentIDRegistry = {};
export function registerComponent(name, func, layoutMapping) {
	func().then((component) => {
		ComponentRegistry = Object.assign({}, ComponentRegistry, {[name]: withLayout(component[name])});
		ComponentRegistryByLayout = Object.assign({}, ComponentRegistryByLayout, {[layoutMapping]: withLayout(component[name])});
	})
}

export function registerComponentContentId(name, id) {
	ComponentIDRegistry = Object.assign({}, ComponentIDRegistry, {[name]: id});
}

export function getEditService() {
	if(!editService){
		editService = new WchInlineEdit();
	}

	return editService;
}

export function layoutHOC(component) {
	return withLayout(component);
}