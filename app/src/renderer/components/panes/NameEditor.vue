<template>
    <label class="nameEditor">
        <input type="text" :value="parsed.value" @input="updateValue($event.target.value)">
    </label>
</template>

<script>

  export default {
    props: ['parsed'],
    methods: {
      updateValue(value) {
        this.$emit('input', {start: this.parsed.range[0], end: this.parsed.range[1], value: value, offset: 'script'})
      }
    },
    name: 'name-editor'
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
