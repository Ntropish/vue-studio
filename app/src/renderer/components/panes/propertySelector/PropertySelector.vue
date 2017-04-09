<template>
    <v-list class="propertySelector">

      <v-list-tile class="title" @click.native="selectProperty({from: 'functions', id: component.data})">
        Data
      </v-list-tile>


      <v-list-item ref="menuItem" start-open="true">
        <v-list-tile class="title">
          Computed
          <v-btn floating small @click.native.stop="addProperty({to: 'computed'})">
            <v-icon class="black--text">add</v-icon>
          </v-btn>   

        </v-list-tile>

        <v-list-tile v-for="computed in populated.computed" @click.native="selectProperty({from: 'functions', id: computed.id})">
          <editable-span 
          :class="computed.id !== selected.id? 'grey--text':''"
          :value="computed.name" 
          @input="setName({id: computed.id, name: $event})">
          </editable-span>

        </v-list-tile>
      </v-list-item>
      

      <v-list-item>
        <v-list-tile class="title">
          Methods
          <v-btn floating small @click.native.stop="addProperty({to: 'methods'})">
            <v-icon class="black--text">add</v-icon>
          </v-btn>   

        </v-list-tile>

        <v-list-tile v-for="method in populated.methods" @click.native="selectProperty({from: 'functions', id: method.id})">
          <editable-span 
          :class="method.id !== selected.id? 'grey--text':''"
          :value="method.name" 
          @input="setName({id: method.id, name: $event})">
          </editable-span>

        </v-list-tile>
      </v-list-item>


      <v-list-item class="title">
        <v-list-tile>
          Props
        </v-list-tile>
      </v-list-item>

      <v-list-item>
        <v-list-tile class="title">
          Watch
          <v-btn floating small @click.native.stop="addProperty({to: 'watch'})">
            <v-icon class="black--text">add</v-icon>
          </v-btn>   

        </v-list-tile>

        <v-list-tile v-for="_watch in populated.watch" @click.native="selectProperty({from: 'watch', id: _watch.id})">
          <editable-span 
          :class="_watch.id !== selected.id? 'grey--text':''"
          :value="_watch.name" 
          @input="setName({id: _watch.id, name: $event})">
          </editable-span>

        </v-list-tile>
      </v-list-item>

    </v-list>
</template>

<script>

  import {mapState} from 'vuex'

  import ComputedSelector from './ComputedSelector'
  import MethodSelector from './MethodSelector'

  import EditableSpan from 'renderer/components/widgets/EditableSpan'


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
      selectProperty({from, id}) {
        console.log({from, id})
        this.$store.commit('select/PROPERTY', {from, id})

      },
      addProperty({to, name="Function"}) {
        let id = this.$store.getters['select/GET_ASSET'].id
        this.$store.dispatch('components/ADD_PROPERTY', {id, to, construct: {name: `New ${name}`} })

      },
      setName({id, name}) {
        this.$store.commit('functions/SET_NAME', {id, name})
      }
    },
    computed: {
      ...mapState({
        selected: state=>state.select.property,
        functions: state=>state.functions.items,
      }),
      populated() {
        let typesToPopulate = ['computed', 'methods', 'watch']
        let result = {}
        typesToPopulate.forEach((key)=>{
          if (!this.component) return []
          result[key] = this.component[key].map(id=>this.functions[id])
        })
        return result
        
      }
    },
    components: {
      ComputedSelector,
      EditableSpan
    },
    name: 'property-selector'
  }
</script>

<style scoped>
  .nameInput {
    font-size: 2em;
  }
</style>
