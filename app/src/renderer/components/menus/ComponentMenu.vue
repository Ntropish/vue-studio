<template>
    <list-menu-item ref="menuItem">
        <h3 slot="title">
            Components
            <button @click.stop="addComponent()">&nbsp;+&nbsp;</button>
        </h3>
        <div class="component" v-for="component in components" @click="select(component)">
            {{component.name}}
        </div>
    </list-menu-item>
</template>

<script>
    import * as types from 'renderer/vuex/mutation-types'
    import { mapState } from 'vuex'
    import FileDisplay from '../widgets/fileDisplay'

    import ListMenuItem from '../widgets/ListMenuItem'

    import Component from 'renderer/classes/Component'


    export default {
        methods: {
            select(thingToSelect) {
                this.$store.commit(types.SET_SELECTED, thingToSelect)
            },
            addComponent() {
                this.$store.commit('ADD_ASSET', new Component({name: 'hello'}))
                this.$refs.menuItem.open = true
            },
            logComponents() {
                console.log(this.components)
            }
        },
        computed: mapState({
            components: state => state.assets.component
        }),
        components: {
            FileDisplay,
            ListMenuItem,
        },
        name: 'component-menu'
  }
</script>

<style scoped>
    .component {
        padding: 0.2em;
        font-size: 1.2em;
    }
</style>
