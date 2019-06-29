Vue.component("card-history", {
	data: function() {
		return {
			cardHistoryItems: [
				{
					name: "Add info about home",
					author: "Admin",
					date: "2019.11-01 14:01",
					properties: [
						{
							name: "Family name",
							oldValue: "Ivanova",
							newValue: "Petrova"
						},
						{
							name: "Family name",
							oldValue: "Ivanova",
							newValue: "Petrova"
						},
						{
							name: "Family name",
							oldValue: "Ivanova",
							newValue: "Petrova"
						}
					]
				},
				{
					name: "Add info about home",
					author: "Admin",
					date: "2019.11-01 14:01",
					properties: [
						{
							name: "Family name",
							oldValue: "Ivanova",
							newValue: "Petrova"
						},
						{
							name: "Family name",
							oldValue: "Ivanova",
							newValue: "Petrova"
						},
						{
							name: "Family name",
							oldValue: "Ivanova",
							newValue: "Petrova"
						}
					]
				},
				{
					name: "Add info about home",
					author: "Admin",
					date: "2019.11-01 14:01",
					properties: [
						{
							name: "Family name",
							oldValue: "Ivanova",
							newValue: "Petrova"
						},
						{
							name: "Family name",
							oldValue: "Ivanova",
							newValue: "Petrova"
						},
						{
							name: "Family name",
							oldValue: "Ivanova",
							newValue: "Petrova"
						}
					]
				}
			]
		}
	},
	template:   "<div class='card-history'>" +
					"<history-card-item v-for='item in cardHistoryItems' v-bind:key='item.id' v-bind:item='item'></history-card-item>" +
				"</div>"
});

Vue.component("history-card-item", {
	data: function() {
		return {

		}
	},
	props: [ "item" ],
	template: "<div class='card-history-item'>" +
				"<p class='item-heading'>{{ item.name }}</p>" +
				"<div class='history-item__wrapper'>" +
					"<a href='' class='link link_green_medium history-item__link'>{{ item.author }}</a>" +
					"<span class='history-item__date'>{{ item.date }}</span>" +
				"</div>" +
				"<div class='card-history-item__property-list'>" +
					"<history-card-item-property v-for='prop in item.properties' v-bind:key='prop.id' v-bind:property='prop'></history-card-item-property>" +
				"</div>" +
				"<div class='card-history-item__line'></div>" +
			"</div>"
});

Vue.component("history-card-item-property", {
	data: function() {
		return {

		}
	},
	props: [ "property" ],
	template: 	"<div class='history-item__wrapper'>" +
					"<span class='card-history-item__property-name'>{{ property.name }}:</span>" +
					"<span class='card-history-item__value card-history-item__value_old'>{{ property.oldValue }}</span>" +
					"<div class='card-history-item__arrow'></div>" +
					"<span class='card-history-item__value card-history-item__value_new'>{{ property.newValue }}</span>" +
				"</div>"
});

var familyMember = Vue.component('family-member', {
	data: function() {
		return {
			memberName: this.name,
			memberBirth: this.dateofbirth,
			memberDeath: this.dateofdeath,
			isEditing: false
		}
	},
	methods: {
		editMember: function() {
			this.isEditing = true;
		},
		deleteMember: function() {
			this.$emit('userdelete', this.index);
		},
		changeMember: function() {
			if(this.memberName == '' || this.memberBirth == '' || this.memberDeath == '') return;
			this.$emit('changemember', this.index, this.memberName, this.memberBirth, this.memberDeath);
			this.isEditing = false;
		}
	},
	props: [ "name", "startdate", "enddate", "index" ],
	template:   "<div class='family-member'>" +
					"<div class='family-member__wrapper'>" + 
						"<span class='family-member__name'>{{ name }}</span>" +
					"</div>" +
					"<div class='family-member__wrapper'>" +
						"<input type='text' class='family-member__date-input' v-if='isEditing' v-model='memberBirth'>" +
						"<span class='family-member__date' v-if='!isEditing'>{{ startdate }}</span>" +
						"<span class='family-member__dash'>-</span>" +
						"<input type='text' class='family-member__date-input' v-if='isEditing' v-model='memberDeath'>" +
						"<span class='family-member__date' v-if='!isEditing'>{{ enddate }}</span>" +
					"</div>" +
					"<div class='family-member__wrapper'>" +
						"<button class='family-member__button family-member__button_edit' v-on:click.prevent='editMember' v-if='!isEditing'></button>" +
						"<button class='family-member__button family-member__button_confirm' v-on:click.prevent='changeMember' v-if='isEditing'></button>" +
						"<button class='family-member__button family-member__button_delete' v-on:click.prevent='deleteMember'></button>" +
					"</div>" +
				"</div>"
});

var fm = Vue.component('family-members', {
	data: function() {
		return {
			isOpen: false,
			memberList: [
				{ 
					name: 'Ivanov Ivan Ivanovich',
					startDate: '01.01.2010',
					endDate: '01.01.2011'
				},
				{
					name: 'Ivanov Ivan Ivanovich',
					startDate: '01.01.2013',
					endDate: '01.01.2015'
				},
			],
			addForm: {
				isActive: false,
				checkboxIsActive: true,
				person: '',
				startDate: '',
				endDate: '',
				personError: false,
				startDateError: false,
				endDateError: false
			}
		}
	},
	props: [ "type" ],
	methods: {
		openAddForm: function() {
			this.addForm.isActive = true;
		},
		closeAddForm: function() {
			this.addForm.person = '';
			this.addForm.startDate = '';
			this.addForm.endDate = '';
			this.addForm.isActive = false;
		},
		addNewSpouse: function() {
			var flag = false;
			if(this.addForm.person == '') {
				this.addForm.personError = true;
				flag = true;
			}
			if(this.addForm.startDate == '') {
				this.addForm.startDateError = true;
				flag = true;
			}
			if(!this.addForm.checkboxIsActive && this.addForm.endDate == '') {
				this.addForm.endDateError = true;
				flag = true;
			}
			if(flag) return;
			if(this.addForm.checkboxIsActive) {
				this.addForm.endDate = 'present';
			}
			this.memberList.push({
				name: this.addForm.person,
				startDate: this.addForm.startDate.split('-').join('.'),
				endDate: this.addForm.endDate.split('-').join('.')
			});
			this.closeAddForm();
		},
		deleteMember: function(index) {
			console.log(this.type, typeof this.type);
			this.memberList.splice(index, 1);
		},
		changeMember: function(index, name, birth, death) {
			this.memberList[index].name = name;
			this.memberList[index].startDate = birth;
			this.memberList[index].endDate = death;
		},
		toggleList: function() {
			this.isOpen = !this.isOpen;
			this.addForm.isActive = false;
		},
		closeList: function() {
			this.isOpen = false;
			this.addForm.isActive = false;
		}
	},
	components: {
		familyMember
	},
	template:   "<div>" +
					"<div class='person-card-back__heading-wrapper'>" +
						"<span class='person-card-back__row-name person-card-back__list-button' v-on:click='toggleList'>{{type == 'marriage' ? 'Marriage' : 'Children'}}</span>" +
						"<div class='person-card-back__openArrow' v-on:click='toggleList' v-if='!isOpen'></div>" +
						"<div class='add-button_wrapper'  v-if='!addForm.isActive && isOpen' v-on:click='openAddForm'>" +
							"<button class='add-button-wrapper__button'></button>" +
							"<span class='add-button-wrapper__name'>Add new</span>" +
						"</div>" +    
					"</div>" +
					"<div class='family-members-control' v-bind:class='{ \"family-members-control_collapsed\" : !isOpen }'>" +
						"<div class='add-form' id='add-form_marriage' v-bind:class='{ addForm_marriage_collapsed : !addForm.isActive }'>" +
							"<button class='person-card-back__close-button person-card-back__close-button_small person-card-back__close-button_light' v-on:click.prevent='closeAddForm'>" +
								"<div></div>" +
								"<div></div>" +
							"</button>" +
						"<div class='person-card-back__row'>" +
							"<span class='person-card-back__row-name person-card-back__row-name_white'>Person</span>" +
							"<div class='person-card-back__search-form'>" +
								"<input type='text' class='input-field search-form__input-field search-form__field_card' v-model='addForm.person' v-bind:class='{ \"search-form__field_error\" : addForm.personError }'>" +
								"<input type='submit' class='person-card-back__submit-button' value='' title='Искать'>" +
							"</div>" +
						"</div>" +
						"<div class='person-card-back__row'>" +
							"<span class='person-card-back__row-name person-card-back__row-name_white'>{{type == 'marriage' ? 'Date of marriage' : 'Years of life'}}</span>" +
							"<div class='add-form__wrapper'>" +
								"<input type='date' class='input-field person-card-back__input-form' v-model='addForm.startDate' v-bind:class='{ \"search-form__field_error\" : addForm.startDateError }'>" +
								"<span class='add-form__dash' v-if='!addForm.checkboxIsActive'>-</span>" +
								"<input type='date' class='input-field person-card-back__input-form' v-model='addForm.endDate' v-if='!addForm.checkboxIsActive' v-bind:class='{ \"search-form__field_error\" : addForm.endDateError }'>" +
								"<div class='add-button_wrapper'>" +
									"<label class='checkbox'>" +
										"<input type='checkbox' v-model='addForm.checkboxIsActive'>" +
										"<div class='checkbox__custom-checkbox'></div>" +
										"<span class='add-button-wrapper__name add-button-wrapper__name_light'>{{type == 'marriage' ? 'Present' : 'Still alive'}}</span>" +
									"</label>" +
								"</div>" +
								"<button class='button button_primary button_small' v-on:click.prevent='addNewSpouse'>Add</button>" +
							"</div>" +
						"</div>" +
					"</div>" +
					"<div class='family-member-list'>" +
						"<family-member v-for='(member, index) in memberList' v-bind:key='member.id' v-bind:index='index' v-bind:name='member.name'" + 
						"v-bind:startdate='member.startDate' v-bind:enddate='member.endDate' v-on:userdelete='deleteMember' v-on:changemember='changeMember'></family-member>" +
					"</div>" +
				"</div></div>"
});

Vue.component('history-item', {
	data: function() {
		return {
			leftCheckbox: this.type == 'selectedLeft' ? true : false,
			rightCheckbox: this.type == 'selectedRight' ? true : false
		}
	},
	methods: {
		changeValue: function(checkbox) {
			console.log(this.leftCheckbox, this.rightCheckbox);
			this.$emit('changeValue', this.index, checkbox);
		}
	},
	props: [ "name", "author", "date", "text", "type", "index" ],
	template:   "<div class='history-item'>" +
					"<div class='history-item__radio-container'>" +
						"<label class='radio radio_history' v-bind:class='{ \"radio__custom-radio_hidden\" : type == \"onlyRightCheck\" || type == \"selectedRight\"}'>" +
							"<input type='radio' name='first' v-bind:checked='leftCheckbox' v-on:change='changeValue(\"left\")'>" +
							"<div class='radio__custom-radio'></div>" +
						"</label>" +
						"<label class='radio radio_history' v-bind:class='{ \"radio__custom-radio_hidden\" : type == \"onlyLeftCheck\" || type == \"selectedLeft\"}'>" +
							"<input type='radio' name='second' v-bind:checked='rightCheckbox' v-on:change='changeValue(\"right\")'>" +
							"<div class='radio__custom-radio'></div>" +
						"</label>" +
					"</div>" +
					"<div class='history-item__content'>" +
						"<div class='history-item__wrapper'>" +
							"<p class='item-heading'>{{ name }}</p>" +
							"<a href='#'' class='link link_blue history-item__link'>View revision</a>" +
							"<a href='#'' class='link link_blue history-item__link'>Revert</a>" +
						"</div>" +
						"<div class='history-item__wrapper'>" +
							"<a href='#' class='link link_green_medium history-item__link'>{{ author }}</a>" +
							"<span class='history-item__date'>{{ date }}</span>" +
						"</div>" +
						"<p class='history-item__message'>{{ text }}</p>" +
					"</div>" +
				"</div>"
});

Vue.component('history-item-list', {
	data: function() {
		return {
			firstSelectedItemIndex: 0,
			secondSelectedItemIndex: 1,
			historyItems: [
				{
					name: "Add info about home",
					author: "Admin",
					date: "2019.11-01 14:01",
					text: "Add some extra information about the house itself and the nature around"
				},
				{
					name: "Add info about home",
					author: "Admin",
					date: "2019.11-01 14:01",
					text: "Add some extra information about the house itself and the nature around"
				},
				{
					name: "Add info about home",
					author: "Admin",
					date: "2019.11-01 14:01",
					text: "Add some extra information about the house itself and the nature around"
				},
				{
					name: "Add info about home",
					author: "Admin",
					date: "2019.11-01 14:01",
					text: "Add some extra information about the house itself and the nature around"
				},
				{
					name: "Add info about home",
					author: "Admin",
					date: "2019.11-01 14:01",
					text: "Add some extra information about the house itself and the nature around"
				},
				{	
					name: "Add info about home",
					author: "Admin",
					date: "2019.11-01 14:01",
					text: "Add some extra information about the house itself and the nature around"
				}
			]
		}
	},
	methods: {
		changeValue(index, checkbox) {
			if(checkbox == 'left') {
				this.secondSelectedItemIndex = index;
			}
			if(checkbox == 'right') {
				this.firstSelectedItemIndex = index;
			}
		}
	},
	template: "<div class='history'><history-item v-on:changeValue='changeValue' v-for='(item, index) in historyItems' v-bind:index='index' v-bind:type='index < firstSelectedItemIndex ? \"onlyRightCheck\" : (index == firstSelectedItemIndex) ? \"selectedRight\" : (index > firstSelectedItemIndex && index < secondSelectedItemIndex) ? \"bothCheck\" : (index == secondSelectedItemIndex) ? \"selectedLeft\" : \"onlyLeftCheck\"' v-bind:key='item.id' v-bind:name='item.name' v-bind:author='item.author'" +
	 		  "v-bind:date='item.date' v-bind:text='item.text'></history-item></div>"
});

Vue.component('search-form', {
	data: function() {
		return {
			isActive: false,
			searchResult: "",
			xhr: new XMLHttpRequest()
		}
	},
	methods: {
		openSearchForm: function() {
			isActive = true;
			document.querySelector('.search-form').style.display = 'inline-block';
			var form = document.querySelector('.search-form__field');
			form.focus();
			form.select();
		},
		closeSearchForm: function() {
			if (document.querySelector('body').offsetWidth <= 750) {
				document.querySelector('.search-form').style.display = 'none';
				isActive = false;
			}
		},
		getSearchResult: function() {
			xhr.abort();
			xhr.open("GET", "search/autocomplete?q=query&person=false", true);
			xhr.timeout = 30000;
			xhr.send();

			xhr.onreadystatechange = function() {
				if (xhr.readyState != 4) return;
				this.searchResult = JSON.parse(xhr.responseXML);
			}
		}
	},
	template:   "<div class='search-form__wrapper'>" +
					"<form class='search-form header__search-form' action='' method='POST'>" +
						"<input type='text' placeholder='Search' class='input-field search-form__input-field' v-on:blur='closeSearchForm' v-on:input='getSearchResult'>" +
						"<input type='submit' class='search-form__submit-button' value='' title='Искать'>" +
					"</form>" +
					"<button class='mobile-search-button header__mobile-search-button' v-show='!isActive' v-on:click='openSearchForm'></button>" +
					"<div class='search-result-list'>" +
						"<div class='search-list__people'>" +
							"<search-form-item type='person' v-for='person in searchResult.Persons' v-bind:key='person.id' v-bind:item='person'></search-form-item>" +
						"</div>" +
						"<div class='card-history-item__line' v-if='searchResult != \"\"'></div>" +
						"<div class='search-list__articles'>" +
							"<search-form-item type='article' v-for='article in searchResult.Articles' v-bind:key='article.id' v-bind:item='article'></search-form-item>" +
						"</div>" +
					"</div>" +
				"</div>"
});

Vue.component('search-form-item', {
	data: function() {
		return {
			src: this.item.ThumbnailId
		}
	},
	props: [ "type", "item" ],
	template: 	"<a href='' class='search-result-list__item'>" +
					"<img v-bind:src='src' alt='' class='search-result-list__photo' v-if='type == \"person\"'\>" +
					"<span class='search-result-list__full-name'>{{(type == \"person\") ? (item.FirstName + \" \" + item.FamilyName + \" \" + item.MiddleName) : item.Title}}</span>" +
				"</a>"
})

var vm = new Vue({
	el: '#vue-app',
	data: {
		mobileNavigationMenu: {
			isActive: false,
			createItemActive: false,
			browseItemActive: false
		},
		searchForm: {
			isActive: false
		},
		personCard: {
			editingIsActive: false,
			stillAlive: true,
			firstName: '',
			lastName: '',
			middleName: '',
			dateOfBirth: '',
			dateOfDeath: '',
			father: '',
			mother: '',
			errors: {
				firstNameError: false,
				lastNameError: false,
				middleNameError: false,
				dateOfBirthError: false,
				dateOfDeathError: false,
				fatherError: false,
				motherError: false
			}
		},
		accountMenu: {
				isActive: false
		}
	},
	methods: {
		openEditPersonForm: function() {
			this.personCard.editingIsActive = true;
		},
		closeEditPersonForm: function() {
			this.$refs.fm1.closeAddForm();
			this.$refs.fm2.closeAddForm();
			this.$refs.fm1.closeList();
			this.$refs.fm2.closeList();
			this.personCard.editingIsActive = false;
		},
		checkForm: function(e) {
			if(this.personCard.firstName != '' && 
			   this.personCard.lastName != '' && 
			   this.personCard.middleName != '' && 
			   this.personCard.dateOfBirth && 
			   ((this.personCard.stillAlive && this.personCard.dateOfDeath != '') || (!this.personCard.stillAlive)) && 
			   this.personCard.father != '' && 
			   this.personCard.mother != '') {
				return true;
			}
			if(this.personCard.firstName == '') {
				this.personCard.errors.firstNameError = true;
			}
			if(this.personCard.lastName == '') {
				this.personCard.errors.lastNameError = true;
			}
			if(this.personCard.middleName == '') {
				this.personCard.errors.middleNameError = true;
			}
			if(this.personCard.dateOfBirth == '') {
				this.personCard.errors.dateOfBirthError = true;
			}
			if(!this.personCard.stillAlive && this.personCard.dateOfDeath == '') {
				this.personCard.errors.dateOfDeathError = true;
			}
			if(this.personCard.father == '') {
				this.personCard.errors.fatherError = true;
			}
			if(this.personCard.mother == '') {
				this.personCard.errors.motherError = true;
			}

			e.preventDefault();
		}
	},
	components: {
		fm
	}
});