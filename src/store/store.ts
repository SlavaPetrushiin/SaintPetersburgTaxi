import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, {ThunkMiddleware} from "redux-thunk";
import authenticationReducer from "./signIn/authenticationReducer";

const rootReducer = combineReducers({
	authentication: authenticationReducer,
})

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<RootState, any>));

export default store;
