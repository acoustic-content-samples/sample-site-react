/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';

import {
	loadContent,
	subscribe,
	getContent,
	getImageUrl,
} from '@acoustic-content-sdk/wch-flux-sdk';
import 'styles/components/siteFooter/siteFooter.scss';
import { FooterNav } from './footerNav';
import { FbLogo } from '../../images/fbLogo';
import { TwitterLogo } from '../../images/twitterLogo';
import { InstagramLogo } from '../../images/instagramLogo';

export class SiteFooter extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			contentData: {},
			footerConfigId: 'ae72d304-ad18-4bf3-b213-4a79c829e458',
		};

		this.sub = subscribe('content', () => {
			let content = getContent(this.state.footerConfigId);
			if (content) {
				this.setState({ contentData: content });
			}
		});
	}

	componentWillMount () {
		let content = getContent(this.state.footerConfigId);
		if (content) {
			this.setState({ contentData: content });
		} else {
			loadContent(this.state.footerConfigId);
		}
	}

	componentWillReceiveProps (nextProps) {
		let content = getContent(nextProps.contentId);
		if (content) {
			this.setState({ contentData: content });
		} else {
			loadContent(nextProps.contentId);
		}
	}

	componentWillUnmount () {
		this.sub.unsubscribe();
	}

	render () {
		let url = '';
		let salesLabel = '';
		let salesNumber = '';
		let custServiceLabel = '';
		let custServiceNumber = '';
		let emailAddress = '';
		let copyrightYear = 2017;
		let copyrightText = '';
		let fbLink = 'https://www.fb.com';
		if (this.state.contentData && this.state.contentData.elements) {
			url = getImageUrl(this.state.contentData.elements.Logo);
			salesLabel = this.state.contentData.elements.labelForSales.value;
			salesNumber = this.state.contentData.elements.salesNumber.value;
			custServiceLabel = this.state.contentData.elements
				.labelForCustomerService.value;
			custServiceNumber = this.state.contentData.elements
				.customerServiceContactNumber.value;
			emailAddress = this.state.contentData.elements.emailAddress.value;
			copyrightText = this.state.contentData.elements.copyright.value;
		}

		let logoStyle = {
			backgroundImage: `url('${url}')`,
		};

		return (
			<footer>
				<div className="wch-footer">
					<div className="grid-container">
						<div className="grid-x grid-padding-x">
							<div className="medium-3 cell footer-logo">
								<div className="logo-container">
									<div className="logo" style={logoStyle} />
								</div>
							</div>
							<div className="medium-3 cell footer-nav">
								<FooterNav />
							</div>
							<div className="medium-3 cell follow-us">
								<h5>Follow us</h5>
								<ul>
									<li>
										<a href="https://www.facebook.com">
											<FbLogo />
											<span className="show-for-medium">
												Facebook
											</span>
										</a>
									</li>
									<li>
										<a href="https://twitter.com">
											<TwitterLogo />
											<span className="show-for-medium">
												Twitter
											</span>
										</a>
									</li>
									<li>
										<a href="https://www.instagram.com">
											<InstagramLogo />
											<span className="show-for-medium">
												Instagram
											</span>
										</a>
									</li>
								</ul>
							</div>

							<div className="medium-3 cell contact-us">
								<h5>Contact us</h5>
								<ul>
									<li>
										<span>{salesLabel}</span>{' '}
										<a href={`tel:${salesNumber}`}>
											{salesNumber}{' '}
										</a>
									</li>

									<li>
										<span>{custServiceLabel}</span>{' '}
										<a href={`tel:${custServiceNumber}`}>
											{custServiceNumber}
										</a>
									</li>

									<li>
										<span>email</span>{' '}
										<a href={`mailto:${emailAddress}`}>
											{emailAddress}
										</a>
									</li>
								</ul>
							</div>
						</div>

						<div className="grid-x legal">
							<div className="copyright">
								&copy; <span>{copyrightYear}</span>{' '}
								{copyrightText}
							</div>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}
