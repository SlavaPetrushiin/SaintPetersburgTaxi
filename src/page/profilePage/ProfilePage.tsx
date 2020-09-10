import React, { useState, useEffect } from 'react';
import BackgroundPage from '../../components/BackgroundPage/BackgroundPage';
import { v4 as uuidv4 } from 'uuid';
import Input from '../../components/UI/Input';
import { fetchPostUserCard, fetchGetUserCard } from '../../store/userCard/userCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CreditCard from './CreditCard';
import { validateControl } from '../../utilites/validateControl';
import ModalSaveCard from './ModalSaveCard';

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

	const onChange = (value: string, name: keyof FormControlsType) => {
		const formControls = { ...state.formControls } as FormControlsType;
		const control = { ...formControls[name] };
		const newBankCard = { ...bankCard };

		if (control.name === "number" && !!control.validation.maxLength && value.length > control.validation.maxLength) {
			return;
		}

		if (control.name === "cvc" && !!control.validation.maxLength && value.length > control.validation.maxLength) {
			return;
		}

		control.value = value;
		control.touched = true;
		control.valid = validateControl(control.value, control.validation);
		newBankCard[name] = control.value;

		formControls[name] = control;

		setState({ formControls });
		setBankCard(newBankCard);
	};

	const onFocus = (name: string) => {
		setFocus(name);
	}

	const renderInput = () => {
		return (Object.keys(state.formControls) as Array<keyof FormControlsType>).map(name => {
			const input = state.formControls[name];
			return <Input {...input} onFocus={onFocus} onChange={onChange} key={input.id} />
		})
	}

	const sendDataCard = () => {
		dispatch(fetchPostUserCard(
			state.formControls.number.value,
			state.formControls.expiry.value,
			state.formControls.name.value,
			state.formControls.cvc.value,
		))
	}

	return (
		<BackgroundPage>
			{
				success
					? <ModalSaveCard  />
					: <CreditCard
						bankCard={bankCard}
						focus={onFocus}
						sendDataCard={sendDataCard}
						renderInput={renderInput}
					/>
			}
		</BackgroundPage >
	)
};

export default ProfilePage;