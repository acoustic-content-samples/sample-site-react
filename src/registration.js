import { registerComponent } from 'wch-flux-sdk/react';
registerComponent(
	'CarouselDynamicList',
	() =>
		import(/* webpackChunkName: "carouselDynamicList" */ './layouts/carouselDynamicList'),
	'carousel-dynamic-list'
);
registerComponent(
	'GalleryDynamicList',
	() =>
		import(/* webpackChunkName: "galeryDynamicList" */ './layouts/galleryDynamicList'),
	'gallery-dynamic-list'
);
registerComponent(
	'GalleryList',
	() => import(/* webpackChunkName: "galleryList" */ './layouts/galleryList'),
	'gallery-list'
);
registerComponent(
	'HeroImage',
	() => import(/* webpackChunkName: "heroImage" */ './layouts/heroImage'),
	'hero-image-layout'
);
registerComponent(
	'HeroVideo',
	() => import(/* webpackChunkName: "heroVideo" */ './layouts/heroVideo'),
	'hero-video-layout'
);
registerComponent(
	'Feature',
	() => import(/* webpackChunkName: "feature" */ './layouts/feature'),
	'feature-layout'
);
registerComponent(
	'VerticalList',
	() =>
		import(/* webpackChunkName: "verticalList" */ './layouts/verticalList'),
	'vertical-list'
);
registerComponent(
	'SignUp',
	() => import(/* webpackChunkName: "signUp" */ './layouts/signUp'),
	'sign-up-layout'
);
registerComponent(
	'Event',
	() => import(/* webpackChunkName: "event" */ './layouts/event'),
	'event-layout'
);
registerComponent(
	'DesignArticle',
	() =>
		import(/* webpackChunkName: "designArticle" */ './layouts/designArticle'),
	'design-article-layout'
);
registerComponent(
	'SearchResults',
	() =>
		import(/* webpackChunkName: "searchResults" */ './layouts/search-results/searchResults'),
	'search-results-layout'
);
registerComponent(
	'ContestRules',
	() =>
		import(/* webpackChunkName: "contestRules" */ './layouts/contestRules'),
	'contest-rules-layout'
);
registerComponent(
	'FormComponent',
	() =>
		import(/* webpackChunkName: "formComponent" */ './layouts/formComponent'),
	'form-component-layout'
);
registerComponent(
	'SocialComponent',
	() =>
		import(/* webpackChunkName: "socialComponent" */ './layouts/socialComponent'),
	'social-component-layout'
);
