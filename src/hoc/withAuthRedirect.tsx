import React from 'react';
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from '../store/store';


const withAuthRedirect = (Component: any) => {
	const token = useSelector((state: RootState) => state.signIn.token)

	const RedirectComponent = (props: any) => {
			if (!!token) return <Redirect to="/profile" /> 
			return <Component {...props} />
	};

	return RedirectComponent;
};