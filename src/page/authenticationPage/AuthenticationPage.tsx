import React, { useState } from 'react';
import BackgroundPage from '../../components/BackgroundPage';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import {fetchLogin} from '../../store/signIn/signInReducer'
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		form: {
			marginBottom: 20,
			width: "100%"
		},
		input: {
			width: "100%"
		},
		error: {
			fontWeight: "bold",
			color: "red",
			marginTop: 0
		}
	}),
);

const AuthenticationPage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [disabled, setDisabled] = useState(false);
	const error = useSelector((store: RootState) => store.signIn.error ); 

	const login = async () => {
		await setDisabled(true);
		await dispatch(fetchLogin(email, password));
		await setDisabled(false);
		await setEmail("");
		await setPassword("");

	};

	return (
		<BackgroundPage>
			<Card>
				<CardContent>
					<Typography variant="h6" gutterBottom>
        		Войти
      		</Typography>
					<FormControl className={classes.form}>
						<InputLabel htmlFor="email">Email</InputLabel>
						<Input
							id="email"
							required={true}
							value={email}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value)}
							className={classes.input}
							startAdornment={
								<InputAdornment position="start">
									<AccountCircle />
								</InputAdornment>
							}
						/>
					</FormControl>
					<FormControl className={classes.form}>
						<InputLabel htmlFor="password">Password</InputLabel>
						<Input
							id="password"
							required={true}
							value={password}
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value)}
							startAdornment={
								<InputAdornment position="start">
									<AccountCircle />
								</InputAdornment>
							}
						/>
					</FormControl>
					{
						error !== null && <p className={classes.error}>{error}</p>
					}
					<Button 
						variant="contained"
						onClick={login}
						disabled={disabled}
					>
						Войти
					</Button>
				</CardContent>
			</Card>
		</BackgroundPage>
	)
};

export default AuthenticationPage;

