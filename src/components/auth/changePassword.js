import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'

import * as actions from '../../actions/auth_actions';

class ChangePassword extends Component {
	handleChangePasswordSubmit({newPassword, passwordConfirmation}) {
		this.props.changePassword({newPassword, passwordConfirmation});
	}

	renderAlert() {
		if(this.props.changePasswordMessage && !this.props.changePasswordError) {
            return (
                <div className="alert alert-success">
                    <strong>Success!</strong> {this.props.changePasswordMessage}
                </div>
            );
        }
        else {
            <div className="alert alert-danger">
				<strong>Oops!</strong> {this.props.changePasswordError}
			</div>
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
			<form onSubmit={handleSubmit(this.handleChangePasswordSubmit.bind(this))}>
                {this.renderAlert()}
				<div className="form-group">
					<label>New Password</label>
					<div>
						<Field
							className="form-control"
							name="newPassword"
							component={this.renderField}
							type="password"
						/>
					</div>
				</div>
                <div className="form-group">
					<label>Password Confirmation</label>
					<div>
						<Field
							className="form-control"
							name="passwordConfirmation"
							component={this.renderField}
							type="password"
						/>
					</div>
				</div>
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
	if(!formProps.newPassword) {
		errors.newPassword = 'Please enter a password';
    }
    if(formProps.newPassword != undefined && formProps.newPassword.length < 8){
		errors.newPassword = 'Password is too short';
    }
    
    if(!formProps.passwordConfirmation) {
		errors.passwordConfirmation = 'Please enter a password';
    }
    if(formProps.passwordConfirmation != undefined && formProps.passwordConfirmation.length < 8){
		errors.passwordConfirmation = 'Password is too short';
    }
    
    if(formProps.newPassword !== formProps.passwordConfirmation){
		errors.newPassword = 'Password does not match';
	}

	return errors;
}

function mapStateToProps(state) {
	return { 
        changePasswordMessage: state.auth.changePasswordMessage,
        changePasswordError: state.auth.changePasswordError
    };
}

ChangePassword = connect(
    mapStateToProps,
    actions
)(ChangePassword);

export default reduxForm({
	form: 'changepassword',
	fields: ['newPassword', 'passwordConfirmation'],
	validate: validate
})(ChangePassword);