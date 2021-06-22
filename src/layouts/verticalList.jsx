/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import { WchContent } from '@acoustic-content-sdk/wch-flux-sdk/react';
import 'styles/layouts/verticalList.scss';
import { ViewAllButton } from '../components';

export class VerticalList extends React.Component {
	render () {
		let heading = '';
		let items = '';
		let viewAllLink = '';
		let list = '';

		if (this.props.renderingContext.elements) {
			heading = this.props.renderingContext.elements.heading.value;
			items = this.props.renderingContext.elements.items.values;
			viewAllLink = this.props.renderingContext.elements.viewAllLink;
			list = items.map(item => (
				<div key={item.id} id={item.id} className="cell">
					<WchContent contentId={item.id} summary={true} />
				</div>
			));
		}

		return (
			<div
				data-renderingcontext-id={this.props.renderingContext.id}
				id={this.props.renderingContext.id}
				className="item-selection">
				<h4 data-wch-inline-edit="elements.heading.value">{heading}</h4>
				<div className="grid-y generic-list">{list}</div>
				<div data-wch-inline-edit="elements.viewAllLink">
					<ViewAllButton link={viewAllLink} />
				</div>
			</div>
		);
	}
}
