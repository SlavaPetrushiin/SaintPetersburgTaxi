import React, { useState } from 'react';
import BackgroundPage from '../../components/BackgroundPage';
import { useSelector } from 'react-redux';
import { Card } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
//@ts-ignore
import MaskedInput from 'react-text-mask';
//@ts-ignore
import Cards from 'react-credit-cards';

interface TextMaskCustomProps {
	inputRef: (ref: HTMLInputElement | null) => void;
}

function TextMaskCustom(props: TextMaskCustomProps) {
	const { inputRef, ...other } = props;

	return (
		<MaskedInput
			{...other}
			ref={(ref: any) => {
				inputRef(ref ? ref.inputElement : null);
			}}
			mask={[ /[1-9]/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
			placeholderChar={'\u2000'}
			showMask={true}
			guide={true}
		/>
	);
}


const ProfilePage = () => {
	const [state, setState] = useState({
		cvc: '',
		expiry: '',
		focus: '',
		name: '',
		number: '',
	});

  const [values, setValues] = useState({
    textmask: '0000-0000-0000-0000',
    numberformat: '1320',
	});
	
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

	return (
		<BackgroundPage>
			<Card>
				<div id="PaymentForm">
					<Cards
						cvc={state.cvc}
						expiry={state.expiry}
						focused={state.focus}
						name={state.name}
						number={state.number}
					/>
					<FormControl>
						<InputLabel htmlFor="formatted-text-mask-input">react-text-mask</InputLabel>
						<Input
							value={values.textmask}
							onChange={handleChange}
							name="textmask"
							id="formatted-text-mask-input"
							inputComponent={TextMaskCustom as any}
						/>
					</FormControl>


				</div>
			</Card>
		</BackgroundPage >
	)
};

export default ProfilePage;