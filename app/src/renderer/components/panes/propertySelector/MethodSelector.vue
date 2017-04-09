<template>
    <div class="computedSelector">
      <v-list-tile class="title">
        Methods
        <v-btn floating small @click.native.stop="addMethod">
          <v-icon class="black--text">add</v-icon>
        </v-btn>   

      </v-list-tile>

      <v-list-tile v-for="method in populatedMethods" @click.native="select(method)">
        <editable-span 
        :class="method.id !== method.id? 'grey--text':''"
        :value="method.name" 
        @input="onInput(method, $event)">
        </editable-span>

      </v-list-tile>

    </div>
</template>

<script>

  import EditableSpan from 'renderer/components/widgets/EditableSpan'
  import { mapState, mapGetters } from 'vuex'

  export default {
    props: ['methods'],
    methods: {
      onInput(method, newName) {
        this.$store.commit('functions/SET_NAME', {id: method.id, name: newName})
      },
      addMethod() {
        let id = this.$store.getters['select/GET_ASSET'].id
        this.$store.dispatch('components/ADD_PROPERTY', {id, type: 'methods', construct: {name: 'New Method'} })
      },
      select({from, id}) {
        this.$store.commit('select/PROPERTY', {from, id})
      }
    },
    computed: {
      ...mapState({
        selected: state=>state.select.property,
        populatedMethods(state) {
          let result = this.methods.map(id=>state.functions.items[id])
          return result
        }
      })
    },
    components: {
      EditableSpan
    },
    name: 'method-selector'
  }
</script>

<style scoped>
input {
  background: none;
  border: none;
  font-size: 1.6em;
  padding: 0.2em;
  color: white;
}
</style>
