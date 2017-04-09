<template>
  <div class="functionEditor">
    <span v-for="(arg, index) in func.arguments">
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
      :value="func.body"
      @input="onInput"
      multi-line
    ></v-text-field>
  </div>
  
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    props: ['id'],
    data() {
      return {
        argInput: '',
      }
    },
    computed: {
      ...mapState({
        func: function(state) {
          return state.functions.items[this.id]

        }
      }),
    },
    methods: {
      onInput(body) {
        this.$store.commit('functions/SET_BODY', {id: this.id, body})
      },

      addArg() {
        this.$store.commit('functions/ADD_ARGUMENT', {id: this.id, value: this.argInput})
        this.argInput = ''        
      },

      removeArg(index) {
        this.$store.commit('functions/REMOVE_ARGUMENT', {id: this.id, value: this.argInput})
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
