/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {loadContent, getContent, subscribe} from 'wch-flux-sdk';
import {AuthorProfile, LeadImage, ArticleBodyImage} from '../components';
import 'styles/layouts/designArticle.scss';
import {ShareSocial} from "../components/shareSocial";
import {DesignArticleSummary} from '../components';

export class DesignArticle extends React.Component {
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
        }
    }

    componentWillUnmount() {
        this.sub.unsubscribe();
    }

    render() {
        let heading = '';
        let leadImageId = '';
        let author = '';
        let authorBioId = '';
        let date = '';
        let body = [];
        let bodyImages = [];

        if(this.state.contentData.elements){
            heading = this.state.contentData.elements.heading.value;
            leadImageId = this.state.contentData.elements.mainImage.value ? this.state.contentData.elements.mainImage.value.id : '';
            author = this.state.contentData.elements.author.value;
            authorBioId = this.state.contentData.elements.authorBio.value ? this.state.contentData.elements.authorBio.value.id : '';
            date = new Date(this.state.contentData.elements.date.value).toDateString();
            body = this.state.contentData.elements.body.values ? this.state.contentData.elements.body.values : [];
            bodyImages = this.state.contentData.elements.bodyImage.values ? this.state.contentData.elements.bodyImage.values : [];
        }

        function itemHTML(item) { return {__html: item}};

        let articleBody = body.map((item, index) => {
            return (<div key={index} className="article-body">
                        <div dangerouslySetInnerHTML={itemHTML(item)}></div>
                        {(index<bodyImages.length) ? (<ArticleBodyImage contentId={bodyImages[index].id} />) : ('')}
                    </div>)
        });

        let articleBodyImage = bodyImages.slice(body.length).map((image, index) => {
            return (<div key={index} className="article-medium-image">
                        <ArticleBodyImage contentId={image.id} />
                    </div>)
        });

        if (this.props.summary) {
            return (<DesignArticleSummary contentId={this.state.contentData.id}/>)
        } else {
            return (
                <div>
                    {leadImageId.length>0 ? (<LeadImage contentId={leadImageId} summary={false}/>) : ('') }
                    <h2 className="headline">{heading}</h2>
                    <div className="article-details">
                        <div className="byline-and-date">
                            By <b className="author">{author}</b>, <span>{date}</span>
                        </div>
                        {(heading && author) ? (<ShareSocial shareMsg={heading} author={author} />):('')}
                    </div>
                    {body.length>0 ? (articleBody) : ''}
                    {articleBodyImage}
                    {authorBioId ? (<AuthorProfile contentId={authorBioId} />):('')}
                </div>
            )
        }

    }
}