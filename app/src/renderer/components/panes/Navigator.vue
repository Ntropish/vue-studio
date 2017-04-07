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
        component: state => {
            let item = state.selected.item
            if (item) return item
            return {name: 'hardcodedComponent'}
          }
      }),
    },
    components: {
      MicroNavigator,
    },
    name: 'navigator'
  }
</script>

<style scoped>

</style>
