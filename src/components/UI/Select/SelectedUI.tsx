import { createStyles, FormControl, InputLabel, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

type PropsType = {
	onChangeField: (street: string) => void
	addresses: string[]
}

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

const SelectedUI = ({ addresses, onChangeField }: PropsType) => {
	const classes = useStyles();

	const renderMenuItem = addresses.map((address: string) => {
		return <MenuItem value={address}>{address}</MenuItem>
	})

	const onHandleChange = (e: any) => {
		let street = e.currentTarget.textContent;
		onChangeField(street);
	}
	debugger

	return (
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-simple-select-label" >Улица</InputLabel>
				<Select
					className={classes.selected}
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					onChange={onHandleChange}
				>
					{renderMenuItem}
				</Select>
			</FormControl>
	)
}

export default SelectedUI;