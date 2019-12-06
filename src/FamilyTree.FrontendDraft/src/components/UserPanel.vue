<template>
	<div class="user-panel">
		<div class="user-panel__row">
			<h4 class="user-panel__header">Users</h4>
			<input type="text" class='input user-panel__input'>
		</div>
		<div class="user-list">
			<UserItem v-for='user in usersList' v-bind:key="user.id" v-bind:user = 'user.user'/>
		</div>
			<SettingItem v-bind:setting = 'defaultSetting'/>
			<SettingItem v-bind:setting = 'anonym'/>
			<SettingItem v-bind:setting = 'registration'/>
	</div>
</template>

<script>
import UserItem from './UserItem';
import SettingItem from './SettingItem'
import {mapGetters} from "vuex"

export default {
	components: {
		UserItem,
		SettingItem
	},
	data() {
		return {
			usersList: [],
			defaultSetting: {
				name: 'Default',
				permission: 'readonly'
			},
			anonym: {
				name: 'Anonym',
				permission: 'noaccess'
			},
			registration: {
				name: 'Registration',
				permission: 'enabled'
			}
		}
	},
	methods: {
		...mapGetters(["getTokenFromCookie"])
	},
	async mounted() {
		let res = await fetch('https://familytree-stage.renerick.name/api/1.0.0/admin/users',
			{
				method: 'GET',
				headers: {
					Authorization: "Bearer " + this.getTokenFromCookie()
				}
			});
		res = await res.json();
		this.usersList = res.users;
		this.usersList.forEach(user => {
			user.avatarUri = 'https://i.ytimg.com/vi/PJnKLbKF3F8/maxresdefault.jpg';
			user.permission = 'readonly';
		});
		this.usersList = this.usersList.map(item => {
			return {
				user: item
			}
		})
	}
}
</script>

<style lang="less" scoped>
.user-panel {
	width: 464px;
	height: 640px;
	border-radius: 24px;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
	display: inline-block;

	&__input {
		width: 351px;
	}

	&__header {
		display: inline-block;
		font-family: Rubik;
		font-weight: 300;
		font-size: 18px;
		line-height: 21px;
		color: #242121;
	}

	&__row {
		margin-top: 16px;
		padding: 0 16px 0 26px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.user-list {
		width: calc(100% - 5px);
		margin: 24px 0 35px 0;
		height: calc(100% - 260px);
		overflow-y: scroll;

		&::-webkit-scrollbar {
			width: 4px;

			&-thumb {
				background-color: #918888;
				border-radius: 10px;
			}
		}
	}
}
</style>