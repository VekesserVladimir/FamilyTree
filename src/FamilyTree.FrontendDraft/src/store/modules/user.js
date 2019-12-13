export default {
	state: {
		token: null
	},
	mutations: {
		setUser(state, token) {
			state.token = token;
		}
	},
	getters: {
		getUserToken(state) {
			return state.token;
		},
		getTokenFromCookie() {
			let value = "; " + document.cookie;
			let parts = value.split("; " + "token" + "=");
			parts.splice(0, 1)
			return parts[0];
		}
	},
	actions: {

	}
}