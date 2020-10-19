import React from 'react';
import { Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	pos: {
		marginBottom: 12,
	},
	link: {
		backgroundColor: '#FFD700',
		borderRadius: 10,
		padding: 10,
		textDecoration: 'none',
		color: '#000000',
		fontWeight: 500,
		lineHeight: 1.75,
    textTransform: 'uppercase'
	}
});

const ModalSaveCard = () => {
	const classes = useStyles();

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
				<NavLink to='/map' className={classes.link}>Перейти на карту</NavLink>
			</CardActions>
		</Card>
	)
}

export default ModalSaveCard;