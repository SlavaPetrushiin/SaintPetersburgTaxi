import React, { useState } from 'react';
import BackgroundPage from '../../components/BackgroundPage';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import FormControlField from '../../components/FormControlField';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch } from 'react-redux';
import { fetchRegister } from '../../store/signIn/authenticationReducer';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';


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
		id: uuidv4(),
		value: "",
		required: true
	},
	{
		type: "text",
		name: "userName",
		title: "Name",
		id: uuidv4(),
		value: "",
		required: true
	},
	{
		type: "text",
		name: "surname",
		title: "Surname",
		id: uuidv4(),
		value: "",
		required: true
	},
	{
		type: "password",
		name: "password",
		title: "Password",
		id: uuidv4(),
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

const RegisterPage = () => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [fields, setFields] = useState<IInput[]>(inputs);
	const [disabled, setDisabled] = useState(false);
	const error = useSelector((store: RootState) => store.authentication.error); 
	
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
		let newFields = fields.map((field: IInput) => {
			if(field.id === id){
				field.value = e.currentTarget.value;
			}
			return field;
		})
		setFields(newFields)
	};

	const register = async () => {
		setDisabled(true);
		await dispatch(fetchRegister("free@samuraijs.com", "Slava", "Piter", "123456789"))
		setDisabled(false);
	}

	return (
		<BackgroundPage>
			<Card>
				<CardContent>
					<Typography variant="h6" gutterBottom>
					Регистрация
      		</Typography>
					{
						fields.map((inp: IInput) => <FormControlField {...inp} onChange={handleChange} />)
					}
					{
						error !== null && <p className={classes.error}>{error}</p>
					}
					<Button 
						variant="contained"
						onClick={register}
						disabled={disabled}
					>
						Отправить
					</Button>
				</CardContent>
			</Card>
		</BackgroundPage>
	)
};

export default withAuthRedirect(RegisterPage);