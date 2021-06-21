/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {
	loadContent,
	getContent,
	subscribe,
	getRouteForContentId,
	getApiUrl,
} from '@acoustic-content-sdk/wch-flux-sdk';
import { WchContent } from '@acoustic-content-sdk/wch-flux-sdk/react';
import 'styles/layouts/search-results/searchResultsLayout.scss';
import { Subscription } from 'rxjs/Subscription';
import { fromEvent } from 'rxjs';
import 'rxjs/add/observable/fromEvent';
import { throttle } from 'rxjs/operators';
import { interval } from 'rxjs/observable/interval';

const lucene = require('lucene-query-string-builder');
import * as _ from 'lodash';

export class SearchResults extends React.Component {
	_search () {
		let apiUrl = getApiUrl();
		let textQuery = this.state.searchKeywords.reduce(
			(query, currentVal, index) => {
				return index === 0
					? `${currentVal}~1`
					: `${query} AND ${currentVal}~1`;
			},
			''
		);
		let typeQuery = this.state.searchTypes.reduce(
			(types, currentVal, index) => {
				return index === 0
					? `&fq=type:"${currentVal}"`
					: `${types} OR type:"${currentVal}"`;
			},
			''
		);

		let searchURL =
			`${apiUrl}/delivery/v1/search?q=classification:page` +
			typeQuery +
			`&fq={!join%20from=id%20to=aggregatedIds}` +
			`text:(${textQuery})` +
			`&rows=${this.state.rowsPerRequest}&start=${this.state.start *
				this.state.rowsPerRequest}&fl=*`;

		this.state.start++;

		// allows external function call from ajax return functions
		let that = this;
		let promise = $.ajax(searchURL);
		promise.done(function (res) {
			that.processResults(res);
		});
		promise.fail(function () {
			that.processError();
		});
	}

	processResults (res) {
		this.state.inFlight = 'false';
		this.state.numFound = res.numFound;
		this.state.searchResults = this.state.searchResults.concat(
			res.documents
		);
		this._scrollHandler();
	}

	processError () {
		console.log('Error - search items could not be retrieved!');
		this.state.searchError = 'true';
	}

	_scrollHandler () {
		/*
             On page load we need to check in the loading icon is on screen.  If so, load more items until it is not longer
             visible or scroll reaches 70%
        */

		let scrollTop = $(document).scrollTop();
		let scrollPercentage =
			scrollTop / ($(document).height() - $(window).height());

		if ($('#loadIcon')[0] != null) {
			let rect = $('#loadIcon')[0].getBoundingClientRect();
			let clientHeight = document.documentElement.clientHeight;
			let windowHeight = $(window).innerHeight();
			let viewHeight = Math.max(clientHeight, windowHeight);

			if (
				scrollPercentage > 0.7 ||
				!(rect.bottom < 0 || rect.top - viewHeight >= 0)
			) {
				this.getMoreResults();
			}
		}
	}

	moreToLoad () {
		return (
			this.state.numFound > this.state.rowsPerRequest * this.state.start
		);
	}

	getMoreResults () {
		if (this.moreToLoad()) {
			this._search();
		} else {
			this.setState(this.state);
		}
	}

	constructor (props) {
		super(props);

		this.state = {
			contentData: {},
			searchResults: [],
			numFound: 0,
			searchTerm: '',
			searchKeywords: [],
			inFlight: 'false',
			searchError: 'false',
			searchTypes: [],
			rowsPerRequest: 3,
			start: 0,
			scrollEvent: Subscription,
		};

		this.sub = subscribe('content', () => {
			let content = getContent(this.props.contentId);
			if (content) {
				this.setState({
					contentData: content,
				});
			}
		});

		const w = window;
		let queryString = w.location.search;
		let pos = queryString.search('=');
		this.state.searchTerm = queryString.slice(pos + 1);

		if (this.state.searchTerm && this.state.searchTerm.length > 0) {
			this.state.searchTerm = this.state.searchTerm.trim();
			this.state.inFlight = 'true';
			this.state.searchResults = [];
			this.state.start = 0;
			this.state.searchError = 'false';
			this.state.searchTypes = ['Design Page'];
			this.state.searchKeywords = this.state.searchTerm.split(/[\s&#.,]/);
			this.state.searchKeywords.forEach(function (word, index, array) {
				array[index] = word.replace(
					/[-[\]{}()+\-*"&!~?:\\^|]/g,
					'\\$&'
				);
			});
			this._search();
		}
	}

	componentWillMount () {
		let content = getContent(this.props.contentId);
		if (content) {
			this.setState({ contentData: content });
		} else {
			loadContent(this.props.contentId);
		}

		//throttle the scroll event to improve performance
		let scroll = fromEvent(window, 'scroll');
		scroll = scroll.pipe(throttle(value => interval(300)));
		this.scrollEvent = scroll.subscribe(() => this._scrollHandler());
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.contentId !== this.props.contentId) {
			let content = getContent(nextProps.contentId);
			if (content) {
				this.setState({ contentData: content });
			} else {
				loadContent(nextProps.contentId);
			}
		}
	}

	componentWillUnmount () {
		this.sub.unsubscribe();
		this.scrollEvent.unsubscribe();
	}

	render () {
		let itemList = [];
		let suggestedArticlesId = '';
		let route = '';
		let summary = '';

		if (
			this.state.searchResults &&
			this.state.searchResults.length > 0 &&
			this.state.inFlight === 'false' &&
			this.state.numFound === 1
		) {
			itemList = this.state.searchResults.map(item => (
				<div className="large-6 medium-8 cell search-result-item">
					<WchContent contentId={item.contentId} summary={true} />
				</div>
			));
		}

		if (
			this.state.searchResults &&
			this.state.searchResults.length > 0 &&
			this.state.inFlight === 'false' &&
			this.state.numFound > 1
		) {
			itemList = this.state.searchResults.map(item => (
				<div
					key={item.contentId}
					className="large-4 medium-6 cell search-result-item">
					<WchContent contentId={item.contentId} summary={true} />
				</div>
			));
		}

		const itemsWereFound = () => {
			return this.state.numFound > 0;
		};

		const itemsWereNotFound = () => {
			return (
				this.state.numFound === 0 || this.state.searchError === 'true'
			);
		};

		const listComplete = () => {
			return (
				itemList.length > 0 &&
				this.state.inFlight === 'false' &&
				itemList.length === this.state.numFound
			);
		};

		const loadMore = () => {
			return (
				this.state.numFound >
				this.state.rowsPerRequest * this.state.start
			);
		};

		const checkLoading = () => {
			return (
				loadMore() &&
				this.state.searchTerm !== '' &&
				this.state.inFlight === 'false' &&
				this.state.searchError === 'false'
			);
		};

		if (this.state.contentData.elements) {
			if (this.state.contentData.elements.suggestedArticles) {
				suggestedArticlesId = this.state.contentData.elements
					.suggestedArticles.value
					? this.state.contentData.elements.suggestedArticles.value.id
					: '';
			}
			route = getRouteForContentId(this.state.contentData.id)
				? getRouteForContentId(this.state.contentData.id)
				: '#';
			summary = this.props.summary;
		}

		return (
			<div id={this.props.contentId} className="grid-container">
				{this.state.searchTerm !== '' && (
					<div>
						{itemsWereFound() && (
							<div className="grid-x grid-margin-x">
								{this.state.inFlight === 'false' && (
									<div className="large-10 medium-9 small-8 cell results">
										{this.state.numFound === 1 && (
											<div>
												{this.state.numFound} search
												result for{' '}
												<strong>
													"{this.state.searchTerm}"
												</strong>
											</div>
										)}
										{this.state.numFound > 1 && (
											<div>
												{this.state.numFound} search
												results for{' '}
												<strong>
													"{this.state.searchTerm}"
												</strong>
											</div>
										)}
									</div>
								)}
								{this.state.inFlight === 'true' && (
									<div className="large-12 medium-12 small-12">
										<div className="loading">
											searching...
										</div>
									</div>
								)}
								{listComplete() && (
									<div className="grid-x grid-margin-x">
										{itemList}
									</div>
								)}
							</div>
						)}
						{itemsWereNotFound() && (
							<div className="grid-x grid-margin-x">
								<div className="medium-12 cell">
									{this.state.inFlight === 'false' && (
										<div className="results">
											<p>
												Searching for "
												{this.state.searchTerm}" doesn't
												return any good matches.
											</p>
											<p>
												Try your search again with a
												different term or browse our
												recommendations.
											</p>
											{suggestedArticlesId.length > 0 && (
												<div className="medium-12 cell">
													<WchContent
														contentId={
															suggestedArticlesId
														}
														summary={true}
													/>
												</div>
											)}
										</div>
									)}
								</div>
							</div>
						)}
					</div>
				)}
				{this.state.searchTerm === '' && (
					<div className="grid-x grid-margin-x">
						<p>No results found</p>
					</div>
				)}
				<div id="loadIcon">
					{checkLoading() && (
						<div className="loading">Loading...</div>
					)}
				</div>
			</div>
		);
	}
}
