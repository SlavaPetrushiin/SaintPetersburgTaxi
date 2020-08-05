import React, { useState } from 'react';
import BackgroundPage from '../../components/BackgroundPage';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { useDispatch } from 'react-redux';
import {fetchLogin} from '../../store/signIn/signInReducer'
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import FormControlField from '../../components/FormControlField';

type IInput = {
	type: string
	title: string
	name: string
	id: string
	value: string
	required: boolean
}

const inputs: Array<IInput>  = [
	{
		type: "email",
		name: "email",
		title: "Email",
		id: "email",
		value: "",
		required: true
	},
	{
		type: "password",
		name: "password",
		title: "Password",
		id: "password",
		value: "",
		required: true
	},	
]

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
	const [fields, setFields] = useState<IInput[]>(inputs)
	const dispatch = useDispatch();
	const [disabled, setDisabled] = useState(false);
	const error = useSelector((store: RootState) => store.signIn.error ); 

	const login = async () => {
		setDisabled(true);
		//await dispatch(fetchLogin(email, password));
		setDisabled(false);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
		let newFields = fields.map((field: IInput) => {
			if(field.name === name){
				field.value = e.currentTarget.value;
			}
			return field;
		})
		setFields(newFields)
	};

	return (
		<BackgroundPage>
			<Card>
				<CardContent>
					<Typography variant="h6" gutterBottom>
        		Войти
      		</Typography>
					{
						fields.map((inp: any) => <FormControlField {...inp} onChange={handleChange} />)
					}
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

