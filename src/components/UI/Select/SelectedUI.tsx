import { createStyles, FormControl, InputLabel, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles(() =>
	createStyles({
		formControl: {
			margin: 10,
			zIndex: 5,
			display: 'block'
		},
		selectEmpty: {
			marginTop: 20,
		},
		selected: {
			width: '100%',
		}
	}),
);

const SelectedUI = ({ addresses }: any) => {
	const classes = useStyles();

	const renderMenuItem = addresses.map((address: string) => {
		return <MenuItem value={address}>{address}</MenuItem>
	})

	return (
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-simple-select-label" >Улица</InputLabel>
				<Select
					className={classes.selected}
					labelId="demo-simple-select-label"
					id="demo-simple-select"
				>
					{renderMenuItem}
				</Select>
			</FormControl>
	)
}

export default SelectedUI;