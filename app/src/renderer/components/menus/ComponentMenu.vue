<template>
    <v-list-item ref="menuItem" start-open="true">
        <v-list-tile slot="title" class="title" @click.native="open = !open">
            Components
            
            <v-btn floating small @click.native.stop="addComponent">
                <v-icon class="black--text">add</v-icon>
            </v-btn>            
            
        </v-list-tile>

        <v-list v-if="open">
            <v-list-item class="component" v-for="component in components" @click="select(component)">
                <v-list-tile :class="component !== selected? 'grey--text':''">{{component.name}}</v-list-tile>
            </v-list-item>
        </v-list>
        
    </v-list-item>
</template>

<script>

    import * as types from 'renderer/vuex/mutation-types'
    import { mapState } from 'vuex'
    import FileDisplay from '../widgets/fileDisplay'

    import ListMenuItem from '../widgets/ListMenuItem'

    import Component from 'renderer/classes/Component'


    export default {
        data() {
            return {
                open: true
            }
        },
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
            components: state => state.assets.component,
            selected: state => state.selected.item
        }),
        components: {
            FileDisplay,
            ListMenuItem,
        },
        name: 'component-menu'
  }
</script>

<style scoped>
</style>
