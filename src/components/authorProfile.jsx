/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {loadContent, getContent, subscribe, getImageUrl} from 'wch-flux-sdk';
import 'styles/components/authorProfile.scss';

export class AuthorProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contentData: {}
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
        let imageUrl='';
        let altText='';
        let name='';
        let shortBio='';
        let imageRendition='closeUp';
        let status='';

        if(this.state.contentData.elements) {
            status = this.state.contentData.status;
            if (this.state.contentData.elements.profilePicture.renditions) {
                imageUrl = getImageUrl(this.state.contentData.elements.profilePicture, imageRendition, status);
            }
            altText = this.state.contentData.elements.altText;
            name = this.state.contentData.elements.name.value;
            shortBio = this.state.contentData.elements.shortBio.value;
        }

        function shortBioHTML() {
            return {__html: shortBio}
        }

        return (
            <div className="about-the-author">
                <img src={imageUrl} alt={altText} title={altText} />
                <div>
                    <h5>
                        {name}
                    </h5>
                    <div dangerouslySetInnerHTML={shortBioHTML()}/>
                </div>
            </div>
        )
    }
}