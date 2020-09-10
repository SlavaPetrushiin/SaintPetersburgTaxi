import { IValidation } from './../page/profilePage/ProfilePage';

export const validateControl = (value: string, validation: IValidation): boolean => {
	if (!validation) {
		return true;
	}

	let isValid = true;

	if (validation.required) {
		isValid = value.trim() !== "" && isValid;
	}

	if (validation.maxLength) {
		isValid = value.length <= validation.maxLength && isValid;
	}

	return isValid;
}