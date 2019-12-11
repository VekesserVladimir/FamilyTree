<template>
	<form action="" class='search-form' v-click-outside="closeForm">
		<input 
			type="text" 
			class='search-form__input'
			v-model="query" 
			v-on:input='search'
			v-bind:class="{ 'search-form_active' : isActive }"
		>
		<button class='search-form__button'>
			<font-awesome-icon icon='search' class='search-form__icon'/>
		</button>
		<div class="results" v-if='isActive'>
			<h4 class="results__block-title block-title__offset" v-if='!peopleFound && !photosFound'>Query returned no results</h4>
			<div class="results__people" v-if='peopleFound'>
				<h4 class="results__block-title">People</h4>
				<router-link :to='`/person/${person.id}`' class="results__result" v-for='person in getSearchResults.personsResult' v-bind:key="person.id">
					<img alt="" class="user-photo results__user-photo" v-bind:src="person.imageUri">
					<div class="results__title">{{person.firstName + ' ' + person.lastName}}</div>
				</router-link>
			</div>
			<div class="results__photos" v-if='photosFound'>
				<h4 class="results__block-title">Photos</h4>
				<router-link :to='`/photo/${photo.id}`' class="results__result" v-for='photo in getSearchResults.photosResult' v-bind:key="photo.id">
					<img alt="" class="user-photo results__user-photo" v-bind:src='photo.imageUri'>
					<div class="results__title">{{photo.title}}</div>
				</router-link>
			</div>
		</div>
	</form>
</template>

<script>
import ClickOutside from "vue-click-outside"
import {mapGetters} from "vuex"

export default {
	name: "SearchForm",
	data() {
		return {
			searchResults: '',
			isActive: false,
			peopleFound: false,
			photosFound: false,
			query: ''
		}
	},
	methods: {
		async search() {
			if(this.query.length >= 3) {
				let res = await fetch('https://familytree-stage.renerick.name/api/1.0.0/search?query=' + this.query, 
				{
					method: 'GET',
					headers: {
						Authorization: "Bearer " + this.getUserToken
					}
				});
				this.searchResults = await res.json();
				this.isActive = true;
				if(this.searchResults.personsResult.length == 0) this.peopleFound = false; else this.peopleFound = true;
				if(this.searchResults.photosResult.length == 0) this.photosFound = false; else this.photosFound = true;
			} else {
				this.isActive = false;
				this.searchResults = '';
			}
		},
		closeForm() {
			this.isActive = false;
		}
	},
	computed: {
		...mapGetters(["getUserToken"]),
		getSearchResults() {
			if(this.searchResults) {
				return this.searchResults;
			} else return null;
		}
	},
	directives: {
		ClickOutside
	}
}
</script>

<style lang="less" scoped>
	.search-form {
		position: relative;

		&__input {
			height: 40px;
			border-radius: 24px;
			border: 1px solid #918888;
			padding-left: 20px;
			font-size: 16px;
		}

		&_active {
			border-radius: 20px 20px 0 0;
			border-bottom: none;
		}

		&__button {
			height: 40px;
			width: 40px;
			border-radius: 0 24px 24px 0;
			background-color: transparent;
			position: absolute;
			right: 2px;
			border: none;
			cursor: pointer;
		}

		&__icon {
			font-size: 16px;
			color: #918888; 	
		}

		.results {
			border: 1px solid #918888;
			border-top: none;
			border-radius: 0 0 24px 24px;
			position: absolute;
			top: 40px;
			z-index: 4;
			background-color: #fff;
			padding-bottom: 20px;

			&__block-title {
				margin: 0 0 10px 20px;
				color: #1a1a1a;
				font-weight: 500;
			}

			.block-title__offset {
				margin-top: 15px;
				margin-bottom: 15px;
			}

			&__result {
				display: flex;
				align-items: center;
				text-decoration: none;
				padding: 10px 20px;

				&:hover {
					background-color: rgb(180, 233, 209);
				}
			}

			&__people {
				padding: 15px 0 0 0;
			}

			&__photos {
				padding: 15px 0 20px 0;
			}

			&__user-photo {
				width: 30px;
				height: 30px;
			}

			&__title {
				margin-left: 10px;
				color: #1a1a1a;
				font-weight: 400;
			}
		}
	}
</style>