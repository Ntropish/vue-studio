<template>
    <v-list class="propertySelector">

    <v-list-item>
      <v-list-tile>
        <v-text-field
          dark
          class="nameInput"
          v-model="name"
          label="Component Name"
          single-line
        ></v-text-field>
      </v-list-tile>
    </v-list-item>


      <div @click="selectProperty('data')">data</div>

      <v-list-item ref="menuItem" start-open="true">
        <computed-selector :computeds="computeds"></computed-selector>
      </v-list-item>
      
      <v-list-item class="title">
        <v-list-tile>
          Methods
        </v-list-tile>
      </v-list-item>

      <v-list-item class="title">
        <v-list-tile>
          Props
        </v-list-tile>
      </v-list-item>

      <v-list-item class="title">
        <v-list-tile>
          Watch
        </v-list-tile>
      </v-list-item>

    </v-list>
</template>

<script>
  import {mapstate} from 'vuex'

  import ComputedSelector from './ComputedSelector'

  export default {
    props: ['component'],
    data() {
      return {
        expand: {
          computed: true,
          props: false,
          methods: false,
          watch: false,
        },
        editName: {}
      }
    },
    methods: {
      log(thing) {
        console.log('hi:', thing)
        
      },
      selectProperty(property) {
        this.$store.commit('SELECT_PROPERTY', property)
      },
    },
    computed: {
      name: {
        get() {
          return this.component.name
        },
        set(value) {
          this.$store.commit('MODIFY_SELECTED', {
            path: ['name'],
            value
          })
        }
      },
      computeds() {
        
        let result = this.component && this.component.computed || {}
        console.log('NEW COMPUTEDS!', result)
        return result
      }
    },
    components: {
      ComputedSelector
    },
    name: 'property-selector'
  }
</script>

<style scoped>
  .nameInput {
    font-size: 2em;
  }
</style>
