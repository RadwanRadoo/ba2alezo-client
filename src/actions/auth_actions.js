import axios from 'axios';

import { 
    AUTH_USER, 
    UNAUTH_USER, 
    AUTH_ERROR, 
    REGISTER_ERROR, 
    CHANGE_PASSWORD_MESSAGE,
    CHANGE_PASSWORD_ERROR
 } from './types';

const ROOT_URL= 'http://127.0.0.1:3000/api';

function saveAuthInfoToLocalStorage(user, headers)
{
    localStorage.setItem('userId', user.data.id);
    localStorage.setItem('email', user.data.email);
    localStorage.setItem('uid', user.data.uid);
    localStorage.setItem('address', user.data.address);
    localStorage.setItem('phone', user.data.phone);
    localStorage.setItem('access-token', headers["access-token"]);
    localStorage.setItem('client', headers["client"]);
    localStorage.setItem('expiry', headers["expiry"]);
    localStorage.setItem('uid', headers["uid"]);
}

export function signinUser({email , password}) {
	return function (dispatch) {
		axios.post(`${ROOT_URL}/auth/sign_in` , {email, password})
			.then(response => {
				if(response.data)
                {
                    saveAuthInfoToLocalStorage(response.data, response.headers);
                    dispatch({ type: AUTH_USER });
                    window.location.href = "/home";
                }
			})
			.catch(() => {
                dispatch({
                    type: AUTH_ERROR,
                    payload: 'Bad Login Info'
                })
			});
	}
}

export function signupUser({email, phone, address, password, passwordConfirm}) {
	return function (dispatch) {
		axios.post(`${ROOT_URL}/auth`, {
            email, 
            phone, 
            address, 
            password, 
            password_confirmation: passwordConfirm
        }).then(response => {
            if(response.data.status == "success")
            {
                debugger;
                saveAuthInfoToLocalStorage(response.data, response.headers);
                dispatch({ type: AUTH_USER });
                window.location.href = "/home";
            }
        })
        .catch(error => {
            if(error.response.data.errors)
            {
                let emailError = "", passwordError = "";
                if(error.response.data.errors.email)
                    emailError = "Email " + error.response.data.errors.email[0];
                if(error.response.data.errors.password)
                    passwordError = "Password " + error.response.data.errors.password[0];
                dispatch({
                    type: REGISTER_ERROR,
                    payload: {emailError, passwordError}
                });
            }
        });
	}
}

export function signoutUser() {
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('uid');
    localStorage.removeItem('address');
    localStorage.removeItem('phone');
    localStorage.removeItem('access-token');
    localStorage.removeItem('client');
    localStorage.removeItem('expiry');
    localStorage.removeItem('uid');
	return {
		type: UNAUTH_USER
	};
}

function getAuthInfo()
{
    var headers = {
        "access-token": localStorage.getItem('access-token'),
        "client": localStorage.getItem('client'),
        "expiry": localStorage.getItem('expiry'),
        "uid": localStorage.getItem('uid')
    }
    return headers;
}

export function changePassword({newPassword, passwordConfirmation}) {
	return function (dispatch) {
        let headers = getAuthInfo();
		axios.put(`${ROOT_URL}/auth/password` , {
                password: newPassword,
                password_confirmation: passwordConfirmation
            }, { headers: headers})
			.then(response => {
				if(response.data.success == true)
                {
                    dispatch({
                        type: CHANGE_PASSWORD_MESSAGE,
                        payload: response.data.message
                    })
                }
			})
			.catch(error => {
                dispatch({
                    type: CHANGE_PASSWORD_ERROR,
                    payload: error.response.data.message
                })
			});
	}
}