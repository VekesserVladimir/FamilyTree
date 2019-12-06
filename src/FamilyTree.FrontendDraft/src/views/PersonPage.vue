<template>
	<div class="person-page">
		<Header/>
		<div class="content">
			<div class="person-wrapper">
				<h1 class="header">{{ person.firstName + " " + person.lastName }}</h1>
				<div class="person">
					<p class="person__biography" v-if='person.biography'>{{ person.biography }}</p>
					<img v-bind:src="person.fullAvatarUri" class="person__photo">
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
	methods: {
		...mapGetters(["getTokenFromCookie"])
	},
	async mounted() {
		let res =  await fetch("https://familytree-stage.renerick.name/api/1.0.0/person/a1191c22-c7fa-48f8-86fa-966d1c18ebba?treeDepth=5", 
		{
			method: 'GET',
			headers: {
				Authorization: "Bearer " + this.getTokenFromCookie()
			}
		});
		this.person = await res.json();
		this.person.fullAvatarUri = "https://images.unsplash.com/photo-1489980557514-251d61e3eeb6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80";
		this.person.relatedPhotos = {};
		this.person.relatedPhotos.remainsCount = 3;
		this.person.relatedPhotos.photos = [
			{
				uri: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
			},
						{
				uri: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
			},
						{
				uri: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
			},
						{
				uri: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
			},
						{
				uri: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
			},
						{
				uri: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
			},
						{
				uri: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
			},
						{
				uri: "https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
			}
		]
		this.person.relatives = [
    {
      kind: "spouse",
      person: {
        id: "string",
        firstName: "string",
        lastName: "string",
        sex: "male",
        birth: "2019-12-02T20:11:52.353Z",
        death: "2019-12-02T20:11:52.353Z",
        biography: "string",
        relatives: [
          null
        ]
      }
    }
  ]
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