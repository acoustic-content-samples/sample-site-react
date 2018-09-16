/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import 'styles/layouts/formComponent.scss';

export class FormComponent extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			nameValue: '',
			emailValue: '',
			dialogMessageTitle: '',
			dialogMessageBody: '',
			itemId: 'form-' + Date.now() + '-' + props.contentId,
		};

		this.openModal = this.openModal.bind(this);
		this.inputNameValue = this.inputNameValue.bind(this);
		this.inputEmailValue = this.inputEmailValue.bind(this);
		this.validateForm = this.validateForm.bind(this);
	}

	componentDidMount () {
		$('#' + this.state.itemId).foundation();
	}

	componentWillUnmount () {
		let confirmModal = $(`#${this.state.itemId}`);
		confirmModal.foundation('_destroy');
		confirmModal.remove();
	}

	inputNameValue (e) {
		this.setState({ nameValue: e.target.value });
		if (e.key === 'Enter') {
			this.validateForm();
			this.openModal();
		}
	}

	inputEmailValue (e) {
		this.setState({ emailValue: e.target.value });
		if (e.key === 'Enter') {
			this.validateForm();
			this.openModal();
		}
	}

	openModal () {
		$('#' + this.state.itemId).foundation('open');
	}

	validateForm () {
		if (!this.state.nameValue && !this.state.emailValue) {
			this.setState({ dialogMessageTitle: 'Error' });
			this.setState({
				dialogMessageBody:
					'Name and email are required. Please enter them in the form',
			});
			return false;
		} else if (!this.state.nameValue) {
			this.setState({ dialogMessageTitle: 'Error' });
			this.setState({
				dialogMessageBody:
					'Name is required. Please enter it in the form',
			});
			return false;
		} else if (!this.state.emailValue) {
			this.setState({ dialogMessageTitle: 'Error' });
			this.setState({
				dialogMessageBody:
					'Email is required. Please enter it in the form',
			});
			return false;
		} else {
			this.setState({ dialogMessageTitle: 'Thank you' });
			this.setState({ dialogMessageBody: "We'll be in touch." });
			return true;
		}
	}

	render () {
		let contentId = '';
		let itemId = '';
		let dialogMessageTitle = '';
		let dialogMessageBody = '';
		let headline = '';
		let name = '';
		let email = '';
		let enter = '';

		if (this.props.renderingContext.elements) {
			let elements = this.props.renderingContext.elements;
			contentId = this.props.renderingContext.id;
			itemId = this.state.itemId;
			dialogMessageTitle = this.state.dialogMessageTitle;
			dialogMessageBody = this.state.dialogMessageBody;
			headline = elements.headline.value ? elements.headline.value : '';
			name = elements.name.value ? elements.name.value : '';
			email = elements.email.value ? elements.email.value : '';
			enter = elements.enter;
		}

		return (
			<div
				id={contentId}
				data-renderingcontext-id={contentId}
				className="form-component grid-x">
				<div
					id={itemId}
					className="reveal"
					data-reveal={''}
					aria-labelledby="modalTitle"
					aria-hidden="true"
					role="dialog">
					<div className="dialogMessage">
						<h2>{dialogMessageTitle}</h2>
						<p>{dialogMessageBody}</p>
					</div>
					<a
						className="close-button"
						data-close={''}
						aria-label="Close">
						&#215;
					</a>
				</div>

				{headline ? (
					<h2
						className="headline cell"
						data-wch-inline-edit="elements.headline.value">
						{headline}
					</h2>
				) : (
					''
				)}
				<form className="section small-12 columns grid-x">
					<div className="input-group name-group small-12 medium-4 large-4 columns">
						{name ? (
							<div
								className="form-label"
								data-wch-inline-edit="elements.name.value">
								{name}
							</div>
						) : (
							''
						)}
						<input
							type="text"
							onKeyUp={this.inputNameValue}
							className="form-input"
							id="name-input"
							name="name"
						/>
					</div>

					<div className="input-group email-group small-12 medium-4 large-4 columns">
						{email ? (
							<div
								className="form-label"
								data-wch-inline-edit="elements.email.value">
								{email}
							</div>
						) : (
							''
						)}
						<input
							type="email"
							onKeyUp={this.inputEmailValue}
							className="form-input"
							id="email-input"
							name="email"
						/>
					</div>

					{enter ? (
						<button
							onClick={this.validateForm}
							data-wch-inline-edit="elements.enter"
							type="button"
							data-open={itemId}
							className="button small-12 medium-4 large-4"
							id="entry-form">
							{enter.linkText ? <div>{enter.linkText}</div> : ''}
						</button>
					) : (
						''
					)}
				</form>
			</div>
		);
	}
}
