/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import { ViewAllButton } from '../components/viewAllButton';
import '../../styles/pages/errorPage.scss';

export class ErrorPage extends React.Component {
	render () {
		let errorMessage = '';
		let goHomeButton = {};

		if (this.props.renderingContext) {
			errorMessage = this.props.renderingContext.elements.errorMessage
				.value;
			goHomeButton = this.props.renderingContext.elements.goHomeButton;
		}

		function errorMessageHTML () {
			return { __html: errorMessage };
		}

		return (
			<wch-page
				data-renderingcontext-id={this.props.contentId}
				id={this.props.contentId}
				className="grid-x">
				<div className="grid-container grid-container-padded section">
					<div className="error-wrapper">
						<div className="error-code">{this.props.status}</div>
						<div className="error-code-message">
							<p
								data-wch-inline-edit="elements.errorMessage.value"
								dangerouslySetInnerHTML={errorMessageHTML()}
							/>
							<div data-wch-inline-edit="elements.goHomeButton">
								<ViewAllButton link={goHomeButton} />
							</div>
						</div>
					</div>
				</div>
			</wch-page>
		);
	}
}
