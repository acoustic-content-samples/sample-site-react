/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import { getImageUrl } from '@acoustic-content-sdk/wch-flux-sdk';
import 'styles/layouts/signUp.scss';

export class SignUp extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			emailAddress: '',
			itemId: 'signup-' + Date.now() + '-' + props.contentId,
		};

		this.openModal = this.openModal.bind(this);
		this.inputValue = this.inputValue.bind(this);
	}

	componentDidMount () {
		$('#' + this.state.itemId).foundation();
	}

	componentDidUpdate () {
		//component was update so update the foundation plugin
		$('#' + this.state.itemId).foundation();
	}

	componentWillUnmount () {
		let signupModal = $(`#${this.state.itemId}`);
		signupModal.foundation('_destroy');
		signupModal.remove();
	}

	openModal () {
		$('#' + this.state.itemId).foundation('open');
	}

	inputValue (e) {
		this.setState({ emailAddress: e.target.value });
		if (e.key === 'Enter') {
			this.openModal();
		}
	}

	render () {
		let imageURL = '';
		let headline = '';
		let callToAction = '';
		let dialogMessage = '';
		let itemId = this.state.itemId;
		let backgroundStyle = {};
		let contentId = '';
		let status = '';

		if (this.props.renderingContext) {
			status = this.props.renderingContext.status;
			contentId = this.props.renderingContext.id;
			if (
				this.props.renderingContext.elements.backgroundImage.renditions
			) {
				imageURL = getImageUrl(
					this.props.renderingContext.elements.backgroundImage,
					'short',
					status
				);
			}
			dialogMessage = this.props.renderingContext.elements.dialogMessage
				.value;
			backgroundStyle = {
				backgroundImage: `url(${imageURL})`,
			};
			headline = this.props.renderingContext.elements.text.value;
			callToAction = this.props.renderingContext.elements.link.linkText;

			function createDialogMessage () {
				return { __html: dialogMessage };
			}

			function formPreventSubmit (e) {
				e.preventDefault();
			}

			return (
				<div id={contentId} data-renderingcontext-id={contentId}>
					<div
						className="reveal"
						id={itemId}
						data-reveal={''}
						aria-labelledby="modalTitle"
						aria-hidden="true"
						role="dialog">
						<div
							data-wch-inline-edit="elements.dialogMessage.value"
							dangerouslySetInnerHTML={createDialogMessage()}
						/>
						<a
							className="close-button"
							data-close={''}
							aria-label="Close">
							&#215;
						</a>
					</div>

					<section className="grid-container">
						<div
							data-wch-inline-edit="elements.backgroundImage"
							className="newsletter"
							style={backgroundStyle}>
							<div className="call-to-action">
								<h4 data-wch-inline-edit="elements.text.value">
									{headline}
								</h4>
							</div>
							<div className="wrap-inputs">
								<form
									name="emailForm"
									onSubmit={formPreventSubmit}>
									<input
										onKeyUp={this.inputValue}
										type="text"
										className="text-content"
										placeholder="Email address"
										name="emailAddr"
									/>
									<button
										data-wch-inline-edit="elements.link"
										onClick={this.openModal}
										type="button"
										className="button news-btn float-right"
										id="newsletter-subscribe">
										{' '}
										{callToAction}{' '}
									</button>
								</form>
							</div>
						</div>
					</section>
				</div>
			);
		} else {
			return <div />;
		}
	}
}
