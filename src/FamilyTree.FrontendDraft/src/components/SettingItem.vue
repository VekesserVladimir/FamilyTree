<template>
	<div class="setting-item">
		<div
			v-if='setting.name == "Anonym"'
			class="user-photo setting-item__setting-photo_grey"
		>
			<img class='user-photo__icon' src='../assets/anonym.svg'>
		</div>
		<div v-else-if="setting.name == 'Default'"
			class="user-photo setting-item__setting-photo_grey"></div>
		<div v-else class="user-photo setting-item__setting-photo_white"></div>
		<span class="setting-item__name">{{setting.name}}</span>
		<div class='setting-item__select'>
				<select v-if='setting.name == "Registration"'>
					<option value="readonly">Enabled</option>
					<option value="readwrite">Disable</option>
				</select>
				<select v-else>
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
	props: ['setting']
}
</script>

<style lang="less" scoped>

	.setting-item {
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

		&__setting-photo_white {
			width: 32px;
			height: 32px;
			background-color: #fff;
			border: none;
		}

		&__setting-photo_grey {
			width: 32px;
			height: 32px;
			background-color: #E6E6E6;
			border: none;
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

	.user-photo {
		display: flex;
		justify-content: center;
		align-items: center;

		&__icon {
			width: 22px;
			height: 22px;
		}
	}
</style>