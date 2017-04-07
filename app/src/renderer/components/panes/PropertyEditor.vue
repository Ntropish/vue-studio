<template>
  <div>
    Selected: {{selected}}
    </br>
    Property: {{property}}
    </br>
    Selected Property: {{selectedProperty}}
    <function-editor v-if="property.type === 'computed'" v-model="selectedProperty"></function-editor>
    <div v-if="!editor">
      No Property Selected
    </div>
  </div>
  
</template>

<script>
  import { mapState } from 'vuex'
  import FunctionEditor from 'renderer/components/panes/editors/FunctionEditor'
  import DataEditor from 'renderer/components/panes/editors/DataEditor'
  import MethodEditor from 'renderer/components/panes/editors/MethodEditor'

  export default {
    computed: {
      editor() {
        if (!this.property.type) return ''
        return this.property.type + 'Editor'
      },
      selectedProperty: {
        get() {
          if (!this.selected || !this.property) return null
          let result = this.selected[this.property.type]
          if (this.property.name) result = result[this.property.name]
          return result
        },
        set(value) {
          console.log('setting', value)
          let type = 'computed'
          let name = this.property.name
          
          this.$store.commit('UPDATE_SELECTED', {path: [type, name], value})
        }
      },
      ...mapState({
        selected: state=>{
          return state.selected.item
        },
        property: state=>{
          return state.selected.property || {type: null}
        }
      })
    },
    components: {
      FunctionEditor,
      DataEditor,
      MethodEditor,
    },
    name: 'methods-editor'
  }
</script>

<style scoped>

</style>
