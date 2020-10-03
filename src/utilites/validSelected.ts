import  { Dispatch, SetStateAction } from 'react';

const validSelected = (
	addresses: string[],
	street: string,
	nameField: string,
	nameStreet: string,
	updateStreet: Dispatch<SetStateAction<string>>,
	updateStreets: Dispatch<SetStateAction<string[]>>
): void => {
	let newAddresses = [] as any;

	if(nameField === 'from'){
		newAddresses = [...addresses].filter((address: string) => address !== street && (!!nameStreet ? address !== nameStreet : true));
		updateStreet(street);
		updateStreets(newAddresses);
		return;
	}

	if(nameField === 'where'){
		newAddresses = [...addresses].filter((address: string) => address !== street && (!!nameStreet ? address !== nameStreet : true));
		updateStreet(street);
		updateStreets(newAddresses);
		return;
	}
}

export default validSelected;

/*
	nameStreet это проверка на соседнее поле инпут (если from, то проверка where,  и наооборот)
*/