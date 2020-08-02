import axios from "axios"

const signIn = {
	async fetchSignIn(email: string, password: string){
		let response = await axios.post("https://loft-taxi.glitch.me/auth", {email, password})
		return response.data
	}
};

export default signIn;