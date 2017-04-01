<template>
    <label class="nameEditor">
      <div class="list-title" @click="open = !open">Components <span style="float: right">{{components.length}}</span></div>
      <div 
        v-if="open"
        v-for="component in components" 
        class="list-content"
        @click="select(component)"
        >
        {{component.name}}
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
      select(component) {
        this.$emit('select', {start: component.range[0]+1, end: component.range[1], offset: 'script'})
        
      }
    },
    computed: {
      components() {
        console.log(this.parsed)
        if (!this.parsed || !this.parsed.properties) return []

        let result = []

        this.parsed.properties.forEach(p=>{
          console.log(p)

          result.push({name: p.key.name, range: p.range})
        })

        return result
      }
    },
    name: 'methods-editor'
  }
</script>

<style scoped>

</style>
