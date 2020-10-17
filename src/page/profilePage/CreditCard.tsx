import React from 'react';
import { Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
//@ts-ignore
import Cards from 'react-credit-cards';
import 'react-credit-cards/es/styles-compiled.css';
import { CreditCardType } from './ProfilePage';

type PropsType = {
	bankCard: CreditCardType
	onFocus: (name: string) => void
	sendDataCard: () => void
	renderInput: () => JSX.Element[]
}

const useStyles = makeStyles({
	cardP: {
		padding: 15
	}
});

const CreditCard = ({bankCard, onFocus, sendDataCard, renderInput}: PropsType): JSX.Element => {
	const classes = useStyles();
	
	return (
		<>
			<Card className={classes.cardP}>
				<Cards
					cvc={bankCard.cvc}
					expiry={bankCard.expiry}
					focused={() => onFocus(bankCard.name)}
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
		</>
	)
}

export default CreditCard;