<template>
	<div class="photo-page">
		<Header/>
		<div class="content">
			<div v-if='isLoading' class="loader">
					<div class="loader-outter"></div>
					<div class="loader-inner"></div>
			</div>
			<div v-else class="photo-page-wrapper">
				<div class="heading">
					<h1  class="heading__text">
						<div class="input-wrapper" v-if="editing">
							<input type="text" class="input person-info__input" v-model='photo.title'>
						</div>
						<span v-else>
							{{photo.title}}
						</span>
					</h1>

					<div v-if="!editing" class="heading__actions">
						<font-awesome-icon icon="pen" v-on:click='editing = true'></font-awesome-icon>
					</div>
				</div>

				<TagEditor v-if="editing" v-model="photo"></TagEditor>
				<div v-else class="photo-page__photo">
					<img v-bind:src="photo.imageUri" class='photo-page__img'>
					<span class="photo-page__date">{{getDate}}</span>
				</div>
				<div class="tagged-people">
					<router-link v-bind:to="'/person/' + person.person.id" v-for='person in photo.taggedPersons' v-bind:key="person.id">
						<div class="tagged-person">
							<img v-bind:src="person.person.imageUri" class="user-photo">
							<span class='tagged-person__name'>{{person.person.firstName + " " + person.person.lastName}}</span>
						</div>
					</router-link>
				</div>
				<div class="input-wrapper" v-if="editing">
					<textarea class="input person-info__input" v-model='photo.description'></textarea>
				</div>
				<p v-else class='photo-description'>{{photo.description}}</p>
			</div>
		</div>
	</div>
</template>
<script>
import Header from "../components/Header"
import TagEditor from "../components/TagEditor"
import {mapGetters} from "vuex"

export default {
	components: {
		Header,
		TagEditor
	},
	data() {
		return {
			isLoading: true,
			photo: null,
			editing: false
		}
	},
	watch: {
		"$route": "loadData"
	},
	computed: {
		...mapGetters(["getUserToken"]),
		getDate() {
			let date = new Date(this.photo.date);
			return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
		}
	},
	async mounted() {
		await this.loadData();
	},
	methods: {		
		async loadData() {
			let res = await fetch("https://familytree-stage.renerick.name/api/1.0.0/photo/" + this.$route.params.id, {
				method: 'GET',
				headers: {
					Authorization: "Bearer " + this.getUserToken
				}
			});
			this.photo = await res.json();
			this.isLoading = false;
			console.log(this.photo);
		}
	}
}
</script>

<style lang="less" scoped>
	.photo-page {
		.tagged-people {
			margin: 25px 0 10px 0;
			width: 944px;
			white-space: nowrap;
			overflow-x: scroll;
			padding-bottom: 10px;

			&::-webkit-scrollbar {
				height: 0px;
			}

			.tagged-person {
				height: 48px;
				min-width: 230px;
				display: inline-flex;
				align-items: center;
				padding: 0 30px 0 8px;
				border-radius: 24px;
				border: 1px solid #9E9898;
				margin-right: 16px;
				font-family: Montserrat;
				font-weight: 500;
				font-size: 16px;
				color: #242121;

				&:nth-last-child(1) {
					margin: 0;
				}

				.user-photo {
					width: 32px;
					height: 32px;
					margin-right: 9px;	
				}
			}
		}

		&-wrapper {
			display: flex;
			flex-direction: column;
		}
		
		&__photo {
			align-self: center;
			margin-top: 16px;
		}

		&__img {
			width: 784px;
			border-radius: 24px;
			margin-bottom: 8px;
		}

		&__date {
			font-family: Rubik;
			font-size: 16px;
			color: #9E9898;
			display: block;
		}

		.photo-description {
			font-family: Rubik;
			font-size: 16px;
			line-height: 25px;
			color: #242121;
		}

		.input-wrapper {
			textarea {
				width: 100%;
				height: 400px;
				padding: 1em;
			}
		}
		
		.heading {
			.input-wrapper, .input-wrapper input {
				width: 100%;
			}
		}
	}
</style>