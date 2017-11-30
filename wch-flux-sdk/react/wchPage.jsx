/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {loadContent, getRoute, subscribe} from '../'
import {ComponentRegistry} from './';

export class WchPage extends React.Component {
	constructor (props) {
		super(props);
		
		this.state = {
			route: {contentId: '', layoutId: ''},
		};

		this.sub = subscribe('routes', () => {
			this.setState((prevState, props) => ({route: getRoute(props.location.pathname)}));
			
			let name = this.state.route.layoutId.split('-').map(s => s.substring(0,1).toUpperCase()+s.substring(1)).reduce((s, v) => s + v, '');
            if (name) {
                if (ComponentRegistry[name]) {
                    ComponentRegistry[name]().then(component => {
                        this.setState({Component: component[name], status: '200'});
                    });
                } else {
                    ComponentRegistry['ErrorPage']().then(component => {
                        console.log('map to error page');
                        this.setState({Component: component['ErrorPage'], status: '404'});
                    });
                }
            }
		});
	}

	componentWillUnmount () {
		this.sub.unsubscribe();
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.location.pathname !== this.props.location.pathname) {
			let route = getRoute(nextProps.location.pathname);

			if (route) {
				this.setState({route});
				let name = route.layoutId.split('-').map(s => s.substring(0,1).toUpperCase()+s.substring(1)).reduce((s, v) => s + v, '');
				if (name) {
					if (ComponentRegistry[name]) {
                        ComponentRegistry[name]().then(component => {
                            this.setState({Component: component[name], status: '200'});
                        });
					} else {
                        ComponentRegistry['ErrorPage']().then(component => {
                            this.setState({Component: component['ErrorPage'], status: '404'});
                        });
                    }
				}
			}
		}
	}

	render () {
		if (this.state.Component) {
			return (<this.state.Component contentId={this.state.route.contentId} status={this.state.status}/>);
		}

		return (<div></div>);
	}
}