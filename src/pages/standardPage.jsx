/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React, {Component} from 'react';
import {loadContent, getContent, subscribe} from 'wch-flux-sdk';
import {WchContent} from 'wch-flux-sdk/react';
import {HeroImage} from '../layouts/heroImage';
import 'styles/pages/standardPage.scss';

export class StandardPageLayout extends Component {
	constructor (props) {
		super(props);

		this.state = {page: {
			banner: {values: []},
			sectionOne: {values: []},
			sectionTwo: {values: []}
		}};

		this.sub = subscribe('content', () => {
            let content = getContent(this.props.contentId);
            if (content) {
                this.setState({
                    page: content.elements
                });
            }
		});

		loadContent(props.contentId);
	}

	componentWillMount () {
		let content = getContent(this.props.contentId);
		if (content) {
			this.setState({page: content.elements});
		} else {
            loadContent(this.props.contentId);
		}
	}

	componentWillReceiveProps (nextProps) {
		// console.log(`Standard Page: ${this.props.contentId} : ${nextProps.contentId}`);
		// if (nextProps.contentId !== this.props.contentId) {
			let content = getContent(nextProps.contentId);
			if (content) {
				this.setState({page: content.elements});
			} else {
				loadContent(nextProps.contentId);
			}
			loadContent(nextProps.contentId, true);
		// }
	}

	componentWillUnmount () {
		this.sub.unsubscribe();
	}

	render () {
		let sectionOfBanner = cell => this.state.page[cell].values.map(s => <div className="section" key={s.id}><WchContent contentId={s.id}/></div>);
		let sectionsOf = cell => this.state.page[cell].values.map(s => <div className="section" key={s.id}><div className="grid-container"><WchContent contentId={s.id}/></div></div>);

        let bannerSection = '';
		if (this.state.page.banner && this.state.page.banner.values && this.state.page.banner.values.length > 0) {
			bannerSection = (
				<div className="cell">
					{/*<h1>Banner</h1>*/}
					{sectionOfBanner('banner')}
				</div>
			);
		}

		let sectionOne = '';
		if (this.state.page.sectionOne && this.state.page.sectionOne.values && this.state.page.sectionOne.values.length > 0) {
			sectionOne = (
				<div className="cell">
					{sectionsOf('sectionOne')}
				</div>
			);
		}

		let sectionTwo = '';
		if (this.state.page.sectionTwo && this.state.page.sectionTwo.values && this.state.page.sectionTwo.values.length > 0) {
			sectionTwo = (
				<div className="cell">
					{sectionsOf('sectionTwo')}
				</div>
			);
		}

		return (
			<div id={this.props.contentId} className="grid-x">
				{bannerSection}
				{sectionOne}
				{sectionTwo}
			</div>
		);
	}
}