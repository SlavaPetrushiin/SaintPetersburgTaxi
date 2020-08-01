import React from 'react';
import './App.css';
import AuthenticationPage from './page/authenticationPage/AuthenticationPage';
import Navbar from './components/navbar/Navbar';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import RegisterPage from './page/registerPage/RegisterPage';
import ProfilePage from './page/profilePage/ProfilePage';
import MapPage from './page/mapPage/MapPage';
import { useSelector } from 'react-redux';
import { RootState } from './store/store';

function App() {
	let token = useSelector((store: RootState) => store.signIn.token);

	let routes = (
		<Switch>
			<Route exact path='/login' component={AuthenticationPage} />
			<Route exact path='/register' component={RegisterPage} />
			<Redirect to="/login" />
		</Switch>
	);

		if(token !== null){
			routes = (
				<Switch>
					<Route exact path='/profile' component={ProfilePage} />
					<Route exact path='/map' component={MapPage} />
					<Redirect to="/profile" />
				</Switch>
			);			
		}

	return (
		<>
			<Navbar />
			{routes}
		</>
	);
}

export default App;
