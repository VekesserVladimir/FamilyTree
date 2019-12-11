<template>
	<div class="background" v-if='isActive'>
		<form class="person-form">
			<font-awesome-icon class=person-form__close icon='times' v-on:click='closeForm()'></font-awesome-icon>
			<h1 class='person-form__title'><span>Create person</span></h1>
			<div class="person-form__form">
				<div class="relatives">
					<h1 class="relatives__title">Relatives</h1>
					<div class="relatives__list">
						<RelativeItem 
							v-for='relative in relatives' 
							v-bind:key="relative.id" 
							v-bind:relative='relative'
							v-on:delete-relative='deleteRelative'/>
					</div>
					<div class="person-form__row">
						<div class="input-wrapper">
							<span class="input-title">Person</span>
							<SearchInput 
								v-model='selectedPerson'
								ref='searchInput'	
							/>
						</div>
					</div>
					<div class="person-form__row">
						<div class="input-wrapper">
							<span class="input-title">Type</span>
							<div class="input-wrapper__row">
								<Dropdown 
									v-bind:style="{ width: 326 + 'px' }" 
									v-bind:options="getTypes"
									v-bind:isLocked="isLocked"
									v-model="selectedType"
								/>
								<button 
									class="button button_secondary person-form__button"
									v-on:click='addRelative'>Add</button>
							</div>
						</div>
					</div>
				</div>
				<div class="person-info">
					<div class="input-wrapper">
						<span class="input-title">First name</span>
						<input type="text" class="input person-info__input" v-model='requestBody.firstName'>
					</div>
					<div class="input-wrapper">
						<span class="input-title">Last name</span>
						<input type="text" class="input person-info__input" v-model='requestBody.lastName'>
					</div>
					<div class="input-wrapper__row">
						<div class="input-wrapper">
							<span class="input-title">Sex</span>
							<Dropdown 
                                v-bind:options="genders"
                                v-bind:style="{ width: 110 + 'px' }"
                                v-bind:isLocked="false"
                                v-model="requestBody.sex"
                            />
						</div>
                        <div class="input-wrapper">
							<span class="input-title">Birth</span>
                            <Datepicker input-class='input person-info__date' v-model="requestBody.birth"/>
                            <font-awesome-icon icon='calendar' class='person-info__icon'></font-awesome-icon>
						</div>
                        <div class="input-wrapper">
							<span class="input-title">Death</span>
                            <Datepicker input-class='input person-info__date' v-model="requestBody.death"/>
                            <font-awesome-icon icon='calendar' class='person-info__icon'></font-awesome-icon>
						</div>
					</div>
                    <div class="input-wrapper">
                        <span class="input-title">Biography</span>
                        <textarea class='person-info__textarea' v-model='requestBody.biography'></textarea>
					</div>
				</div>
			</div>
            <div class="person-form__buttons-wrapper">
                <button 
                    class="button button_cancel person-form__main-button"
                    v-on:click='closeForm'
                >Cancel</button>
                <button 
                    class="button button_primary person-form__main-button"
                    v-on:click='createPerson'
                >Save</button>
            </div>
		</form>
	</div>
</template>

<script>
import RelativeItem from "./RelativeItem";
import SearchInput from "./SearchInput";
import ClickOutside from "vue-click-outside";
import Dropdown from "./Dropdown";
import Datepicker from "vuejs-datepicker";
import { mapGetters } from "vuex"

export default {
	components: {
		RelativeItem,
		SearchInput,
        Dropdown,
        Datepicker
	},
	directives: {
		ClickOutside
	},
	data() {
		return {
            requestBody: {
                firstName: null,
                lastName: null,
                sex: null,
                birth: null,
                death: null,
                biography: null,
                relatives: null
            },
			isActive: false,
			selectedPerson: null,
            selectedType: null,
            relatives: [],
			genders: [
				{
                    value: "Male"
                },
                {
					value: "Female"
				}
			]
		}
	},
	methods: {
		closeForm() {
			if(this.isActive) {
				this.isActive = false;
			}
		},
		openForm() {
			this.isActive = true;
		},
		addRelative(e) {
			e.preventDefault();
			if(this.selectedPerson && this.selectedType) {
				this.relatives.push({
					person: this.selectedPerson,
					type: this.selectedType
				});
			}
			this.selectedPerson = null;
			this.selectedType = null;
			this.$refs.searchInput.deleteQuery();
		},
		deleteRelative(relative) {
			let index = this.relatives.findIndex(item => item.id == relative.id);
			this.relatives.splice(index, 1);
        },
        async createPerson() {
            this.requestBody.relatives = this.relatives.map(item => {
                return {
                    kind: item.type,
                    personId: item.person.id
                }
            });
            console.log(JSON.stringify(this.requestBody));
            let res = await fetch("https://familytree-stage.renerick.name/api/1.0.0/person", {
                method: 'POST',
					headers: {
                        'Content-Type': 'application/json',
						Authorization: "Bearer " + this.getUserToken
					},
				body: JSON.stringify(this.requestBody)
            })
            console.log(res);
        }
	},
	computed: {
        ...mapGetters(["getUserToken"]),
		getTypes() {
			if(this.selectedPerson) {
				if(this.selectedPerson.sex == "male") {
					return [
						{
							value: "Husband"
						},
						{
							value: "Parent"
						},
						{
							value: "Son"
						},
						{
							value: "Relative"
						}
					]
				} else 
					return [
						{
							value: "Wife"
						},
						{
							value: "Parent"
						},
						{
							value: "Daughter"
						},
						{
							value: "Relative"
						}
					]
			}
			return null;
		},
		isLocked() {
			if(this.selectedPerson) return false;
				return true;
			
		}
	}
}
</script>

<style lang='less'>
	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		
		.person-form {
			width: 976px;
			height: 648px;
			background-color: #fff;
			border-radius: 24px;
			padding: 16px;
			position: relative;
			
			.person-info {
				width: 464px;
				margin-left: 16px;
				
				.input-wrapper {
                    margin-bottom: 11px;
                    position: relative;
				}

				&__input {
					width: 100%;
                }
                
                &__date {
                    width: 168px;
                    padding-right: 33px;
                }

                &__icon {
                    position: absolute;
                    top: 41px;
                    right: 15px;
                    font-size: 16px;
                    color: #9E9898;
                }

                &__textarea {
                    width: 464px;
                    height: 254px;
                    border-radius: 24px;
                    border: 1px solid #9E9898;
                    font-family: Montserrat;
                    font-size: 16px;
                    padding: 15px;
                    resize: none;
                }
			}

			&__button {
				width: 122px;
            }

            &__buttons-wrapper {
                display: flex;
                justify-content: flex-end;

            }

            &__main-button {
                width: 150px;

                &:nth-child(2) {
                    margin-left: 16px;
                }
            }

			&__search-form {
				input {
					width: 100%;
				}
			}

			.results {
				width: 100%;
			}

			&__form {
				display: flex;
				margin-top: 14px;

				.relatives {
					width: 464px;

					.person-form__row:nth-child(3) {
						margin-bottom: 11px;
					}

					&__list {
						height: 347px;
						overflow-y: scroll;

						&::-webkit-scrollbar {
							width: 4px;

							&-thumb {
								background-color: rgba(145, 136, 136, 0.5);
								border-radius: 10px;
							}
						}
					}

					&__title {
						line-height: 25px;
						font-size: 16px;
						font-weight: 500;
						color: #242121;
						margin-bottom: 7px;
					}
				}

			}

			&__close {
				font-size: 18px;
				color: #9E9898;
				position: absolute;
				top: 10px;
				right: 24px;
				cursor: pointer;
			}

			&__title {
				display: flex;
				justify-content: center;
				
				span {
					font-family: Rubik;
					font-weight: 300;
					font-size: 18px;
					line-height: 21px;
					color: #242121;
					margin: 0 auto;
				}
			}

			.input-wrapper__row {
				display: flex;
				justify-content: space-between;
			}
		}
	}
</style>