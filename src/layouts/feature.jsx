/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {Link} from 'react-router-dom';
import {loadContent, getContent, subscribe, getImageUrl, getFirstCategory} from 'wch-flux-sdk';
import 'styles/layouts/feature.scss';

export class Feature extends React.Component {
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
        this.setState((prevState, props) => {
            let content = getContent(props.contentId);
            if (content) {
                return {contentData: content};
            } else {
                loadContent(this.props.contentId);
            }
        });
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
        let headline = '';
        let description = '';
        let readMore = {linkURL: '', linkText: ''};
        let imageURL = '';
        let imageSize = 'medium';
        let imagePlacement = 'right';
        let altText = '';
        let hasImage = false;
        let contentId = '';
        let status = '';

        if (this.state.contentData.elements) {
            status = this.state.contentData.status;
            contentId = this.state.contentData.id;
            headline = this.state.contentData.elements.featureHeadline.value;
            description = this.state.contentData.elements.descriptionOfFeature.value;
            if (this.state.contentData.elements.image.hasOwnProperty('renditions')) {
                hasImage = true;
                if(this.state.contentData.elements.imageSize.categories) {
                    this.state.contentData.elements.imageSize.categories.forEach(cat => {
                        let category = cat.split('/');
                        if(category[1] === 'Size'){
                            imageSize = category[2].toLowerCase();
                        }
                        else if (category[1] === 'Placement'){
                            imagePlacement = category[2].toLowerCase();
                        }
                    })

                    // let category = this.state.contentData.elements.imageSize.categories.
                    // imageSize = getFirstCategory(this.state.contentData.elements.imageSize);
                }
                imageURL = getImageUrl(this.state.contentData.elements.image, imageSize, status);
                altText = this.state.contentData.elements.image.altText;
                // imagePlacement = getFirstCategory(this.state.contentData.elements.imagePlacement);
                readMore = this.state.contentData.elements.readMoreLink;
            }
        }

        function createDescription() {
            return {__html: description};
        }

        function classNames() {
            let css = [
                'feature',
                'section'
            ];

            if (imagePlacement) {
                css.push(`feature-img-${imagePlacement}`);
            }
            if (imageSize) {
                css.push(`feature-${imageSize}`);
            }

            return css;
        }

        if (hasImage) {
            return (
                <div id={contentId} className={classNames().join(' ')}>
                    <div className="feature-copy">
                        <div className="feature-copy-content">
                            <h2>{headline}</h2>
                            <div className="text-content" dangerouslySetInnerHTML={createDescription()}></div>
                            {(readMore.linkURL) ?
                                (/^https?:\/\//.test(readMore.linkURL)
                                ? <a href={readMore.linkURL} target="_blank">
                                    <button className="button">{readMore.linkText}</button>
                                </a>
                                : <Link to={readMore.linkURL}>
                                    <button className="button">{readMore.linkText}</button>
                                </Link>
                                ) : ''
                            }
                        </div>
                    </div>
                    <div className="feature-img">
                        <img src={imageURL} alt={altText} title={altText}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div id={contentId} className="feature section">
                    <div className="feature-no-image-copy grid-x grid-padding-x">
                        <div className="feature-no-image-copy-content medium-8 cell">
                            <h5>{headline}</h5>
                            <div className="text-content" dangerouslySetInnerHTML={createDescription()}></div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}