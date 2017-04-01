<template>
    <label class="nameEditor">
      <div class="list-title" @click="select" >Data <span style="float: right">{{parsed? '*':''}}</span></div>
        
    </label>
</template>

<script>

  export default {
    props: ['parsed'],

    data() {
      return {
        open: false
      }
    },

    methods: {
      select() {
        this.$emit('select', this.selectInstructions)
        
      }
    },

    computed: {
      selectInstructions() {
        let bodyStatements = this.parsed.body.body
        return {
          start: bodyStatements[0].range[0],
          end: bodyStatements[bodyStatements.length - 1].range[1],
          offset: 'script'
        }
      }
    },

    name: 'data-editor'
  }
</script>

<style scoped>
</style>
