<template>
  <div class="studio-two-layout">
    <asset-selector></asset-selector>
    <component-tree></component-tree>
  </div>
</template>

<script>
  import ComponentTree from '../panes/ComponentTree'
  import AssetSelector from 'renderer/components/menus/AssetSelector'

  export default {
    components: {
      ComponentTree,
      AssetSelector
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
