<template>
  <div>
    <span v-if="!edit" @dblclick="edit = true">
      {{value}}
    </span>
    <v-text-field
      v-if="edit"
      :value="value"
      @input="onInput"
      @blur="edit = false"
      @keyup.13.native="edit = false"
      label="label || ''"
      ref="input"
      single-line
      dark      
    ></v-text-field>
  </div>
</template>
<script>
export default {
  props: ['label', 'value'],
  data() {
    return {
      edit: false
    }
  },
  methods: {
    onInput(value) {
      this.$emit('input', value)
    }
  }
}
</script>