import React, { useState, useEffect } from 'react';
import BackgroundPage from '../../components/BackgroundPage/BackgroundPage';
import { Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
//@ts-ignore
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import Input from '../../components/UI/Input';
import { fetchPostUserCard, fetchGetUserCard } from '../../store/userCard/userCard';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
	},
	root: {
		minWidth: 275,
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	}
});


const SaveDataCard = () => {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography variant="h5" component="h2">
					Профиль
        </Typography>
				<Typography className={classes.pos} color="textSecondary">
					способы оплаты
        </Typography>
				<Typography variant="body2" component="p">
					Платёжные данные обновлены. Теперь вы можете заказывать такси.
        </Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Перейти на карту</Button>
			</CardActions>
		</Card>
	)
}

const ProfilePage = () => {
	const classes = useStyles();
	const saveDataCard = useSelector((state: RootState) => state.userCard.success);
	const getDataCard = useSelector((state: RootState) => state.userCard.card);
	const dispatch = useDispatch();
	const [focus, setFocus] = useState("")
	const [bankCard, setBankCard] = useState<ICard>({
		cvc: '',
		expiry: '',
		name: '',
		number: '',
	});

	useEffect(() => {
		dispatch(fetchGetUserCard())
	}, []);

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
		if (!validation) {
			return true;
		}

		let isValid = true;

		if (validation.required) {
			isValid = value.trim() !== "" && isValid;
		}

		if (validation.maxLength) {
			isValid = value.length <= validation.maxLength && isValid;
		}

		return isValid;
	}

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
				saveDataCard
					? <SaveDataCard />
					: (
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
								<Button
									variant="contained"
									color="primary"
									onClick={sendDataCard}
								>
									Send
						</Button>
							</form>
						</Card>
					)
			}

		</BackgroundPage >
	)
};

export default ProfilePage;