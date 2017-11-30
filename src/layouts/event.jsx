/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {loadContent, getContent, subscribe} from 'wch-flux-sdk';
import 'styles/layouts/event.scss';

export class Event extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contentData: {},
            eventId: 'event-'
        };

        this.sub = subscribe('content', () => {
            let content = getContent(this.props.contentId);
            if (content) {
                this.setState({
                    contentData: content
                });
            }
        });
    }

    componentWillMount() {
        // this.state.eventId = `event-${this.state.contentData.id}`;
        let content = getContent(this.props.contentId);
        if (content) {
            this.setState({
                contentData: content,
                eventId: 'event-' + Date.now() + '-' + content.id
            });
        } else {
            loadContent(this.props.contentId);
        }
    }

    componentDidMount() {
        $(`#${this.state.eventId}`).foundation();
    }

    shouldComponentUpdate(nextProps, nextState) {
        let currentModified = new Date(this.state.contentData.lastModified);
        let newModified = new Date(nextState.contentData.lastModified);

        return (currentModified.getTime() !== newModified.getTime());
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
        let signupModal = $(`#${this.state.eventId}`);
        signupModal.foundation('_destroy');
        signupModal.remove();
        this.sub.unsubscribe();
    }

    render() {
        // console.log(`Event: ${JSON.stringify(this.state.contentData)}`);
        let eventTitle = '';
        let eventDate = '';
        let eventLocation = '';
        let eventDescription = '';
        let eventDetails = '';
        let contentId = '';

        if (this.state.contentData.elements) {
            contentId = this.state.contentData.id;
            eventTitle = this.state.contentData.elements.heading.value;
            eventDate = new Date(this.state.contentData.elements.date.value).toDateString();
            eventLocation = this.state.contentData.elements.eventLocation.value;
            eventDescription = this.state.contentData.elements.body.value;
            eventDetails = this.state.contentData.elements.eventDetails.value;
        }

        function eventDetailsHTML() {
            return {__html: eventDetails}
        }

        function eventDescriptionHTML() {
            return {__html: eventDescription}
        }

        function eventLocationHTML() {
            return {__html: eventLocation}
        }

        return (
            <div id={contentId}>
                <div className="reveal" id={this.state.eventId} data-reveal={""}>
                    <h2 className="event-popup-title" id="popup-title">{eventTitle}</h2>
                    <p className="event-popup-description" id="popup-description"><span
                        dangerouslySetInnerHTML={eventDetailsHTML()}/></p>
                    <p>Location:
                        <span dangerouslySetInnerHTML={eventLocationHTML()}></span>
                    </p>
                    <button className="close-button" data-close={""} type="button" aria-label="Close modal">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>

                <section>
                    <div className="event">
                        <div className="event-content">
                            <time className="event-date text-content" dateTime={eventDate}>{eventDate}</time>
                            <h5 className="event-title text-header">{eventTitle}</h5>
                            <p className="event-description text-content"><span
                                dangerouslySetInnerHTML={eventDescriptionHTML()}/></p>
                            <a className="button" data-open={this.state.eventId}>Details</a>
                        </div>
                    </div>
                </section>
            </div>)
    }
}