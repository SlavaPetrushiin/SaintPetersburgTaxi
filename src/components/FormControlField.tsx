import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import AccountCircle from '@material-ui/icons/AccountCircle';

type IProps = {
	type: string
	title: string
	name: string
	id: string
	value: string
	required: boolean
	onChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		form: {
			marginBottom: 20,
			width: "100%"
		},
		input: {
			width: "100%"
		}
	}),
);

const FormControlField = (props: IProps) => {
	const classes = useStyles();

	return (
		<FormControl className={classes.form}>
			<InputLabel htmlFor={props.id}>{props.title}</InputLabel>
			<Input
				type={props.type}
				id={props.id}
				name={props.name}
				required={props.required}
				value={props.value}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.onChange(e, props.id)}
				className={classes.input}
				startAdornment={
					<InputAdornment position="start">
						<AccountCircle />
					</InputAdornment>
				}
			/>
		</FormControl>
	);
}

export default FormControlField;
