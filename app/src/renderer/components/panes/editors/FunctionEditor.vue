<template>
  <div class="functionEditor">
    <span v-for="(arg, index) in tempArgs">
      <v-chip close @input="removeArg(index)">{{arg}}</v-chip>
    </span>
    <v-text-field
      @keyup.13.native="addArg"
      class="argsInput"
      v-model="argInput"
      label="Add argument"
      single-line
    ></v-text-field>
    <textarea v-model="tempCode" @input="onInput"></textarea>
  </div>
  
</template>

<script>
    import { mapState } from 'vuex'

  export default {
    props: ['value'],
    data() {
      console.log(this.value)
      return {
        argInput: '',
        tempArgs: this.value && this.value.args && this.value.args.slice() || [],
        tempCode: this.value.code || ''
      }
    },
    methods: {
      onInput() {
        this.$emit('input', {arguments: this.tempArgs.slice() , code: this.tempCode})
      },
      addArg() {
        this.tempArgs.push(this.argInput)
        this.argInput = ''
        this.onInput()
      },
      removeArg(index) {
        console.log(index)
        this.tempArgs.splice(index, 1)
        this.onInput()
      }
    },
    name: 'function-editor'
  }
</script>

<style scoped>
.functionEditor {
  height: 100%;
}
textarea {
  width: 100%;
  height: 100%;
  background: none;
  color: white;
  border: none;
  font-family: Consolas;
  font-size: 1.4em;
}

textarea:focus {
  outline: none;

}
</style>
