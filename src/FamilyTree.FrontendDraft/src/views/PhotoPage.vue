<template>
	<div class="photo-page">
		<Header/>
		<div class="content">
			<div v-if='isLoading' class="loader">
					<div class="loader-outter"></div>
					<div class="loader-inner"></div>
			</div>
			<div v-else class="photo-page-wrapper">
				<h1 class="header">{{photo.title}}</h1>
				<div class="photo-page__photo">
					<img v-bind:src="photo.img" class='photo-page__img'>
					<span class="photo-page__date">{{getDate}}</span>
				</div>
				<div class="tagged-people">
					<div class="tagged-person" v-for='person in photo.taggedPersons' v-bind:key="person.id">
						<img v-bind:src="person.person.avatarUri" class="user-photo">
						<span class='tagged-person__name'>{{person.person.firstName + " " + person.person.lastName}}</span>
					</div>
				</div>
				<p class='photo-description'>{{photo.description}}</p>
			</div>
		</div>
	</div>
</template>
<script>
import Header from "../components/Header"
import {mapGetters} from "vuex"

export default {
	components: {
		Header
	},
	data() {
		return {
			isLoading: true,
			photo: null
		}
	},
	methods: {
		...mapGetters(["getTokenFromCookie"])
	},
	computed: {
		getDate() {
			let date = new Date(this.photo.date);
			return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
		}
	},
	async mounted() {
		let res = await fetch("https://familytree-stage.renerick.name/api/1.0.0/photo/06f353c4-66ea-4b25-8520-4551df553ddf", {
			method: 'GET',
			headers: {
				Authorization: "Bearer " + this.getTokenFromCookie()
			}
		});
		this.photo = await res.json();
		this.photo.taggedPersons.forEach(item => {
			item.person.avatarUri = 'https://i.ytimg.com/vi/PJnKLbKF3F8/maxresdefault.jpg';
			console.log(item);
		})
		this.photo.description = "Hard do me sigh with west same lady. Limits far yet turned highly repair parish talked six. " +
		"If as increasing contrasted entreaties be. Course sir people worthy horses add entire suffer. As so seeing latter he should thirty whence. " +
		"Now summer who day looked our behind moment coming. Estate was tended ten boy " +
		"Her too add narrow having wished. So by colonel hearted ferrars. Is inquiry no he several excited am. Way own uncommonly travelling now "+
		"acceptance bed compliment solicitude. Indulgence contrasted sufficient to unpleasant in in insensible favourable. Steepest speaking up " +
		"attended it as. Bed uncommonly his discovered for estimating"
		this.photo.img = "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80";
		this.isLoading = false;
		console.log(this.photo);
	}
}
</script>

<style lang="less" scoped>
	.photo-page {
		.tagged-people {
			margin: 25px 0 10px 0;
			width: 944px;
			white-space: nowrap;
			overflow-x: scroll;
			padding-bottom: 10px;

			&::-webkit-scrollbar {
				height: 0px;
			}

			.tagged-person {
				height: 48px;
				min-width: 230px;
				display: inline-flex;
				align-items: center;
				padding: 0 8px 0 8px;
				border-radius: 24px;
				border: 1px solid #9E9898;
				margin-right: 16px;
				font-family: Montserrat;
				font-weight: 500;
				font-size: 16px;
				color: #242121;

				&:nth-last-child(1) {
					margin: 0;
				}

				.user-photo {
					width: 32px;
					height: 32px;
					margin-right: 9px;	
				}
			}
		}

		&-wrapper {
			display: flex;
			flex-direction: column;
		}
		
		&__photo {
			align-self: center;
			margin-top: 16px;
		}

		&__img {
			width: 784px;
			border-radius: 24px;
			margin-bottom: 8px;
		}

		&__date {
			font-family: Rubik;
			font-size: 16px;
			color: #9E9898;
			display: block;
		}

		.photo-description {
			font-family: Rubik;
			font-size: 16px;
			line-height: 25px;
			color: #242121;
		}
	}
</style>