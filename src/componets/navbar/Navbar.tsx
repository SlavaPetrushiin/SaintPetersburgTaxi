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
		},
		toolbar:{
			backgroundColor: "#bdbdbd"
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
		},
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
					<Button color="inherit">Login In</Button>
					<Button color="inherit">Login Up</Button>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Navbar;