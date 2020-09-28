import { createStyles, FormControl, InputLabel, makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

type PropsType = {
	onChangeField: (street: string) => void
	addresses: string[]
	street: string
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
		},
		dNone: {
			display: 'none'
		}
	}),
);

const SelectedUI = ({ addresses, street, onChangeField}: PropsType) => {
	const classes = useStyles();

	const renderMenuItem = addresses.map((address: string, i) => {
		return <MenuItem value={address} key={i}>{address}</MenuItem>
	})

	const onHandleChange = (e: any) => {
		let street = e.currentTarget.textContent;
		onChangeField(street);
	}

	return (
			<FormControl className={classes.formControl}>
				<InputLabel id="demo-simple-select-label" >Улица</InputLabel>
				<Select
					className={classes.selected}
					labelId="demo-simple-select-label"
					id="demo-simple-select"
					value={street}
					onChange={onHandleChange}
				>
					{renderMenuItem}
					<MenuItem value={street} className={classes.dNone}>{street}</MenuItem>
				</Select>
			</FormControl>
	)
}

export default SelectedUI;