<template>
	<div class="header">
		<router-link to='/' class="logo">
			<img src="../assets/logo.svg" alt="" class='logo__img'> 
			<span class="logo__text">FamilyTree</span>
		</router-link>
		<SearchForm class='header__search-form'/>
		<button class="button button_primary header__button" v-on:click='openPersonCreateForm()'>
			<font-awesome-icon icon='user-plus'/>
		</button>
		<button class="button button_primary header__button" v-on:click='openPhotoUploadForm()'>
			<font-awesome-icon icon='file-upload'/>
		</button>
		<div class="account" v-click-outside="hideMenu">
			<div class="menu" v-bind:class="{ 'menu_active' : isActive}">
				<span class="menu__header">Admin</span>
				<router-link to='/profile' class="menu__link">Profile</router-link>
				<router-link to='/admin' class="menu__link">Admin dashboard</router-link>
				<span v-on:click='logout' class="menu__link">Logout</span>
			</div>
			<button class='account__button' v-on:click='isActive = !isActive'>
				<img src="https://i.ytimg.com/vi/PJnKLbKF3F8/maxresdefault.jpg" alt="user-photo" class='user-photo'>
			</button>
		</div>
		<UploadForm ref='photoForm'></UploadForm>
		<PersonForm ref='personForm' v-on:person-processed="openPersonPage"></PersonForm>
    </div>
</template>

<script>
import SearchForm from "./SearchForm";
import ClickOutside from "vue-click-outside"
import UploadForm from "./PhotoForm"
import PersonForm from "./PersonForm"
import { mapMutations } from "vuex"

export default {
	components: {
		SearchForm,
		UploadForm,
		PersonForm
	},
	directives: {
		ClickOutside
	},
	data() {
		return {
			isActive: false
		}
	},
	methods: {
		...mapMutations([ "setUser" ]),
		hideMenu() {
			if(this.isActive) this.isActive = false;
		},
		openPhotoUploadForm() {
			this.$refs.photoForm.openForm();
		},
		openPersonCreateForm() {
			this.$refs.personForm.openForm();
		},
		logout() {
			document.cookie = 'token=;max-age=-1';
			this.setUser(null);
			this.$router.push("/login");
		},
		openPersonPage(person) {
			this.$router.push({ path: `/person/${person.id}` });
		}
	}
}
</script>

<style lang='less'>
	.header {
		margin: 0 auto;
		width: 1440px;
		display: flex;

		&__button {
			margin: 16px 0 0 16px;
		}

		.logo {
			display: flex;
			align-items: flex-start;
			text-decoration: none;

			&__img {
				width: 56px;
				height: 56px;
				margin: 8px 9px 0 8px;
			}

			&__text {
				font-size: 24px;
				font-family: Adamina;
				margin-top: 20px;
				color: #242121;
			}
		}

		&__search-form {
			margin: 16px 0 0 45px;
			input {
				width: 704px;
			}

			.results {
				width: 704px;
			}
		}

		.account {
			position: relative;
			margin-top: 16px;

			&__button {
				border-radius: 50%;
				width: 40px;
				height: 40px;
				border: none;
				cursor: pointer;
				margin-left: 200px;
				z-index: 5;
				position: relative;
			}

			.menu {
				width: 184px;
				height: 173px;
				border-radius: 24px;
				box-shadow: 0 2px 4px #bebebe;
				padding: 19px 0 0 16px;
				position: absolute;
				right: -10px;
				top: -10px;
				transform-origin: 154px 30px;
				transform: scale(0.05);
				z-index: 3;
				transition: transform 0.1s ease-in-out;
				cursor: pointer;

				&_active {
					transform: scale(1);
				}

				&__header {
					display: inline-block;
					font-family: Rubik;
					font-weight: 300;
					font-size: 18px;
					line-height: 21px;
					margin-bottom: 21px;
					color: #242121;
				}

				&__link {
					display: block;
					text-decoration: none;
					font-family: Rubik;
					font-size: 16px;
					height: 33px;
					width: 100%;
					line-height: 33px;
					color: #918888;
				}

				&__link:hover {
					color: #242121;
				}
			}
		}
	}

</style>