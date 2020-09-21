import { RootState } from '../store';
import { ThunkAction } from 'redux-thunk'
import {AUTHENTICATION_SUCCESS, AUTHENTICATION_ERROR } from '../types';
import signIn from '../../api/signIn';
import signUp from '../../api/signUp';

const initialState = {
	token: null as null | string,
	error: null as null | string
}

type IInitialState = typeof initialState;

//actions types
type ISignInSuccess = {
	type: typeof AUTHENTICATION_SUCCESS
	token: string
}
type ISignInError = {
	type: typeof AUTHENTICATION_ERROR
	error: string
}
//thunk type
export type IThunk = ThunkAction<void, RootState, unknown, IAllTypes>

type IAllTypes = ISignInSuccess | ISignInError

const authenticationReducer = (state = initialState, action: IAllTypes): IInitialState => {
	switch(action.type){
		case AUTHENTICATION_SUCCESS:
			return {
				...state,
				error: null,
				token: action.token
			}
		case AUTHENTICATION_ERROR:
			return {
				...state,
				error: action.error
			}
		default:
			return state;
	}
};

// actionCreator
export const authenticationSuccess = (token: string): ISignInSuccess  => ({type: AUTHENTICATION_SUCCESS, token});
export const authenticationError = (error: string): ISignInError  => ({type: AUTHENTICATION_ERROR, error});

//thunkCreator
export const fetchLogin = (email: string, password: string): IThunk => async (dispatch) => {
	try{
		let response = await signIn.fetchSignIn("test@test.com", "123123");

		if(!response.success){
			throw new Error(response.error);
		}

		dispatch(authenticationSuccess(response.token));
		localStorage.setItem('token', response.token);
	}
	catch(e){
		dispatch(authenticationError(e.message));
	}
}

//username=test@test.com&password=123123

export const fetchRegister = (email: string, password: string, name: string, surname: string): IThunk => async (dispatch) => {
	try {
		let response = await signUp.fetchSignUp(email, password, name, surname);

		if (!response.success) {
			throw new Error(response.error);
		}

		dispatch(authenticationSuccess(response.token));
		localStorage.setItem('token', response.token);
	}
	catch (e) {
		dispatch(authenticationError(e.message));
	}
}

export default authenticationReducer;