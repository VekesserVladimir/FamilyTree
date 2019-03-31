var vm = new Vue({
	el: '#vue-app',
	data: {
		menu: {
			isActive: false,
			createMenuIsActive: false,
			browseMenuIsActive: false
		},
		searchForm: {
			isActive: false
		}
	}, 
	methods: {
		openSearchForm: function() {
			this.searchForm.isActive = true;
			document.querySelector('.search-form').style.display = 'inline-block';
			var form = document.querySelector('.search-field');
			form.focus();
			form.select();
		},
		closeSearchForm: function() {
			document.querySelector('.search-form').style.display = 'none';
			this.searchForm.isActive = false;
		}
	}
})