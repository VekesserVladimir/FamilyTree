<template>
	<div class="admin-page">
		<Header/>
		<div class="content">
			<div class="heading">
				<h1 class="heading__text">Administration panel</h1>
			</div>
			<div class="panel-container">
				<UserPanel/>
				<div class="statistic-panel">
					<div class="panel">
						<h4 class="panel__header">Persons</h4>
						<div class="panel__row">
							<div class="counter">
								<!-- <span class="counter__info">{{Math.ceil(stats.photosStats.totalRecords)}}</span> -->
								<span class="counter__header">Person records</span>
							</div>
							<div class="counter">
								<!-- <span class="counter__info">{{Math.ceil(stats.photosStats.totalRelations)}}</span> -->
								<span class="counter__header">Relation records</span>
							</div>
						</div>
					</div>
					<div class="panel">
						<h4 class="panel__header">Photos</h4>
						<div class="panel__row">
							<div class="counter">
								<!-- <span class="counter__info">{{Math.ceil(stats.personStats.totalPhotos)}}</span> -->
								<span class="counter__header">Photos</span>
							</div>
							<div class="counter">
								<!-- <span class="counter__info">{{Math.ceil(stats.personStats.totalTags)}}</span> -->
								<span class="counter__header">Tags</span>
							</div>							
						</div>
					</div>
					<div class="panel">
						<h4 class="panel__header">Status</h4>
						<div class="panel__row_status">
							<div class="status">
								<font-awesome-icon 
									icon='globe-europe' 
									class='status__icon' 
									v-bind:class="{ status__icon_disabled : !stats.server }"/>
								<span class="status__name">Server</span>
								<span 
									class="status__value"
									v-bind:class="{ status__value_disabled : !stats.server }"
									>{{ stats.server ? 'Ok' : 'Down' }}
								</span>
							</div>
							<div class="status">
								<font-awesome-icon 
									icon='meh' 
									class='status__icon'
									v-bind:class="{ status__icon_disabled : !stats.faceDetection }"/>
								<span class="status__name">Face detection</span>
								<span 
									class="status__value"
									v-bind:class="{ status__value_disabled : !stats.faceDetection }"
									>{{ stats.faceDetection ? 'Ok' : 'Down' }}
								</span>
							</div>
							<div class="status">
								<font-awesome-icon 
									icon='database' 
									class='status__icon'
									v-bind:class="{ status__icon_disabled : !stats.database }"/>
								<span class="status__name">Database</span>
								<span 
									class="status__value"
									v-bind:class="{ status__value_disabled : !stats.database }"
									>{{ stats.database ? 'Ok' : 'Down' }}
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from '../components/Header'
import UserPanel from '../components/UserPanel'
import {mapGetters} from "vuex"

export default {
	components: {
		Header,
		UserPanel
	},
	data() {
		return {
				stats: {

			}
		}
	},
	computed: {
		...mapGetters(["getUserToken"])
	},
	async mounted() {
		let res = await fetch('https://familytree-stage.renerick.name/api/1.0.0/admin/status', {
			method: 'GET',
			headers: {
				Authorization: "Bearer " + this.getUserToken
			}			
		});
		this.stats = await res.json();
		console.log(this.stats);
	}
}
</script>

<style lang="less" scoped>
	.panel-container {
		display: flex;
		width: 100%;
		justify-content: space-between;
		margin-top: 16px;

		.panel {
			width: 464px;
			height: 200px;
			box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
			border-radius: 24px;

			&__row {
				display: flex;
				justify-content: space-between;
				padding: 0 43px 0 49px;

				&_status {
					display: flex;
					justify-content: space-between;
					padding: 0 72px 0 78px;

					.status {
						display: flex;
						flex-direction: column;
						align-items: center;
						min-width: 71px;

						&__icon {
							font-size: 45px;
							color: #2CA770;
							margin-bottom: 13.2px;

							&_disabled {
								color: #918888;
							}
						}

						&__name {
							font-family: Rubik;
							font-size: 16px;
							line-height: 25px;
							color: #918888;
							margin-bottom: 2px;
						}

						&__value {
							font-family: Montserrat;
							font-size: 16px;
							color: #2CA770;

							&_disabled {
								color: #292929;
							}
						}
					}
				}

				.counter {
					display: flex;
					flex-direction: column;
					align-items: center;
					min-width: 131px;

					&__info {
						display: inline-block;
						font-size: 48px;
						color: #006C40;
					}

					&__header {
						display: inline-block;
						color: #918888;
						text-align: center;
					}
				}
			}

			&__header {
				display: inline-block;
				font-family: Rubik;
				font-weight: 300;
				font-size: 18px;
				line-height: 21px;
				color: #242121;
				margin: 26px 0 25px 25px;
			}
		}
	
		.statistic-panel {
			width: 464px;
			height: 640px;
			display: inline-flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}
</style>