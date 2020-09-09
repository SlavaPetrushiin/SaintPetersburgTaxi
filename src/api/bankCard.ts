import axios from "axios"

type PostCardResType = {
	success: boolean
	error?: string
}

type GetCardResType = {
	id: string,
	cardNumber: string,
	expiryDate: string,
	cardName: string,
	cvc: string	
}

const fetchBankCard = {
	fetchPostCard(cardNumber: string, expiryDate: string, cardName: string, cvc: string, token: string){
		return axios.post<PostCardResType>("https://loft-taxi.glitch.me/card", {
			cardNumber,
			expiryDate,
			cardName,
			cvc,
			token
		}).then(r => r.data)
	},
	fetchGetCard(token: string){
		return axios.get<GetCardResType>(`https://loft-taxi.glitch.me/card?token=${token}`).then(r => r.data)
	}
};

export default fetchBankCard;