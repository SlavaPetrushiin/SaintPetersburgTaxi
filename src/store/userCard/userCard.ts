import { RootState } from './../store';
import { ThunkAction } from 'redux-thunk';
import fetchBankCard from '../../api/bankCard';
const initialState = {
	success: false as boolean,
	error: "" as string
}

type IInitialState = typeof initialState;
//thunk type
export type IThunk = ThunkAction<void, RootState, unknown, any>

const userCard = (state: any = initialState, action: any) => {
	switch(action.type){
		default: {
			return state
		}
	}
};

export const fetchPostUserCard = (cardNumber: string, expiryDate: string, cardName: string, cvc: string): IThunk => 	async(dispatch, getState) => {
	debugger
	try{
		const token = getState().authentication.token
		const response = await fetchBankCard.fetchPostCard(cardNumber, expiryDate, cardName, cvc, token!);
		debugger
	}
	catch(e){

	}
}


export default userCard