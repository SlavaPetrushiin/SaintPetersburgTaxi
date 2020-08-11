import { RootState } from './../store';
import { ThunkAction } from 'redux-thunk'
import { SIGNIN_SUCCESS, SIGNIN_ERROR } from './../types';
import signIn from '../../api/signIn';

const initialState = {
	token: null as null | string,
	error: null as null | string
}

type IInitialState = typeof initialState;

//actions types
type ISignInSuccess = {
	type: typeof SIGNIN_SUCCESS
	token: string
}
type ISignInError = {
	type: typeof SIGNIN_ERROR
	error: string
}
//thunk type
export type IThunk = ThunkAction<void, RootState, unknown, IAllTypes>

type IAllTypes = ISignInSuccess | ISignInError

const signInReducer = (state = initialState, action: IAllTypes): IInitialState => {
	switch(action.type){
		case SIGNIN_SUCCESS:
			return {
				...state,
				error: null,
				token: action.token
			}
		case SIGNIN_ERROR:
			return {
				...state,
				error: action.error
			}
		default:
			return state;
	}
};

// actionCreator
const signInSuccess = (token: string): ISignInSuccess  => ({type: SIGNIN_SUCCESS, token});
const signInError = (error: string): ISignInError  => ({type: SIGNIN_ERROR, error});

//thunkCreator
export const fetchLogin = (email: string, password: string): IThunk => async (dispatch) => {
	try{
		let response = await signIn.fetchSignIn(email, password);

		if(!response.success){
			throw new Error(response.error)
		}

		dispatch(signInSuccess(response.token));
	}
	catch(e){
		dispatch(signInError(e.message))
	}
}

export default signInReducer;