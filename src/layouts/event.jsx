/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import 'styles/layouts/event.scss';

export class Event extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			eventId: 'event-' + Date.now() + '-' + this.props.contentId,
		};
	}

	componentDidMount () {
		$(`#${this.state.eventId}`).foundation();
	}

	componentDidUpdate () {
		//component was update so update the foundation plugin
		$(`#${this.state.eventId}`).foundation();
	}

	componentWillUnmount () {
		let signupModal = $(`#${this.state.eventId}`);
		signupModal.foundation('_destroy');
		signupModal.remove();
	}

	render () {
		// console.log(`Event: ${JSON.stringify(this.state.contentData)}`);
		let eventTitle = '';
		let eventDate = '';
		let eventLocation = '';
		let eventDescription = '';
		let eventDetails = '';
		let contentId = '';

		if (this.props.renderingContext) {
			contentId = this.props.renderingContext.id;
			eventTitle = this.props.renderingContext.elements.heading.value;
			eventDate = new Date(
				this.props.renderingContext.elements.date.value
			).toDateString();
			eventLocation = this.props.renderingContext.elements.eventLocation
				.value;
			eventDescription = this.props.renderingContext.elements.body.value;
			eventDetails = this.props.renderingContext.elements.eventDetails
				.value;

			function eventDetailsHTML () {
				return { __html: eventDetails };
			}

			function eventDescriptionHTML () {
				return { __html: eventDescription };
			}

			function eventLocationHTML () {
				return { __html: eventLocation };
			}

			return (
				<div
					data-renderingcontext-id={this.props.renderingContext.id}
					id={contentId}>
					<div
						className="reveal"
						id={this.state.eventId}
						data-reveal={''}>
						<h2
							data-wch-inline-edit="elements.heading.value"
							className="event-popup-title"
							id="popup-title">
							{eventTitle}
						</h2>
						<p
							className="event-popup-description"
							id="popup-description">
							<span
								data-wch-inline-edit="elements.eventDetails.value"
								dangerouslySetInnerHTML={eventDetailsHTML()}
							/>
						</p>
						<p>
							Location:
							<span
								data-wch-inline-edit="elements.eventLocation.value"
								dangerouslySetInnerHTML={eventLocationHTML()}
							/>
						</p>
						<button
							className="close-button"
							data-close={''}
							type="button"
							aria-label="Close modal">
							<span aria-hidden="true">&times;</span>
						</button>
					</div>

					<section>
						<div className="event">
							<div className="event-content">
								<time
									data-wch-inline-edit="elements.date.value"
									className="event-date text-content"
									dateTime={eventDate}>
									{eventDate}
								</time>
								<h5
									data-wch-inline-edit="elements.heading.value"
									className="event-title text-header">
									{eventTitle}
								</h5>
								<p className="event-description text-content">
									<span
										data-wch-inline-edit="elements.body.value"
										dangerouslySetInnerHTML={eventDescriptionHTML()}
									/>
								</p>
								<a
									className="button"
									data-open={this.state.eventId}>
									Details
								</a>
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
