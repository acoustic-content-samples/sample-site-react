/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React, { Component } from 'react';
import {loadContent, getContent, subscribe} from '../';
import {ComponentRegistry, ComponentRegistryByLayout} from './'
import { withLayout } from './wchLayout';

export class WchContent extends Component {
	constructor (props) {
		super(props);

		this.state = {};

		this.sub = subscribe('content', (action, content) => {
			if(content && content.id === this.props.contentId) {
				this.setLayout(content, this.props.contentId)
			}
		});
	}

	setLayout (content, id) {
		//let content = getContent(this.props.contentId);
		if (content) {
			//let name = (content.selectedLayouts) ? content.selectedLayouts[0].layout.id.replace('-layout','') : content.type.toLowerCase().replace(' ', '-');
			let layout = '';
			if(content.selectedLayouts) {
				layout = content.selectedLayouts[0].layout.id;
			} else {
				layout = content.layouts.default.template;
			}

			let component = ComponentRegistryByLayout[layout];
			if(!component){
				let name = (content.selectedLayouts) ? content.selectedLayouts[0].layout.id.replace('-layout','') : content.type.toLowerCase().replace(' ', '-');
				name = name.split('-').map(s => s.substring(0,1).toUpperCase()+s.substring(1)).reduce((s, v) => s + v, '');

				if (name) {
					component = ComponentRegistry[name];
				}
			}

			if(component) {
				this.setState({Component: component, renderingContext: content});
			}

		} else {
			loadContent(id);
		}
	}

	componentWillReceiveProps(nextProp) {
		this.setLayout(getContent(nextProp.contentId), nextProp.contentId);
	}


	componentWillMount () {
		this.setLayout(getContent(this.props.contentId), this.props.contentId);
	}


	componentWillUnmount () {
		this.sub.unsubscribe();
	}

	render () {
		if (this.state.Component) {
			return (<this.state.Component renderingContext={this.state.renderingContext} {...this.props}/>);
		}

		return (<div></div>);
	}
}