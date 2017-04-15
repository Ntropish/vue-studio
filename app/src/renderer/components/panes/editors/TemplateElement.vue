<template>
  <div class="templateElement" :class="node.type" @click="log">

    <div v-if="node.type === 'tag'">
      <div class="tagHead" :class="node.name" v-drag>
        {{node.name}}
      </div>
      <div class="tagBody">
        <template-element 
          class="child" 
          v-for="child in node.children" 
          :node="child"
          v-if="!isEmpty(child)"></template-element>
      </div>
      
      
    </div>

    <div v-if="node.type === 'text'">
      {{node.data}}
    </div>



  </div>
  
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    props: ['node'],
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {
      log() {
        console.log(this.node)
      },
      isEmpty(node) {
        return node.type === 'text' && /^\s*$/.test(node.data)
      }

    },
    name: 'template-element'
  }
</script>

<style scoped>
.child {
}

.tagHead {
  padding: 0.4em 0 0.4em 0.4em;  
  border-radius: 0.4em 0 0 0;
  
}

.tagHead.span {
  background: hsla(200, 40%, 60%, 0.8);  
}

.tagHead.div {
  background: hsla(0, 40%, 60%, 0.8);  
}

.tagBody {
  padding: 0.4em 0 0.4em 0.4em;  
  
}

.templateElement.tag {
  background: hsl(0, 0%, 95%);
  border-right: 0;
  border-radius: 0.4em 0 0 0.4em;
  box-shadow: 0 0 3px rgba(0,0,0,0.3);
}

.tag:not(.tag>.tag) {
  background: red;
}
.tag+.tag {
  margin-top: 0.4em;
}
</style>
