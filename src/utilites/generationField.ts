import { v4 as uuidv4 } from 'uuid';

export type FieldType = {
	type: string
	title: string
	name: string
	id: string
	value: string
	required: boolean
}

export default function generationField(type: string, name: string, title: string, required: boolean):FieldType {
	return {
		type,
		name,
		title,
		required,
		id: uuidv4(),
		value: "",
	}
}