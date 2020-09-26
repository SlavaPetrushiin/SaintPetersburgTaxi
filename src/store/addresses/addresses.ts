import { GET_ADDRESSES_SUCCESS } from './../types';
import { RootState } from './../store';
import { ThunkAction } from 'redux-thunk';
import fetchAddressList from '../../api/addressList';

type StateType = typeof initialState;
type IThunk = ThunkAction<void, RootState, unknown, any>
type AllTypes = GetAddressesSuccess

type GetAddressesSuccess = {
	type: typeof GET_ADDRESSES_SUCCESS, 
	addresses: string[]
}

const initialState = {
	addresses: [] as string[]
}

const addressesList = (state: StateType = initialState, action: AllTypes): StateType => {
	switch(action.type){
		case GET_ADDRESSES_SUCCESS: {
			return {
				...state,
				addresses: [...action.addresses]
			}
		}
		default:{
			return state;
		} 
	}
}

const getAddressesSuccess = (addresses: string[]): GetAddressesSuccess => {
	return {
		type: GET_ADDRESSES_SUCCESS,
		addresses
	}
}

export const getAddressesList = (): IThunk => async (dispatch) => {
	try{
		let addresses = await fetchAddressList.getAddressList();

		dispatch(getAddressesSuccess(addresses));
	} catch(e){

	}
}

export default addressesList;