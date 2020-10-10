import axios from "axios"

export type ResAddressType = {
	addresses: string[]
}

type СoordinateType = [number, number];

export type ResCoordinateRouteType = СoordinateType[];

const fetchAddressList = {
	getAddressList(){
		return axios.get<ResAddressType>("https://loft-taxi.glitch.me/addressList")
			.then(res => res.data.addresses)
	},
	getСoordinateRoute(addressOne: string, addressTwo: string){
		return axios.get<СoordinateType>(`https://loft-taxi.glitch.me/route?address1=${addressOne}&address2=${addressTwo}`)
			.then(res => res.data)
	}
};

export default fetchAddressList;