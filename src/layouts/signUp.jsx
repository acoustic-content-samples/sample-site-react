/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {loadContent, getContent, subscribe, getImageUrl} from 'wch-flux-sdk';
import 'styles/layouts/signUp.scss';

export class SignUp extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            contentData:{},
            emailAddress: '',
            itemId: 'signup-' + Date.now() + '-' + props.contentId
        };

        this.sub = subscribe('content', () => {
            let content = getContent(this.props.contentId);
            if (content) {
                this.setState({
                    contentData: content
                });
            }
        });

        this.openModal = this.openModal.bind(this);
        this.inputValue = this.inputValue.bind(this);
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

    componentDidMount(){
        $("#"+ this.state.itemId).foundation();
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

    componentWillUnmount(){
        let signupModal = $(`#${this.state.itemId}`);
        signupModal.foundation('_destroy');
        signupModal.remove();
        this.sub.unsubscribe();
    }

    openModal() {
        $("#"+ this.state.itemId).foundation('open');
    }

    inputValue(e) {
        this.state.emailAddress = e.target.value;
        if(e.key === 'Enter'){
            this.openModal();
        }
    }

    render(){
        let imageURL = '';
        let headline = '';
        let callToAction = '';
        let dialogMessage = '';
        let itemId= '';
        let backgroundStyle = {};
        let contentId = '';
        let status = '';

        if (this.state.contentData.elements){
            status = this.state.contentData.status;
            contentId = this.state.contentData.id;
            itemId = this.state.itemId;
            if(this.state.contentData.elements.backgroundImage.renditions) {
                imageURL = getImageUrl(this.state.contentData.elements.backgroundImage, 'short', status);
            }
            dialogMessage = this.state.contentData.elements.dialogMessage.value;
            backgroundStyle = {
                backgroundImage: `url(${imageURL})`
            };
            headline = this.state.contentData.elements.text.value;
            callToAction = this.state.contentData.elements.link.linkText;

        }

        function createDialogMessage() { return {__html: dialogMessage}; };

        function formPreventSubmit(e) {
            e.preventDefault();
        }

        return (
            <div id={contentId}>
                <div className="reveal" id={itemId} data-reveal={""} aria-labelledby="modalTitle" aria-hidden="true" role="dialog">
                    <div dangerouslySetInnerHTML={createDialogMessage()}></div>
                    <a className="close-button" data-close={""} aria-label="Close">&#215;</a>
                </div>

                <section className="grid-container">
                    <div className="newsletter" style={backgroundStyle} >
                        <div className="call-to-action">
                            <h4>{headline}</h4>
                        </div>
                        <div className="wrap-inputs">
                            <form name="emailForm" onSubmit={formPreventSubmit}>
                                <input onKeyUp={this.inputValue} type="text" className="text-content" placeholder="Email address" name="emailAddr" >
                                </input>
                                <button onClick={this.openModal} type="button" className="button news-btn float-right" id="newsletter-subscribe" > {callToAction} </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}