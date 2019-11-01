<template>
	<div class="header">
		<div class="logo">
			<img src="../assets/logo.svg" alt="" class='logo__img'> 
			<span class="logo__text">FamilyTree</span>
		</div>
		<SearchForm/>
		<button class="button button_primary">
			<font-awesome-icon icon='user-plus'/>
		</button>
		<button class="button button_primary">
			<font-awesome-icon icon='file-upload'/>
		</button>
		<div class="account" v-click-outside="hideMenu">
			<div class="menu" v-bind:class="{ 'menu_active' : isActive}">
				<span class="menu__header">Admin</span>
				<a href="" class="menu__link">Profile</a>
				<a href="" class="menu__link">Admin dashboard</a>
				<a href="" class="menu__link">Logout</a>
			</div>
			<button class='account__button' v-on:click='isActive = !isActive'>
				<img src="http://risovach.ru/upload/2019/09/generator/glad-valakas_218285982_orig_.png" alt="user-photo" class='user-photo'>
			</button>
		</div>
    </div>
</template>

<script>
import SearchForm from "./SearchForm";
import ClickOutside from "vue-click-outside"

export default {
	components: {
		SearchForm
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
		hideMenu() {
			if(this.isActive) this.isActive = false;
		}
	}
}
</script>

<style lang='less'>
	.header {
		margin: 0 auto;
		width: 1440px;
		display: flex;

		.logo {
			display: flex;
			align-items: flex-start;

			&__img {
				width: 56px;
				height: 56px;
				margin: 8px 9px 0 8px;
			}

			&__text {
				font-size: 24px;
				font-family: Adamina;
				margin-top: 20px;
			}
		}

		&__search-form {
			input {
				width: 704px;
			}
		}

		.button {
			margin: 16px 0 0 16px;
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
					color: #9E9898;
				}

				&__link:hover {
					color: #242121;
				}
			}
		}
	}

</style>