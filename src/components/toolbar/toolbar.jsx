/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React, { Component } from 'react';
import { Router } from 'react-router-dom';
import { WchStore } from '@acoustic-content-sdk/wch-flux-sdk';

export class Toolbar extends Component {
	constructor (props) {
		super(props);
		this.onClickHandler = this.onClickHandler.bind(this);
		this.refreshApp = this.refreshApp.bind(this);
	}

	onClickHandler () {
		console.log('On click');
		console.log(`WchStore:`, WchStore);
	}

	refreshApp () {
		window.location.reload();
		// this.props.history.push('/cool')
		// window.location.href = window.location.origin;
		// setTimeout(() => {console.info(`after timeout`);this.props.history.push('/cool')}, 2000);
		// Router.dispatch(Router.location.getCurrentPath(), null);
	}

	render () {
		return (
			<div>
				<div>
					<button onClick={this.onClickHandler} type="button">
						Update Content
					</button>
				</div>
				<div>
					<button onClick={this.refreshApp} type="button">
						Refresh App
					</button>
				</div>
			</div>
		);
	}
}
