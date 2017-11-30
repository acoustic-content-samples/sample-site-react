/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React, { Component } from 'react';
import NavLink from "../navLink";
import {loadSite, subscribe, getSite} from 'wch-flux-sdk';

import 'styles/components/siteHeader/headerNav.scss';

export class HeaderNav extends Component {
	constructor (props) {
		super(props);

		this.state = { site: {pages: []}};

		this.sub = subscribe('site', () => {
			this.setState({site: getSite()});
		});

		loadSite();
	}

	componentDidMount () {
		$('#site-header').foundation();
	}

	componentWillUnmount () {
		this.sub.unsubscribe();
	}

	componentWillUpdate () {
		$('#header-nav-menu').foundation('_destroy');
	}

	componentDidUpdate () {
		$('#header-nav-menu').foundation();
	}

	render () {
		let topLevelPages = [];

		function childPages (page) {
			if (page.children.length > 0 ) {
				let childPages = page.children.map(child => (
					<li key={child.id}>
						<NavLink to={child.route}>{child.name}</NavLink>
					</li>
				));

				return (
					<ul className="vertical menu">
						{childPages}
					</ul>
				);
			}
			return '';
		}

		topLevelPages = this.state.site.pages.map(page => (
			<li key={page.id} className="top-level-nav-item">
				<NavLink to={page.route}>{page.name}</NavLink>
				{childPages(page)}
			</li>
		));

		return (
			<ul id="header-nav-menu" className="vertical medium-horizontal menu" data-responsive-menu="accordion medium-dropdown">
				{topLevelPages}
			</ul>
		);
	}
}