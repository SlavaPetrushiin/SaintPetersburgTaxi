import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import LocalTaxiIcon from '@material-ui/icons/LocalTaxi';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

type TokeType = {
	token : string | null
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			flexGrow: 1,
			position: "fixed",
			top: 0,
			left: 0,
			right: 0,
		},
		toolbar: {
			backgroundColor: "#FFD700"
		},
		logo: {
			color: "black",
			marginRight: 10
		},
		menuButton: {
			marginRight: theme.spacing(2),
		},
		title: {
			flexGrow: 1,
			color: "#000000"
		},
		btn: {
			color: "#000000",
			fontWeight: 600,
			textDecoration: "none",
			marginLeft: 20,

			"&:hover": {
				borderBottom: "1px solid black"
			}
		}
	})
);

const Links: React.FC<TokeType> = ({token}): JSX.Element => {
	const classes = useStyles();

	return (
		<>
			{!!token && <Link className={classes.btn} to={"/profile"}>Профиль</Link>}
			{!!token && <Link className={classes.btn} to={"/map"}>Карта</Link>}
			{!!token && <Link className={classes.btn} to={"/"}>Выйти</Link>}
			{!token && <Link className={classes.btn} to={"/"}>Войти</Link>}
			{!token && <Link className={classes.btn} to={"/register"}>Регистрация</Link>}
		</>
	)
}

const Navbar = (): JSX.Element => {
	const classes = useStyles();
	const token = useSelector((store: RootState) => store.authentication.token);

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<Toolbar className={classes.toolbar}>
					<LocalTaxiIcon className={classes.logo} />
					<Typography variant="h6" className={classes.title}>
						Петербургское такси
					</Typography>
					<Links token={token}/>
				</Toolbar>
			</AppBar>
		</div>
	)
}

export default Navbar;