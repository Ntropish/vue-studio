<template>
  <div class="studio-two-layout">
    <div>
      <asset-selector></asset-selector>
      <navigator></navigator>  
    </div>
    <property-editor></property-editor>
  </div>
</template>

<script>
  import PropertyEditor from 'renderer/components/panes/PropertyEditor'
  import AssetSelector from 'renderer/components/menus/AssetSelector'
  import Navigator from 'renderer/components/panes/Navigator'

  export default {
    components: {
      PropertyEditor,
      AssetSelector,
      Navigator
    },
    name: 'studio-page-two'
  }
</script>

<style scoped>
  .studio-two-layout {
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
