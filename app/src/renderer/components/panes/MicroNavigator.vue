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

  import PropertySelector from './propertySelector/PropertySelector'
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

</style>
