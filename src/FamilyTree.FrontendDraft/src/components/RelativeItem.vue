<template>
    <div class="relative-item">
        <img class='user-photo relative-item__user-photo' v-bind:src="relative.person.imageUri">
        <span class="relative-item__type">{{label}}</span>
        <span class="relative-item__full-name">{{relative.person.firstName + " " + relative.person.lastName}}</span>
        <button class='relative-item__delete' v-on:click='deleteRelative'>
			<div></div>
			<div></div>
		</button>
    </div>
</template>

<script>
export default {
    props: ['relative'],
    methods: {
        deleteRelative() {
            this.$emit('delete-relative', this.relative);
        }
    },
    computed: {
		label() {
            console.log(this.relative.person.sex,this.relative.person.sex == "male", this.relative.kind);
            if(this.relative.person.sex == "male") 
                return {"spouse": "Husband", "parent": "Father", "child": "Son"}[this.relative.kind]
            else 
                return {"spouse": "Wife", "parent": "Mother", "child": "Daughter"}[this.relative.kind]
        }

	}
}
</script>

<style lang='less' scoped>
    .relative-item {
        display: flex;
        align-items: center;
        position: relative;
        margin-bottom: 16px;
        
        &__user-photo {
			width: 32px;
            height: 32px;
        }
        
        &__type {
            display: inline-block;
            min-width: 90px;
            margin-left: 8px;
            font-family: Rubik;
            font-size: 16px;
            color: #9E9898;
        }

        &__full-name {
            font-family: Montserrat;
			font-size: 16px;
			font-weight: 500;
			color: #242121;
			margin-left: 11px;
        }

        &__delete {
			border: none;
			background-color: transparent;
            cursor: pointer;
            position: absolute;
            top: 14px;
            right: 8px;

			div {
				width: 15px;
				height: 3px;
				border-radius: 40px;
				background-color: #063E66;
			}

			div:nth-child(1) {
				transform: translate(0, 2px) rotate(45deg);
			}

			div:nth-child(2) {
				transform: translate(0, -1px) rotate(-45deg);
			}
		}
    }
</style>