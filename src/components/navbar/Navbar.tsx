import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			position: "fixed",
			top: 0,
			left: 0,
			right: 0,
		},
		toolbar:{
			backgroundColor: "yellow"
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
			color: "#000000"
		},
		btn: {
			color: "#000000"
		}
	}),
);

const Navbar = () => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar className={classes.toolbar}>
					<Typography variant="h6" className={classes.title}>
						Saint Petersburg Taxi
					</Typography>
					<Button className={classes.btn}>Login In</Button>
					<Button className={classes.btn}>Login Up</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Navbar;