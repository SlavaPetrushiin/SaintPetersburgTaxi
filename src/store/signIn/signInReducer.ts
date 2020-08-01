import { SIGNIN_SUCCESS, SIGNIN_ERROR } from './../types';

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

type IAllTypes = ISignInSuccess | ISignInError

const signInReducer = (state = initialState, action: IAllTypes): IInitialState => {
	switch(action.type){
		default:
			return state;
	}
};


// actionCreator
const signInSuccess = (token: string): ISignInSuccess  => ({type: SIGNIN_SUCCESS, token});
const signInError = (error: string): ISignInError  => ({type: SIGNIN_ERROR, error});


export default signInReducer;