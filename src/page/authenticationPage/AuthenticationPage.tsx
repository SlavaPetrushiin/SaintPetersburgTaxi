import React from 'react';
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


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		form: {
			marginBottom: 20,
			width: "100%"
		},
		input: {
			width: "100%"
		}
	}),
);

const AuthenticationPage = () => {
	const classes = useStyles();

	return (
		<BackgroundPage>
			<Card>
				<CardContent>
					<FormControl className={classes.form}>
						<InputLabel htmlFor="email">Email</InputLabel>
						<Input
							id="email"
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
							startAdornment={
								<InputAdornment position="start">
									<AccountCircle />
								</InputAdornment>
							}
						/>
					</FormControl>
					<Button variant="contained">Default</Button>
				</CardContent>
			</Card>
		</BackgroundPage>
	)
};

export default AuthenticationPage;

