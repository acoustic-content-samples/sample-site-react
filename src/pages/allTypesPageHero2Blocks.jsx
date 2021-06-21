import React from 'react';
import 'styles/pages/allTypesPageHero2Blocks.scss';
import {
	getImageUrl,
	getVideoUrl,
	getFileUrl,
} from '@acoustic-content-sdk/wch-flux-sdk';
import { WchContent } from '@acoustic-content-sdk/wch-flux-sdk/react/wchContent';
export class AllTypesPageHero2Blocks extends React.Component {
	render () {
		//todo,  in edit mode can we render empty containers at the beginning and end of the page to more easily add new components?
		let bannerSection = this.props.renderingContext.elements.banner;
		let sectionOne = this.props.renderingContext.elements.sectionOne;
		let sectionTwo = this.props.renderingContext.elements.sectionTwo;
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
					<div className="cell medium-6 large-6 columns">
						{sectionsOf('sectionOne')}
					</div>
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
					<div className="cell medium-6 large-6 columns">
						{sectionsOf('sectionTwo')}
					</div>
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
				<div className="bottom-sections-container medium-12 large-12 columns">
					<div className="grid-x">
						{sectionOne}
						{sectionTwo}
					</div>
				</div>
			</wch-page>
		);
	}
}
