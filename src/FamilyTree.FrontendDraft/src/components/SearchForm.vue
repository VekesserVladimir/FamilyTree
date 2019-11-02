<template>
	<form action="" class='search-form header__search-form'>
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
			<div class="results__people">
				<h4 class="results__block-title">People</h4>
				<a href='#' class="results__result" v-for='person in getSearchResults.persons' v-bind:key="person.id">
					<img alt="" class="user-photo results__user-photo" v-bind:src="person.avatarUri">
					<div class="results__title">{{person.firstName + ' ' + person.lastName}}</div>
				</a>
			</div>
			<div class="line"></div>
			<div class="results__photos">
				<h4 class="results__block-title">Photos</h4>
				<a href='#' class="results__result" v-for='photo in getSearchResults.photos' v-bind:key="photo.id">
					<img alt="" class="user-photo results__user-photo" v-bind:src='photo.avatarUri'>
					<div class="results__title">{{photo.title}}</div>
				</a>
			</div>
		</div>
	</form>
</template>

<script>
export default {
	name: "SearchForm",
	data() {
		return {
			searchResults: '',
			isActive: false,
			query: ''
		}
	},
	methods: {
		async search() {
			if(this.query.length >= 3) {
				let res = await fetch('https://familytree-stage.renerick.name/api/1.0.0/search?query=' + this.query);
				this.searchResults = await res.json();
				this.isActive = true;
				this.searchResults.persons[1].avatarUri = 'http://risovach.ru/upload/2019/09/generator/glad-valakas_218285982_orig_.png';
				this.searchResults.persons[0].avatarUri = 'http://risovach.ru/upload/2019/09/generator/glad-valakas_218285982_orig_.png';
				this.searchResults.persons[0].id = 1;
				this.searchResults.persons[1].id = 2;
				this.searchResults.photos[0] = {};
				this.searchResults.photos[1] = {};
				this.searchResults.photos[0].avatarUri = 'http://risovach.ru/upload/2019/09/generator/glad-valakas_218285982_orig_.png';
				this.searchResults.photos[1].avatarUri = 'http://risovach.ru/upload/2019/09/generator/glad-valakas_218285982_orig_.png';
				this.searchResults.photos[0].title = 'Анапа 2006';
				this.searchResults.photos[1].title = 'Крым 2017';
			} else {
				this.isActive = false;
				this.searchResults = '';
			}
		}
	},
	computed: {
		getSearchResults() {
			if(this.searchResults) {
				return this.searchResults;
			} else return null;
		}
	}
}
</script>

<style lang="less" scoped>
	.search-form {
		margin: 16px 0 0 45px;
		position: relative;

		&__input {
			height: 40px;
			border-radius: 24px;
			border: 1px solid #918888;

			padding-left: 20px;
			font-size: 16px;
		}

		&_active {
			border-radius: 24px 24px 0 0;
			border-bottom: none;
		}

		&__button {
			height: 40px;
			width: 40px;
			border-radius: 0 24px 24px 0;
			background-color: transparent;
			position: absolute;
			right: 0;
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
			width: 704px;
			position: absolute;
			top: 40px;
			z-index: 4;
			background-color: #fff;

			&__block-title {
				margin: 0 0 10px 20px;
				color: #1a1a1a;
				font-weight: 500;
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
				padding: 20px 0;
			}

			&__photos {
				padding: 20px 0;
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

			.line {
				height: 1px;
				background-color: #918888;
			}
		}
	}
</style>