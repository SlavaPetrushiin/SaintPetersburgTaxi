import React, { useState } from 'react';
import BackgroundPage from '../../components/BackgroundPage/BackgroundPage';
import { Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
//@ts-ignore
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import Input from '../../components/UI/Input';

export type IValidation = {
	required: boolean
	maxLength?: number
}

type IField = {
	name: keyof FormControlsType
	value: string
	type: string
	id: string
	errorMessage: string
	placeholder?: string
	valid: boolean
	touched: boolean
	validation: IValidation
}

export type FormControlsType = {
	number: IField
	name: IField
	expiry: IField
	cvc: IField
}

type IState = {
	formControls: FormControlsType
}

const useStyles = makeStyles({
	cardP: {
		padding: 15
	}
});

const ProfilePage = () => {
	const classes = useStyles();
	const [number, setNumber] = useState("");
	const [name, setName] = useState("");
	const [expiry, setExpiry] = useState("");
	const [cvc, setCvc] = useState("");
	const [focus, setFocus] = useState("");
	const [state, setState] = useState<IState>({
		formControls: {
			number: {
				value: "",
				name: "number",
				type: "number",
				id: uuidv4(),
				errorMessage: "Введите номер карты",
				placeholder: "Card number",
				valid: false,
				touched: false,
				validation: {
					required: true,
					maxLength: 16
				}
			},
			name: {
				value: "",
				name: "name",
				type: "text",
				id: uuidv4(),
				errorMessage: "Введите имя",
				placeholder: "Name",
				valid: false,
				touched: false,
				validation: {
					required: true
				}
			},
			expiry: {
				value: "",
				name: "expiry",
				type: "date",
				id: uuidv4(),
				errorMessage: "Выбирете дату",
				valid: false,
				touched: false,
				validation: {
					required: true
				}
			},
			cvc: {
				value: "",
				name: "cvc",
				type: "number",
				id: uuidv4(),
				errorMessage: "Введите cvc",
				valid: false,
				touched: false,
				validation: {
					required: true,
					maxLength: 10
				}
			},
		}
	});

	const onChange = (value: string, name: keyof FormControlsType) => {
		const formControls = {...state.formControls} as FormControlsType;
		const control = {...formControls[name]};
		
		control.value = value;
		control.touched = true;

		formControls[name] = control;

		setState({formControls});
	};

	const renderInput = () => {
		return (Object.keys(state.formControls) as Array<keyof FormControlsType>).map(name => {
			const input = state.formControls[name];
			return <Input {...input} onChange={onChange} key={input.id}/>
		})
	} 


	return (
		<BackgroundPage>
			<Card className={classes.cardP}>
				<Cards
					cvc={cvc}
					expiry={expiry}
					focused={focus}
					name={name}
					number={number}
				/>
				<form className="card__form">
					{renderInput()}
					<Button variant="contained" color="primary">Send</Button>
				</form>
			</Card>
		</BackgroundPage >
	)
};

export default ProfilePage;