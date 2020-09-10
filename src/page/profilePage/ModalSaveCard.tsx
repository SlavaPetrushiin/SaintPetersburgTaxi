import React from 'react';
import { Card, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
	},
	pos: {
		marginBottom: 12,
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
				<Button size="small">Перейти на карту</Button>
			</CardActions>
		</Card>
	)
}

export default ModalSaveCard;