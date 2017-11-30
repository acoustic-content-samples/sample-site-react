/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {loadContent, getContent, subscribe} from 'wch-flux-sdk';
import { ViewAllButton } from '../components';
import '../../styles/pages/errorPage.scss';

export class ErrorPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            contentData: {},
        };

        this.sub = subscribe('content', () => {
            this.setState({
                contentData: getContent(ErrorPage.getErrorContentId()),
            });
        });

        loadContent(ErrorPage.getErrorContentId());
    }

    static getErrorContentId() {
        return 'fe3b25d4-5f96-4741-afc3-e27efe52f973';
    }

    componentWillMount() {
        let content = getContent(ErrorPage.getErrorContentId());
        if (content) {
            this.setState({contentData: content});
        } else {
            loadContent(ErrorPage.getErrorContentId());
        }
    }

    componentWillUnmount(){
        this.sub.unsubscribe();
    }

    render() {

        let errorMessage = '';
        let goHomeButton = {};

        if (this.state.contentData && this.state.contentData.elements) {
            errorMessage = this.state.contentData.elements.errorMessage.value;
            goHomeButton = this.state.contentData.elements.goHomeButton;
        }

        function errorMessageHTML() {return {__html: errorMessage}}

        return (
            <div className="grid-container grid-container-padded section">
                <div className="error-wrapper">
                    <div className="error-code">
                        {this.props.status}
                    </div>
                    <div className="error-code-message">
                        <p dangerouslySetInnerHTML={errorMessageHTML()} />
                        <ViewAllButton link={goHomeButton} />
                    </div>
                </div>
            </div>
        )
    }
}