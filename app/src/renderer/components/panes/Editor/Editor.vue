<template>
    <div class="fileEditor">
        <component :is="editor" :code="text"></component>     
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    import TextEditor from './TextEditor'
    import DotVueEditor from './DotVueEditor'
    export default {
        components: {
            DotVueEditor,
            TextEditor,
        },
        computed: {
            ...mapState({
                name: state => {
                    return state.selected.item && state.selected.item.name || 'No Name'
                },
                text: state => {

                    return state.selected.item && state.selected.item.fileContents || 'Nothin'
                }
            }),
            editor() {
                if (/\.vue$/.test(this.name)) return 'dot-vue-editor'
                return 'text-editor'
            }
        },
        name: 'editor'
  }
</script>

<style scoped>
.fileEditor {
    text-align: left;
    overflow-y: scroll;
    height: 100%;
}
</style>
