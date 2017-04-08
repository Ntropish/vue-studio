<template>
  <div>
    Selected: {{selected}}
    </br>
    Property: {{property}}
    </br>
    Selected Property: {{selectedProperty}}
    <function-editor v-if="property[0] === 'computed'" v-model="selectedProperty"></function-editor>
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
          if (!this.selected || !this.property.length) return null

          // Dereference for every item in the path
          let finalProperty =  this.property.reduce((p,c)=>{
            return p[c]
          }, this.selected)

          console.log('Edit this:', finalProperty)
          return finalProperty
        },
        set(value) {
          this.$store.commit('MODIFY_SELECTED', {path: this.property, value})
        }
      },
      ...mapState({
        selected: state=>{
          return state.assets.selected
        },
        property: state=>{
          return state.assets.selectedProperty || []
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
