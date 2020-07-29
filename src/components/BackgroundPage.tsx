import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
			flexGrow: 1,
			minHeight: "100vh",
			backgroundImage: "url('https://elegantnewyork.com/wp-content/uploads/2013/10/Yellow-Cab.jpg')",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
			backgroundSize: "cover"
    }
  })
);

const BackgroundPage = (props: any) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Grid container spacing={3}>
				<Grid item xs={12}>
					{props.children}
				</Grid>
			</Grid>
		</div>
	)
};

export default BackgroundPage;