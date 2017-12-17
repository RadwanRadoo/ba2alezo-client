import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';

import * as actions from '../../actions/auth_actions';

class Signup extends Component {
	handleSignUpSubmit(formProps){
		this.props.signupUser(formProps);
	}

	renderEmailAlert() {
		if(this.props.errorMessage){
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.errorMessage.emailError}
				</div>
			);
		}
	}

	renderPasswordAlert() {
		if(this.props.errorMessage){
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.errorMessage.passwordError}
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
			<form onSubmit={handleSubmit(this.handleSignUpSubmit.bind(this))}>
				<div className="form-group">
					<label>Email</label>
					<div>
						<Field
							name="email"
							type="email"
							placeholder="Email"
							component={this.renderField}
						/>
					</div>
					{this.renderEmailAlert()}
				</div>
				<div className="form-group">
					<label>Phone</label>
					<div>
						<Field
							name="phone"
							type="text"
							placeholder="phone"
							component={this.renderField}
						/>
					</div>
				</div>
				<div className="form-group">
					<label>Address</label>
					<div>
						<Field
							name="address"
							type="text"
							placeholder="address"
							component={this.renderField}
						/>
					</div>
				</div>
				<div className="form-group">
					<label>Password</label>
					<div>
						<Field
							name="password"
							type="password"
							placeholder="password"
							component={this.renderField}
						/>
					</div>
					{this.renderPasswordAlert()}
				</div>
				<div className="form-group">
					<label>Confirm Password</label>
					<div>
						<Field
							name="passwordConfirm"
							type="password"
							placeholder="passwordConfirm"
							component={this.renderField}
						/>
					</div>
				</div>
				<div className="form-group">
					<button className="btn btn-success" type="submit">
						Register
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
	if(!formProps.phone){
		errors.phone = 'Please enter an phone';
	}
	if(!formProps.address){
		errors.address = 'Please enter an address';
	}
	if(!formProps.password) {
		errors.password = 'Please enter a password';
	}
	if(!formProps.passwordConfirm){
		errors.passwordConfirm = 'Please enter the password again';
	}
	if(formProps.password !== formProps.passwordConfirm){
		errors.password = 'Password does not match';
	}
	if (!(/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(formProps.email))){ 
		errors.email = 'Please enter a valid email';
	}
	if(formProps.password != undefined && formProps.password.length < 8){
		errors.password = 'Password is too short';
	}
	return errors;
}

function mapStateToProps(state) {
	return {
		errorMessage: state.auth.registerError,
	};
}

Signup = connect(
    mapStateToProps,
    actions
)(Signup);

export default reduxForm({
	form: 'signup',
	fields: ['email', 'phone', 'address', 'password', 'passwordConfirm'],
	validate: validate
})(Signup);