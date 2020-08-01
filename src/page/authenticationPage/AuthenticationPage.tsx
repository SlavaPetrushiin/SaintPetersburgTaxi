import React from 'react';
import BackgroundPage from '../../components/BackgroundPage';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const AuthenticationPage = () => {
	return (
		<BackgroundPage>
			<Card>
				<CardContent>
					<Typography  color="textSecondary" gutterBottom>
						Word of the Day
					</Typography>
				</CardContent>
			</Card>
		</BackgroundPage>
	)
};

export default AuthenticationPage;

