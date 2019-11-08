<template>
	<div class="user-item">
		<img v-bind:src='user.avatarUri' alt="" class="user-photo user-item__user-photo">
		<span class="user-item__name">{{ user.username }}</span>
		<div class='user-item__select'>
				<select v-model='user.permission'>
					<option value="readonly">Can read</option>
					<option value="readwrite">Can read and write</option>
					<option value="noaccess">Can't access</option>
					<option value="admin">Administrator</option>
				</select>
		</div>
		<button class='user-item__delete' v-if='!(user.permission == "admin")'>
			<div></div>
			<div></div>
		</button>
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

		&__delete {
			border: none;
			background-color: transparent;
			margin-left: 44px;
			cursor: pointer;

			div {
				width: 15px;
				height: 3px;
				border-radius: 40px;
				background-color: #908888;
			}

			div:nth-child(1) {
				transform: translate(0, 2px) rotate(45deg);
			}

			div:nth-child(2) {
				transform: translate(0, -1px) rotate(-45deg);
			}
		}

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