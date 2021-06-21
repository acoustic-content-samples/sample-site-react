/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React, { Component } from 'react';
import NavLink from '../navLink';
import {
	loadSite,
	subscribe,
	getSite,
} from '@acoustic-content-sdk/wch-flux-sdk';

import 'styles/components/siteHeader/headerNav.scss';

export class HeaderNav extends Component {
	constructor (props) {
		super(props);

		this.state = { site: getSite() };

		this.sub = subscribe('site', () => {
			this.setState({ site: getSite() });
		});

		loadSite();
	}

	componentDidMount () {
		$('#site-header').foundation();
		$('#header-nav-menu').foundation();
	}

	componentWillUnmount () {
		this.sub.unsubscribe();
	}

	componentWillUpdate () {}

	componentDidUpdate () {}

	render () {
		let topLevelPages = [];

		const hasChildren = page => {
			return page.children.length > 0;
		};

		function childPages (page) {
			if (page.children.length > 0) {
				let childPages = page.children.map(child => (
					<li
						key={child.id}
						className="wch-menu-item"
						role="menuitem">
						<NavLink to={child.route}>{child.name}</NavLink>
					</li>
				));

				return (
					<ul className="wch-menu wch-sub-menu" role="menu">
						{childPages}
					</ul>
				);
			}
			return '';
		}

		if (this.state.site.pages) {
			topLevelPages = this.state.site.pages.map(function (page) {
				if (!page.hideFromNavigation) {
					return (
						<li
							key={page.id}
							className={
								'wch-menu-item ' +
								(hasChildren(page) ? 'has-children' : '')
							}
							role="menuitem">
							<NavLink to={page.route}>{page.name}</NavLink>
							{childPages(page)}
						</li>
					);
				}
			});
		}

		return (
			<div className="menu-container">
				<ul className="wch-menu" role="menubar">
					{topLevelPages}
				</ul>
			</div>
		);
	}
}
