<template>
  <div class="studio-layout">
    <div class="asset-selectors">
      <asset-selector></asset-selector>
      <property-menu></property-menu>
    </div>
    <div class="editor"><editor></editor></div>
  </div>
</template>

<script>
  import AssetSelector from './menus/AssetSelector'
  import PropertyMenu from './menus/PropertyMenu'
  import Editor from './panes/Editor/Editor'
  import EditorMenu from './menus/EditorMenu.vue'


  export default {
    components: {
      AssetSelector,
      PropertyMenu,
      Editor,
      EditorMenu
    },
    methods:{
      sayEvent(e) {
        console.log(e)
      }
    },
    name: 'studio-page'
  }
</script>

<style scoped>
  .studio-layout {
    display: flex;
    background: rgb(50,50,55);
    width: 100%;
    height: 100%;
  }
  .asset-selectors {
    flex: 0 0.5 18em;
    background: rgba(0,0,0,0.2);
  }
  .editor {
    flex: 1 1 15em;
    background: rgba(0,0,0,0.1);
  }
  .context-menu {
    flex: 0 0.5 15em;
    background: rgba(0,0,0,0.2);    
  }
</style>
