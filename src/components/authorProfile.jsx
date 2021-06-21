/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import { getImageUrl } from '@acoustic-content-sdk/wch-flux-sdk';
import 'styles/components/authorProfile.scss';

export class AuthorProfile extends React.Component {
	constructor (props) {
		super(props);
	}

	render () {
		let imageUrl = '';
		let altText = '';
		let name = '';
		let shortBio = '';
		let imageRendition = 'closeUp';

		if (this.props.renderingContext) {
			if (
				this.props.renderingContext.elements.profilePicture.renditions
			) {
				imageUrl = getImageUrl(
					this.props.renderingContext.elements.profilePicture,
					imageRendition
				);
			}
			altText = this.props.renderingContext.elements.altText;
			name = this.props.renderingContext.elements.name.value;
			shortBio = this.props.renderingContext.elements.shortBio.value;

			function shortBioHTML () {
				return { __html: shortBio };
			}

			return (
				<div
					data-renderingcontext-id={this.props.renderingContext.id}
					className="about-the-author">
					<img
						data-wch-inline-edit="elements.profilePicture"
						src={imageUrl}
						alt={altText}
						title={altText}
					/>
					<div>
						<h5 data-wch-inline-edit="elements.name.value">
							{name}
						</h5>
						<div
							data-wch-inline-edit="elements.shortBio.value"
							dangerouslySetInnerHTML={shortBioHTML()}
						/>
					</div>
				</div>
			);
		} else {
			return <div />;
		}
	}
}
