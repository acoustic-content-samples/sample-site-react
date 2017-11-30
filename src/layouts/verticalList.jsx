/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {loadContent, getContent, subscribe} from 'wch-flux-sdk';
import {WchContent} from 'wch-flux-sdk/react';
import 'styles/layouts/verticalList.scss';
import {ViewAllButton} from '../components';

export class VerticalList extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            contentData:{}
        };

        this.sub = subscribe('content', ()=> {
            let content = getContent(this.props.contentId);
            if (content) {
                this.setState({
                    contentData: content
                });
            }
        });
    }

    componentWillMount(){
        let content = getContent(this.props.contentId);
        if (content) {
            this.setState({
                contentData: content
            });
        } else {
            loadContent(this.props.contentId);
        }
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.contentId !== this.props.contentId) {
            this.setState({contentData: {}});
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

    render(){

        let heading = '';
        let items = '';
        let viewAllLink = '';
        let list = '';

        if(this.state.contentData.elements) {
            heading = this.state.contentData.elements.heading.value;
            items = this.state.contentData.elements.items.values;
            viewAllLink = this.state.contentData.elements.viewAllLink;
            list = items.map(item => (
                <div key={item.id} id={item.id} className="cell">
                    <WchContent contentId={item.id} summary={true}/>
                </div>)
            );
        }

        return (
            <div id={this.state.contentData.id} className="item-selection">
                <h4>{heading}</h4>
                <div className="grid-y generic-list">
                    {list}
                </div>
                <ViewAllButton link={viewAllLink}/>
            </div>
        )
    }
}