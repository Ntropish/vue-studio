<template>
    <div class="navigator">
      <micro-navigator :component="component"></micro-navigator>
    </div>
</template>

<script>
  import { mapState } from 'vuex'

  import Component from 'renderer/classes/Component'


  import MicroNavigator from './MicroNavigator'
  export default {
    computed: {
      ...mapState({
        selected: state => state.selected.item
      }),
      component() {
        if (this.selected && this.selected.constructor === Component) return this.selected
        return {name: 'hardcodedComponent'}
      },

    },
    components: {
      MicroNavigator,
    },
    name: 'navigator'
  }
</script>

<style scoped>
  .navigator {
        border: 1px solid rgba(255,255,255,0.1);
  }
</style>
