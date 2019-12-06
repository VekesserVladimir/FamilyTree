export default {
	state: {
		token: ""
	},
	mutations: {
		setUser(state, token) {
			state.token = token;
		}
	},
	getters: {
		getUser(state) {
			return state.token;
		},
		getTokenFromCookie() {
			let value = "; " + document.cookie;
			let parts = value.split("; " + "token" + "=");
			if (parts.length == 2) return value = parts.pop().split(";").shift();
		}
	},
	actions: {

	}
}