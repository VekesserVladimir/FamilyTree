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
				<input type="password" class='input login-page__input' ref='pass' v-model='requestBody.password'>
				<button 
					class='input__toggle-button' 
					v-on:click='togglePassword' 
					v-bind:class="{'input__toggle-button_active' : !isHidden}">
						<font-awesome-icon icon='eye'></font-awesome-icon>
				</button>
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
			},
			isHidden: true
		}
	},
	computed: {
		...mapGetters(["getUserToken"])
	},
	methods: {
		...mapMutations(["setUser"]),
		async authorization() {
			let res = await fetch("https://familytree-stage.renerick.name/api/1.0.0/user/login", 
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(this.requestBody)
				});
			if(res.ok) {
				let token = await res.text();
				this.setUser(token);
				document.cookie = "token=" + token + "; max-age=86400";
				this.$router.push('/');
			}
		},
		togglePassword() {
			if(this.isHidden) {
				this.$refs.pass.type = 'text';
				this.isHidden = false;
			}
			else {
				this.$refs.pass.type = 'password';
				this.isHidden = true;
			} 
		}
	},
	beforeMount() {
		if(this.getUserToken) this.$router.push('/');
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
			position: relative;
			
			.input__toggle-button {
				background-color: transparent;
				border: none;
				position: absolute;
				bottom: 11px;
				right: 10px;
				font-size: 16px;
				color: #9E9898;

				&_active {
					color: #242121;
				}
			}

			input[type="password"] {
				font: large Monserrat;
				letter-spacing: 1px;
				-webkit-text-security: disc;
			}
		}

		.button_primary {
			width: 144px;
			margin-top: 58px;
		}
	}
</style>