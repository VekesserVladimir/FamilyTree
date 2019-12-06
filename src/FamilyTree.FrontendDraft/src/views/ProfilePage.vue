<template>
	<div class="profile-page">
		<Header/>
		<div class="content">
			<div v-if='isLoading' class="loader">
					<div class="loader-outter"></div>
					<div class="loader-inner"></div>
			</div>
			<div v-else class="profile-wrapper">
				<h1 class="header">{{user.username}}</h1>
				<div class="profile">
					<div class="profile__photo-wrapper">
						<img v-bind:src="user.photo" class="profile__photo">
						<input type="file" id='photo-input' v-on:change='uploadPhoto'>
						<label for="photo-input" class='profile__change_button'>Set photo</label>
					</div>
					<form action="" class="profile__form">
						<div class="profile__input-wrapper input-wrapper">
							<span class='input-title'>Old password</span>
							<input type="text" class='input profile-page__input'>
						</div>
						<div class="profile__input-wrapper input-wrapper">
							<span class='input-title'>Old password</span>
							<input type="text" class='input profile-page__input'>
						</div>
						<button class="profile__button button button_primary" v-on:click='uploadPhoto'>Update</button>
					</form>
				</div>
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
			user: null
		}
	},
	methods: {
		...mapGetters(["getTokenFromCookie"]),
		uploadPhoto(e) {
			let reader, files = e.target.files
			reader = new FileReader()
			reader.onload = (e) => {
				this.user.photo = e.target.result
			}
			reader.readAsDataURL(files[0]);
			console.log(this.user.photo);
			//this.user.photo = this.$refs.photoInput.files[0];
			//this.user.photo = 'https://images.unsplash.com/photo-1533972751724-9135a8410a4c?ixlib=rb-1.2.1&w=1000&q=80';
		}
	},
	async mounted() {
		let res = await fetch("https://familytree-stage.renerick.name/api/1.0.0/admin/user/1",
			{
				method: 'GET',
				headers: {
					Authorization: "Bearer " + this.getTokenFromCookie()
				}
			});
		this.user = await res.json();
		this.user.username = 'DASD'
		this.user.photo = "https://images.unsplash.com/photo-1516756587022-7891ad56a8cd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2134&q=80";
		this.isLoading = false;
	}
}
</script>

<style lang="less" scoped>
	.profile {
		width: 100%;
		display: flex;
		margin-top: 16px;

		&__button {
			margin: 14px 0 0 204px;
			width: 224px;
		}

		&__input-wrapper {
			margin-bottom: 26px;
		}

		&-page {
			&__input {
				width: 428px;
			}
		}

		&__form {
			margin-left: 52px;
			display: inline-block;
		}

		#photo-input {
			display: none;
		}

		&__change_button {
			border: none;
			background-color: #fff;
			cursor: pointer;
			width: 80px;
			height: 15px;
			color: #1F72AD;
			font-size: 16px;
			margin: 16px auto 0 auto;
			display: block;
		}

		&__photo {
			display: block;
			height: 288px;
			width: 224px;
			border-radius: 24px;
			object-fit: cover;

			&-wrapper {
				display: inline-block;
			}
		}
	}
</style>