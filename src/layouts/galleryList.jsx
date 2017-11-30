/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {loadContent, getContent, subscribe} from 'wch-flux-sdk';
import {ViewAllButton} from '../components';
import {WchContent} from 'wch-flux-sdk/react';
import 'styles/layouts/galleryList.scss';

export class GalleryList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contentData: {}
        };

        this.sub = subscribe('content', () => {
            let content = getContent(this.props.contentId);
            if (content) {
                this.setState({contentData: content});
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
        let heading = '';
        let items = [];
        let viewAllLink = {};
        let styleGalleryList = {
            textAlign: 'center'
        };

        if (this.state.contentData.elements) {
            heading = this.state.contentData.elements.heading.value;
            items = this.state.contentData.elements.items.values;
            viewAllLink = this.state.contentData.elements.viewAllLink ? this.state.contentData.elements.viewAllLink : {};
        }


        let makeSlide = items.map(item => (<div key={item.id} id={item.id} className="medium-4 cell">
                                                <WchContent contentId={item.id} summary={true}/>
                                            </div>)
        );

        return (
            <div id={this.props.contentId} className="item-selection">
                <h3 style={styleGalleryList}> {heading}</h3>
                    <div className="grid-x grid-margin-x">
                        {makeSlide}
                    </div>
                <ViewAllButton link={viewAllLink} />
            </div>
        )
    }
}