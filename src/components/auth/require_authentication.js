import React, { Component } from 'react';
import { connect } from 'react-redux';

// High Order Component
export default function (ComposedComponent) {
	class Authentication extends Component {

		componentWillMount() {
			if(!this.props.authenticated)
			{
				this.props.history.push('/');
			}
		}

		componentWillUpdate(nextProps)
		{
			if(!nextProps.authenticated)
			{
				this.props.history.push('/');
			}
		}

		render() {
			return (
				<ComposedComponent {...this.props} />
			);
		}
	}

	function mapStateToProps(state) {
		return { authenticated: state.auth.authenticated}
	}

	return connect(mapStateToProps)(Authentication);
}

// In Some Other Location...Not in this file
// We want to use this HOC
// import Authentication // this is my HOC
// import Resources // this is the component i want to wrap

// const ComposedComponent = Authentication(Resources);

// In Some render method
// <ComposedComponent />
