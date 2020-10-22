import { POST_CARD_SUCCESS, POST_CARD_ERROR, GET_CARD_SUCCESS } from './../types';
import { RootState } from './../store';
import { ThunkAction } from 'redux-thunk';
import fetchBankCard from '../../api/bankCard';

type InitialStateType = typeof initialState;

type PostCardSuccess = {
	type: typeof POST_CARD_SUCCESS
}

type PostCardError = {
	type: typeof POST_CARD_ERROR
	error: string
}

type GetCardSuccess = {
	type: typeof GET_CARD_SUCCESS
	id: string
	cardNumber: string
	expiryDate: string
	cardName: string
	cvc: string	
}

type AllTypes = PostCardSuccess | PostCardError | GetCardSuccess

//thunk type
export type IThunk = ThunkAction<void, RootState, unknown, any>

const initialState = {
	success: false,
	successGet: false,
	error: "",
	card: {
		id: "",
		cardNumber: "" ,
		expiryDate: "",
		cardName: "",
		cvc: ""
	}
}

const userCard = (state: InitialStateType = initialState, action: AllTypes) => {
	switch(action.type){
		case POST_CARD_SUCCESS: {
			return {
				...state,
				success: true,
				error: ""
			}
		}
		case POST_CARD_ERROR: {
			return {
				...state,
				success: false,
				error: action.error
			}
		}
		case GET_CARD_SUCCESS: {
			return {
				...state,
				success: false,
				successGet: true,
				error: "",
				card: {
					id: action.id,
					cardNumber: action.cardNumber,
					expiryDate: action.expiryDate,
					cardName: action.cardName,
					cvc: action.cvc
				}
			}
		}
		default: {
			return state
		}
	}
};

const postCardSuccess = (): PostCardSuccess => ({type: POST_CARD_SUCCESS});
const postCardError = (message: string): PostCardError => ({type: POST_CARD_ERROR, error: message});
const getCardSuccess = (id: string, cardNumber: string, expiryDate: string, cardName: string, cvc: string): GetCardSuccess => ({type: GET_CARD_SUCCESS, id, cardNumber, expiryDate, cardName, cvc});

export const fetchPostUserCard = (cardNumber: string, expiryDate: string, cardName: string, cvc: string): IThunk => 	async(dispatch, getState) => {
	try{
		const token = getState().authentication.token
		const response = await fetchBankCard.fetchPostCard(cardNumber, expiryDate, cardName, cvc, token!);
		if(!response.success){
			throw new Error(response.error);
		}
		
		dispatch(postCardSuccess());
	}
	catch(e){
		dispatch(postCardError(e))
	}
}

export const fetchGetUserCard = (): IThunk => 	async(dispatch, getState) => {
	try{
		const token = getState().authentication.token;
		const {id, cardNumber, expiryDate, cardName, cvc} = await fetchBankCard.fetchGetCard(token!);

		if(!id || !cardNumber || !expiryDate || !cardName || !cvc){
			throw new Error("Данных нет!");
		}

		dispatch(getCardSuccess(id, cardNumber, expiryDate, cardName, cvc));
	}
	catch(e){
		dispatch(postCardError(e))
	}
}


export default userCard;