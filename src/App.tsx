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
import { authenticationSuccess } from './store/signIn/authenticationReducer'

function useRouter(token: any){
	let routes = (
		<Switch>
			<Route exact path='/login' component={AuthenticationPage} />
			<Route exact path='/register' component={RegisterPage} />
		</Switch>
	);

	if (token !== null){
		routes = (
			<Switch>
				<Route path='/profile' component={ProfilePage} />
				<Route path='/map' component={MapPage} />
			</Switch>
		);
	}

	return routes
}

function App() {
	const dispatch = useDispatch();
	let token = useSelector((store: RootState) => store.authentication.token);

	useEffect(() => {
		let token = localStorage.getItem("token");
		
		if (token) {
			dispatch(authenticationSuccess(token))
		}
	}, [])

	return (
		<>
			<Navbar />
			{useRouter(token)}
		</>
	);
}

export default App;
