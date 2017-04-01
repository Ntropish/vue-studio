<template>
    <label class="nameEditor">
      <div class="list-title" @click="open = !open">Computed <span style="float: right">{{computeds.length}}</span></div>
      <div 
        v-if="open"
        v-for="computed in computeds" 
        class="list-content"
        @click="select(computed)"
        >
        {{computed.name}}
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
      select(computed) {
        this.$emit('select', {start: computed.range[0], end: computed.range[1], offset: 'script'})
        
      }
    },
    computed: {
      computeds() {
        if (!this.parsed || !this.parsed.properties) return []

        let result = []

        this.parsed.properties.forEach(p=>{
          result.push({name: p.key.name, range: p.range})
        })

        return result
      }
    },
    name: 'computed-editor'
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
