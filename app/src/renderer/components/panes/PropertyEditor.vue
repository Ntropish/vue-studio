<template>
  <div>
    {{selected}}
  
    <computed-editor v-if="property.type === 'computed'" v-model="selectedProperty"></computed-editor>
    <div v-if="!editor">
      No Property Selected
    </div>
  </div>
  
</template>

<script>
  import { mapState } from 'vuex'
  import ComputedEditor from 'renderer/components/panes/editors/ComputedEditor'
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
          let result = this.selected[this.property.type]
          if (this.property.name) result = result[this.property.name]
          return result
        },
        set(e) {
          let value = e.target.value
          let type = 'computed'
          let name = this.property.name
          
          this.$store.commit('UPDATE_SELECTED', {type, name, value})
        }
      },
      ...mapState({
        selected: state=>{
          return state.selected.item
        },
        property: state=>{
          return state.selected.property
        }
      })
    },
    components: {
      ComputedEditor,
      DataEditor,
      MethodEditor,
    },
    name: 'methods-editor'
  }
</script>

<style scoped>

</style>
