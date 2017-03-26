<template>
    <div class="list-menu">
        <file-display :dirs="components && components.dirs" :files="components && components.files"></file-display>
    </div>
</template>

<script>
    import * as types from 'renderer/vuex/mutation-types'
    import { mapState } from 'vuex'
    import FileDisplay from '../widgets/fileDisplay'

    export default {
        methods: {
            select(thingToSelect) {
                this.$store.commit(types.SET_SELECTED, thingToSelect)
            }
        },
        computed: mapState({
            components: state => state.project.components
        }),
        components: {
            FileDisplay
        },
        name: 'component-menu'
  }
</script>

<style scoped>

</style>
