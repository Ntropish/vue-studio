<template>
  <div class="templateElement" :class="node.type" v-bind:style="dragStyle">

    <div v-if="node.type === 'tag'" contenteditable=false>
      <div 
      class="tagHead" 
      :class="node.name" 
      v-drag="'hey'" 
      @up="up" 
      @down="down" 
      @drag="follow($event)"
      >
        {{node.name}}
      </div>
      <div class="tagBody" contenteditable>
        <template-element 
          @input.native="onInput"
          class="child" 
          v-for="child in node.children" 
          :node="child"
          v-if="!isEmpty(child)"></template-element>
      </div>
    </div>

    <div v-if="node.type === 'text'" @input="onInput">
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
        dragging: false,
        top: 0,
        left: 0,
        baseTop: 0,
        baseLeft: 0,
      }
    },
    computed: {
      dragStyle() {
        let obj = {
          position: this.dragging? 'relative' :null,          
          left: this.left? this.left+'px':null,
          top: this.top? this.top+'px':null,
        }
        return obj
      }
    },
    methods: {
      log(thing) {
        console.log(thing)
      },
      onInput(e) {
        console.log(e.target)
        this.$emit('input', e)
      },
      isEmpty(node) {
        return node.type === 'text' && /^\s*$/.test(node.data)
      },
      follow({detail}) {
        this.top = detail.clientY - this.baseTop
        this.left = detail.clientX - this.baseLeft
      },
      up({detail}) {
        this.dragging = true
        this.top = 0
        this.left = 0
        this.baseTop = detail.clientY
        this.baseLeft = detail.clientX
      },
      down() {
        this.dragging = false
        this.top = null
        this.left = null
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
