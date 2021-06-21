/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import 'styles/components/previewComponent.scss';
import {
	WchContent,
	ComponentRegistry,
	ComponentRegistryByLayout,
} from '@acoustic-content-sdk/wch-flux-sdk/react';
import FileSaver from 'file-saver';
import domtoimage from '../../node_modules/dom-to-image/dist/dom-to-image.min';

export class PreviewComponent extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			layoutId: null,
			contentId: null,
			errorMsg: '',
		};

		this.createThumbnail = this.createThumbnail.bind(this);
	}

	// need time for all the registerComponents to complete in app.jsx first
	componentDidMount () {
		setTimeout(() => {
			this.getSampleIds();
		}, 1000);
	}

	// URL to this page: component-preview?layout=${name}&content=${contentId}
	// retrieve the layout and content item IDs from the browser query params
	// 		display an error if either are missing
	getSampleIds () {
		const params = new URL(location.toString()).searchParams;
		const layoutId = params.get('layout');
		const contentId = params.get('content');
		if (!layoutId || !contentId) {
			const msg =
				!layoutId && !contentId
					? 'A layout and content item'
					: !layoutId
						? 'A layout'
						: 'A content item';
			this.setState({ errorMsg: `${msg} must be provided to preview.` });
		} else {
			this.setState({
				layoutId: layoutId,
				contentId: contentId,
				errorMsg: '',
			});
		}
	}

	// create a small screenshot of the previewed component, users can add this as a thumbnail for the Type in WCH
	createThumbnail () {
		// grab the node that contains the previewed rendering context, find its height and width
		// the height should be no more than 1600px
		// the width should be no more than 2400px
		const node = document.getElementById('preview-container');
		const nodeWidth = node.offsetWidth > 1600 ? 1600 : node.offsetWidth;
		const nodeHeight = node.offsetHeight > 2400 ? 2400 : node.offsetHeight;

		// options to transform the screenshot into a thumbnail image
		// the image is scaled to 1/4 its size and capped at width = 1600/4 = 400px, and height = 2400/4 = 600px
		const blobOptions = {
			width: nodeWidth / 4, // overall width of the image
			height: nodeHeight / 4, // overall height of the image
			quality: 0.9, // png quality option
			style: {
				// styles applied to the node before it is screenshot
				width: nodeWidth + 'px',
				height: nodeHeight + 'px',
				overflow: 'hidden',
				transform: 'scale(0.25)', // shrink to 1/4 size
				transformOrigin: '0 0',
				backgroundColor: 'white',
				padding: '0',
				margin: '0',
			},
			filter: n => !n.tagName || n.tagName.toLowerCase() !== 'iframe', // remove all iframes to avoid cross-site errors
		};
		console.log(
			`Creating ${nodeWidth / 4}x${nodeHeight / 4} thumbnail of %o`,
			node
		);

		// save the resulting screenshot to the user's computer
		domtoimage
			.toBlob(node, blobOptions)
			.then(blob => {
				FileSaver.saveAs(blob, `thumbnail_${this.state.layoutId}.png`);
			})
			.catch(e => {
				console.error('Could not create thumbnail', e);
				confirm('Could not create thumbnail');
			});
	}

	render () {
		return (
			<div>
				{this.state.errorMsg && (
					<h4 className="msg error">{this.state.errorMsg}</h4>
				)}
				<button
					className="create-thumbnail"
					onClick={this.createThumbnail}>
					Capture a thumbnail from this preview
				</button>
				<div className="preview-container" id="preview-container">
					{this.state.contentId &&
						this.state.layoutId && (
							<WchContent
								contentId={this.state.contentId}
								layoutId={this.state.layoutId}
							/>
						)}
				</div>
			</div>
		);
	}
}
