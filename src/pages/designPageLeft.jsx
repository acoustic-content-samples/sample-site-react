/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import { Link } from 'react-router-dom';
import { getRouteForContentId } from '@acoustic-content-sdk/wch-flux-sdk';
import 'styles/pages/designPageLeft.scss';
import { WchContent } from '@acoustic-content-sdk/wch-flux-sdk/react/wchContent';

export class DesignPageLeft extends React.Component {
	render () {
		let designTopicId = '';
		let relatedArticlesId = '';
		let route = '';
		let summary = '';

		if (this.props.renderingContext) {
			if (this.props.renderingContext.elements.designTopic) {
				designTopicId = this.props.renderingContext.elements.designTopic
					.value
					? this.props.renderingContext.elements.designTopic.value.id
					: '';
			}
			if (this.props.renderingContext.elements.relatedArticles) {
				relatedArticlesId = this.props.renderingContext.elements
					.relatedArticles.value
					? this.props.renderingContext.elements.relatedArticles.value
							.id
					: '';
			}
			route = getRouteForContentId(this.props.renderingContext.id)
				? getRouteForContentId(this.props.renderingContext.id)
				: '#';
			summary = this.props.summary;

			if (summary) {
				return (
					<div
						data-renderingcontext-id={
							this.props.renderingContext.id
						}>
						<Link to={route}>
							{designTopicId.length > 0 ? (
								<WchContent
									summary={true}
									contentId={designTopicId}
								/>
							) : (
								''
							)}
						</Link>
					</div>
				);
			} else {
				return (
					<div
						data-renderingcontext-id={this.props.contentId}
						className="grid-container section-small">
						<div
							id={this.props.renderingContext.id}
							className="grid-x grid-padding-x">
							<div className="medium-8 cell auto">
								<div
									data-wch-inline-edit="elements.designTopic.value"
									className="section">
									{designTopicId.length > 0 ? (
										<WchContent contentId={designTopicId} />
									) : (
										''
									)}
								</div>
							</div>
							<div className="medium-4 cell shrink">
								<div
									data-wch-inline-edit="elements.relatedArticles.value"
									className="section">
									{relatedArticlesId.length > 0 ? (
										<WchContent
											contentId={relatedArticlesId}
										/>
									) : (
										''
									)}
								</div>
							</div>
						</div>
					</div>
				);
			}
		} else {
			return <div />;
		}
	}
}
