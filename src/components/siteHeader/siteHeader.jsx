/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React, { Component } from 'react';
import {withRouter, Redirect, Route} from 'react-router-dom';

import {loadContent, subscribe, getContent, getImageUrl, setNavChangeFunction, setPageReloadFunction} from 'wch-flux-sdk';

import 'styles/components/siteHeader/siteHeader.scss';
import {HeaderNav} from './headerNav';

export class SiteHeader extends Component {
	constructor (props) {
		super(props);

		this.state = {
			contentData: {},
			headerConfigId: '90d184ea-eb9c-4316-97a8-9d1ebc3029fc'
		};

		this.sub = subscribe('content', () => {
			let content = getContent(this.state.headerConfigId);
			if (content) {
				this.setState({contentData: content});
			}
		});

		setNavChangeFunction(path => {
			if(path){
            	this.props.history.push(path);
            }
            // return (<Redirect to={path} push />)
		});
	}

    componentWillMount () {
		let content = getContent(this.state.headerConfigId);
		if (content) {
			this.setState({contentData: content});
		} else {
			loadContent(this.state.headerConfigId);
		}
    }

	componentWillUnmount () {
		this.sub.unsubscribe();
	}


	render () {
		let url = '';
		if (this.state.contentData && this.state.contentData.elements) {
			url = getImageUrl(this.state.contentData.elements.websiteLogo);
		}

		let logoStyle = {
			backgroundImage: `url('${url}')`
		};

        // const { match, location, history } = this.props;


		return (
	<header id="site-header">
		<nav>
			<div className="title-bar" data-responsive-toggle="example-menu" data-hide-for="large">
				<button className="menu-icon" type="button" data-toggle="example-menu"></button>
				<div className="logo-container hide-for-large">
					<a href="#">
						<h1 className="logo" style={logoStyle}></h1>
					</a>
				</div>
			</div>
			<div className="top-bar" id="example-menu">
				<div className="top-bar-left show-for-large">
					<div className="logo-container show-for-large">
						<a href="#">
							<h1 className="logo" style={logoStyle}></h1>
						</a>
					</div>
				</div>
				<div className="top-bar-right">
					<HeaderNav></HeaderNav>
				</div>
			</div>
		</nav>
	</header>
		);
	}
}

// export default withRouter(SiteHeader);