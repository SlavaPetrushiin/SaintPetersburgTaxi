import React, { useCallback, useState } from 'react';
import BackgroundPage from '../../components/BackgroundPage/BackgroundPage';
import { Card, CardContent, Typography, Button } from '@material-ui/core';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import FormControlField from '../../components/FormControlField';
import { useDispatch } from 'react-redux';
import { fetchRegister } from '../../store/signIn/authenticationReducer';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import generationField, { FieldType } from '../../utilites/generationField';

type StateType = {
	email: FieldType
	password: FieldType
	name: FieldType
	surname: FieldType
}

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
	const [fields, setFields] = useState<StateType>({
		email: generationField("email", "email", "Email", true),
		password: generationField("password", "password", "Password", true),
		name: generationField("text", "name", "Name", true),
		surname: generationField("text", "surname", "Surname", true)
	});
	const [disabled, setDisabled] = useState(false);
	const error = useSelector((store: RootState) => store.authentication.error); 
	
	const handleChange = useCallback(	(e: React.ChangeEvent<HTMLInputElement>, name: string): void => {
		let newFields = {...fields};
		let field = {...newFields[name as keyof typeof fields]};
		field.value = e.currentTarget.value;
		newFields[name as keyof typeof fields] = field;

		setFields(newFields);
	}, [fields]);

	const register = async (): Promise<void> => {
		setDisabled(true);
		await dispatch(fetchRegister(
			fields.email.value,
			fields.name.value,
			fields.surname.value,
			fields.password.value
		))
		setDisabled(false);
	}

	const renderFields = useCallback(() => {
		return (Object.keys(fields) as Array<keyof typeof fields>)
			.map(input => <FormControlField {...fields[input]} key={fields[input].id}  onChange={handleChange}/>)
	}, [fields, handleChange]);

	return (
		<BackgroundPage>
			<Card>
				<CardContent>
					<Typography variant="h6" gutterBottom>
						Регистрация
					</Typography>
					{renderFields()}
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

export default RegisterPage;