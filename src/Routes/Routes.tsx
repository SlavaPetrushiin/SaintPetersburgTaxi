import React from 'react';
import {Route, Switch, Redirect } from "react-router-dom";
import AuthenticationPage from '../page/authenticationPage/AuthenticationPage';
import RegisterPage from '../page/registerPage/RegisterPage';
import ProfilePage from '../page/profilePage/ProfilePage';
import MapPage from '../page/mapPage/MapPage';

type IPropsType = {
	token: string | null 
}

const Routes: React.FC<IPropsType> = ({token}) => {
/*
	if (!!token) {
		return (
			<Switch>
				<Route exact path='/profile' component={ProfilePage} />
				<Route path='/map' component={MapPage} />
				<Redirect to='/' />
			</Switch>
		)
	}*/

	return (
		<Switch>
			<Route  path='/register' component={RegisterPage} />
			<Route exact path='/' component={AuthenticationPage} />
			<Redirect to='/' />
		</Switch>
	)
}

export default Routes;

