/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl } from '@acoustic-content-sdk/wch-flux-sdk';
import 'styles/layouts/feature.scss';

export class Feature extends React.Component {
	render () {
		let headline = '';
		let description = '';
		let readMore = { linkURL: '', linkText: '' };
		let imageURL = '';
		let imageSize = 'medium';
		let imagePlacement = 'right';
		let altText = '';
		let hasImage = false;
		let contentId = '';
		let status = '';

		if (this.props.renderingContext.elements) {
			status = this.props.renderingContext.status;
			contentId = this.props.renderingContext.id;
			headline = this.props.renderingContext.elements.featureHeadline
				.value;
			description = this.props.renderingContext.elements
				.descriptionOfFeature.value;
			if (
				this.props.renderingContext.elements.image.hasOwnProperty(
					'renditions'
				)
			) {
				hasImage = true;
				if (this.props.renderingContext.elements.imageSize.categories) {
					this.props.renderingContext.elements.imageSize.categories.forEach(
						cat => {
							let category = cat.split('/');
							if (category[1] === 'Size') {
								imageSize = category[2].toLowerCase();
							} else if (category[1] === 'Placement') {
								imagePlacement = category[2].toLowerCase();
							}
						}
					);

					// let category = this.props.renderingContext.elements.imageSize.categories.
					// imageSize = getFirstCategory(this.props.renderingContext.elements.imageSize);
				}
				imageURL = getImageUrl(
					this.props.renderingContext.elements.image,
					imageSize,
					status
				);
				altText = this.props.renderingContext.elements.image.altText;
				// imagePlacement = getFirstCategory(this.props.renderingContext.elements.imagePlacement);
				readMore = this.props.renderingContext.elements.readMoreLink;
			}
		}

		function createDescription () {
			return { __html: description };
		}

		function classNames () {
			let css = ['feature', 'section'];

			if (imagePlacement) {
				css.push(`feature-img-${imagePlacement}`);
			}
			if (imageSize) {
				css.push(`feature-${imageSize}`);
			}

			return css;
		}

		if (hasImage) {
			return (
				<div
					data-renderingcontext-id={contentId}
					id={contentId}
					className={classNames().join(' ')}>
					<div className="feature-copy">
						<div className="feature-copy-content">
							<h2 data-wch-inline-edit="elements.featureHeadline.value">
								{headline}
							</h2>
							<div
								data-wch-inline-edit="elements.descriptionOfFeature.value"
								className="text-content"
								dangerouslySetInnerHTML={createDescription()}
							/>
							{readMore.linkURL ? (
								/^https?:\/\//.test(readMore.linkURL) ? (
									<a
										data-wch-inline-edit="elements.readMoreLink"
										href={readMore.linkURL}
										target="_blank">
										<button className="button">
											{readMore.linkText}
										</button>
									</a>
								) : (
									<Link
										data-wch-inline-edit="elements.readMoreLink"
										to={readMore.linkURL}>
										<button className="button">
											{readMore.linkText}
										</button>
									</Link>
								)
							) : (
								''
							)}
						</div>
					</div>
					<div className="feature-img">
						<img
							data-wch-inline-edit="elements.image"
							src={imageURL}
							alt={altText}
							title={altText}
						/>
					</div>
				</div>
			);
		} else {
			return (
				<div
					data-renderingcontext-id={contentId}
					id={contentId}
					className="feature section">
					<div className="feature-no-image-copy grid-x grid-padding-x">
						<div className="feature-no-image-copy-content medium-8 cell">
							<h5 data-wch-inline-edit="elements.featureHeadline.value">
								{headline}
							</h5>
							<div
								data-wch-inline-edit="elements.descriptionOfFeature.value"
								className="text-content"
								dangerouslySetInnerHTML={createDescription()}
							/>
						</div>
					</div>
				</div>
			);
		}
	}
}
