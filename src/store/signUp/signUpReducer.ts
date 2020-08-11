import { SIGNUP_SUCCESS, SIGNUP_ERROR } from './../types';
import { IThunk } from './../signIn/signInReducer';
import signUp from '../../api/signUp';

const initialState = {
	token: null as null | string,
	error: null as null | string
}


type IInitialState = typeof initialState;
//actions types
type ISignUpSuccess = {
	type: typeof SIGNUP_SUCCESS
	token: string
}
type ISignUpError = {
	type: typeof SIGNUP_ERROR
	error: string
}

type IAllTypes = ISignUpSuccess | ISignUpError

const signUpReducer = (state = initialState, action: IAllTypes): IInitialState => {
	switch (action.type) {
		case SIGNUP_SUCCESS:
			return {
				...state,
				error: null,
				token: action.token
			}
		case SIGNUP_ERROR:
			return {
				...state,
				error: action.error
			}
		default:
			return state;
	}
};

// actionCreator
const signUpSuccess = (token: string): ISignUpSuccess  => ({type: SIGNUP_SUCCESS, token});
const signUpError = (error: string): ISignUpError  => ({type: SIGNUP_ERROR, error});

//thunkCreator
export const fetchRegister = (email: string, password: string, name: string, surname: string): IThunk => async (dispatch) => {
	try {
		let response = await signUp.fetchSignUp(email, password, name, surname);

		if (!response.success) {
			throw new Error(response.error)
		}

		//dispatch(signUpSuccess(response.token))
	}
	catch (e) {
		//dispatch(signUpError(e.message))
	}
}

export default signUpReducer;