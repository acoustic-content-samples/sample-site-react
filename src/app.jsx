/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import ReactDOM from 'react-dom';

import {
	BrowserRouter as Router,
	Route,
	Redirect,
	withRouter
} from 'react-router-dom';

import 'styles/app.scss';
import { WchPage, registerComponent } from 'wch-flux-sdk/react';
import {SiteHeader} from './components/siteHeader/siteHeader';
import { SiteFooter} from './components/siteFooter/siteFooter';
import {ErrorPage} from './pages';
import { setNavChangeFunction } from 'wch-flux-sdk';
import {Toolbar} from './components/toolbar/toolbar';

import 'script-loader!foundation-sites/dist/js/foundation.js';

// for running on local host we want to configure the WCH lib
import {configWCH} from 'wch-flux-sdk';
// configWCH('your-domain-name.com', '0000000-0000-0000-0000-000000000000');

// load components globally
registerComponent('ArticleBodyImage', () => import(/* webpackChunkName: "articleBodyImage" */'./components/articleBodyImage'));
registerComponent('AuthorProfile', () => import(/* webpackChunkName: "authorBio" */'./components/authorProfile'));
registerComponent('DesignArticleSummary', () => import(/* webpackChunkName: "designArticleSummary" */'./components/designArticleSummary'));
registerComponent('LeadImage', () => import(/* webpackChunkName: "leadImage" */'./components/leadImage'));
registerComponent('ShareSocial', () => import(/* webpackChunkName: "shareSocial" */'./components/shareSocial'));
registerComponent('ViewAllButton', () => import(/* webpackChunkName: "viewAllButton" */'./components/viewAllButton'));

// load page components globally
registerComponent('StandardPageLayout', () => import(/* webpackChunkName: "standardPage"*/'./pages/standardPage'));
registerComponent('DesignPageLeft', () => import(/* webpackChunkName: "designPageLeft"*/'./pages/designPageLeft'));
registerComponent('DesignPageRight', () => import(/* webpackChunkName: "designPageRight"*/'./pages/designPageRight'));
registerComponent('ErrorPage', () => import('./pages/errorPage'));
// load layouts dynamically
registerComponent('CarouselDynamicList', () => import(/* webpackChunkName: "carouselDynamicList" */'./layouts/carouselDynamicList'));
registerComponent('GalleryDynamicList', () => import(/* webpackChunkName: "galeryDynamicList" */'./layouts/galleryDynamicList'));
registerComponent('GalleryList', () => import(/* webpackChunkName: "galleryList" */'./layouts/galleryList'));
registerComponent('HeroImage', () => import(/* webpackChunkName: "heroImage" */'./layouts/heroImage'));
registerComponent('HeroVideo', () => import(/* webpackChunkName: "heroVideo" */'./layouts/heroVideo'));
registerComponent('Feature', () => import(/* webpackChunkName: "feature" */'./layouts/feature'));
registerComponent('VerticalList', () => import(/* webpackChunkName: "verticalList" */'./layouts/verticalList'));
registerComponent('SignUp', () => import(/* webpackChunkName: "signUp" */'./layouts/signUp'));
registerComponent('Event', () => import(/* webpackChunkName: "event" */'./layouts/event'));
registerComponent('DesignArticle', () => import(/* webpackChunkName: "designArticle" */'./layouts/designArticle'));

let possibleTenant = document.location.pathname.split('/')[1];
console.warn('index.html: possible tenant is %o and base url is %o', possibleTenant, possibleTenant.search(/\w{8}\-\w{4}\-\w{4}\-\w{4}\-\w{12}/) === 0 ? '/' + possibleTenant + '/' : '/');
let baseUrl = possibleTenant.search(/\w{8}\-\w{4}\-\w{4}\-\w{4}\-\w{12}/) === 0 ? '/' + possibleTenant + '/' : '/';

console.log("SPA framework: React");

ReactDOM.render(
	<Router basename={baseUrl} >
		<div>
			{/*<Route render={(props) => (<Toolbar {...props} />)} />*/}
			<Route render={(props) => (<SiteHeader {...props} />)} />
				<Route exact path='/' render={() => (<Redirect to="/home"/>)} />
				<Route path='/*' component={WchPage} />
			<SiteFooter />
		</div>
	</Router>,
	document.getElementById('app')
);