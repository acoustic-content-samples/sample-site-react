/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import 'styles/layouts/contestRules.scss';

export class ContestRules extends React.Component {
	render () {
		let contentId = '';
		let title = '';
		let text = '';

		if (this.props.renderingContext.elements) {
			let elements = this.props.renderingContext.elements;
			contentId = this.props.renderingContext.id;
			title = elements.title.value ? elements.title.value : '';
			text = elements.contestRules.value
				? elements.contestRules.value
				: '';
		}

		let itemHTML = () => {
			return { __html: text };
		};

		return (
			<div
				id={contentId}
				data-renderingcontext-id={contentId}
				className="rule-section grid-x">
				<div className="section small-12">
					{title ? (
						<h2
							className="cell"
							data-wch-inline-edit="elements.title.value">
							{title}
						</h2>
					) : (
						''
					)}
				</div>
				<div className="section small-12">
					{text ? (
						<div
							data-wch-inline-edit="elements.contestRules.value"
							dangerouslySetInnerHTML={itemHTML()}
						/>
					) : (
						''
					)}
				</div>
			</div>
		);
	}
}
