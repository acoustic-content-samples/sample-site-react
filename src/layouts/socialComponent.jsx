/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import { getImageUrl } from '@acoustic-content-sdk/wch-flux-sdk';
import 'styles/layouts/socialComponent.scss';

export class SocialComponent extends React.Component {
	render () {
		let contentId = '';
		let title = '';
		let facebookUrl = '';
		let fbImage = '';
		let twitterUrl = '';
		let twitterImage = '';
		let instagramUrl = '';
		let instagramImage = '';

		if (this.props.renderingContext.elements) {
			let elements = this.props.renderingContext.elements;
			contentId = this.props.renderingContext.id;
			title = elements.title.value ? elements.title.value : '';
			facebookUrl = elements.facebook.linkURL
				? elements.facebook.linkURL
				: '#';
			fbImage = elements.fbImage;
			twitterUrl = elements.twitter.linkURL
				? elements.twitter.linkURL
				: '#';
			twitterImage = elements.twitterImage;
			instagramUrl = elements.instagram.linkURL
				? elements.instagram.linkURL
				: '#';
			instagramImage = elements.instagramImage;
		}

		return (
			<div
				id={contentId}
				data-renderingcontext-id={contentId}
				className="social-component grid-x">
				<div className="section cell">
					{title ? (
						<h2 data-wch-inline-edit="elements.title.value">
							{title}
						</h2>
					) : (
						''
					)}
				</div>
				<div className="icons-group grid-x section cell">
					<a
						className="small-12 medium-4 columns"
						data-wch-inline-edit="elements.facebook"
						href={facebookUrl}>
						{fbImage.altText}
						{fbImage ? (
							<img
								className="social-icon"
								data-wch-inline-edit="elements.fbImage"
								src={getImageUrl(fbImage)}
								alt={fbImage.altText}
								title={fbImage.altText}
							/>
						) : (
							''
						)}
					</a>
					<a
						className="small-12 medium-4 columns"
						data-wch-inline-edit="elements.twitter"
						href={twitterUrl}>
						{twitterImage.altText}
						{twitterImage ? (
							<img
								className="social-icon"
								data-wch-inline-edit="elements.twitterImage"
								src={getImageUrl(twitterImage)}
								alt={twitterImage.altText}
								title={twitterImage.altText}
							/>
						) : (
							''
						)}
					</a>
					<a
						className="small-12 medium-4 columns"
						data-wch-inline-edit="elements.instagram"
						href={instagramUrl}>
						{instagramImage.altText}
						{instagramImage ? (
							<img
								className="social-icon"
								data-wch-inline-edit="elements.instagramImage"
								src={getImageUrl(instagramImage)}
								alt={instagramImage.altText}
								title={instagramImage.altText}
							/>
						) : (
							''
						)}
					</a>
				</div>
			</div>
		);
	}
}
