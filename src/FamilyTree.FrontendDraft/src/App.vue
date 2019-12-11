<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
import {mapMutations, mapGetters} from "vuex"
export default {
	methods: {
		...mapGetters(["getTokenFromCookie"]),
		...mapMutations(["setUser"])

	},
	beforeMount() {
		const token = this.getTokenFromCookie();
		console.log(window.location.pathname);
		if(token) this.setUser(token);
			else if(window.location.pathname != '/login') this.$router.push("/login");
	}
}
</script>

<style lang="less">
	@secondary-medium: #1F72AD;
	@achroma-black: #242121;

	body {
		&::-webkit-scrollbar {
			width: 4px;
			height: 4px;

			&-thumb {
				background-color: rgba(145, 136, 136, 0.5);
				border-radius: 10px;
				margin-right: 5px;
			}
		}
	}

	.content {
		width: 944px;
		margin: 0 auto;
		display: flex;
		flex-direction: column;
		align-items: center;

		.heading {
			display: flex;
			justify-content: space-between;
			align-items: baseline;
			width: 100%;

			&__text {
				font-size: 32px;
				font-weight: 500;
				line-height: 48px;
				color: @achroma-black;
				margin-top: 24px;
				width: 100%;
			}

			&__actions {
				color: @secondary-medium;

				* {
					cursor: pointer;
				}
			}
		}
	}
</style>