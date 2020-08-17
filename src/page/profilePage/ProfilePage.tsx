import React, { useState } from 'react';
import BackgroundPage from '../../components/BackgroundPage/BackgroundPage';
import { Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuidv4 } from 'uuid';
//@ts-ignore
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import Input from '../../components/UI/Input';

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
				<form className={"card__form"}>

					<Input 
						type="text"
						id={uuidv4()}
						value={""}
						placeholder={"Card number"}
						name={"number"}
					/>

					<input 
						className={"card__input"}
						maxLength={16}
						type="tel"
						name="number"
						placeholder="Card number"
						value={number}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNumber(e.currentTarget.value)}
						onFocus={(e: any) => setFocus(e.currentTarget.name)}
					/>
					<input 
						className={"card__input"}
						type="text"
						name="name"
						placeholder="Name"
						value={name}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
						onFocus={(e: any) => setFocus(e.currentTarget.name)}
					/>
					<input 
						className={"card__input"}
						maxLength={4}
						type="tel"
						name="expiry"
						placeholder="MM/YY"
						value={expiry}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setExpiry(e.currentTarget.value)}
						onFocus={(e: any) => setFocus(e.currentTarget.name)}
					/>
					<input 
						className={"card__input"}
						maxLength={3}
						type="tel"
						name="cvc"
						placeholder="CVC"
						value={cvc}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCvc(e.currentTarget.value)}
						onFocus={(e: any) => setFocus(e.currentTarget.name)}
					/>
					<Button variant="contained" color="primary">Send</Button>
				</form>
			</Card>
		</BackgroundPage >
	)
};

export default ProfilePage;