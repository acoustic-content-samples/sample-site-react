/*
 Copyright IBM Corporation 2017.
 LICENSE: Apache License, Version 2.0
 */
import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '@acoustic-content-sdk/wch-flux-sdk';
import { WchLayout } from '@acoustic-content-sdk/wch-flux-sdk/react';
import 'styles/layouts/heroImage.scss';
import { of } from 'rxjs/add/observable/of';

export class HeroImage extends React.Component {
	render () {
		let headline = '';
		let altText = '';
		let url = '';
		let linkText = '';
		let linkUrl = '';
		let contentId = '';
		let imageRendition = 'short';
		let status = '';

		if (this.props.renderingContext) {
			contentId = this.props.renderingContext.id;
			status = this.props.renderingContext.status;
			if (this.props.renderingContext.elements.image.renditions) {
				url = getImageUrl(
					this.props.renderingContext.elements.image,
					imageRendition,
					status
				);
			}
			headline = this.props.renderingContext.elements.text.value
				? this.props.renderingContext.elements.text.value
				: '';
			altText = this.props.renderingContext.elements.image.altText
				? this.props.renderingContext.elements.image.altText
				: '';
			linkText = this.props.renderingContext.elements.link.linkText
				? this.props.renderingContext.elements.link.linkText
				: '';
			linkUrl = this.props.renderingContext.elements.link.linkURL
				? this.props.renderingContext.elements.link.linkURL
				: '#';
		}

		return (
			<div
				id={contentId}
				data-renderingcontext-id={contentId}
				className="wch-hero-image">
				<img
					src={url}
					data-wch-inline-edit="elements.image"
					title={altText}
					alt={altText}
				/>
				<div className="hero-message">
					<h1
						data-wch-inline-edit="elements.text.value"
						className="text-hero">
						{headline}
					</h1>
					<Link
						data-wch-inline-edit="elements.link"
						title={linkText}
						to={linkUrl}
						className="button hero-button">
						{linkText}
					</Link>
				</div>
			</div>
		);
	}
}
