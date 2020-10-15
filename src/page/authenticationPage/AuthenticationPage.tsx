import React, { useCallback, useState } from 'react';
import BackgroundPage from '../../components/BackgroundPage/BackgroundPage';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import FormControlField from '../../components/FormControlField';
import { fetchLogin } from '../../store/signIn/authenticationReducer';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import generationField, { FieldType } from '../../utilites/generationField';

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
	const error = useSelector((store: RootState) => store.authentication.error);
	const [email, setEmail] = useState<FieldType>(generationField("email", "email", "Email", true));
	const [password, setPassword] = useState<FieldType>(generationField("password", "password", "Password", true));

	const emailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, id: string): void => {
		const newEmail = {...email};
		newEmail.value = e.currentTarget.value.trim();
		setEmail(newEmail);
	}, [email]);

	const passwordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, id: string): void => {
		const newPassword = {...password};
		newPassword.value = e.currentTarget.value.trim();
		setPassword(newPassword);
	}, [password]);

	const authentication = useCallback((): void => {
		dispatch(fetchLogin(email.value, password.value))
	}, [email, password, dispatch]);

	return (
		<BackgroundPage>
			<Card>
				<CardContent>
					<Typography variant="h6" gutterBottom>
						Войти
					</Typography>
					<FormControlField {...email} onChange={emailChange} />
					<FormControlField {...password} onChange={passwordChange} />
					{
						error !== null && <p className={classes.error}>{error}</p>
					}
					<Button
						variant="contained"
						disabled={(email.value.length && password.value.length)? false : true}
						onClick={authentication}
					>
						Войти
					</Button>
				</CardContent>
			</Card>
		</BackgroundPage>
	)
};

export default AuthenticationPage;
