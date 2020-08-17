import React from 'react';
import classes from './Input.module.css';

interface IProps{
	onChange?: (value: string, id: string) => void
	type?: string
	label?: string
	error?: string
	id: string
	value: string
	placeholder: string
	name: string
}

const Input = (props: IProps) => {
	const inputType = props.type || "text";
	const onChange = props.onChange || function(){};
	const {id, value, placeholder, name, label, error} = props;
	const cls = [classes.Input];

	return (
		<div className={cls.join(' ')}>

			{!!label && <label htmlFor={id}></label>}

			<input
				type={inputType}
				id={id}
				value={value}
				placeholder={placeholder}
				name={name}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e.currentTarget.value, id)}
			/>

			{!!error && <span>{error}</span>}

		</div>
	)
}

export default Input;