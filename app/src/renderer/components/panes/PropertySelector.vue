<template>
    <div class="propertySelector">
      <input v-model="name">

      <div @click="selectProperty('data')">data</div>

      <list-menu-item ref="menuItem">
        <h3 slot="title">
          Computed
          <button @click.stop="addComputed()">&nbsp;+&nbsp;</button>
        </h3>
        <div v-for="computed in Object.keys(computeds)" @click="selectProperty({type: 'computed', name: computed})">
          {{computed}}
        </div>
      </list-menu-item>

      <div @click="selectProperty('method')">method</div>
      <div>props</div>
      <div>watch</div>
    </div>
</template>

<script>
  import ListMenuItem from '../widgets/ListMenuItem'
  import {mapstate} from 'vuex'

  export default {
    props: ['component'],
    data() {
      return {
        expand: {
          computed: true,
          props: false,
          methods: false,
          watch: false,
        }
      }
    },
    methods: {
      log(thing) {
        console.log('hi:', thing)
        
      },
      selectProperty(property) {
        this.$store.commit('SELECT_PROPERTY', property)
      },
      addComputed() {
        this.$store.commit('UPDATE_SELECTED', {
          type: 'computed',
          name: 'computedValue',
          value: 'computedFunction'
        })
      }
    },
    computed: {
      name: {
        get() {
          return this.component.name
        },
        set(value) {
          this.$store.commit('UPDATE_SELECTED', {
            type: 'name',
            value
          })
        }
      },
      computeds() {
        let result = this.component.computed || {}
        console.log(this.component, result)
        return result
      }
    },
    components: {
      ListMenuItem,
    },
    name: 'property-selector'
  }
</script>

<style scoped>
  .propertySelector {
    margin-top: 0.2em;
  }
</style>
