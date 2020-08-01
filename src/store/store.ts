import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk, {ThunkMiddleware} from "redux-thunk";
import signInReducer from "./signIn/signInReducer";
import signUpReducer from "./signUp/signUpReducer";

const rootReducer = combineReducers({
	signIn: signInReducer,
	signUp: signUpReducer
})

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk as ThunkMiddleware<RootState, any>));

export default store;