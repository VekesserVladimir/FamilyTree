import Vue from 'vue'
import Vuex from 'vuex'
import photo from './modules/photo'
import user from './modules/user'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		photo,
		user
	}
})
