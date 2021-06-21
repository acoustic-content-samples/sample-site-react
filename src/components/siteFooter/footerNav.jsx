/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import { Link } from 'react-router-dom';
import {
	loadSite,
	subscribe,
	getSite,
} from '@acoustic-content-sdk/wch-flux-sdk';
import 'styles/components/siteFooter/footerNav.scss';

export class FooterNav extends React.Component {
	constructor (props) {
		super(props);
		this.state = { site: { pages: [] } };
	}

	componentWillMount () {
		this.setState({ site: getSite() });
		this.sub = subscribe('site', () => {
			this.setState({ site: getSite() });
		});
		loadSite();
	}

	componentWillUnmount () {
		this.sub.unsubscribe();
	}

	render () {
		let pageLinks = [];

		if (this.state.site.pages) {
			pageLinks = this.state.site.pages.map(function (page) {
				if (!page.hideFromNavigation) {
					return (
						<li key={page.id} className="top-level-nav-item">
							<Link to={page.route}>{page.name}</Link>
						</li>
					);
				}
			});
		}

		return (
			<div>
				<h5>Menu </h5>
				<ul>{pageLinks}</ul>
			</div>
		);
	}
}
