import axios from "axios"

export type ResAddressType = {
	addresses: string[]
}

const fetchAddressList = {
	getAddressList(){
		return axios.get<ResAddressType>("https://loft-taxi.glitch.me/addressList").then(res => res.data.addresses)
	}
};

export default fetchAddressList;