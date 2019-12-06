export default {
	state: {
		photoList: []
	},
	mutations: {

	},
	actions: {
		async requestPhotos(context, offset) {
			let links = [
				"https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
				"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
				"https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80",
				"https://images.unsplash.com/photo-1461280360983-bd93eaa5051b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
				"https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
				"https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
				"https://images.unsplash.com/photo-1482849297070-f4fae2173efe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
				"https://images.unsplash.com/photo-1482235225574-c37692835cf3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80"
			];
			let res = await fetch('https://familytree-stage.renerick.name/api/1.0.0/photos?offset=' + offset + '&count=20',
				{
					method: 'GET',
					headers: {
						Authorization: "Bearer " + context.rootGetters.getUser
					}
				}
			);
			let photo = await res.json();
			photo.forEach(item => {
				item.taggedPersons.forEach(person => {
					person.person.avatarUri = "https://i.ytimg.com/vi/PJnKLbKF3F8/maxresdefault.jpg";
				})
			})
			for(let i = 0; i < links.length; i++) {
				this.state.photo.photoList.push(JSON.parse(JSON.stringify(photo[0])));
				this.state.photo.photoList[i].photoLink = links[i];
				this.state.photo.photoList[i].id = i + 1;
			}
		}
	},
	getters: {
		getPhotos(state) {
			return state.photoList;
		}
	}
}