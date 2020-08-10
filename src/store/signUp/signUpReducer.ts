import { IThunk } from './../signIn/signInReducer';

const initialState = {
	token: null as null | string,
	error: null as null | string	
}


type IInitialState = typeof initialState;


const signUpReducer = (state = initialState, action: any): IInitialState => {
	switch(action.type){
		default:
			return state;
	}
};

//thunkCreator
export const fetchLogin = (email: string, password: string): IThunk => async (dispatch) => {
	try{
		let response = await signIn.fetchSignIn(email, password);

		if(!response.success){
			throw new Error(response.error)
		}
	}
	catch(e){
		dispatch(signInError(e.message))
	}
}

export default signUpReducer;