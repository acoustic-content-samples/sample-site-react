/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import 'styles/components/designArticleSummary.scss';
import { getImageUrl } from '@acoustic-content-sdk/wch-flux-sdk';

export class DesignArticleSummary extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		let leadImageGroup = '';
		let heading = '';
		let contentId = '';

		if (
			this.props.renderingContext &&
			this.props.renderingContext.elements
		) {
			leadImageGroup = this.props.renderingContext.elements.mainImage
				.value
				? this.props.renderingContext.elements.mainImage.value
				: '';
			heading = this.props.renderingContext.elements.heading.value;
			contentId = this.props.renderingContext.id;

			let leadImage = () => {
				const lead_image = leadImageGroup.leadImage;
				const lead_imageRendition = 'card';
				const lead_imageUrl = getImageUrl(
					lead_image,
					lead_imageRendition
				);
				const lead_altText = lead_image ? lead_image.altText : '';

				return (
					<div className="article-lead-image">
						<div className="image-container">
							<img
								data-wch-inline-edit="elements.mainImage.value.leadImage"
								src={lead_imageUrl}
								alt={lead_altText}
								title={lead_altText}
							/>
						</div>
					</div>
				);
			};
			return (
				<div
					data-renderingcontext-id={this.props.renderingContext.id}
					id={contentId}
					className="summary-card">
					<div className="summary-card-image">
						{leadImageGroup !== undefined ? leadImage() : ''}
					</div>
					<p data-wch-inline-edit="elements.heading.value">
						{heading}
					</p>
				</div>
			);
		} else {
			return <div />;
		}
	}
}
