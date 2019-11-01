<template>
	<div class='photo'>
		<img v-bind:src='photo.photoLink' class='photo__img'>
		<div class="info">
			<h4 class="info__title">{{photo.title}}</h4>
			<p class="info__description">{{photo.description}}</p>
			<div class="info__tagged-persons">
				<a 
					href="#" 
					v-for='person in photo.taggedPersons' 
					v-bind:key="person.id"
				>
					<img 
						v-bind:src='person.person.avatarUri' 
						class='user-photo info__user-photo'
					>
				</a>
			</div>
			<p class="info__date">{{getDate}}</p>
		</div>
	</div>
</template>

<script>
export default {
	props: ['photo'],
	computed: {
		getDate() {
			let date = new Date(this.photo.date);
			return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
		}
	}
}
</script>

<style lang="less" scoped>
	.photo {
		position: relative;
		display: inline-block;
		margin-bottom: 24px;
		height: 270px;
		border-radius: 24px;
		overflow: hidden;

		&:hover {
			.info {
				right: 0;
			}
		}

		&__img {
			width: 460px;
			height: 270px;
			object-fit: cover;
			border-radius: 24px;
		}

		&:nth-child(odd) {
			margin-right: auto;
		}

		.info {
			width: 300px;
			height: 100%;
			position: absolute;
			right: -300px;
			top: 0;
			background-color:rgba(34, 34, 34, 0.8);
			border-radius: 0 24px 24px 0;
			transition: right 0.15s ease;
			color: #FEFEFE;
			padding: 16px 0 0 16px;

			&__title {
				font-family: Rubik;
				font-weight: 300;
				font-size: 18px;
				line-height: 21px;
				margin-bottom: 16px;
			}

			&__description {
				font-size: 14px;
				margin-bottom: 38px; 
			}

			&__tagged-persons {
				margin-bottom: 16px;

				a {
					display: inline-block;
					border-radius: 24px;
					margin-right: 16px;
					height: 30px;
				}
			}

			&__user-photo {
				width: 30px;
				height: 30px;
			}

			&__date {
				font-family: Montserrat;
				font-size: 16px;
			}
		}
	}
</style>