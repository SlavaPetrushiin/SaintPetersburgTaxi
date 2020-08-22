import axios from "axios"

const signUp = {
	async fetchSignUp(email: string, password: string, name: string, surname: string){
		debugger
		let response = await axios.post("https://loft-taxi.glitch.me/register", {email, password, name, surname})
		return response.data;
	}
};

export default signUp;