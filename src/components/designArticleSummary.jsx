/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import 'styles/components/designArticleSummary.scss';
import {WchContent} from "../../wch-flux-sdk/react/wchContent";

export class DesignArticleSummary extends React.Component{
    constructor (props) {
        super(props);

    }

    render () {
        let leadImageId = '';
        let heading = '';
        let contentId= '';

        if(this.props.renderingContext && this.props.renderingContext.elements) {
			leadImageId = this.props.renderingContext.elements.mainImage.value.id;
			heading = this.props.renderingContext.elements.heading.value;
			contentId = this.props.renderingContext.id;


			return (
                <div data-renderingcontext-id={this.props.renderingContext.id} id={contentId} className="summary-card">
                    <div className="summary-card-image">
						{leadImageId ? (<WchContent contentId={leadImageId} summary={true}/>) : ('')}
                    </div>
                    <p data-wch-inline-edit="elements.heading.value">{heading}</p>
                </div>
			)
		} else {
            return <div></div>
        }
    }
}