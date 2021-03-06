import React, { useState, useEffect, useCallback } from 'react';
import classes from './ProfilePage.module.css';
import BackgroundPage from '../../components/BackgroundPage/BackgroundPage';
import { v4 as uuidv4 } from 'uuid';
import { fetchPostUserCard, fetchGetUserCard } from '../../store/userCard/userCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CreditCard from './CreditCard';
import { validateControl } from '../../utilites/validateControl';
import ModalSaveCard from './ModalSaveCard';
import MaskedInput from 'react-text-mask';

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

export type CreditCardType = {
	cvc: string
	expiry: string
	name: string
	number: string
}

const ProfilePage = () => {
	const { success, card, successGet } = useSelector((state: RootState) => state.userCard);
	const dispatch = useDispatch();
	const [focus, setFocus] = useState("")
	const [bankCard, setBankCard] = useState<CreditCardType>({
		cvc: '',
		expiry: '',
		name: '',
		number: '',
	});

	useEffect(() => {
		dispatch(fetchGetUserCard())
	}, []);

	useEffect(() => {
		if (!!successGet) {
			const formControls = { ...state.formControls } as FormControlsType;
			const newBankCard = { ...bankCard };

			formControls.cvc.value = card.cvc;
			formControls.expiry.value = card.expiryDate;
			formControls.name.value = card.cardName;
			formControls.number.value = card.cardNumber;

			newBankCard.cvc = card.cvc;
			newBankCard.expiry = card.expiryDate;
			newBankCard.name = card.cardName;
			newBankCard.number = card.cardNumber;

			setState({ formControls });
			setBankCard(newBankCard);
		}
	}, [successGet])

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
				type: "expiry",
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
				type: "cvc",
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

	const onChange = (e: any): void => {
		const name = e.currentTarget.name as keyof FormControlsType;
		const value = e.currentTarget.value;
		const formControls = { ...state.formControls } as FormControlsType;
		const control = { ...formControls[name] };
		const newBankCard = { ...bankCard };

		control.value = value;
		control.touched = true;
		control.valid = validateControl(control.value, control.validation);
		newBankCard[name] = control.value;

		formControls[name] = control;

		setState({ formControls });
		setBankCard(newBankCard);
	};

	const onFocus = (name: string): void => {
		setFocus(name);
	}

	const renderInput = () => {
		return (Object.keys(state.formControls) as Array<keyof FormControlsType>).map(name => {
			const input = state.formControls[name];

			switch (input.type) {
				case "number": {
					return (
						<MaskedInput
							mask={[/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
							guide={true}
							placeholder="____ - ____ - ____ - _____"
							key={input.id}
							value={input.value}
							onChange={onChange as any}
							name="number"
							className={classes.fieldCard}
						/>
					)
				}
				case "expiry": {
					return (
						<MaskedInput
							mask={[/\d/, /\d/, '/', /\d/, /\d/]}
							guide={true}
							placeholder="__ / __"
							key={input.id}
							value={input.value}
							onChange={onChange as any}
							name="expiry"
							className={classes.fieldCard}
						/>
					)
				}
				case "cvc": {
					return (
						<MaskedInput
							mask={[/\d/, /\d/, /\d/]}
							key={input.id}
							value={input.value}
							onChange={onChange as any}
							name="cvc"
							className={classes.fieldCard}
						/>
					)
				}
				default: {
					return (
						<input
							type="text"
							key={input.id}
							value={input.value}
							onChange={onChange as any}
							name="name"
							className={classes.fieldCard}
						/>
					)
				}
			}
		})
	}

	const sendDataCard = useCallback(() => {
		dispatch(fetchPostUserCard(
			state.formControls.number.value,
			state.formControls.expiry.value,
			state.formControls.name.value,
			state.formControls.cvc.value,
		))
	}, [state.formControls, dispatch])

	return (
		<BackgroundPage>
			{
				success
					? <ModalSaveCard />
					: <CreditCard
						bankCard={bankCard}
						onFocus={onFocus}
						sendDataCard={sendDataCard}
						renderInput={renderInput}
					/>
			}
		</BackgroundPage >
	)
};

export default ProfilePage;