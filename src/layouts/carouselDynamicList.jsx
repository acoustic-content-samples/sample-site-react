/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import Slider from 'react-slick';
import {
	subscribe,
	getQueryString,
	queryContent,
	getQuery,
	getFirstCategory,
	sortQueriedItems,
} from '@acoustic-content-sdk/wch-flux-sdk';
import { WchContent } from '@acoustic-content-sdk/wch-flux-sdk/react';

import 'styles/layouts/carouselDynamicList.scss';
import { ViewAllButton } from '../components';

const slickLoaded = new Promise((resolve, reject) => {
	if (!document.getElementById('slick-script-tag')) {
		let styleTag = document.createElement('link');
		styleTag.href = '//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css';
		styleTag.rel = 'stylesheet';
		styleTag.async = true;
		document.head.appendChild(styleTag);

		let scriptTag = document.createElement('script');
		scriptTag.id = 'slick-script-tag';
		scriptTag.type = 'application/javascript';
		scriptTag.src = '//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js';
		scriptTag.async = true;
		scriptTag.addEventListener('load', resolve);
		scriptTag.addEventListener('error', () =>
			reject('Error loading script.')
		);
		scriptTag.addEventListener('abort', () =>
			reject('Script loading aborted.')
		);
		document.body.appendChild(scriptTag);
	} else {
		resolve();
	}
});

export class CarouselDynamicList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			items: {},
			slickOptions: {
				speed: 500,
				slidesToShow: 4,
				slidesToScroll: 4,
				dots: false,
				arrows: true,
				responsive: [
					{
						breakpoint: 1250,
						settings: {
							slidesToShow: 3,
							slidesToScroll: 3,
						},
					},
					{
						breakpoint: 700,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2,
						},
					},
					{
						breakpoint: 400,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1,
						},
					},
				],
			},
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
		this.query();
	}

	componentWillUnmount () {
		this.subquery.unsubscribe();
	}

	query () {
		if (this.props.renderingContext.elements) {
			let type = this.props.renderingContext.elements.contentType
				? this.props.renderingContext.elements.contentType
				: '';
			let category = getFirstCategory(type);
			let maxItems = this.props.renderingContext.elements.maxItem.value
				? this.props.renderingContext.elements.maxItem.value
				: 10;
			queryContent(category, maxItems);
		}
	}

	render () {
		let listTitle = '';
		let viewAllLink = '';
		let carouselItems = [];
		let sortOrder = '';
		let type = '';
		let maxItems = '';

		if (this.props.renderingContext.elements) {
			listTitle = this.props.renderingContext.elements.listTitle.value;
			viewAllLink = this.props.renderingContext.elements.viewAllLink
				? this.props.renderingContext.elements.viewAllLink
				: {};
			sortOrder = this.props.renderingContext.elements.sortOrder;
			type = getFirstCategory(
				this.props.renderingContext.elements.contentType
			);
			maxItems =
				this.props.renderingContext.elements.maxItem.value || null;

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
					maxItems
				);

				carouselItems = sortedItems.map(item => (
					<div id={item.id} key={item.id} className="carousel-item">
						<WchContent contentId={item.id} summary={true} />
					</div>
				));
			}

			return (
				<div
					id={this.props.renderingContext.id}
					data-renderingcontext-id={this.props.renderingContext.id}
					className="query-carousel">
					<h3 data-wch-inline-edit="elements.listTitle.value">
						{listTitle}
					</h3>
					<Slider {...this.state.slickOptions} className="carousel">
						{carouselItems}
					</Slider>
					<div data-wch-inline-edit="elements.viewAllLink">
						<ViewAllButton link={viewAllLink} />
					</div>
				</div>
			);
		} else {
			return <div />;
		}
	}
}
