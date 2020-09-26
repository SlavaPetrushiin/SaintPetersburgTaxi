import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, {ThunkMiddleware} from "redux-thunk";
import addressesList from "./addresses/addresses";
import authenticationReducer from "./signIn/authenticationReducer";
import userCard from "./userCard/userCard";

const rootReducer = combineReducers({
	authentication: authenticationReducer,
	userCard: userCard,
	addresses: addressesList
})

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<RootState, any>));

export default store;
