<template>
    <div class="computedSelector">

      <v-list-tile class="title">
        Computed
        <button @click.stop="addComputed()">&nbsp;+&nbsp;</button>
      </v-list-tile>

      <v-list-tile>{{computedNames}}</v-list-tile>

      <v-list-tile v-for="computed in computedNames">
        <editable-span :value="computed" @input="onInput(computed, $event)"></editable-span>
      </v-list-tile>
    </div>
</template>

<script>

  import EditableSpan from 'renderer/components/widgets/EditableSpan'
  export default {
    props: ['computeds'],
    methods: {
      onInput(name, newName) {
        console.log(name, '->', newName)
        this.$store.commit('MODIFY_SELECTED', {
          path: ['computed', name], 
          rename: newName
          })
      },
      addComputed() {
        this.$store.commit('MODIFY_SELECTED', {
          path: ['computed', 'computedValue'],
          value: {arguments: [], code: ''}
        })
      }
    },
    computed: {
      computedNames() {
        console.log('NEW NAMES!', this.computeds)
        return Object.keys(this.computeds)
      }
    },
    components: {
      EditableSpan
    },
    name: 'computed-selector'
  }
</script>

<style scoped>
input {
  background: none;
  border: none;
  font-size: 1.6em;
  padding: 0.2em;
  color: white;
}
</style>
