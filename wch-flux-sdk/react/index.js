/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
export {WchPage} from './wchPage';
export {WchContent} from './wchContent';

export let ComponentRegistry = {};
export function registerComponent(name, func) {
	ComponentRegistry = Object.assign({}, ComponentRegistry, {[name]: func});
}