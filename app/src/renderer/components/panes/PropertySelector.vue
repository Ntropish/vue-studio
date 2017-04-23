<template>
    <v-list class="propertySelector">

      <v-list-tile class="title" @click.native="selectProperty({from: 'templateNodes', id: component.templateRootNodeId})">
        Template
      </v-list-tile>

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
          :class="isSelected(computed)? '':'grey--text'"
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
          :class="isSelected(method)? '':'grey--text'"
          :value="method.name"
          @input="setName({id: method.id, name: $event})">
          </editable-span>

        </v-list-tile>
      </v-list-item>


      <v-list-item>
        <v-list-tile class="title">
          Props
          <v-btn floating small @click.native.stop="addProp()">
            <v-icon class="black--text">add</v-icon>
          </v-btn>
        </v-list-tile>

        <v-list-tile v-for="prop in populated.props" @click.native="selectProperty({from: 'props', id: prop.id})">
          <editable-span
          :class="isSelected(prop)? '':'grey--text'"
          :value="prop.name"
          @input="setName({id: _watch.id, name: $event})">
          </editable-span>

        </v-list-tile>


      </v-list-item>

      <v-list-item>
        <v-list-tile class="title">
          Watch
          <v-btn floating small @click.native.stop="addProperty({to: 'watch'})">
            <v-icon class="black--text">add</v-icon>
          </v-btn>

        </v-list-tile>

        <v-list-tile v-for="_watch in populated.watch" @click.native="selectProperty({from: 'functions', id: _watch.id})">
          <editable-span
          :class="isSelected(_watch)? '':'grey--text'"
          :value="_watch.name"
          @input="setName({id: _watch.id, name: $event})">
          </editable-span>

        </v-list-tile>
      </v-list-item>

    </v-list>
</template>

<script>

  import {mapState} from 'vuex'

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
        this.$store.commit('select/PROPERTY', {from, id})

      },

      addProperty({to, name="Function"}) {
        let id = this.$store.getters['select/GET_ASSET'].id
        this.$store.dispatch('components/ADD_PROPERTY', {id, to, construct: {name: `New ${name}`} })

      },

      addProp() {
        let id = this.$store.getters['select/GET_ASSET'].id
        this.$store.dispatch('components/ADD_PROP', {id, construct: {name: `New Prop`} })

      },

      setProp() {
        let id = this.$store.getters['select/GET_ASSET'].id
      } ,

      setName({id, name}) {
        this.$store.commit('functions/SET_NAME', {id, name})

      },

      isSelected(value) {
        let constructorToModule = {
          Prop: 'props',
          Function: 'functions'
        }
        let sameType = constructorToModule[value.constructor.name] === this.selected.from
        let sameId = value.id === this.selected.id

        return sameType && sameId
      }

    },
    computed: {
      ...mapState({
        selected: state=>state.select.property,
        functions: state=>state.functions.items,
        props: state=>state.props.items

      }),

      populated() {

        let result = {computed: [], methods: [], watch: [], props: []}
        if (!this.component) return result
        Object.keys(result).forEach((key)=>{
          if (key === 'props') {
            result[key] = this.component[key].map(id=>this.props[id])
          } else {
            result[key] = this.component[key].map(id=>this.functions[id])
          }
        })
        return result

      }
    },
    components: {
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
