/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import { getImageUrl } from '@acoustic-content-sdk/wch-flux-sdk';
import 'styles/components/leadImageWithInformation.scss';

export class LeadImageWithInformation extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		let imageUrl = '';
		let altText = '';
		let contentId = '';
		let imageRendition = 'lead';
		let leadImageCaption = '';
		let leadImageCredit = '';
		let caption = '';

		if (this.props.summary) {
			imageRendition = 'card';
		}

		if (this.props.renderingContext) {
			contentId = this.props.renderingContext.id;
			imageUrl = getImageUrl(
				this.props.renderingContext.elements.leadImage,
				imageRendition
			);
			altText = this.props.renderingContext.elements.leadImage.altText;
			leadImageCaption = this.props.renderingContext.elements
				.leadImageCaption.value;
			leadImageCredit = this.props.renderingContext.elements
				.leadImageCredit.value;

			if (!this.props.summary) {
				caption = (
					<div
						className="caption"
						data-wch-inline-edit="elements.leadImageCaption.value">
						{leadImageCaption}
						<span data-wch-inline-edit="elements.leadImageCredit.value">
							{leadImageCredit}
						</span>
					</div>
				);
			}

			return (
				<div
					id={contentId}
					data-renderingcontext-id={contentId}
					className="article-lead-image">
					<div className="image-container">
						<img
							data-wch-inline-edit="elements.leadImage"
							src={imageUrl}
							alt={altText}
							title={altText}
						/>
					</div>
					{caption}
				</div>
			);
		} else {
			return <div />;
		}
	}
}
