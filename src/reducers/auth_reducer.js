import { 
	AUTH_USER, 
	UNAUTH_USER, 
	AUTH_ERROR, 
	REGISTER_ERROR, 
	FETCH_USER_DATA,
	CHANGE_PASSWORD_MESSAGE,
	CHANGE_PASSWORD_ERROR
} from '../actions/types';

export default function (state = {} , action) {
	switch(action.type) {
		case AUTH_USER:
			return { ...state, authenticated: true };
		case UNAUTH_USER:
			return { ...state, authenticated: false };
		case AUTH_ERROR:
			return { ...state, loginError: action.payload};
		case REGISTER_ERROR:
			return { ...state, registerError: action.payload};
		case CHANGE_PASSWORD_MESSAGE:
			return { ...state, changePasswordMessage: action.payload};
		case CHANGE_PASSWORD_ERROR:
			return { ...state, changePasswordError: action.payload};
	}
	return state;
}