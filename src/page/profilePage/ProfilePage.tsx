import React, { useState } from 'react';
import BackgroundPage from '../../components/BackgroundPage';
import { useSelector } from 'react-redux';
//@ts-ignore
import Cards from 'react-credit-cards';
import { Card } from '@material-ui/core';

const ProfilePage = () => {
	const [state, setState] = useState({
		cvc: '',
		expiry: '',
		focus: '',
		name: '',
		number: '',
	});


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
					<form>
						<input
							type="tel"
							name="number"
							placeholder="Card Number"
						/>
          ...
        </form>
				</div>
			</Card>
		</BackgroundPage>
	)
};

export default ProfilePage;