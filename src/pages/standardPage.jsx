/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {
	WchContent,
	WchLayout,
} from '@acoustic-content-sdk/wch-flux-sdk/react';
import 'styles/pages/standardPage.scss';

export class StandardPage extends React.Component {
	render () {
		//todo,  in edit mode can we render empty containers at the beginning and end of the page to more easily add new components?

		let bannerSection = '';
		let sectionOne = '';
		let sectionTwo = '';
		if (this.props.renderingContext) {
			let sectionOfBanner = cell =>
				this.props.renderingContext.elements[cell].values.map(
					(s, index) => {
						let editAccessor = `elements.${cell}.values[${index}]`;
						return (
							<div
								data-wch-inline-edit={editAccessor}
								className="section"
								key={s.id}>
								<WchContent contentId={s.id} />
							</div>
						);
					}
				);
			let sectionsOf = cell =>
				this.props.renderingContext.elements[cell].values.map(
					(s, index) => {
						let editAccessor = `elements.${cell}.values[${index}]`;
						return (
							<div
								data-wch-inline-edit={editAccessor}
								className="section"
								key={s.id}>
								<div className="grid-container">
									<WchContent contentId={s.id} />
								</div>
							</div>
						);
					}
				);

			if (
				this.props.renderingContext.elements &&
				this.props.renderingContext.elements.banner &&
				this.props.renderingContext.elements.banner.values &&
				this.props.renderingContext.elements.banner.values.length > 0
			) {
				bannerSection = (
					<div className="cell">
						{/*<h1>Banner</h1>*/}
						{sectionOfBanner('banner')}
					</div>
				);
			}

			if (
				this.props.renderingContext.elements &&
				this.props.renderingContext.elements.sectionOne &&
				this.props.renderingContext.elements.sectionOne.values &&
				this.props.renderingContext.elements.sectionOne.values.length >
					0
			) {
				sectionOne = (
					<div className="cell">{sectionsOf('sectionOne')}</div>
				);
			}

			if (
				this.props.renderingContext.elements &&
				this.props.renderingContext.elements.sectionTwo &&
				this.props.renderingContext.elements.sectionTwo.values &&
				this.props.renderingContext.elements.sectionTwo.values.length >
					0
			) {
				sectionTwo = (
					<div className="cell">{sectionsOf('sectionTwo')}</div>
				);
			}
		}

		return (
			//TODO document this,  data.renderingcontext-id is needed to scope the elements to the renderingContext
			<wch-page
				data-renderingcontext-id={this.props.contentId}
				id={this.props.contentId}
				className="grid-x">
				{bannerSection}
				{sectionOne}
				{sectionTwo}
			</wch-page>
		);
	}
}
