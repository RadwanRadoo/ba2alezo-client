import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import * as actions from '../../actions/auth_actions';

class Header extends Component {
	componentWillMount(){
		if(this.props.authenticated)
		{
			//this.props.fetchUserData();
		}
	}
	renderLinks(){
		if(this.props.authenticated)
		{
			return(
				<div>
					<li key="logout" className="nav-item">
					<Link className="nav-link" to="/signout">LogOut</Link>
				</li>
				<li key="changePassword" className="nav-item">
					<Link className="nav-link" to="/changePassword">Change Password</Link>
				</li>
				</div>
			);
		}
		else
		{
			return [
				<li key="login" className="nav-item">
					<Link className="nav-link" to="/signin">Login</Link>
				</li>,
				<li key="signup" className="nav-item">
					<Link className="nav-link" to="/signup">Sign Up</Link>
				</li>
			];
		}
	}
	render() {
		return (
			<nav className="navbar navbar-light">
      			<ul className="nav navbar-nav">
      				{this.renderLinks()}
      			</ul>
      		</nav>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: state.auth.authenticated
	};
}

export default connect(mapStateToProps, actions)(Header);
