import React from 'react';
import { Redirect } from "react-router-dom";
import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

const withAuthRedirect = (Component: any) => {
	const RedirectComponent = (props: any) => {
		const token = useSelector<RootState, string | null>(store => store.authentication.token);
		if (!!token) return <Redirect to="/profile" />
		return <Component {...props} />
	};

	return RedirectComponent;
};

export default withAuthRedirect;