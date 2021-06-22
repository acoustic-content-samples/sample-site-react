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
} from '@acoustic-content-sdk/wch-flux-sdk/react';
import { loadSite, getBaseUrl } from '@acoustic-content-sdk/wch-flux-sdk';
import { PreviewComponent } from './components/previewComponent';
import { ErrorPage } from './pages/errorPage';

window.onerror = error => {
	document.innerHTML = error;
};

// for running on local host we want to configure the WCH lib
import { configWCH } from '@acoustic-content-sdk/wch-flux-sdk';
import { Constants } from './Constants';
configWCH(Constants.DOMAIN_NAME, Constants.CONTENT_HUB_ID, Constants.SITE_ID);

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
	'AllTypesPage',
	() => import(/* webpackChunkName: "allTypesPage"*/ './pages/allTypesPage'),
	'all-types-page-layout'
);
registerComponent(
	'AllTypesPageHero2Blocks',
	() =>
		import(/* webpackChunkName: "AllTypesPageHero2Blocks"*/ './pages/allTypesPageHero2Blocks'),
	'all-types-page-hero-2-blocks'
);
registerComponent(
	'AllTypesPageHero4Blocks',
	() =>
		import(/* webpackChunkName: "AllTypesPageHero4Blocks"*/ './pages/allTypesPageHero4Blocks'),
	'all-types-page-hero-4-blocks'
);
registerComponent(
	'StandardPage',
	() => import(/* webpackChunkName: "standardPage"*/ './pages/standardPage'),
	'standard-page-layout'
);
registerComponent(
	'StandardPageHero2Blocks',
	() =>
		import(/* webpackChunkName: "StandardPageHero2Blocks"*/ './pages/standardPageHero2BlocksLayout'),
	'standard-page-hero-2-blocks'
);
registerComponent(
	'StandardPageHero4Blocks',
	() =>
		import(/* webpackChunkName: "StandardPageHero4Blocks"*/ './pages/standardPageHero4BlocksLayout'),
	'standard-page-hero-4-blocks'
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

console.log('SPA framework: React');

document.title = 'Oslo';

loadSite();

ReactDOM.render(
	<Router basename={getBaseUrl()}>
		<Switch>
			<Route exact path="/" render={() => <Redirect to="/home" />} />
			<Route path="/component-preview" component={PreviewComponent} />
			<Route path="/*" component={WchPage} />
		</Switch>
	</Router>,
	document.getElementById('app')
);
