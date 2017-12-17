import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

import * as actions from '../../actions/auth_actions';

class Signin extends Component {
	handleSignInSubmit({email, password}) {
		this.props.signinUser({email, password});
	}

	renderAlert() {
		if(this.props.errorMessage){
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
			);
		}
	}

	renderField = ({
		input,
		label,
		type,
		meta: { touched, error, warning }
	  }) => (
		<div>
			<input className="form-control" {...input} placeholder={label} type={type} />
			{touched &&
			  ((error && <span>{error}</span>) ||
				(warning && <span>{warning}</span>))}
		</div>
	  )

	render() {
		const { handleSubmit, pristine, reset, submitting } = this.props
		return (
			<form onSubmit={handleSubmit(this.handleSignInSubmit.bind(this))}>
				<div className="form-group">
					<label>Email</label>
					<div>
						<Field
							className="form-control"
							name="email"
							component={this.renderField}
							type="email"
							placeholder="Email"
						/>
					</div>
				</div>
				<div className="form-group">
					<label>Password</label>
					<div>
						<Field
							className="form-control"
							name="password"
							component={this.renderField}
							type="password"
							placeholder="password"
						/>
					</div>
				</div>
				{this.renderAlert()}
				<div className="form-group">
					<button className="btn btn-success" type="submit">
						Submit
					</button>
					<button className="btn btn-primary" type="button" onClick={reset}>
						Clear Values
					</button>
				</div>
			</form>
		);
	}
}

function validate(formProps) {
	const errors = {};
	if(!formProps.email){
		errors.email = 'Please enter an email';
	}
	if(!formProps.password) {
		errors.password = 'Please enter a password';
	}
	if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(formProps.email))){ 
		errors.email = 'Please enter a valid email';
	}

	return errors;
}

function mapStateToProps(state) {
	return { errorMessage: state.auth.loginError };
}

Signin = connect(
    mapStateToProps,
    actions
)(Signin);

export default reduxForm({
	form: 'signin',
	fields: ['email', 'password'],
	validate: validate
})(Signin);