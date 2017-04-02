<template>
  <div>
    <textarea :value="value" @input="onInput"></textarea>
  </div>
  
</template>

<script>
    import { mapState } from 'vuex'

  export default {

    props: ['value'],
    methods: {
      onInput(value) {
        this.$emit('input', value)
      }
    },
    name: 'data-editor'
  }
</script>

<style scoped>

</style>
