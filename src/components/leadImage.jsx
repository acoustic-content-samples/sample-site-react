/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {loadContent, getContent, subscribe, getImageUrl} from 'wch-flux-sdk';
import 'styles/components/leadImage.scss';

export class LeadImage extends React.Component {
    constructor(props) {
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

    componentWillMount() {
        let content = getContent(this.props.contentId);
        if (content) {
            this.setState({contentData: content});
        } else {
            loadContent(this.props.contentId);
        }
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
        this.sub.unsubscribe();
    }

    render() {
        let imageUrl = '';
        let altText = '';
        let contentId = '';
        let imageRendition = 'lead';
        let status = '';

        if (this.props.summary) {
            imageRendition = 'card';
        }

        if (this.state.contentData.elements) {
            status = this.state.contentData.status;
            contentId = this.state.contentData.id;
            imageUrl = getImageUrl(this.state.contentData.elements.leadImage, imageRendition, status);
            altText = this.state.contentData.elements.leadImage.altText;
        }

        return (
            <div id={contentId} className="article-lead-image">
                <div className="image-container">
                    <img src={imageUrl} alt={altText} title={altText} />
                </div>
            </div>
        )
    }
}