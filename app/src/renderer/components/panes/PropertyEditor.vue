<template>
  <div>
    <function-editor v-if="editorFor === 'functions'" :id="id"></function-editor>
    <prop-editor v-if="editorFor === 'props'" :id="id"></prop-editor>
    <template-editor v-if="editorFor === 'template'" :id="id"></template-editor>
    <div v-if="!editorFor">
      No Property Selected
    </div>
  </div>
  
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import FunctionEditor from 'renderer/components/panes/editors/FunctionEditor'
  import PropEditor from 'renderer/components/panes/editors/PropEditor'
  import TemplateEditor from 'renderer/components/panes/editors/TemplateEditor'

  export default {
    computed: {
      ...mapState({
        editorFor: state=>state.select.property.from,
        id: state=>state.select.property.id
      }),
      ...mapGetters({
        selected:'select/GET_PROPERTY'
      }),
    },
    components: {
      FunctionEditor,
      PropEditor,
      TemplateEditor,
    },
    name: 'property-editor'
  }
</script>

<style scoped>

</style>
