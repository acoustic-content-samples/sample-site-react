/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import { Link } from 'react-router-dom';
import 'styles/components/viewAllButton.scss';

export class ViewAllButton extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			contentData: {},
		};
	}

	componentWillMount () {}

	render () {
		let isButtonLinkSet = '';
		let linkURL = '';
		let linkText = '';

		if (this.props.link.linkURL) {
			isButtonLinkSet =
				this.props.link.linkURL && this.props.link.linkURL.length > 0;
			linkText = this.props.link.linkText;
			linkURL = this.props.link.linkURL;
		}

		function viewButton () {
			if (isButtonLinkSet)
				return (
					<div className="view-all">
						<Link
							to={linkURL}
							title={linkText}
							className="button button-view-all">
							{linkText}{' '}
						</Link>
					</div>
				);
			else return <div />;
		}

		return <div>{viewButton()}</div>;
	}
}
