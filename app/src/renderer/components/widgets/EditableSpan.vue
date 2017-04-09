<template>
  <div class="editableSpan"@dblclick="edit = true; focus()">
    <div class="display" v-if="!edit && value">
      {{value}}
    </div>
    <div class="label" v-if="!edit && !value">
      {{label}}
    </div>
    <v-text-field
      v-if="edit"
      :value="value"
      @input="onInput"
      @blur="edit = false"
      @keyup.13.native="edit = false"
      :label="label || ''"
      ref="textInput"
      single-line
      dark      
    ></v-text-field>
  </div>
</template>
<script>
import Vue from 'Vue'
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
    },
    focus() {
      Vue.nextTick(()=> {
        this.$refs.textInput.$refs.input.select()
      })
    },
  }
}
</script>

<style scoped>
.display, .editableSpan {
  height: 100%;
  width: 100%;
}
</style>