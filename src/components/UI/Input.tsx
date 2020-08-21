import React from 'react';
import classes from './Input.module.css';
import { IValidation, FormControlsType } from '../../page/profilePage/ProfilePage';

interface IProps{
	onChange?: (value: string, name: keyof FormControlsType) => void
	onFocus: (name: string) => void
	type?: string
	label?: string
	name: keyof FormControlsType
	id: string
	value: string
	placeholder?: string
	errorMessage: string
	valid: boolean
	touched: boolean
	shouldValidate: boolean
	validation: IValidation
}

function isInvalid(props: IProps){
	const {valid, touched, shouldValidate} = props;
	return !valid && touched && shouldValidate
}

const Input = (props: IProps) => {
	const inputType = props.type || "text";
	const onChange = props.onChange || function(){};
	const onFocus = props.onFocus || function(){};
	const {id, value, placeholder, label, name} = props;
	const maxLength = props.validation.maxLength;
	const cls = [classes.Input];

	if(isInvalid(props)){
		cls.push(classes.invalid)
	}


	return (
		<div className={cls.join(' ')}>

			{!!label && <label htmlFor={id}></label>}

			<input
				type={inputType}
				id={id}
				name={name}
				value={value}
				placeholder={placeholder}
				maxLength={maxLength}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value, name)}
				onFocus={(e: React.FocusEvent<HTMLInputElement>) => onFocus(e.target.name)}
			/>

			{
				isInvalid(props)
					? <span>{props.errorMessage || "Введите корректные данные!"}</span>
					: null
			}

		</div>
	)
}

export default Input;