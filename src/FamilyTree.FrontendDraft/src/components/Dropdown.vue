<template>
	<div class="dropdown" v-click-outside='closeDropdown'>
		<div class="dropdown__select" 
            v-on:click='toggleDropdown'
            v-bind:class="{ 'dropdown__select_active' : isActive }"
            >{{ isLocked ? 'Choose a person' : selectedOption }}</div>
		<div class="dropdown__options" v-if='isActive'>
			<div 
                class="dropdown__option" 
                v-for='option in getOptions' 
                v-bind:key="option.id"
                v-on:click='selectOption(option)'>
				{{option.value}}
			</div>
		</div>
	</div>
</template>

<script>
import ClickOutside from "vue-click-outside"

export default {
	props: ["options", "isLocked"],
	data() {
		return {
            isActive: false,
            selectedOption: null
		}
	},
	methods: {
		toggleDropdown() {
			if(!this.isLocked) {
				this.isActive ? this.closeDropdown() : this.openDropdown()
			}
		},
		openDropdown() {
			this.isActive = true;
		},
		closeDropdown() {
			this.isActive = false;
        },
        selectOption(option) {
            this.selectedOption = option.value;
            this.isActive = false;
            this.$emit('input', this.selectedOption);
        }
    },
    computed: {
        getOptions() {
            if(this.selectedOption)
                return this.options.filter((item) => item.value != this.selectedOption);
            return this.options;
        }
    },
	directives: {
		ClickOutside
	}
}
</script>

<style lang='less' scoped>
	.dropdown {
        display: inline-block;
		position: relative;

		&__select {
			height: 40px;
			border-radius: 24px;
			background-color: #fff;
			border: 1px solid #9E9898;
			cursor: pointer;
			position: relative;
			padding: 10px 45px 10px 15px;

			&_active {
				border-radius: 20px 20px 0 0;
				border-bottom: none;
			}

			&::before {
				content: "";
				display: inline-block;
				border-top: 7px solid #9E9898;
				border-left: 6px solid transparent;
				border-right: 6px solid transparent;
				position: absolute;
				top: 16px;
				right: 13px;
			}
		}

		&__options {
			width: 100%;
			border: 1px solid #918888;
			border-top: none;
			border-radius: 0 0 24px 24px;
			position: absolute;
			top: 40px;
			z-index: 4;
			background-color: #fff;
			padding: 0 0 15px 0;
		}

		&__option {
			display: flex;
			align-items: center;
			text-decoration: none;
			padding: 10px 20px;

			&:hover {
				background-color: rgb(180, 233, 209);
			}
		}
	}
</style>