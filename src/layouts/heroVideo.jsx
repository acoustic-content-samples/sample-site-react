/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import { getVideoUrl } from '@acoustic-content-sdk/wch-flux-sdk';
import 'styles/layouts/heroVideo.scss';

const videoJsLoaded = new Promise((resolve, reject) => {
	if (!document.getElementById('videojs-script-tag')) {
		let styleTag = document.createElement('link');
		styleTag.href = '//vjs.zencdn.net/6.2.8/video-js.css';
		styleTag.rel = 'stylesheet';
		styleTag.async = true;
		document.head.appendChild(styleTag);

		let scriptTag = document.createElement('script');
		scriptTag.id = 'videojs-script-tag';
		scriptTag.type = 'application/javascript';
		scriptTag.src = '//vjs.zencdn.net/6.2.8/video.js';
		scriptTag.async = true;
		scriptTag.addEventListener('load', resolve);
		scriptTag.addEventListener('error', () =>
			reject('Error loading script.')
		);
		scriptTag.addEventListener('abort', () =>
			reject('Script loading aborted.')
		);
		document.body.appendChild(scriptTag);
	} else {
		resolve();
	}
});

export class HeroVideo extends React.Component {
	componentDidMount () {
		videoJsLoaded.then(
			() => (this.player = videojs(this.videoElementId()))
		);
	}

	componentWillUnmount () {
		if (this.player) {
			this.player.dispose();
		}
	}

	videoElementId () {
		return 'hero-video-' + this.props.renderingContext.id;
	}

	render () {
		if (this.props.renderingContext) {
			let videoUrl = '';
			let mediaType = '';

			if (this.props.renderingContext) {
				videoUrl = getVideoUrl(
					this.props.renderingContext.elements.video
				);
				mediaType = this.props.renderingContext.elements.video.asset
					? this.props.renderingContext.elements.video.asset.mediaType
					: '';
			}

			return (
				<div data-renderingcontext-id={this.props.renderingContext.id}>
					<div
						data-wch-inline-edit="elements.video"
						id={this.props.renderingContext.id}
						className="wch-hero-video responsive-embed widescreen">
						<video
							id={this.videoElementId()}
							controls
							className="video-js vjs-default-skin vjs-big-play-centered vjs-16-9">
							<source src={videoUrl} type={mediaType} />
							Your browser doesn't support HTML5 video.
						</video>
					</div>
				</div>
			);
		} else {
			return <div />;
		}
	}
}
