/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {loadContent, getContent, subscribe, getVideoUrl} from 'wch-flux-sdk';
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
        scriptTag.addEventListener('error', () => reject('Error loading script.'));
        scriptTag.addEventListener('abort', () => reject('Script loading aborted.'));
        document.body.appendChild(scriptTag);
    } else {
        resolve();
    }
});

export class HeroVideo extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            contentData: {}
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

    componentWillMount() {
        let content = getContent(this.props.contentId);
        if (content) {
            this.setState({contentData: content});
        } else {
            loadContent(this.props.contentId);
        }
    }

    componentDidMount() {
        videoJsLoaded.then(() => this.player = videojs(this.videoElementId()));
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
        if (this.player) {
            this.player.dispose();
        }
    }

    videoElementId () {return 'hero-video-' + this.state.contentData.id}

    render(){
        let videoUrl = '';
        let mediaType = '';

        if(this.state.contentData.elements) {
            videoUrl = getVideoUrl(this.state.contentData.elements.video);
            mediaType = this.state.contentData.elements.video.asset ? this.state.contentData.elements.video.asset.mediaType : '';
        }

        return (
            <div id={this.state.contentData.id} className="wch-hero-video responsive-embed widescreen">
                <video
                    id={this.videoElementId()}
                    controls
                    className="video-js vjs-default-skin vjs-big-play-centered vjs-16-9">
                    <source src={videoUrl} type={mediaType}/>
                    Your browser doesn't support HTML5 video.
                </video>
            </div>
        )
    }
}