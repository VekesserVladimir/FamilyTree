<template>
	<div class="user-item">
		<img v-bind:src='user.avatarUri' alt="" class="user-photo user-item__user-photo">
		<span class="user-item__name">{{ user.username }}</span>
		<div class='user-item__select'>
				<select v-model='user.permission'>
					<option value="readonly">Can read</option>
					<option value="readwrite">Can read and write</option>
					<option value="noaccess">No access</option>
					<option value="admin">Admin</option>
				</select>
		</div>
	</div>
</template>

<script>
export default {
	props: ['user']
}
</script>

<style lang="less" scoped>
	.user-item {
		padding-left: 16px;
		display: flex;
		align-items: center;
		margin-bottom: 16px;

		&__select {

			select {
				cursor: pointer;
				font-size: 16px;
				font-weight: 500;
				width: 175px;
				border: none;
				color: #063E66;
			}
		}

		&__user-photo {
			width: 32px;
			height: 32px;
		}

		&__name {
			display: inline-block;
			min-width: 140px;
			padding-right: 20px;	
			font-family: Montserrat;
			font-size: 16px;
			font-weight: 500;
			color: #242121;
			margin-left: 11px;
		}
	}
</style>