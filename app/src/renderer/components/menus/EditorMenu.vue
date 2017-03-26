<template>
  <div class="list-menu">
    
    <list-menu-item 
      v-for="propertyType in propertyTypes"
      @click="toggleOpen(propertyType.type)"
      :open="openedMenus[propertyType.type]"
      :title="propertyType.type">
      {{propertyType.items}}
    </list-menu-item>

  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import ListMenuItem from '../widgets/ListMenuItem'
  import Vue from 'vue'


  export default {
    methods: {
      edit(thing) {
        console.log(thing)
      },

      toggleOpen(propType) {
        console.log(this.propertyTypes)
        if (this.openedMenus[propType]) {
          this.openedMenus[propType] = false
        } else {
          this.propertyTypes.forEach((prop)=>{
            Vue.set(this.openedMenus, prop.type, propType === prop.type)
          })
        }
      }
    },

    data() {
      return {
        openedMenus: {}
      }
    },

    computed: {
      ...mapState({
        propertyTypes: state => state.editor.menuConfiguration
      })
    },

    name: 'editor-menu',

    components: {
      ListMenuItem,
    }
  }
</script>

<style scoped>
.list-menu {
  text-align: left;
}

</style>

