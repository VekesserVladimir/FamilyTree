<template>
	<div class="person-page" v-if="person">
		<Header/>
		<div class="content">
			<div v-if='isLoading' class="loader">
					<div class="loader-outter"></div>
					<div class="loader-inner"></div>
			</div>
			<div v-else class="person-wrapper">
				<div class="heading">
					<h1 class="heading__text">{{ person.firstName + " " + person.lastName }}</h1>
					<div class="heading__actions">
						<font-awesome-icon icon="pen" v-on:click='openPersonForm(person)'></font-awesome-icon>
					</div>
				</div>
				<div class="person">
					<p class="person__biography" v-if='person.biography'>{{ person.biography }}</p>
					<img v-bind:src="person.imageUri" class="person__photo">
				</div>
				<Gallery v-if="person.relatedPhotos" v-bind:photos="person.relatedPhotos"/>
				<div class="person__tree">
					<h4 class="header__small">Relatives</h4>
					<div id='graph'>
					</div>
				</div>
			</div>
		</div>
		<PersonForm ref='personForm' v-on:person-processed="loadData"></PersonForm>
	</div>
</template>

<script>
import Header from "../components/Header"
import Gallery from "../components/Gallery"
import PersonForm from "../components/PersonForm"
import {mapGetters} from "vuex"
// import treeConfig from "../dTree/tree-config";

export default {
	components: {
		Header,
		Gallery,
		PersonForm
	},
	data() {
		return {
			person: null,
			isLoading: true
		}
	},
	watch: {
		"$route": "loadData"
	},
	computed: {
		...mapGetters(["getUserToken"])

	},
	async mounted() {
		await this.loadData();
	},
	methods: {
		openPersonForm() {
			this.$refs.personForm.openForm(this.person);
		},
		async loadData() {
			this.isLoading = true;
			let res =  await fetch("https://familytree-stage.renerick.name/api/1.0.0/person/" + this.$route.params.id, 
			{
				method: 'GET',
				headers: {
					Authorization: "Bearer " + this.getUserToken
				}
			});
			this.person = await res.json();
			console.log(this.person);
			this.isLoading = false;
			// treeConfig(this.person.relatives);
		}
	}
}
</script>

<style lang="less" scoped>
	.person {
		display: flex;
		justify-content: center;
		margin-top: 16px;

		&-wrapper {
			width: 100%;
		}
		&__biography {
			font-family: Rubik;
			font-size: 16px;
			line-height: 25px;
			color: #242121;
			flex-grow: 1;
			padding-right: 25px;
		}

		&__photo {
			width: 464px;
			border-radius: 24px;
		}
	}

	.person__tree {
		margin-top: 32px;

		#graph {
			width: 944px;
			height: 475px;
			border-radius: 24px;
			border: 1px solid #9E9898;
			margin: 16px 0 52px 0;
		}

		.header__small {
			font-family: Montserrat;
			font-weight: 300;
			font-size: 24px;
			line-height: 29px;
			color: #242121;
		}
	}
</style>