/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {changeNavEvent, loadContent, getContent, getRoute, subscribe, getPage} from '../'
import {ComponentRegistry, ComponentIDRegistry} from './';
import { SiteHeader } from '../../src/components/siteHeader/siteHeader';
import { SiteFooter } from '../../src/components/siteFooter/siteFooter';
import {WchContent} from "./wchContent";

export class WchPage extends React.Component {
	constructor (props) {
		super(props);
		
		this.state = {
			route: {contentId: '', layoutId: ''},
			page: {kind: []}
		};

		this.siteLoaded = false;

		this.sub = subscribe('routes', () => {
			this.siteLoaded = true;
			this._setStateForRoute(getRoute(props.history.location.pathname));
		});
	}

	componentWillUnmount () {
		this.sub.unsubscribe();
	}

	_setStateForRoute(route) {
		if(this.siteLoaded) {
			if (route) {
				let name = route.layoutId.replace('-layout', '').split('-').map(s => s.substring(0, 1).toUpperCase() + s.substring(1)).reduce((s, v) => s + v, '');
				if (name) {
					if (ComponentRegistry[name]) {
						this.setState({
							status: '200',
							contentId: route.contentId,
							Component: <WchContent contentId={route.contentId}/>,
                        	page: getPage(route.contentId) ? getPage(route.contentId): {}
						});
					} else {
						this._setErrorPage();
					}
				}
			} else {
				this._setErrorPage();

			}
		}
	}

	_setErrorPage () {
		this.setState({
			status: '404',
			contentId: ComponentIDRegistry['ErrorPage'],
			Component: <WchContent status={404} contentId={ComponentIDRegistry['ErrorPage']}/>
		});

	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.location.pathname !== this.props.location.pathname) {
			let route = getRoute(nextProps.location.pathname);
			if(route) {
				changeNavEvent(route.contentId);
			}
			this._setStateForRoute(route);
		}
	}



	render () {
		if (this.state.Component) {
			let hideHeaderFooter = !this.siteLoaded || (this.state.page.kind && this.state.page.kind.includes('landing-page')) ;
			return (
				<div>
					{ hideHeaderFooter ? '': (<SiteHeader {...this.props} />) }
					{ this.state.Component }
					{ hideHeaderFooter ? '': (<SiteFooter />) }
				</div>
			);
		}

		return (<div></div>);
	}
}