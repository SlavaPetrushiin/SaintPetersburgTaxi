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

export default signUpReducer;