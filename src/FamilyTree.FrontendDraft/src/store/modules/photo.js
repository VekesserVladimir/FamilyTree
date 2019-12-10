export default {
	state: {
		photoList: []
	},
	mutations: {
		addPhotoList(state, photos) {
			state.photoList = photos;
		}
	},
	actions: {
		async requestPhotos(context, offset) {
			let res = await fetch('https://familytree-stage.renerick.name/api/1.0.0/photos?offset=' + offset + '&count=20',
				{
					method: 'GET',
					headers: {
						Authorization: "Bearer " + context.rootGetters.getUserToken
					}
				}
			);
			context.commit('addPhotoList', await res.json());

		}
	},
	getters: {
		getPhotos(state) {
			return state.photoList;
		}
	}
}