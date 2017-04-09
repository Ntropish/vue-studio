<template>
  <v-app left-fixed-sidebar top-toolbar>

    <main>
    <v-sidebar v-model="sidebarOpen" fixed>
      <asset-selector></asset-selector>
      <navigator></navigator>  
    </v-sidebar>
    <v-content class="ma-3">
      <v-container fluid>
        <property-editor></property-editor>
      </v-container>
    </v-content>
      
    </main>
  </v-app>
</template>

<script>
  import PropertyEditor from 'renderer/components/panes/PropertyEditor'
  import AssetSelector from 'renderer/components/menus/AssetSelector'
  import Navigator from 'renderer/components/panes/Navigator'

  export default {
    data() {
      return {
        sidebarOpen: true
      }
    },
    components: {
      PropertyEditor,
      AssetSelector,
      Navigator
    },
    name: 'studio-page-two'
  }
</script>

<style scoped>
  .studio {
    display: flex;
    width: 100%;
    height: 100%;
  }
  .left {
    flex: 0 0 18em;
  }
  .right {
    flex: 1 1 15em;
  }
</style>
