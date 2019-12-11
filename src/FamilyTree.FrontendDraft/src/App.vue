<template>
	<div id="app">
		<router-view/>
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

		.header {
			font-size: 32px;
			font-weight: 500;
			line-height: 48px;
			color: #242121;
			margin-top: 24px;
			width: 100%;
		}
	}
</style>