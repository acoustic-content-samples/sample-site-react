/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import { ViewAllButton } from '../components';
import { WchContent } from '@acoustic-content-sdk/wch-flux-sdk/react';
import 'styles/layouts/galleryList.scss';

export class GalleryList extends React.Component {
	render () {
		let heading = '';
		let items = [];
		let viewAllLink = {};
		let styleGalleryList = {
			textAlign: 'center',
		};

		if (this.props.renderingContext.elements) {
			heading = this.props.renderingContext.elements.heading.value;
			items = this.props.renderingContext.elements.items.values;
			viewAllLink = this.props.renderingContext.elements.viewAllLink
				? this.props.renderingContext.elements.viewAllLink
				: {};
		}

		let makeSlide = items.map(item => (
			<div key={item.id} id={item.id} className="medium-4 cell">
				<WchContent contentId={item.id} summary={true} />
			</div>
		));

		return (
			<div
				data-renderingcontext-id={this.props.renderingContext.id}
				id={this.props.contentId}
				className="item-selection">
				<h3
					data-wch-inline-edit="elements.heading.value"
					style={styleGalleryList}>
					{' '}
					{heading}
				</h3>
				<div className="grid-x grid-margin-x">{makeSlide}</div>
				<div data-wch-inline-edit="elements.viewAllLink">
					<ViewAllButton link={viewAllLink} />
				</div>
			</div>
		);
	}
}
