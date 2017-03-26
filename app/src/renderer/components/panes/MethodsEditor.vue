<template>
    <label class="nameEditor">
        Methods
        {{functions}}
        
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
    computed: {
      functions() {
        if (!this.parsed || !this.parsed.properties) return []

        let result = []

        this.parsed.properties.forEach(p=>{
          result.push({name: p.key.name})
          console.log(p)
        })


        return result
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
