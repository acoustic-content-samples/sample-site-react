/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {
	subscribe,
	getQueryString,
	getFirstCategory,
	queryContent,
	getQuery,
	sortQueriedItems,
} from '@acoustic-content-sdk/wch-flux-sdk';
import { WchContent } from '@acoustic-content-sdk/wch-flux-sdk/react';
import 'styles/layouts/galleryDynamicList.scss';
import { ViewAllButton } from '../components';

export class GalleryDynamicList extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			items: {},
		};

		this.subquery = subscribe('queries', () => {
			let type = this.props.renderingContext.elements.contentType
				? this.props.renderingContext.elements.contentType
				: '';
			let category = getFirstCategory(type);
			let maxItems = this.props.renderingContext.elements.maxItem.value
				? this.props.renderingContext.elements.maxItem.value
				: 10;
			let queryString = getQueryString(category, maxItems);
			this.setState({ items: getQuery(queryString) });
		});
	}

	componentDidMount () {
		if (this.props.renderingContext.elements) {
			this.query(this.props.renderingContext.elements.maxItem.value);
		}
	}

	componentWillUnmount () {
		this.subquery.unsubscribe();
	}

	query (maxItems = 10) {
		if (this.props.renderingContext.elements) {
			let type = this.props.renderingContext.elements.contentType
				? this.props.renderingContext.elements.contentType
				: '';
			let category = getFirstCategory(type);
			queryContent(category, maxItems);
		}
	}

	render () {
		let listTitle = '';
		let viewAllLink = '';
		let galleryItems = [];
		let contentId = '';
		let sortOrder = '';
		let type = '';
		let maxItems = '';

		if (this.props.renderingContext.elements) {
			contentId = this.props.renderingContext.id;
			listTitle = this.props.renderingContext.elements.listTitle.value;
			viewAllLink = this.props.renderingContext.elements.viewAllLink
				? this.props.renderingContext.elements.viewAllLink
				: {};
			sortOrder = this.props.renderingContext.elements.sortOrder;
			type = getFirstCategory(
				this.props.renderingContext.elements.contentType
			);
			maxItems = this.props.renderingContext.elements.maxItem;
		}

		if (this.state.items && this.state.items.itemsContext) {
			let sortField =
				type === 'Alphabetical ascending' ||
				type === 'Alphabetical descending'
					? 'heading'
					: 'date';
			let sortedItems = sortQueriedItems(
				this.state.items.itemsContext,
				sortField,
				getFirstCategory(sortOrder),
				maxItems.value
			);

			galleryItems = sortedItems.map(item => (
				<div id={item.id} key={item.id} className="medium-4 cell">
					<WchContent contentId={item.id} summary={true} />
				</div>
			));
		}

		return (
			<div
				data-renderingcontext-id={this.props.renderingContext.id}
				id={contentId}
				className="query-gallery">
				<h3 data-wch-inline-edit="elements.listTitle.value">
					{listTitle}
				</h3>
				<div className="grid-container grid-container-padded">
					<div className="grid-x grid-margin-x">{galleryItems}</div>
				</div>
				<div data-wch-inline-edit="elements.viewAllLink">
					<ViewAllButton link={viewAllLink} />
				</div>
			</div>
		);
	}
}
