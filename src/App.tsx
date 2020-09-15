import React, { useEffect } from 'react';
import './App.css';
import AuthenticationPage from './page/authenticationPage/AuthenticationPage';
import Navbar from './components/navbar/Navbar';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import RegisterPage from './page/registerPage/RegisterPage';
import ProfilePage from './page/profilePage/ProfilePage';
import MapPage from './page/mapPage/MapPage';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import {authenticationSuccess} from './store/signIn/authenticationReducer'

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		let token = localStorage.getItem("token");
		if(token){
			dispatch(authenticationSuccess(token))
		}
	}, [])

	let token = useSelector((store: RootState) => store.authentication.token);

	let routes = (
		<Switch>
			<Route exact path='/login' component={AuthenticationPage} />
			<Route exact path='/register' component={RegisterPage} />
			<Redirect to="/login" />
		</Switch>
	);

	if (token !== null) {
		routes = (
			<Switch>
				<Route path='/profile' component={ProfilePage} />
				<Route path='/map' component={MapPage} />
				<Redirect to="/profile" />
			</Switch>
		);
	}

	return (
		<>
			<Navbar />
			<MapPage />
			{routes}
		</>
	);
}

export default App;
