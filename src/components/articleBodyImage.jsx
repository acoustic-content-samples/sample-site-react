/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {
	getImageUrl,
	getFirstCategory,
} from '@acoustic-content-sdk/wch-flux-sdk';
import 'styles/components/articleBodyImage.scss';

export class ArticleBodyImage extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		let imageSize = '';
		let imageUrl = '';
		let altText = '';
		let imagePlacement = '';
		let caption = '';
		let credit = '';
		let className = [];

		if (this.props.renderingContext) {
			if (this.props.renderingContext.elements.image.renditions) {
				imageSize = getFirstCategory(
					this.props.renderingContext.elements.imageSize
				);
				altText = this.props.renderingContext.elements.image.altText;
			}
			imageUrl = getImageUrl(
				this.props.renderingContext.elements.image,
				imageSize
			);
			imagePlacement = getFirstCategory(
				this.props.renderingContext.elements.imagePlacement
			);
			caption = this.props.renderingContext.elements.imageCaption.value;
			credit = this.props.renderingContext.elements.imageCredit.value;
			if (imagePlacement) {
				className.push(`wrap-text-${imagePlacement}`);
			}
			if (imageSize) {
				className.push(`article-${imageSize.toLowerCase()}-image`);
			}

			return (
				<div
					id={this.props.renderingContext.id}
					data-renderingcontext-id={this.props.renderingContext.id}
					className={className.join(' ')}>
					<img
						data-wch-inline-edit="elements.image"
						src={imageUrl}
						alt={altText}
						title={altText}
					/>
					<div
						className="caption"
						data-wch-inline-edit="elements.imageCaption.value">
						{caption}
						<span data-wch-inline-edit="elements.imageCredit.value">
							{credit}
						</span>
					</div>
				</div>
			);
		} else {
			return <div />;
		}
	}
}
