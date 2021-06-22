/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import { layoutHOC } from '@acoustic-content-sdk/wch-flux-sdk/react';
import 'styles/layouts/designArticle.scss';
import { ShareSocial } from '../components/shareSocial';
import { DesignArticleSummary } from '../components';
import { WchContent } from '@acoustic-content-sdk/wch-flux-sdk/react/wchContent';
import {
	getImageUrl,
	getFirstCategory,
} from '@acoustic-content-sdk/wch-flux-sdk';

export class DesignArticle extends React.Component {
	render () {
		let heading = '';
		let leadImageGroup = '';
		let author = '';
		let authorBioId = '';
		let date = '';
		let body = [];
		let bodyImages = [];
		const DesignArticleSummaryWithLayout = layoutHOC(DesignArticleSummary);

		if (this.props.renderingContext) {
			heading = this.props.renderingContext.elements.heading.value;
			leadImageGroup = this.props.renderingContext.elements.mainImage
				.value
				? this.props.renderingContext.elements.mainImage.value
				: '';
			author = this.props.renderingContext.elements.author.value;
			authorBioId = this.props.renderingContext.elements.authorBio.value
				? this.props.renderingContext.elements.authorBio.value.id
				: '';
			date = new Date(
				this.props.renderingContext.elements.date.value
			).toDateString();
			body = this.props.renderingContext.elements.body.values
				? this.props.renderingContext.elements.body.values
				: [];
			bodyImages = this.props.renderingContext.elements.bodyImage.values
				? this.props.renderingContext.elements.bodyImage.values
				: [];

			function itemHTML (item) {
				return { __html: item };
			}

			let LeadImageCaptionAndCredit = () => {
				const leadImageCaption = leadImageGroup.leadImageCaption.value;
				const leadImageCredit = leadImageGroup.leadImageCredit.value;
				return (
					<div className="caption">
						<span data-wch-inline-edit="elements.mainImage.value.leadImageCaption.value">
							{' '}
							{leadImageCaption}
						</span>
						<span data-wch-inline-edit="elements.mainImage.value.leadImageCredit.value">
							{' '}
							{leadImageCredit}
						</span>
					</div>
				);
			};

			let leadImage = () => {
				const lead_image = leadImageGroup.leadImage;
				const lead_imageRendition = 'lead';
				const lead_imageUrl = getImageUrl(
					lead_image,
					lead_imageRendition
				);
				const lead_altText = lead_image.altText;
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
						{LeadImageCaptionAndCredit()}
					</div>
				);
			};

			let getBodyImageElement = index => {
				const image_editAccessor = `elements.bodyImage.values[${index}].image`;
				const caption_editAccessor = `elements.bodyImage.values[${index}].imageCaption`;
				const credit_editAccessor = `elements.bodyImage.values[${index}].imageCredit`;

				const body_image = bodyImages[index];
				const body_imageSizeStr = getFirstCategory(
					body_image.imageSize,
					'medium'
				);
				const body_imagePlacementStr = getFirstCategory(
					body_image.imagePlacement,
					'left'
				);
				const body_imageUrl = getImageUrl(
					body_image.image,
					body_imageSizeStr
				);
				const body_altText = body_image.image.altText;
				const body_imageCaption = body_image.imageCaption.value;
				const body_imageCredit = body_image.imageCredit.value;
				const body_classStr = `article-${body_imageSizeStr}-image place-image-${body_imagePlacementStr}`;
				return (
					<div key={index} className="article-medium-image">
						<div className={body_classStr}>
							<img
								data-wch-inline-edit={image_editAccessor}
								src={body_imageUrl}
								alt={body_altText}
								title={body_altText}
							/>
							<div className="caption">
								<span
									data-wch-inline-edit={caption_editAccessor}>
									{body_imageCaption}
								</span>
								<span
									data-wch-inline-edit={credit_editAccessor}>
									{body_imageCredit}
								</span>
							</div>
						</div>
					</div>
				);
			};

			// body text and body images
			let articleBody = body.map((item, index) => {
				const bodyEditAccessor = `elements.body.values[${index}]`;
				return (
					<div key={index} className="article-body">
						<div
							data-wch-inline-edit={bodyEditAccessor}
							dangerouslySetInnerHTML={itemHTML(item)}
						/>
						{index < bodyImages.length
							? getBodyImageElement(index)
							: ''}
					</div>
				);
			});

			// Leftover body images
			let articleBodyImage = bodyImages
				.splice(body.length)
				.map((image, index) => {
					return getBodyImageElement(index);
				});

			if (this.props.summary) {
				return (
					<DesignArticleSummaryWithLayout
						renderingContext={this.props.renderingContext}
						contentId={this.props.renderingContext.id}
					/>
				);
			} else {
				return (
					<div
						data-renderingcontext-id={
							this.props.renderingContext.id
						}>
						{leadImageGroup !== undefined ? leadImage() : ''}
						<h2
							className="headline"
							data-wch-inline-edit="elements.heading.value">
							{heading}
						</h2>
						<div className="article-details">
							<div className="byline-and-date">
								By{' '}
								<b
									className="author"
									data-wch-inline-edit="elements.author.value">
									{author}
								</b>
								,{' '}
								<span data-wch-inline-edit="elements.date.value">
									{date}
								</span>
							</div>
							{heading && author ? (
								<ShareSocial
									shareMsg={heading}
									author={author}
								/>
							) : (
								''
							)}
						</div>
						{body.length > 0 ? articleBody : ''}
						{articleBodyImage}
						{authorBioId ? (
							<WchContent contentId={authorBioId} />
						) : (
							''
						)}
					</div>
				);
			}
		} else {
			return <div />;
		}
	}
}
