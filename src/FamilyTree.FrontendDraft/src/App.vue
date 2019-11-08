<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="less">
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