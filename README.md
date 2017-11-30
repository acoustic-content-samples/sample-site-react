sample-site-react
==============

As part of the Sites feature a single page application was implemented in WCH to serve web sites. The Single Page Application is hosted on WCH and stored as unmanaged assets. It leverages a set of content types, pages, categories, ... to render the Oslo sample application. The default single page application was implemented with Angular 4. The artifacts stored in WCH for Oslo are independent of the single page application. 
This sample contains the Single Page Site Application implemented with react instead of the default angular site application. You can find more information about the default site application implemented with angular here: 
[Angular 4 site application](https://github.com/ibm-wch/wch-site-application/).
You can replace the default single page application with the react implementations in this repository. Note that this will overlay the default Angular 4 based application with the vue.js or react implementation.
See the topic on Restoring the default Angular 4 based application in case you want to switch back.

Getting started
------------
React README
==============
These are the instructions for setting up and deploying the React SPA.

Running Locally
-------
1. After cloning this repository, run `npm install` at the root directory.
2. In **src/app.jsx**, uncomment the line `configWCH('your-domain-name.com', '0000000-0000-0000-0000-000000000000');` and replace with your domain and content hub ID
3. Make sure that CORS is enabled on your Watson Content Hub tenant to allow localhost.
4. Start the local server:
   * From within the root directory, run `npm start`.
   * The SPA will be rendered at: http://localhost:4202
   
   
Deploying to Content Hub
-------
1. Install the latest version of [wchtools-cli](https://github.com/ibm-wch/wchtools-cli).
Windows: npm install -g wchtools-cli
Linux/Mac: sudo npm install -g wchtools-cli 
   * Note: make sure that you have initialized wchtools with your user and tenant API URL. You will be prompted for your user password when deploying to the tenant. For more information, refer to [wchtools-cli](https://github.com/ibm-wch/wchtools-cli).

2. From the root directory, run `npm run build` and `npm run deploy`.


Changing the default (home) route
-------
The default route to load is set to `/home`. In order to change this:
1. Open **src/app.jsx** and find the line of code that specifies the routes in the router: 
```
<Route render={(props) => (<SiteHeader {...props} />)} />
<Route exact path='/' render={() => (<Redirect to="/home"/>)} />
<Route path='/*' component={WchPage} />
<SiteFooter />
```
2. Change `<Route exact path='/' render={() => (<Redirect to="/home"/>)} />` to redirect to the new route.


Alternate SDK files of note
-------------

### index.js

Set of javascript functions primarily for calling WCH APIs. Also includes some
helper functions for working with images & videos, and fetching content IDs
associated with routes, and vice versa. All functions are individually exported
to take advantage of tree shaking. Data from WCH is now stored in a centralized
store that can be read from different components. This has the advantage of
de-coupling the components from the data loading, allowing for things like live
updates when data changes.

### wchPage.jsx

A React component that gets served by all routes. Before each route gets set, it
determines the content ID of the associated page, then sets its template to be
the component that corresponds with the content's selected layout, or content
type respectively.

### wchContent.jsx

A React component extremely similar to that of the wchPage, although not plugged
into the router. Takes a content ID as a prop, fetches the corresponding
content and sets its template to be the component that matches the content's
selected layout or content type respectively.


Check which SPA framework is deployed
------------
To verify if the site is running the React or Vue SPA, load the live site and search the browser console for 
"SPA framework". 


Limitations
-------------
* No CLI layout generation supported for new content types. Layouts need to be created manually.
* Focus was on rendering. Draft content may not always render in preview. If draft content does not appear automatically, try refreshing the site preview.

Restoring the default Angular 4 based application
-------------
Clone the [Angular 4 site application](https://github.com/ibm-wch/wch-site-application/) , trigger a build and push to your tenant to overlay the react site application sample.
