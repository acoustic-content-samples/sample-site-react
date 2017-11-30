/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {Link} from 'react-router-dom';
import {loadContent, getContent, subscribe, getImageUrl} from 'wch-flux-sdk';
import 'styles/layouts/heroImage.scss';

export class HeroImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contentData: {},
            random:''
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

        // console.log('heroimage rendering');
        let headline = '';
        let altText = '';
        let url = '';
        let linkText = '';
        let linkUrl = '';
        let contentId = '';
        let imageRendition = 'short';
        let status = '';

        if (this.state.contentData.elements) {
            contentId = this.state.contentData.id;
            status = this.state.contentData.status;
            if(this.state.contentData.elements.image.renditions) {
                url = getImageUrl(this.state.contentData.elements.image, imageRendition, status);
            }
            headline = this.state.contentData.elements.text.value ? this.state.contentData.elements.text.value : '';
            altText = this.state.contentData.elements.image.altText ? this.state.contentData.elements.image.altText : '';
            linkText = this.state.contentData.elements.link.linkText ? this.state.contentData.elements.link.linkText : '';
            linkUrl = this.state.contentData.elements.link.linkURL ? this.state.contentData.elements.link.linkURL : '#';
        }

        return (
            <div id={contentId} className="wch-hero-image">
                <img src={url} title={altText} alt={altText}/>
                <div className="hero-message">
                    <h1 className="text-hero">{headline}</h1>
                    <Link to={linkUrl} className="button hero-button">{linkText}</Link>
                </div>
            </div>
        )
    }
}