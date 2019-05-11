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
        }
    },
    mounted() {
        document.querySelector('.history-item:nth-child(1)').classList.add('');
    }
})