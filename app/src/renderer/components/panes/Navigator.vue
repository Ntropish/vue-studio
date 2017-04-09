<template>
    <div class="navigator">
      <micro-navigator :component="selected"></micro-navigator>
    </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'

  import Component from 'renderer/classes/Component'


  import MicroNavigator from './MicroNavigator'
  export default {
    computed: {
      ...mapState({
      }),
      ...mapGetters({
        selected:'select/GET_ASSET'
      })
    },
    components: {
      MicroNavigator,
    },
    name: 'navigator'
  }
</script>

<style scoped>

</style>
