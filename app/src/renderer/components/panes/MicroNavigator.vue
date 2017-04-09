<template>
    <div class="microNavigator">
      <div>breadcrumbs</div>
      <property-selector v-if="component" :component="component"></property-selector>

    </div>
</template>

<script>

  import PropertySelector from './propertySelector/PropertySelector'
  export default {
    props: ['component', 'path'],
    methods: {
      select(thing) {
        console.log('select in micro', thing)
      },
    },
    computed: {
      components() {
        return this.component && this.component.components || []
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
