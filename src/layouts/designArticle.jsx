/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import { layoutHOC } from 'wch-flux-sdk/react';
import 'styles/layouts/designArticle.scss';
import {ShareSocial} from "../components/shareSocial";
import {DesignArticleSummary} from '../components';
import {WchContent} from "../../wch-flux-sdk/react/wchContent";

export class DesignArticle extends React.Component {

    render() {
        let heading = '';
        let leadImageId = '';
        let author = '';
        let authorBioId = '';
        let date = '';
        let body = [];
        let bodyImages = [];
        const DesignArticleSummaryWithLayout = layoutHOC(DesignArticleSummary);

        if(this.props.renderingContext) {
			heading = this.props.renderingContext.elements.heading.value;
			leadImageId = this.props.renderingContext.elements.mainImage.value ? this.props.renderingContext.elements.mainImage.value.id : '';
			author = this.props.renderingContext.elements.author.value;
			authorBioId = this.props.renderingContext.elements.authorBio.value ? this.props.renderingContext.elements.authorBio.value.id : '';
			date = new Date(this.props.renderingContext.elements.date.value).toDateString();
			body = this.props.renderingContext.elements.body.values ? this.props.renderingContext.elements.body.values : [];
			bodyImages = this.props.renderingContext.elements.bodyImage.values ? this.props.renderingContext.elements.bodyImage.values : [];


			function itemHTML(item) {
				return {__html: item}
			};

			let articleBody = body.map((item, index) => {
				let bodyEditAccessor = `elements.body.values[${index}]`;
				return (<div key={index} className="article-body">
                    <div data-wch-inline-edit={bodyEditAccessor} dangerouslySetInnerHTML={itemHTML(item)}></div>
					{(index < bodyImages.length) ? (<WchContent contentId={bodyImages[index].id}/>) : ('')}
                </div>)
			});

			let articleBodyImage = bodyImages.slice(body.length).map((image, index) => {
				let editAccessor = `elements.bodyImage.values[${index}]`;
				return (<div key={index} data-wch-inline-edit={editAccessor} className="article-medium-image">
                    <WchContent contentId={image.id}/>
                </div>)
			});

			if (this.props.summary) {
				return (<DesignArticleSummaryWithLayout renderingContext={this.props.renderingContext} contentId={this.props.renderingContext.id}/>);
			} else {
				return (
                    <div data-renderingcontext-id={this.props.renderingContext.id}>
						{leadImageId.length > 0 ? (<WchContent contentId={leadImageId} summary={false}/>) : ('') }
                        <h2 className="headline" data-wch-inline-edit="elements.heading.value">{heading}</h2>
                        <div className="article-details">
                            <div className="byline-and-date">
                                By <b className="author" data-wch-inline-edit="elements.author.value">{author}</b>, <span data-wch-inline-edit="elements.date.value">{date}</span>
                            </div>
							{(heading && author) ? (<ShareSocial shareMsg={heading} author={author}/>) : ('')}
                        </div>
						{body.length > 0 ? (articleBody) : ''}
						{articleBodyImage}
						{authorBioId ? (<WchContent contentId={authorBioId}/>) : ('')}
                    </div>
				)
			}
		} else {
            return <div></div>;
        }

    }
}