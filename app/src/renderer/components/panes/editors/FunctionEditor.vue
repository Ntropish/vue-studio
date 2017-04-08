<template>
  <div class="functionEditor">
    <span v-for="(arg, index) in args">
      <v-chip close @input="removeArg(index)">{{arg}}</v-chip>
    </span>
    <v-text-field
      @keyup.13.native="addArg"
      class="argsInput"
      v-model="argInput"
      label="Add argument"
      single-line
    ></v-text-field>
    <v-text-field
      name="input-7-1"
      label="Function body"
      :value="code"
      @input="onInput"
      multi-line
    ></v-text-field>
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
      }
    },
    computed: {
      args() {
        let args = this.value && this.value.arguments && this.value.arguments.slice() || []
      
        return args
      },
      code() {
        return this.value && this.value.code || ''
      }
    },
    methods: {
      onInput(value) {
        this.$emit('input', {arguments: this.args , code: value})
      },
      addArg() {
        this.$emit('input', {arguments: this.args.concat(this.argInput) , code: this.code})
        this.argInput = ''        
      },
      removeArg(index) {
        this.args.splice(index, 1)
        this.$emit('input', {arguments: this.args, code: this.code})
      }
    },
    name: 'function-editor'
  }
</script>

<style scoped>
.functionEditor {
  font-family: Consolas;
  
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
