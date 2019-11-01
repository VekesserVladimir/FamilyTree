<template>
	<div class='register-page'>
		<img src="../assets/FamilyTree.svg" alt="logo" class='register-page__logo'>
		<form action="" class='login-form'>
			<div class="input-wrapper">
				<span class='input-title'>Login</span>
				<input type="text" class='input register-page__input'>
			</div>
			<div class="input-wrapper">
				<span class='input-title'>Password</span>
				<input type="password" class='input register-page__input'>
			</div>
			<button class="button button_primary">Register</button>
			<router-link to='/login' href="" class='register-page__link'>Login</router-link>
		</form>
	</div>
</template>

<script>
export default {
	
}
</script>

<style lang="less" scoped>
	.register-page {
		display: flex;
		flex-direction: column;
		align-items: center;

		&__logo {
			margin-top: 209px;
		}

		&__input {
			width: 320px;
			font-size: 16px;
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