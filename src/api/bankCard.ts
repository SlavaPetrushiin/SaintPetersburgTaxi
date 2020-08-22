import axios from "axios"

const fetchBankCard = {
	async fetchPostCard(cardNumber: string, expiryDate: string, cardName: string, cvc: string, token: string){
		let response = await axios.post("https://loft-taxi.glitch.me/card", {
			cardNumber,
			expiryDate,
			cardName,
			cvc,
			token
		})
		return response.data
	},
	async fetchGetCard(){
		let response = await axios.post("https://loft-taxi.glitch.me/card")
		return response.data
	}
};

export default fetchBankCard;