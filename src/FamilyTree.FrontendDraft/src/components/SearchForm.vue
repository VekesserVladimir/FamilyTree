<template>
	<form action="" class='search-form header__search-form'>
		<input type="text" class='search-form__input'>
		<button class='search-form__button'>
			<font-awesome-icon icon='search' class='search-form__icon'/>
		</button>
	</form>
</template>

<script>
export default {
	name: "SearchForm"	
}
</script>

<style lang="less" scoped>
	.search-form {
		margin: 16px 0 0 45px;
		position: relative;

		&__input {
			height: 40px;
			border-radius: 24px;
			border: 1px solid #918888;
		}

		&__button {
			height: 40px;
			width: 40px;
			border-radius: 0 24px 24px 0;
			background-color: transparent;
			position: absolute;
			right: 0;
			border: none;
			cursor: pointer;
		}

		&__icon {
			font-size: 16px;
			color: #918888; 	
		}
	}
</style>