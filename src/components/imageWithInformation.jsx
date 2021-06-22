/*
 Copyright IBM Corporation 2017.
 LICENSE: Apache License, Version 2.0
 */
import React from 'react';
import {
	getImageUrl,
	getFirstCategory,
} from '@acoustic-content-sdk/wch-flux-sdk';
import 'styles/components/imageWithInformation.scss';

export class ImageWithInformation extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		let imageUrl = '';
		let altText = '';
		let contentId = '';
		let imageRendition = 'lead';

		if (this.props.summary) {
			imageRendition = 'card';
		}

		if (this.props.renderingContext) {
			contentId = this.props.renderingContext.id;
			imageUrl = getImageUrl(
				this.props.renderingContext.elements.image,
				imageRendition
			);
			altText = this.props.renderingContext.elements.image.altText;
			let imageSizeStr = getFirstCategory(
				this.props.renderingContext.elements.imageSize,
				'medium'
			);
			let imagePlacementStr = getFirstCategory(
				this.props.renderingContext.elements.imagePlacement,
				'left'
			);
			let imageCaption = this.props.renderingContext.elements.imageCaption
				.value;
			let imageCredit = this.props.renderingContext.elements.imageCredit
				.value;

			let classStr = `article-${imageSizeStr}-image place-image-${imagePlacementStr}`;

			return (
				<div
					id={contentId}
					data-renderingcontext-id={contentId}
					className={classStr}>
					<img
						data-wch-inline-edit="elements.image"
						src={imageUrl}
						alt={altText}
						title={altText}
					/>
					<div
						data-wch-inline-edit="elements.imageCaption.value"
						className="caption">
						{imageCaption}
						<span data-wch-inline-edit="elements.imageCredit.value">
							{imageCredit}
						</span>
					</div>
				</div>
			);
		} else {
			return <div />;
		}
	}
}
