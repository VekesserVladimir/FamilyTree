<template>
	<div class="background" v-if='isActive'>
		<transition name='photo-translate'>
			<div class="photo-form">
				<font-awesome-icon class=photo-form__close icon='times' v-on:click='closeForm()'></font-awesome-icon>
				<form enctype="multipart/form-data" v-on:submit="AJAXSubmit">
					<div class="photo-form__title">
						<span>Upload photo</span>
					</div>
						<input type="file" name='image' id='photo-input' v-on:change='loadPhoto'>
				<label for='photo-input' v-if='isUploading'>
					<div class="photo-form__wrapper">
						<font-awesome-icon icon='upload' class=photo-form__icon></font-awesome-icon>
						<p class='photo-form__text'><span>Click</span> to select file <br>or drop image in the box</p>
					</div>
				</label>
				<div v-else class="edition-form">
					<div class="input-wrapper">
						<span class="input-title">Title</span>
						<input type="text" class="input edition-form__input-title" name='title'>
					</div>
					<div class="input-wrapper">
						<span class="input-title">Date</span>
						<Datepicker input-class='input edition-form__input-title' name='date'/>
					</div>

					<div class="input-wrapper">
						<span class="input-title">Title</span>
						<textarea type="text" class="input edition-form__textarea-title" name='description'></textarea>
					</div>

					<div class="edition-form__wrapper">
						<img v-bind:src="photo.src" class='edition-form__preview'>
						<div>
							<span class='photo-title'>{{photo.title}}</span>
							<div class="buttons-wrapper">
								<button v-on:click='closeForm' class='button button_cancel'>Cancel</button>
								<input value='Upload' type="submit" class='button button_primary'>
							</div>
						</div>
					</div>
				</div>
				</form>
			</div>
		</transition>
	</div>
</template>

<script>
import Datepicker from "vuejs-datepicker"
import ClickOutside from 'vue-click-outside'
import {mapGetters} from "vuex"

export default {
	data() {
		return {
			photo: null,
			isActive: false,
			isUploading: true
		}
	},
	components: {
		Datepicker
	},
	directives: {
		ClickOutside
	},
	computed: {
		...mapGetters(['getUserToken'])
	},
	methods: {
		loadPhoto(e) {
			var file	= e.target.files[0];
			var reader  = new FileReader();
			
			reader.onloadend = () => {
				this.photo = {
					title: file.name,
					src: reader.result
				}
				this.isUploading = false;
			}

			if (file) {
				reader.readAsDataURL(file);
			}
		},
		async AJAXSubmit(e) {
			e.preventDefault();
			let oFormElement = e.target;
			const formData = new FormData(oFormElement);

			try {
				const response = await fetch("https://familytree-stage.renerick.name/api/1.0.0/photo", {
					method: 'POST',
					body: formData,
					headers: {
						Authorization: "Bearer " + this.getUserToken
					}		 
				});

				if (response.ok) {
					window.location.href = '/';
				}
			} catch (error) {
				console.error('Error:', error);
			}
		},
		openForm() {
			this.isActive = true;
		},
		closeForm() {
			this.photo = null;
			this.isUploading = true;
			this.isActive = false;
		}
	}
}
</script>

<style lang="less">
	#photo-input {
		display: none;
	}
	
	.photo-translate {
		&-enter-active, &-leave-active {
			transition: opacity 1.3s ease-in-out;
		}

		&-enter, &-leave-to {
			opacity: 0;
		}

		&-enter-to, &-leave {
			opacity: 1;
		}
	}

	.photo-form {
		height: 581px;
		width: 496px;
		border-radius: 24px;
		background-color: #fff;
		position: relative;

		&__close {
			font-size: 18px;
			color: #9E9898;
			position: absolute;
			top: 10px;
			right: 24px;
			cursor: pointer;
		}

		&__text {
			display: inline-block;
			width: 230px;
			font-family: Montserrat;
			font-weight: 500;
			font-size: 16px;
			color: #9E9898;
			line-height: 158%;
			text-align: center;

			span {
				text-decoration-line: underline;
			}
		}

		&__icon {
			font-size: 48px;
			color: #9E9898;
			margin-bottom: 8	px;
		}

		&__wrapper {
			width: 100%;
			height: 548px;
			border-radius:  0 0 24px 24px;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			cursor: pointer;
		}

		.edition-form {
			width: 100%;
			height: calc(100% - 34px;);
			border-radius:  0 0 24px 24px;
			padding: 15px 16px 0 16px;

			.buttons-wrapper {
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				padding: 0 0 0 16px;
			}

			&__preview {
				width: 224px;
				height: 120px;
				border-radius: 24px;
				object-fit: contain;
			}

			&__input-title {
				width: 100%;
				margin-bottom: 14px;
			}

			&__textarea-title {
				width: 100%;
				height: 192px;
				resize: none;
				margin-bottom: 10px;
			}

			&__wrapper {
				display: flex;

				div {
					display: flex;
					flex-direction: column;
					align-items: center;
					width: 240px;
					justify-content: space-between;

					.photo-title {
						font-family: Montserrat;
						font-weight: 500;
						font-size: 16px;
						color: #242121;
						margin-top: 25px;
						margin-left: 17px;
					}
				}
			}
		}

		&__title {
			display: flex;
			justify-content: center;

			span {
				display: inline-block;
				font-family: Rubik;
				font-weight: 300;
				font-size: 18px;
				line-height: 21px;
				color: #242121; 
				margin: 12px auto 0 auto;
			}
		}
	}
</style>