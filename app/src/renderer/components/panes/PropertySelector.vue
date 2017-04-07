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
        <v-list-tile class="title" slot="title">
          Computed
          <button @click.stop="addComputed()">&nbsp;+&nbsp;</button>
        </v-list-tile>
        <v-list-tile v-for="computed in Object.keys(computeds)" @click.native="selectProperty({type: 'computed', name: computed})">
          Computed name: {{computed}}
        </v-list-tile>
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
          path: ['computed', 'computedValue'],
          value: {arguments: [], code: ''}
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
            path: ['name'],
            value
          })
        }
      },
      computeds() {
        let result = this.component && this.component.computed || {}
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
  .nameInput {
    font-size: 2em;
  }
</style>
