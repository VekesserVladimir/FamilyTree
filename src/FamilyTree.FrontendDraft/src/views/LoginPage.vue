<template>
	<div class='login-page'>
		<img src="../assets/FamilyTree.svg" alt="logo" class='login-page__logo'>
		<form action="" class='login-form'>
			<div class="input-wrapper">
				<span class='input-title'>Login</span>
				<input type="text" class='input login-page__input' v-model='requestBody.username'>
			</div>
			<div class="input-wrapper">
				<span class='input-title'>Password</span>
				<input type="text" class='input login-page__input' v-model='requestBody.password'>
			</div>
			<button class="button button_primary" v-on:click='authorization'>Login</button>
			<router-link to='/register' href="" class='login-page__link'>Register</router-link>
		</form>
	</div>
</template>

<script>
import {mapMutations, mapGetters} from "vuex";

export default {
	data() {
		return {
			requestBody: {
				username: "",
				password: ""
			}
		}
	},
	methods: {
		...mapGetters(["getTokenFromCookie"]),
		...mapMutations(["setUser"]),
		async authorization() {
			let res = await fetch("https://familytree-stage.renerick.name/api/1.0.0/user/login", 
				{
					method: 'POST',
					// mode: "no-cors",
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(this.requestBody)
				});
			let token = await res.text();
			this.setUser(token);
			document.cookie = "token=" + token + "; mas-age=86400";
			this.$router.push('/');
		}
	},
	beforeMount() {
		if(this.getTokenFromCookie()) this.$router.push('/');
	}
}
</script>

<style lang="less" scoped>
	.login-page {
		display: flex;
		flex-direction: column;
		align-items: center;

		&__logo {
			margin-top: 209px;
		}

		&__input {
			width: 320px;
		}

		&__link {
			line-height: 25px;
			margin-top: 16px;
			text-decoration: none;
			color: #1F72AD;
		}
	}

	.login-form {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-top: 50px;
		
		.input-wrapper:nth-child(2) {
			margin-top: 16px;
		}

		.button_primary {
			width: 144px;
			margin-top: 58px;
		}
	}
</style>