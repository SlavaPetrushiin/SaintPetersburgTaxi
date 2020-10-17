import React from 'react';
import {Route, Switch, Redirect } from "react-router-dom";
import AuthenticationPage from '../page/authenticationPage/AuthenticationPage';
import RegisterPage from '../page/registerPage/RegisterPage';
import ProfilePage from '../page/profilePage/ProfilePage';
import MapPage from '../page/mapPage/MapPage';

type PropsType = {
	token: string | null 
}

const Routes: React.FC<PropsType> = ({token}): JSX.Element => {
	if (!!token) {
		return (
			<Switch>
				<Route exact path='/profile' component={ProfilePage} />
				<Route exact path='/map' component={MapPage} />
				<Redirect to='/profile' />
			</Switch>
		)
	}

	return (
		<Switch>
			<Route  path='/register' component={RegisterPage} />
			<Route exact path='/' component={AuthenticationPage} />
			<Redirect to='/' />
		</Switch>
	)
}

export default Routes;

