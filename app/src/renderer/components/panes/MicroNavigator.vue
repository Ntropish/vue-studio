<template>
    <div class="microNavigator">
      <div>breadcrumbs</div>
      <property-selector :component="_component"></property-selector>
      <div v-for="child in component.components">
        Child: {{child}}
      </div>
    </div>
</template>

<script>

  import PropertySelector from './PropertySelector'
  export default {
    props: ['component', 'path'],
    methods: {
      select(thing) {
        console.log('select in micro', thing)
      }
    },
    computed: {
      _component() {
        return this.component || {name: 'add the path'}
      }
    },
    components: {
      PropertySelector,
    },
    name: 'micro-navigator'
  }
</script>

<style scoped>
  .microNavigator {
    margin-top: 0.4em;
    border: 1px solid rgba(255,255,255,0.1);
  }
</style>
