/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';

import {
	BrowserRouter as Router,
	Route,
	Redirect,
	Switch,
} from 'react-router-dom';

import 'styles/app.scss';
import {
	WchPage,
	registerComponent,
	registerComponentContentId,
} from 'wch-flux-sdk/react';
import { loadSite } from 'wch-flux-sdk';
import { PreviewComponent } from './components/previewComponent';
import { ErrorPage } from './pages/errorPage';

window.onerror = error => {
	document.innerHTML = error;
};

// for running on local host we want to configure the WCH lib
import { configWCH } from 'wch-flux-sdk';
import { Constants } from './Constants';
configWCH(Constants.DOMAIN_NAME, Constants.CONTENT_HUB_ID);
// import { configExternalSPA } from "wch-flux-sdk";
// configExternalSPA(Constants.DOMAIN_NAME, Constants.CONTENT_HUB_ID);

// load components globally
registerComponent(
	'ArticleBodyImage',
	() =>
		import(/* webpackChunkName: "articleBodyImage" */ './components/articleBodyImage'),
	''
);
registerComponent(
	'AuthorProfile',
	() =>
		import(/* webpackChunkName: "authorBio" */ './components/authorProfile'),
	'author-profile-layout'
);
registerComponent(
	'DesignArticleSummary',
	() =>
		import(/* webpackChunkName: "designArticleSummary" */ './components/designArticleSummary'),
	''
);
registerComponent(
	'ImageWithInformation',
	() =>
		import(/* webpackChunkName: "imageWithInformation" */ './components/imageWithInformation'),
	'image-with-information-layout'
);
registerComponent(
	'LeadImageWithInformation',
	() =>
		import(/* webpackChunkName: "leadImageWithInformation" */ './components/leadImageWithInformation'),
	'lead-image-with-information-layout'
);
registerComponent(
	'PreviewComponent',
	() =>
		import(/* webpackChunkName: "shareSocial" */ './components/previewComponent'),
	''
);
registerComponent(
	'ShareSocial',
	() =>
		import(/* webpackChunkName: "shareSocial" */ './components/shareSocial'),
	''
);
registerComponent(
	'ViewAllButton',
	() =>
		import(/* webpackChunkName: "viewAllButton" */ './components/viewAllButton'),
	''
);

// load page components globally
registerComponent(
	'StandardPage',
	() => import(/* webpackChunkName: "standardPage"*/ './pages/standardPage'),
	'standard-page-layout'
);
registerComponent(
	'LandingPage',
	() => import(/* webpackChunkName: "landingPage"*/ './pages/landingPage'),
	'landing-page-layout'
);
registerComponent(
	'DesignPageLeft',
	() =>
		import(/* webpackChunkName: "designPageLeft"*/ './pages/designPageLeft'),
	'design-page-left'
);
registerComponent(
	'DesignPageRight',
	() =>
		import(/* webpackChunkName: "designPageRight"*/ './pages/designPageRight'),
	'design-page-right'
);
registerComponent('ErrorPage', () => import('./pages/errorPage'));
registerComponentContentId('ErrorPage', 'fe3b25d4-5f96-4741-afc3-e27efe52f973');

// load layouts dynamically
import './registration';

let possibleTenant = document.location.pathname.split('/')[1];
console.warn(
	'index.html: possible tenant is %o and base url is %o',
	possibleTenant,
	possibleTenant.search(/\w{8}\-\w{4}\-\w{4}\-\w{4}\-\w{12}/) === 0
		? '/' + possibleTenant + '/'
		: '/'
);
let baseUrl =
	possibleTenant.search(/\w{8}\-\w{4}\-\w{4}\-\w{4}\-\w{12}/) === 0
		? '/' + possibleTenant + '/'
		: '/';

console.log('SPA framework: React');

document.title = 'Oslo';

loadSite();

ReactDOM.render(
	<Router basename={baseUrl}>
		<Switch>
			<Route exact path="/" render={() => <Redirect to="/home" />} />
			<Route path="/component-preview" component={PreviewComponent} />
			<Route path="/*" component={WchPage} />
		</Switch>
	</Router>,
	document.getElementById('app')
);
