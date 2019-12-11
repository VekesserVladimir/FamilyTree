<template>
	<div class="person-page">
		<Header/>
		<div class="content">
			<div class="person-wrapper">
				<h1 class="header">{{ person.firstName + " " + person.lastName }}</h1>
				<div class="person">
					<p class="person__biography" v-if='person.biography'>{{ person.biography }}</p>
					<img v-bind:src="person.imageUri" class="person__photo">
				</div>
				<Gallery v-bind:photos="person.relatedPhotos"/>
				<div class="person__tree">
					<h4 class="header__small">Relatives</h4>
					<div id='graph'>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Header from "../components/Header"
import Gallery from "../components/Gallery"
import {mapGetters} from "vuex"
import treeConfig from "../dTree/tree-config";

export default {
	components: {
		Header,
		Gallery
	},
	data() {
		return {
			person: null
		}
	},
	computed: {
		...mapGetters(["getUserToken"])

	},
	async mounted() {
		let res =  await fetch("https://familytree-stage.renerick.name/api/1.0.0/person/" + this.$route.params.id, 
		{
			method: 'GET',
			headers: {
				Authorization: "Bearer " + this.getUserToken
			}
		});
		this.person = await res.json();
		console.log(this.person);
		treeConfig(this.person.relatives);
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