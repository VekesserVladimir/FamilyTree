<template>
	<div class="gallery">
		<h4 class="header__small">Other photos</h4>
		<div class="gallery__wrapper">
			<button 
				v-if='!isClosed'
				class='open-button'
				v-on:click='closeGallery'>
					<!-- <font-awesome-icon icon='times'></font-awesome-icon> -->
					<span>+</span>
				</button>
			<img 
				v-for='photo in getPhotos' 
				v-bind:key="photo.id" 
				v-bind:src="photo.uri"
				class='gallery__photo'>
			<button 
				class='open-button' 
				v-if='isClosed'
				v-on:click='openGallery'>{{ photos.remainsCount + "+" }}</button>
		</div>
	</div>
</template>

<script>
export default {
	props: ["photos"],
	data() {
		return {
			isClosed: true
		}
	},
	methods: {
		openGallery() {
			this.isClosed = false;
		},
		closeGallery() {
			this.isClosed = true;
		}
	},
	computed: {
		getPhotos() {
			if(this.isClosed) {
				return this.photos.photos.slice(1, 6);
			} else return this.photos.photos;
		}
	}

}
</script>

<style lang="less" scoped>
	.header__small {
		font-family: Montserrat;
		font-weight: 300;
		font-size: 24px;
		line-height: 29px;
		color: #242121;
	}

	.gallery {
		margin-top: 24px;
		
		&__wrapper {
			margin-top: 31px;
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
			grid-gap: 16px;
		}

		&__photo {
			width: 144px;
			height: 144px;
			border-radius: 24px;
			object-fit: cover;
		}

		.open-button {
			width: 144px;
			height: 144px;
			border-radius: 24px;
			border: none;
			background-color: #E6E6E6;
			font-size: 48px;
			color: #9E9898;

			span {
				display: inline-block;
				transform: rotate(45deg);
				font-size: 72px;
				font-weight: 300;
			}
		}
	}
</style>