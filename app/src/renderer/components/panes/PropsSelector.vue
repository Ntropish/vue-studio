<template>
    <label class="propsSelector">
      <div class="list-title" @click="open = !open">Props<span style="float: right">{{props.length}}</span></div>
      <div 
        v-if="open"
        v-for="prop in props" 
        class="list-content"
        @click="select(prop)"
        >
        {{prop.name}}
      </div>
        
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
      select(prop) {
        this.$emit('select', {start: prop.range[0]+2, end: prop.range[1]-1, offset: 'script', type: 'prop'})
        
      }
    },
    computed: {
      props() {
        if (!this.parsed) return []

        let result = []

        if (this.parsed.type === "ArrayExpression") {
          this.parsed.elements.forEach(e=>{
            result.push({name: e.value, range: e.range})
          })
        }

        return result
      }
    },
    name: 'props-editor'
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
