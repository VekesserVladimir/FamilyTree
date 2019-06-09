Vue.component('history-item-control', {
    data: function() {
        return {
            isActive: false,
            leftCheckboxIsActive: false,
            rightCheckboxIsActive: false
        }
    },
    template: "<div class='history-item__radio-container'><label class='radio radio_history'><input type='radio' name='item1'><div class='radio__custom-radio'></div></label><label class='radio radio_history'><input type='radio' name='item1'><div class='radio__custom-radio'></div></label></div>"
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
            editingIsActive: false
        },
        accountMenu: {
            isActive: false
        },
        addFormMarriage: {
            isActive: true
        }
    },
    methods: {
        openSearchForm: function() {
            this.searchForm.isActive = true;
            document.querySelector('.search-form').style.display = 'inline-block';
            var form = document.querySelector('.search-form__field');
            form.focus();
            form.select();
        },
        closeSearchForm: function() {
            if (document.querySelector('body').offsetWidth <= 750) {
                document.querySelector('.search-form').style.display = 'none';
                this.searchForm.isActive = false;
            }
        },
        toggleEditPersonForm: function() {
            this.addFormMarriage.isActive = false;
        },
        toggleAddFormMarriage: function() {
            this.addFormMarriage.isActive = !this.addFormMarriage.isActive;
        }
    }
})