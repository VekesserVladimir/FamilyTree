<template>
	<div class='login-page'>
		<img src="../assets/FamilyTree.svg" alt="logo" class='login-page__logo'>
		<form action="" class='login-form'>
			<div class="input-wrapper">
				<span class='input-title'>Login</span>
				<input type="text" class='input login-page__input'>
			</div>
			<div class="input-wrapper">
				<span class='input-title'>Password</span>
				<input type="text" class='input login-page__input'>
			</div>
			<button class="button button_primary">Login</button>
			<router-link to='/register' href="" class='login-page__link'>Register</router-link>
		</form>
	</div>
</template>

<script>
export default {
	
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