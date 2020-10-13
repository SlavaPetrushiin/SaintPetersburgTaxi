import axios from "axios"

export type ResAddressType = {
	addresses: string[]
}

export type СoordinateType = [number, number];

const fetchAddressList = {
	getAddressList(){
		return axios.get<ResAddressType>("https://loft-taxi.glitch.me/addressList")
			.then(res => res.data.addresses)
	},
	getСoordinateRoute(addressOne: string, addressTwo: string){
		return axios.get<СoordinateType[]>(`https://loft-taxi.glitch.me/route?address1=${addressOne}&address2=${addressTwo}`)
			.then(res => res.data)
	}
};

export default fetchAddressList;