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
	shouldValidate: boolean
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

type ICard = {
	cvc: string
	expiry: string
	name: string
	number: string
}

const useStyles = makeStyles({
	cardP: {
		padding: 15
	}
});

const ProfilePage = () => {
	const classes = useStyles();
	const [focus, setFocus] = useState("")
	const [bankCard, setBankCard] = useState<ICard>({
    cvc: '',
    expiry: '',
    name: '',
    number: '',
	});
	const [state, setState] = useState<IState>({
		formControls: {
			number: {
				value: "",
				name: "number",
				type: "number",
				id: uuidv4(),
				shouldValidate: true,
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
				shouldValidate: true,
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
				shouldValidate: true,
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
				shouldValidate: true,
				errorMessage: "Введите cvc",
				valid: false,
				touched: false,
				validation: {
					required: true,
					maxLength: 3
				}
			},
		}
	});

	const validateControl = (value: string, validation: IValidation) => {
		if(!validation){
			return true;
		}

		let isValid = true;

		if(validation.required){
			isValid = value.trim() !== "" && isValid;
		}

		if(validation.maxLength){
			isValid = value.length <= validation.maxLength && isValid;
		}

		return isValid;
	}

	const onChange = (value: string, name: keyof FormControlsType) => {
		const formControls = {...state.formControls} as FormControlsType;
		const control = {...formControls[name]};
		const newBankCard = {...bankCard};

		if(control.name === "number" && !!control.validation.maxLength && value.length > control.validation.maxLength){
			return;
		}

		if(control.name === "cvc" && !!control.validation.maxLength && value.length > control.validation.maxLength){
			return;
		}
		
		control.value = value;
		control.touched = true;
		control.valid = validateControl(control.value, control.validation);
		newBankCard[name] = control.value;

		formControls[name] = control;

		setState({formControls});
		setBankCard(newBankCard);
	};

	const onFocus = (name: string) => {
		setFocus(name)
	}

	const renderInput = () => {
		return (Object.keys(state.formControls) as Array<keyof FormControlsType>).map(name => {
			const input = state.formControls[name];
			return <Input {...input} onFocus={onFocus} onChange={onChange} key={input.id}/>
		})
	} 

	return (
		<BackgroundPage>
			<Card className={classes.cardP}>
				<Cards
					cvc={bankCard.cvc}
					expiry={bankCard.expiry}
					focused={focus}
					name={bankCard.name}
					number={bankCard.number}
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