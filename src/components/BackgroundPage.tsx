import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

interface Props {
  children: JSX.Element[] | JSX.Element
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
			flexGrow: 1,
			minHeight: "100vh",
			backgroundImage: "url('https://elegantnewyork.com/wp-content/uploads/2013/10/Yellow-Cab.jpg')",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover"
		}, 
		wrapper:{
			maxWidth: 1200,
			width: "100%",
			margin: "0 auto",
			paddingTop: 100,
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
		},
		bgItem: {
			maxWidth: 450,
		}
  })
);

const BackgroundPage = (props: Props) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={2} className={classes.wrapper}>
				<Grid item xs={12} className={classes.bgItem}>
					{props.children}
				</Grid>
			</Grid>
		</div>
	)
};

export default BackgroundPage;