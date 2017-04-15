<template>
    <v-list class="assetSelector  text--lighten-2">

        <component-menu></component-menu>
        
        <v-list-item
        @click="toggleOpen('directives')">
            <v-list-tile class="title">
                Directives
            </v-list-tile>
            </v-list-item>
            <v-list-item v-if="openedMenus.directives">
                <v-list-tile>
                    I am open on Directives
                </v-list-tile>
        </v-list-item>

        <v-list-item
        @click="toggleOpen('filters')">
        <v-list-tile class="title">
            Filters
        </v-list-tile>
        </v-list-item>
        <v-list-item v-if="openedMenus.filters">
            <v-list-tile>
                I am open on Filters
            </v-list-tile>
        </v-list-item>


    </v-list>
</template>

<script>
    import { mapState } from 'vuex'
    import { mapActions } from 'vuex'
    import * as types from 'renderer/vuex/mutation-types'

    import ProjectMenu from './ProjectMenu'
    import ComponentMenu from './ComponentMenu'
    
    export default {
        components: {
            ProjectMenu,
            ComponentMenu,
        },
        data() {
            return {
                openedMenus: {
                    project: false,
                    components: true,
                    directives: false,
                    filters: false,
                }
            }
        },
        methods: {
            toggleOpen(assetType) {
                if (this.openedMenus[assetType]) {
                    this.openedMenus[assetType] = false
                } else {
                    Object.keys(this.openedMenus).forEach((key)=>{
                        this.openedMenus[key] = assetType === key
                    })
                }
            }
        },
        name: 'asset-selector'
  }
</script>

<style scoped>
  .assetSelector {
    width: 100%;  
  }
</style>
