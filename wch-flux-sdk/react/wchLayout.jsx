/*
 Copyright IBM Corporation 2017.
 LICENSE: Apache License, Version 2.0
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { loadContent, getContent, subscribe, isPreview } from 'wch-flux-sdk';
import { getEditService } from 'wch-flux-sdk/react';
import { ReplaySubject } from 'rxjs/ReplaySubject';

const wrapper = (WrappedComponent) => {
	class WchLayoutHOC extends React.Component {
		constructor(props) {
			super(props);
			this.onRenderingContext = new ReplaySubject(1);

			this.myRef = React.createRef();

			this.state = {
			};


		}



		/*
		componentWillReceiveProps(nextProp) {
			if(nextProp.contentId != this.props.contentId) {
				//this._getContent(nextProp.contentId);
			}
		}
		*/

		componentDidMount() {
			//this._getContent(this.props.contentId);
			this.onRenderingContext.next(this.props.renderingContext);
			this.registerInlineElements(this.myRef);
		}

		componentDidUpdate(){
			//TODO do we need to register mutliple times?  What are the side-effects
			//for example,  what happens if a new element is added,  we would need to register that
			this.onRenderingContext.next(this.props.renderingContext);
			this.registerInlineElements(this.myRef);
		}

		componentDidCatch(error, info) {
			console.error(error);
		}


		registerInlineElements(componentElem)  {
			if(isPreview()) {
				let elemDom = componentElem;
				if (elemDom && elemDom.current) {

					//for HOC components ref.current will be a component and not a DOM element.
					//check for and convert component to DOM if needed.
					if (!elemDom.current.querySelectorAll) {
						elemDom = ReactDOM.findDOMNode(elemDom.current);
					} else {
						elemDom = elemDom.current;
					}

					elemDom.querySelectorAll('[data-wch-inline-edit]').forEach((elem) => {

						const accessor = elem.dataset.wchInlineEdit;
						if (accessor) {
							getEditService().registerComponent(elem, elem.dataset.wchInlineEdit, this.onRenderingContext, this.props.contentId);
						}
					})
				}
			}
		}

		render() {
			let rev = (this.props.renderingContext) ? this.props.renderingContext : '';
			return(
				<div >
					<WrappedComponent
						ref={this.myRef}
					rev={rev}
					renderingContext={this.props.renderingContext}
					{...this.props}
				/>
				</div>)
		}

	}
	WchLayoutHOC.displayName = `WchLayoutHOC(${getDisplayName(WrappedComponent)})`;

	return WchLayoutHOC
};

function getDisplayName(WrappedComponent) {
	return (WrappedComponent) ? (WrappedComponent.displayName || WrappedComponent.name || 'Component') : 'no component found';
}

export {wrapper as withLayout};



