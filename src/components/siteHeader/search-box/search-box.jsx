/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import { loadSite } from '@acoustic-content-sdk/wch-flux-sdk';
import 'styles/components/siteHeader/search-box/search-box.scss';
import { SearchGlass } from './images/search-glass';
import { SearchInputClear } from './images/search-input-clear';

const lucene = require('lucene-query-string-builder');
import * as _ from 'lodash';

export class SearchBox extends React.Component {
	constructor (props) {
		super(props);

		this.state = { query: '' };

		this.handleChange = this.handleChange.bind(this);

		this.searchConstants = {
			/* path for search results page */
			SEARCH_RESULTS_PAGE_PATH: '/searchresults',
		};
	}

	componentWillMount () {
		this.setState({ query: '' });
	}

	handleChange (e) {
		this.setState({ query: e.target.value });
	}

	render () {
		const checkQLength = () => {
			return this.state.query.length > 0;
		};

		const search = () => {
			this.props.history.push('/searchresults');
		};

		const clearSearch = () => {
			this.setState({ query: '' });
		};

		return (
			<div className="searchWrapper">
				<form
					className="search-form"
					id="search-form"
					name="search-form">
					<input
						type="search"
						value={this.state.query}
						name="searchTerm"
						className={checkQLength() ? 'active-input' : ''}
						onChange={this.handleChange}
					/>
					<button className="search-button" onClick={search}>
						<div className="search-button">
							<SearchGlass />
						</div>
					</button>
					<div
						onClick={clearSearch}
						className={
							checkQLength()
								? 'show-clear-button'
								: 'search-input-clear'
						}>
						<SearchInputClear />
					</div>
				</form>
			</div>
		);
	}
}
