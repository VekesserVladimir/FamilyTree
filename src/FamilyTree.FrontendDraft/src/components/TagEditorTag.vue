<template>
    <div class="tag-editor__overlay__tag" 
        v-bind:style="{top: `${tag.coordinates.top}px`, left: `${tag.coordinates.left}px`, width: `${tag.coordinates.width}px`, height: `${tag.coordinates.height}px`}">  
        <div class="tag-editor__overlay__tag__menu">
            <h2>Person</h2>
            <div>
                {{ tag.person.firstName }}
            </div>
            <ul>
                <li v-for="suggestion in tag.suggestions" v-bind:key="suggestion.person.id">
                    {{ suggestion.person.firstName}}
                </li>
            </ul>
            <SearchInput 
                v-model='selectedPerson'
                ref='searchInput'	
            />
        </div>         

    </div>
</template>

<script>
import SearchInput from "./SearchInput";


export default {
    props: ["tag"],
    components: {SearchInput}
}
</script>

<style lang="less">
    .tag-editor__overlay__tag__menu {
        text-align: center;
        background: white;
        border-radius: 8px;
        position: absolute;
        left: 100%;
        margin-left: 10px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.21);
        width: 200px;
    }
</style>