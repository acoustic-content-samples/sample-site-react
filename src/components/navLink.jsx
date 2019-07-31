/*
Copyright IBM Corporation 2017.
LICENSE: Apache License, Version 2.0
*/
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavLink extends React.Component {
	render () {
		let isActive = this.context.router
			? this.context.router.route.location.pathname
					.toString()
					.includes(this.props.to.toString())
			: '';
		let className = isActive ? 'active' : '';

		return (
			<Link className={className} {...this.props}>
				<span className="limit-page-name">{this.props.children}</span>
			</Link>
		);
	}
}

NavLink.contextTypes = {
	router: PropTypes.object,
};

export default NavLink;
