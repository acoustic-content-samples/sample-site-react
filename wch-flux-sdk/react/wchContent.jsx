/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React, { Component } from 'react';
import {loadContent, getContent, subscribe} from '../';
import {ComponentRegistry} from './'

export class WchContent extends Component {
	constructor (props) {
		super(props);

		this.state = {};

		this.sub = subscribe('content', (action, content) => this.setLayout());
	}

	setLayout () {
		let content = getContent(this.props.contentId);
		if (content) {
			let name = (content.selectedLayouts) ? content.selectedLayouts[0].layout.id.replace('-layout','') : content.type.toLowerCase().replace(' ', '-');
			name = name.split('-').map(s => s.substring(0,1).toUpperCase()+s.substring(1)).reduce((s, v) => s + v, '');
		
			if (name) {
				if (ComponentRegistry[name]) {
                    ComponentRegistry[name]().then(component => {
                        this.setState({Component: component[name]});
                    });
                }
			}
		}
	}

	componentWillMount () {
		let content = getContent(this.props.contentId);
		if (content) {
			this.setLayout();
		} else {
			loadContent(this.props.contentId);
		}
	}

	componentWillUnmount () {
		this.sub.unsubscribe();
	}

	render () {
		if (this.state.Component) {
			return (<this.state.Component {...this.props}/>);
		}

		return (<div></div>);
	}
}