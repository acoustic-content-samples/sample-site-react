/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {
    loadContent,
    getContent,
    subscribe,
    getQueryString,
    getFirstCategory,
    queryContent,
    getQuery,
    sortQueriedItems
} from 'wch-flux-sdk';
import {WchContent} from 'wch-flux-sdk/react';
import 'styles/layouts/galleryDynamicList.scss';
import {ViewAllButton} from '../components';

export class GalleryDynamicList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            contentData: {},
            items: {}
        };

        this.sub = subscribe('content', () => {
            let content = getContent(this.props.contentId);
            if (content) {
                if(this.state.contentData.elements){
                    if(this.state.contentData.elements.maxItem.value !== content.elements.maxItem.value){
                        this.query(content.elements.maxItem.value);
                    }
                }
                this.setState({contentData: content});
            }
        });

        this.subquery = subscribe('queries', () => {
            let type = this.state.contentData.elements.contentType ? this.state.contentData.elements.contentType : '';
            let category = getFirstCategory(type);
            let maxItems = this.state.contentData.elements.maxItem.value ? this.state.contentData.elements.maxItem.value : 10;
            let queryString = getQueryString(category, maxItems);
            this.setState({items: getQuery(queryString)});
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

    componentDidMount() {
        if (this.state.contentData.elements) {
            this.query(this.state.contentData.elements.maxItem.value);
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !(nextState.items === undefined );
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
        this.subquery.unsubscribe();
    }

    query(maxItem=10) {
        if (this.state.contentData.elements) {
            let type = this.state.contentData.elements.contentType ? this.state.contentData.elements.contentType : '';
            let category = getFirstCategory(type);
            let maxItems = maxItem;
            queryContent(category, maxItems);
        }
    }

    render() {
        let listTitle = '';
        let viewAllLink='';
        let galleryItems = [];
        let contentId = '';
        let sortOrder = '';
        let type = '';
        let maxItems ='';

        if (this.state.contentData.elements) {
            contentId = this.state.contentData.id;
            listTitle = this.state.contentData.elements.listTitle.value;
            viewAllLink = this.state.contentData.elements.viewAllLink ? this.state.contentData.elements.viewAllLink : {};
            sortOrder = this.state.contentData.elements.sortOrder;
            type = getFirstCategory(this.state.contentData.elements.contentType);
            maxItems = this.state.contentData.elements.maxItem;
        }

        if (this.state.items && this.state.items.itemsContext) {
            let sortField = (type === 'Alphabetical ascending' || type === 'Alphabetical descending') ? 'heading' : 'date';
            let sortedItems = sortQueriedItems(this.state.items.itemsContext, sortField, getFirstCategory(sortOrder), maxItems.value);

            galleryItems = sortedItems.map(item => (
                <div id={item.id} key={item.id} className="medium-4 cell">
                    <WchContent contentId={item.id} summary={true}/>
                </div>
            ));
        }

        return (
            <div id={contentId} className="query-gallery">
                <h3>{listTitle}</h3>
                <div className="grid-container grid-container-padded">
                    <div className="grid-x grid-margin-x">
                        {galleryItems}
                    </div>
                </div>
                <ViewAllButton link={viewAllLink}/>
            </div>
        )
    }
}