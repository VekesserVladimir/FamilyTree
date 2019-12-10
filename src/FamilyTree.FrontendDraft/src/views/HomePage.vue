<template>
	<div class="home-page">
		<Header/>
		<div class="content">
			<div v-if='isLoading' class="loader">
				<div class="loader-outter"></div>
				<div class="loader-inner"></div>
			</div>
			<div v-else class="gallery">
				<Photo v-for='photo in getPhotos' v-bind:photo="photo" v-bind:key="photo.id"/>
			</div>
		</div>
	</div>
</template>

<script>
import Header from "../components/Header";
import Photo from '../components/Photo';
import { mapGetters, mapActions } from 'vuex';

export default {
	components: {
		Header,
		Photo
	},
	data() {
		return {
			isLoading: true
		}
	},
	methods: {
		...mapActions(['requestPhotos'])
	},
	computed: {
		...mapGetters(['getPhotos'])
	},
	mounted() {
		this.requestPhotos(0).then(() => {
			this.isLoading = false;
		});
	}
}
</script>

<style lang="less" scoped>
	.gallery {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		align-items: space-between;
		margin-top: 68px;
	}
</style>