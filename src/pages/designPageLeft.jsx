/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {Link} from 'react-router-dom';
import {loadContent, getContent, subscribe, getRouteForContentId} from 'wch-flux-sdk';
import {WchContent} from 'wch-flux-sdk/react';
import {DesignArticleSummary} from '../components';
import {DesignArticle} from '../layouts';
import {VerticalList} from "../layouts/verticalList";
import 'styles/pages/designPageLeft.scss';

export class DesignPageLeft extends React.Component {
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

    componentWillReceiveProps (nextProps) {
        if (nextProps.contentId !== this.props.contentId) {
            let content = getContent(nextProps.contentId);
            if (content) {
                this.setState({contentData: content});
            } else {
                loadContent(nextProps.contentId);
            }
        // loadContent(nextProps.contentId, true);
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

    render() {

        let designTopicId = '';
        let relatedArticlesId = '';
        let route = '';
        let summary = '';

        if (this.state.contentData.elements) {
            if (this.state.contentData.elements.designTopic) {
                designTopicId = this.state.contentData.elements.designTopic.value ? this.state.contentData.elements.designTopic.value.id : '';
            }
            if (this.state.contentData.elements.relatedArticles){
                relatedArticlesId = this.state.contentData.elements.relatedArticles.value ? this.state.contentData.elements.relatedArticles.value.id : '';
            }
            route = getRouteForContentId(this.state.contentData.id) ? getRouteForContentId(this.state.contentData.id) : '#';
            summary = this.props.summary;
        }

        if (summary) {
            return (
                <div>
                    <Link to={route}>
                        {designTopicId.length > 0 ? (<DesignArticleSummary contentId={designTopicId}/>) : ('') }
                    </Link>
                </div>
            )
        } else {
            return (
                <div className="grid-container section-small">
                    <div id={this.state.contentData.id} className="grid-x grid-padding-x">
                        <div className="medium-8 cell auto">
                            <div className="section">
                                { designTopicId.length > 0 ? (<DesignArticle contentId={designTopicId}/>) : ('') }
                            </div>
                        </div>
                        <div className="medium-4 cell shrink">
                            <div className="section">
                                { relatedArticlesId.length > 0 ? (<VerticalList contentId={relatedArticlesId}/>) : ('') }
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }
}