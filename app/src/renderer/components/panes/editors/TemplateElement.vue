<template>
  <div class="templateElement"
  v-if="node || true"
  :class="node.type"
  v-bind:style="dragStyle"
  contenteditable=false
  @dragover="dragOver"
  @dragout="dragOut"
  >
    <div>
      <div
      class="tagHead"
      :class="node.tagName || 'text'"
      v-drag="'hey'"
      v-follow
      @up="up"
      @down="down"
      @drag="follow($event)"
      >
        {{node.tagName || 'text'}}
      </br>
        {{node}}

      </div>
      <div class="tagBody" >
        <span v-for="(child, index) in node.children" >

          <template-element
          v-if="!isEmpty(child)"
          class="child"
          :node="child"></template-element>
        </span>

        <div v-if="node.type === 'text'" @keydown="textChange" contenteditable>
          {{node.data}}
        </div>

      </div>
    </div>

  </div>

</template>



<script>
  import { mapState } from 'vuex'

  export default {
    props: ['id'],
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
      ...mapState({
        node(state) {
          return state.templateNodes.items[this.id]

        }
      }),
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
      clean() {
        if (!this.node.children) return
        this.node.children = this.node.children.filter(n=>!this.isEmpty(n))
        console.log(this.node.children)
      },
      onInput(e) {
        this.$emit('change', e)
      },
      textChange(e) {
        console.log(e.target.textContent)
        this.node.data = e.target.textContent
        // this.onInput()
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
      },
      dragOver(e) {
        console.log('over')
      },
      dragOut(e) {
        console.log('out')
      }
    },
    mounted() {
      // this.clean()
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

.tagHead.text {
  background: hsla(0, 10%, 90%, 0.8);
}

.tagBody {
  padding: 0.4em 0 0.4em 0.4em;

}

.templateElement {
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
