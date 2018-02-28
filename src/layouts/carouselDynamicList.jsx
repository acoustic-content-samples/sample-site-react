/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import Slider from 'react-slick';
import {
	loadContent,
	getContent,
	subscribe,
	getQueryString,
	queryContent,
	getQuery,
	getFirstCategory,
	sortQueriedItems
} from 'wch-flux-sdk';
import {WchContent} from 'wch-flux-sdk/react';

import 'styles/layouts/carouselDynamicList.scss';
import {ViewAllButton} from '../components';

const slickLoaded = new Promise((resolve, reject) => {
	if (!document.getElementById('slick-script-tag')) {
		let styleTag = document.createElement('link');
		styleTag.href = '//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.css';
		styleTag.rel = 'stylesheet';
		styleTag.async =true;
		document.head.appendChild(styleTag);

		let scriptTag = document.createElement('script');
		scriptTag.id = 'slick-script-tag';
		scriptTag.type = 'application/javascript';
		scriptTag.src = '//cdn.jsdelivr.net/jquery.slick/1.6.0/slick.min.js';
		scriptTag.async = true;
		scriptTag.addEventListener('load', resolve);
		scriptTag.addEventListener('error', () => reject('Error loading script.'));
		scriptTag.addEventListener('abort', () => reject('Script loading aborted.'));
		document.body.appendChild(scriptTag);
	} else {
		resolve();
	}
});

export class CarouselDynamicList extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			contentData: {},
			items: {},
			slickOptions: {
				'speed': 500,
				'slidesToShow': 4,
				'slidesToScroll': 4,
				'dots': false,
				'arrows': true,
				'responsive': [{
					'breakpoint': 1250,
					'settings': {
						'slidesToShow': 3,
						'slidesToScroll': 3
					}
				},
					{
					'breakpoint': 700,
					'settings': {
						'slidesToShow': 2,
						'slidesToScroll': 2
					}
				},
					{
					'breakpoint': 400,
					'settings': {
						'slidesToShow': 1,
						'slidesToScroll': 1
					}
				}]
			}
		};

		this.sub = subscribe('content', () => {
			let content = getContent(this.props.contentId);
			if (content) {
				this.setState({contentData: content});
			}
		});

        this.subquery = subscribe('queries', () => {
            let type = this.state.contentData.elements.contentType ? this.state.contentData.elements.contentType : '';
            let category = getFirstCategory(type);
            let maxItems = this.state.contentData.elements.maxItem.value ? this.state.contentData.elements.maxItem.value : 10;
            let queryString = getQueryString(category, maxItems);
            this.setState({items: getQuery(queryString)});
        });
	}

	componentWillMount () {
		let content = getContent(this.props.contentId);
		if (content) {
			this.setState({contentData: content});
		} else {
			loadContent(props.contentId);
		}
	}

    componentDidMount() {
        this.query();
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState.items === undefined ) {
            return false;
        } else {
            return true;
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.contentId !== this.props.contentId) {
            let content = getContent(nextProps.contentId);
            if (content) {
                this.setState({contentData: content});
            } else {
                loadContent(nextProps.contentId);
            }
        }
    }

	componentWillUnmount() {
		this.sub.unsubscribe();
        this.subquery.unsubscribe();
	}

	query () {
		if (this.state.contentData.elements) {
			let type = this.state.contentData.elements.contentType ? this.state.contentData.elements.contentType : '';
			let category = getFirstCategory(type);
			let maxItems = this.state.contentData.elements.maxItem.value ? this.state.contentData.elements.maxItem.value : 10;
			queryContent(category, maxItems);
		}
	}

	render() {
		let listTitle = '';
		let viewAllLink='';
		let carouselItems = [];
        let sortOrder = '';
        let type = '';
        let maxItems ='';

		if (this.state.contentData.elements) {
			listTitle = this.state.contentData.elements.listTitle.value;
			viewAllLink = this.state.contentData.elements.viewAllLink ? this.state.contentData.elements.viewAllLink : {};
            sortOrder = this.state.contentData.elements.sortOrder;
            type = getFirstCategory(this.state.contentData.elements.contentType);
            maxItems = this.state.contentData.elements.maxItem;
		}

		if (this.state.items && this.state.items.itemsContext) {
            let sortField = (type === 'Alphabetical ascending' || type === 'Alphabetical descending') ? 'heading' : 'date';
            let sortedItems = sortQueriedItems(this.state.items.itemsContext, sortField, getFirstCategory(sortOrder), maxItems);

            carouselItems = sortedItems.map(item => (
				<div id={item.id} key={item.id} className="carousel-item">
					<WchContent contentId={item.id} summary={true} />
				</div>
			));
		}


		return (
			<div id={this.state.contentData.id} className="query-carousel">
				<h3>{listTitle}</h3>
				<Slider {...this.state.slickOptions} className="carousel">
					{carouselItems}
				</Slider>
				<ViewAllButton link={viewAllLink} />
			</div>
		)
	}
}