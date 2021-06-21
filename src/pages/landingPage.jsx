/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import { getImageUrl } from '@acoustic-content-sdk/wch-flux-sdk';
import { WchContent } from '@acoustic-content-sdk/wch-flux-sdk/react';
import 'styles/pages/landingPage.scss';

export class LandingPage extends React.Component {
	render () {
		let featureHeadline1 = '';
		let featureHeadline2 = '';
		let featureHeadline3 = '';
		let heroHeadline = '';
		let feature1 = '';
		let feature2 = '';
		let feature3 = '';
		let heroImage = '';
		let featureImage1 = '';
		let featureImage2 = '';
		let featureImage3 = '';
		let entryComponentId = '';
		let shareComponentId = '';
		let contestRulesId = '';
		let itemHTML = item => {
			return { __html: item };
		};

		if (this.props.renderingContext) {
			// text
			featureHeadline1 = this.props.renderingContext.elements
				.featureHeadline1
				? this.props.renderingContext.elements.featureHeadline1.value
				: null;
			featureHeadline2 = this.props.renderingContext.elements
				.featureHeadline2
				? this.props.renderingContext.elements.featureHeadline2.value
				: null;
			featureHeadline3 = this.props.renderingContext.elements
				.featureHeadline3
				? this.props.renderingContext.elements.featureHeadline3.value
				: null;

			// formatted text
			heroHeadline = this.props.renderingContext.elements.heroHeadline
				? this.props.renderingContext.elements.heroHeadline.value
				: null;
			feature1 = this.props.renderingContext.elements.feature1
				? this.props.renderingContext.elements.feature1.value
				: null;
			feature2 = this.props.renderingContext.elements.feature2
				? this.props.renderingContext.elements.feature2.value
				: null;
			feature3 = this.props.renderingContext.elements.feature3
				? this.props.renderingContext.elements.feature3.value
				: null;

			// images
			heroImage = this.props.renderingContext.elements.heroImage;
			featureImage1 = this.props.renderingContext.elements.featureImage1;
			featureImage2 = this.props.renderingContext.elements.featureImage2;
			featureImage3 = this.props.renderingContext.elements.featureImage3;

			// references
			entryComponentId = this.props.renderingContext.elements
				.entryComponent.value
				? this.props.renderingContext.elements.entryComponent.value.id
				: null;
			shareComponentId = this.props.renderingContext.elements
				.shareComponent.value
				? this.props.renderingContext.elements.shareComponent.value.id
				: null;
			contestRulesId = this.props.renderingContext.elements.contestRules
				.value
				? this.props.renderingContext.elements.contestRules.value.id
				: null;
		}

		return (
			<wch-page
				data-renderingcontext-id={this.props.contentId}
				id={this.props.contentId}
				className="grid-x">
				<div id={this.props.contentId} className="landing-page grid-x">
					<div className="hero-section cell">
						<div className="section">
							<div className="hero-message">
								{heroHeadline ? (
									<h1
										className="hero-headline"
										data-wch-inline-edit="elements.heroHeadline.value"
										dangerouslySetInnerHTML={itemHTML(
											heroHeadline
										)}
									/>
								) : (
									''
								)}
							</div>
							{heroImage ? (
								<img
									src={getImageUrl(heroImage)}
									data-wch-inline-edit="elements.heroImage"
									title={heroImage.altText}
									alt={heroImage.altText}
								/>
							) : (
								''
							)}
						</div>
					</div>
					<div className="section grid-container cell">
						<div className="show-for-large feature-section grid-x">
							<div className="featureText large-6 columns grid-container">
								{featureHeadline1 ? (
									<h2
										className="featureHeadline"
										data-wch-inline-edit="elements.featureHeadline1.value">
										{featureHeadline1}
									</h2>
								) : (
									''
								)}
								{feature1 ? (
									<div
										className="featureBody section"
										data-wch-inline-edit="elements.feature1.value"
										dangerouslySetInnerHTML={itemHTML(
											feature1
										)}
									/>
								) : (
									''
								)}
							</div>
							{featureImage1 ? (
								<img
									className="featureImage large-6 columns grid-container"
									data-wch-inline-edit="elements.featureImage1"
									src={getImageUrl(featureImage1, 'large')}
									title={featureImage1.altText}
									alt={featureImage1.altText}
								/>
							) : (
								''
							)}
						</div>
						<div className="hide-for-large feature-section grid-x">
							{featureImage1 ? (
								<img
									className="featureImage grid-container"
									data-wch-inline-edit="elements.featureImage1"
									src={getImageUrl(featureImage1, 'large')}
									title={featureImage1.altText}
									alt={featureImage1.altText}
								/>
							) : (
								''
							)}
							<div className="featureText grid-container">
								{featureHeadline1 ? (
									<h2
										className="featureHeadline"
										data-wch-inline-edit="elements.featureHeadline1.value">
										{featureHeadline1}
									</h2>
								) : (
									''
								)}
								{feature1 ? (
									<div
										className="featureBody section"
										data-wch-inline-edit="elements.feature1.value"
										dangerouslySetInnerHTML={itemHTML(
											feature1
										)}
									/>
								) : (
									''
								)}
							</div>
						</div>
					</div>

					<div className="section grid-container cell">
						<div className="show-for-large feature-section grid-x">
							{featureImage2 ? (
								<img
									className="featureImage large-6 columns grid-container"
									data-wch-inline-edit="elements.featureImage2"
									src={getImageUrl(featureImage2, 'large')}
									title={featureImage2.altText}
									alt={featureImage2.altText}
								/>
							) : (
								''
							)}
							<div className="featureText large-6 columns grid-container">
								{featureHeadline2 ? (
									<h2
										className="featureHeadline"
										data-wch-inline-edit="elements.featureHeadline2.value">
										{featureHeadline2}
									</h2>
								) : (
									''
								)}
								{feature2 ? (
									<div
										className="featureBody section"
										data-wch-inline-edit="elements.feature2.value"
										dangerouslySetInnerHTML={itemHTML(
											feature2
										)}
									/>
								) : (
									''
								)}
							</div>
						</div>
						<div className="hide-for-large feature-section grid-x">
							{featureImage2 ? (
								<img
									className="featureImage grid-container"
									data-wch-inline-edit="elements.featureImage2"
									src={getImageUrl(featureImage2, 'large')}
									title={featureImage2.altText}
									alt={featureImage2.altText}
								/>
							) : (
								''
							)}
							<div className="featureText grid-container">
								{featureHeadline2 ? (
									<h2
										className="featureHeadline"
										data-wch-inline-edit="elements.featureHeadline2.value">
										{featureHeadline2}
									</h2>
								) : (
									''
								)}
								{feature2 ? (
									<div
										className="featureBody section"
										data-wch-inline-edit="elements.feature2.value"
										dangerouslySetInnerHTML={itemHTML(
											feature2
										)}
									/>
								) : (
									''
								)}
							</div>
						</div>
					</div>

					<div className="section grid-container cell">
						<div className="show-for-large feature-section grid-x">
							<div className="featureText large-6 columns grid-container">
								{featureHeadline3 ? (
									<h2
										className="featureHeadline"
										data-wch-inline-edit="elements.featureHeadline3.value">
										{featureHeadline3}
									</h2>
								) : (
									''
								)}
								{feature3 ? (
									<div
										className="featureBody section"
										data-wch-inline-edit="elements.feature3.value"
										dangerouslySetInnerHTML={itemHTML(
											feature3
										)}
									/>
								) : (
									''
								)}
							</div>
							{featureImage3 ? (
								<img
									className="featureImage large-6 columns grid-container"
									data-wch-inline-edit="elements.featureImage3"
									src={getImageUrl(featureImage3, 'large')}
									title={featureImage3.altText}
									alt={featureImage3.altText}
								/>
							) : (
								''
							)}
						</div>
						<div className="hide-for-large feature-section grid-x">
							{featureImage3 ? (
								<img
									className="featureImage grid-container"
									data-wch-inline-edit="elements.featureImage3"
									src={getImageUrl(featureImage3, 'large')}
									title={featureImage3.altText}
									alt={featureImage3.altText}
								/>
							) : (
								''
							)}
							<div className="featureText grid-container">
								{featureHeadline3 ? (
									<h2
										className="featureHeadline"
										data-wch-inline-edit="elements.featureHeadline3.value">
										{featureHeadline3}
									</h2>
								) : (
									''
								)}
								{feature3 ? (
									<div
										className="featureBody section"
										data-wch-inline-edit="elements.feature3.value"
										dangerouslySetInnerHTML={itemHTML(
											feature3
										)}
									/>
								) : (
									''
								)}
							</div>
						</div>
					</div>

					{entryComponentId ? (
						<div className="cell">
							<div className="form-section section">
								<div className="grid-container">
									<WchContent contentId={entryComponentId} />
								</div>
							</div>
						</div>
					) : (
						''
					)}

					{shareComponentId ? (
						<div className="cell">
							<div className="section">
								<div className="grid-container">
									<WchContent contentId={shareComponentId} />
								</div>
							</div>
						</div>
					) : (
						''
					)}

					{contestRulesId ? (
						<div className="cell">
							<div className="section">
								<div className="grid-container">
									<WchContent contentId={contestRulesId} />
								</div>
							</div>
						</div>
					) : (
						''
					)}
				</div>
			</wch-page>
		);
	}
}
