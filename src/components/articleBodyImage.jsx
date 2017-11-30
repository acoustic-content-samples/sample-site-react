/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {loadContent, getContent, subscribe, getImageUrl, getFirstCategory} from 'wch-flux-sdk';
import 'styles/components/articleBodyImage.scss';

export class ArticleBodyImage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contentData: {},
            gotContent: false
        };

        this.sub = subscribe('content', () => {
            let content = getContent(this.props.contentId);
            if (content) {
                this.setState({
                    contentData: content,
                    gotContent: true
                });
            }
        });
    }

    componentWillMount() {
        let content = getContent(this.props.contentId);
        if (content) {
            this.setState({
                contentData: content,
                gotContent: true
            });
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

    render() {
        let imageSize='';
        let imageUrl='';
        let altText='';
        let imagePlacement='';
        let caption='';
        let credit='';
        let className=[];
        let status='';

        if(this.state.gotContent){
            status = this.state.contentData.status;
            if(this.state.contentData.elements.image.renditions) {
                imageSize = getFirstCategory(this.state.contentData.elements.imageSize);
                altText = this.state.contentData.elements.image.altText;
            }
            imageUrl = getImageUrl(this.state.contentData.elements.image, imageSize, status);
            imagePlacement = getFirstCategory(this.state.contentData.elements.imagePlacement);
            caption = this.state.contentData.elements.imageCaption.value;
            credit = this.state.contentData.elements.imageCredit.value;
            if (imagePlacement) {
                className.push(`wrap-text-${imagePlacement}`);
            }
            if (imageSize) {
                className.push(`article-${imageSize.toLowerCase()}-image`);
            }
        }

        return (
            <div id={this.state.contentData.id} className={className.join(' ')}>
                <img src={imageUrl} alt={altText} title={altText} />
                <div className="caption" >{caption}
                    <span>{credit}</span>
                </div>
            </div>
        )
    }
}