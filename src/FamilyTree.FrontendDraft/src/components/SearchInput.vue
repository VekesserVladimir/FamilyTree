<template>
    <div class="search-input" v-click-outside='closeForm'>
        <input 
            type="text" 
            class='input search-input__input' 
            v-on:input='search'
            v-model='query'
			v-bind:class="{ 'search-input_active' : isActive }"
            >
        <font-awesome-icon icon='users' class='search-input__icon'></font-awesome-icon>
        <div class="results" v-if='isActive'>
			<h4 class="results__block-title block-title__offset" v-if='!searchResults.personsResult.length'>The search has not given any results</h4>
            <div href='#' class="results__result" v-for='person in getSearchResults' v-bind:key="person.id" v-on:click='selectPerson(person)'>
				<img alt="" class="user-photo results__user-photo" v-bind:src="person.imageUri">
				<div class="results__title">{{person.firstName + ' ' + person.lastName}}</div>
			</div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";
import ClickOutside from "vue-click-outside"

export default {
    data() {
        return {
            selectedPerson: null,
            query: "",
            isActive: false,
            searchResults: ''
        }
    },
    directives: {
        ClickOutside
    },
    methods: {
        closeForm() {
            this.isActive = false;
        },
        selectPerson(person) {
            this.selectedPerson = person;
            this.query = person.firstName + " " + person.lastName;
            this.isActive = false;
            this.searchResults = '';
            this.$emit('input', this.selectedPerson);
        },
        deleteQuery() {
            this.query = "";
        },
        async search() {
			if(this.query.length >= 3) {
				let res = await fetch('https://familytree-stage.renerick.name/api/1.0.0/search?query=' + this.query + "&scopes=persons", 
				{
					method: 'GET',
					headers: {
						Authorization: "Bearer " + this.getUserToken
					}
				});
                this.searchResults = await res.json();
				this.isActive = true;
			} else {
				this.isActive = false;
				this.searchResults = '';
			}
		}
    },
    computed: {
        ...mapGetters(["getUserToken"]),
        getSearchResults() {
            return this.searchResults.personsResult;
        }
    }
}
</script>

<style lang='less' scoped>
    .search-input {
        position: relative;

        &__input {
            width: 464px;
            padding: 0 45px 0 15px;
        }

        &_active {
            border-radius: 20px 20px 0 0;
			border-bottom: none;
        }

        &__icon {
            position: absolute;
            top: 11px;
            right: 15px;
            font-size: 16px;
            color: #9E9898;
        }
    }

    .results {
        border: 1px solid #918888;
		border-top: none;
		border-radius: 0 0 24px 24px;
		position: absolute;
		top: 40px;
		z-index: 4;
        background-color: #fff;
        padding: 0 0 20px 0;

        &__block-title {
				margin: 0 0 10px 20px;
				color: #1a1a1a;
				font-weight: 500;
			}

		.block-title__offset {
			margin-top: 10px;
			margin-bottom: 5px;
		}
        
        &__title {
            margin-left: 10px;
            color: #1a1a1a;
            font-weight: 400;
        }

        &__result {
				display: flex;
				align-items: center;
				text-decoration: none;
                padding: 5px 20px;

				&:hover {
					background-color: rgb(180, 233, 209);
				}
			}
    }
</style>