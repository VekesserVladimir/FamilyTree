<template>
    <div class="tag-editor">
        <div class="tag-editor__photo">
            <div class="tag-editor__overlay" >
                <img v-bind:src="value.imageUri" class='tag-editor__img'>
                <TagEditorTag v-for="tag in value.taggedPersons" v-bind:key="tag.tagId"  v-bind:tag="tag"></TagEditorTag>
                <!-- <div class="tag-editor__overlay__tag" 
                v-bind:key="tag.tagId" 
                v-bind:style="{top: `${tag.coordinates.top}px`, left: `${tag.coordinates.left}px`, width: `${tag.coordinates.width}px`, height: `${tag.coordinates.height}px`}">
                    
                </div> -->
            </div>
        </div>
	</div>
</template>

<script>
import TagEditorTag from "./TagEditorTag"


export default {
    props: ["value"],
    components: {TagEditorTag}
}
</script>

<style lang="less">
    .tag-editor {
		.tagged-people {
			margin: 25px 0 10px 0;
			width: 944px;
			white-space: nowrap;
			overflow-x: scroll;
			padding-bottom: 10px;

			&::-webkit-scrollbar {
				height: 0px;
			}

			.tagged-person {
				height: 48px;
				min-width: 230px;
				display: inline-flex;
				align-items: center;
				padding: 0 30px 0 8px;
				border-radius: 24px;
				border: 1px solid #9E9898;
				margin-right: 16px;
				font-family: Montserrat;
				font-weight: 500;
				font-size: 16px;
				color: #242121;

				&:nth-last-child(1) {
					margin: 0;
				}

				.user-photo {
					width: 32px;
					height: 32px;
					margin-right: 9px;	
				}
			}
		}

        display: flex;
        flex-direction: column;
		
		&__photo {
			align-self: center;
			margin-top: 16px;
		}

		&__img {
			width: 784px;
			border-radius: 24px;
			margin-bottom: 8px;
		}

		&__overlay {
            position: relative;
            
            &__tag {
                position: absolute;
                border: solid 2px white;
                border-radius: 10px;
            }
		}

		.photo-description {
			font-family: Rubik;
			font-size: 16px;
			line-height: 25px;
			color: #242121;
		}

		.input-wrapper {
			textarea {
				width: 100%;
				height: 400px;
				padding: 1em;
			}
		}
		
		.heading {
			.input-wrapper, .input-wrapper input {
				width: 100%;
			}
		}
	}
</style>