<template>
    <div class="list-menu">

        <div @click="select('a')"> A </div>
        <div @click="select('b')"> B </div>
        <button @click="logProject">Log Project</button>

    </div>
</template>

<script>
    import * as types from 'renderer/vuex/mutation-types'

    export default {
        methods: {
            select(thingToSelect) {
                this.$store.commit(types.SET_SELECTED, thingToSelect)
            },
            logProject() {
                console.log(this.$store.state.project)
            }
        },
        name: 'project-menu'
  }
</script>

<style scoped>

</style>
