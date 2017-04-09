<template>
  <div>
    EDITOR
    <function-editor v-if="editorFor === 'functions'" :id="id"></function-editor>
    <div v-if="!editorFor">
      No Property Selected
    </div>
  </div>
  
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import FunctionEditor from 'renderer/components/panes/editors/FunctionEditor'
  import DataEditor from 'renderer/components/panes/editors/DataEditor'
  import MethodEditor from 'renderer/components/panes/editors/MethodEditor'

  export default {
    computed: {
      ...mapState({
        editorFor: state=>state.select.property.from,
        id: state=>state.select.property.id
      }),
      ...mapGetters({
        selected:'select/GET_PROPERTY'
      }),
      selectored() {
        console.log(selected)
        return '2'
      }
    },
    components: {
      FunctionEditor,
      DataEditor,
      MethodEditor,
    },
    name: 'property-editor'
  }
</script>

<style scoped>

</style>
