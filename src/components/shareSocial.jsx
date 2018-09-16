/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import 'styles/components/shareSocial.scss';

export class ShareSocial extends React.Component {
	constructor (props) {
		super(props);

		this.options = {
			tweetOptions: {
				baseUrl:
					'https://platform.twitter.com/widgets/tweet_button.html',
				url: encodeURIComponent(window.location.href),
				buttonSize: 's',
				text: '',
				hashtags: '',
			},
			facebookOptions: {
				baseUrl: 'https://www.facebook.com/plugins/share_button.php',
				url: encodeURIComponent(window.location.href),
				layout: 'button',
				size: 'small',
				mobile_iframe: false,
			},
		};
	}

	render () {
		let shareMsg = this.props.shareMsg;
		let author = this.props.author;
		let twitterLink = `${this.options.tweetOptions.baseUrl}?size=${
			this.options.tweetOptions.buttonSize
		}&url=${
			this.options.tweetOptions.url
		}&text=${shareMsg}&hashtags=${author}`;
		let facebookLink = `${this.options.facebookOptions.baseUrl}?href=${
			this.options.facebookOptions.url
		}&layout=${this.options.facebookOptions.layout}&size=${
			this.options.facebookOptions.size
		}&mobile_iframe=${this.options.facebookOptions.mobile_iframe}&appId`;
		let styleTwitter = { border: '0', overflow: 'hidden' };
		let styleFacebook = { border: '0', overflow: 'hidden' };

		return (
			<div className="share-buttons">
				<span className="twitter">
					{twitterLink ? (
						<iframe
							src={twitterLink}
							width={76}
							height={20}
							title={'Twitter Tweet Button'}
							style={styleTwitter}
						/>
					) : (
						''
					)}
				</span>
				<span className="facebook">
					{facebookLink ? (
						<iframe
							src={facebookLink}
							width={59}
							height={20}
							style={styleFacebook}
						/>
					) : (
						''
					)}
				</span>
			</div>
		);
	}
}
