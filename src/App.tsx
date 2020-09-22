import React, { useEffect } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import { authenticationSuccess } from './store/signIn/authenticationReducer'
import Routes from './Routes/Routes';

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
			<Routes token={token}/>
		</>
	);
}

export default App;
