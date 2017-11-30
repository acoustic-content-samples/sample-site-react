/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {loadContent, getContent, subscribe} from 'wch-flux-sdk';
import {LeadImage} from '.';
import 'styles/components/designArticleSummary.scss';

export class DesignArticleSummary extends React.Component{
    constructor (props) {
        super(props);

        this.state = {
            contentData: {}
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

    componentWillMount () {
        let content = getContent(this.props.contentId);
        if (content) {
            this.setState({contentData: content});
        } else {
            loadContent(this.props.contentId);
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

    shouldComponentUpdate(nextProps, nextState) {
        let currentModified = new Date(this.state.contentData.lastModified);
        let newModified = new Date(nextState.contentData.lastModified);

        return (currentModified.getTime() !== newModified.getTime());
    }

    componentWillUnmount() {
        this.sub.unsubscribe();
    }

    render () {
        let leadImageId = '';
        let heading = '';
        let contentId= '';

        if(this.state.contentData && this.state.contentData.elements){
            leadImageId = this.state.contentData.elements.mainImage.value.id;
            heading = this.state.contentData.elements.heading.value;
            contentId = this.state.contentData.id;
        }

        return (
            <div id={contentId} className="summary-card">
                    <div className="summary-card-image">
                        {leadImageId ? (<LeadImage contentId={leadImageId}  summary={true}/>) : ('')}
                    </div>
                <p>{heading}</p>
            </div>
        )
    }
}