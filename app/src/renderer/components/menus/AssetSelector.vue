<template>
    <div class="list-menu">

        <component-menu></component-menu>

        <list-menu-item 
            @click="toggleOpen('directives')"
            :open="openedMenus.directives"
            title="Directives">
            I am open on Directives
        </list-menu-item>

        <list-menu-item 
            @click="toggleOpen('filters')"
            :open="openedMenus.filters"
            title="Filters">
            I am open on filters
        </list-menu-item>


    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import { mapActions } from 'vuex'
    import * as types from 'renderer/vuex/mutation-types'

    import ListMenuItem from '../widgets/ListMenuItem'
    import ProjectMenu from './ProjectMenu'
    import ComponentMenu from './ComponentMenu'
    
    export default {
        components: {
            ListMenuItem,
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
</style>
