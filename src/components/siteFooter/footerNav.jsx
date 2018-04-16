/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import {Router, Link} from 'react-router-dom';
import {loadSite, subscribe, getSite} from 'wch-flux-sdk';
import 'styles/components/siteFooter/footerNav.scss';

export class FooterNav extends React.Component {
    constructor(props){
        super(props);
        this.state = {site: {pages: []}};
    }

    componentWillMount(){
        this.sub = subscribe('site', () => {
            this.setState({site: getSite()});
        });
        loadSite();
    }

    // componentDidMount () {
    //     $('#site-footer').foundation();
    // }
    //
    // componentWillUpdate () {
    //     $('#footer-nav-menu').foundation('_destroy');
    // }
    //
    // componentDidUpdate () {
    //     $('#footer-nav-menu').foundation();
    // }

    componentWillUnmount(){
        this.sub.unsubscribe();
    }

    render() {
        // console.log(`I am here : ${JSON.stringify(this.state)}`);


        let pageLinks = this.state.site.pages.map(function (page) {
            if (!page.hideFromNavigation) {
                return (<li key={page.id} className="top-level-nav-item">
                            <Link to={page.route}>{page.name}</Link>
                        </li>
                );
            }
        });

        return (
            <div>
                <h5>Menu </h5>
                <ul >
                    {pageLinks}
                </ul>
            </div>
        )
    }
}