<template>
<div class="">
  <div class="templateElement"
  v-if="node"
  :class="node.type"
  contenteditable=false
  :key="id"
  v-follow
  @dragover.stop="dragOver"
  @dragout="dragOut"
  @mouseup="dragOut"
  @drop.stop="act"
  @dragover="drag"
  @gooddrop.stop="removeSelf">

    <div class="tagHead"
    :class="node.tagName || 'text'"
    v-drag="{action: 'add', childId: id}" >
      {{id}}
      <!-- {{'d: ' +dropIndex}} -->
      <!-- {{'type: '+node.type}} -->
      {{node.tagName}}

    </div>
    <div class="tagBody">
      <template-element
      v-for="(childId, index) in node.children"
      :id="childId"
      @remove="removeChild"
      ref="children"
      :class="index === dropIndex? 'aboveMe':''"
      ></template-element>

      <div v-if="node.type === 'text'" @keyup.prevent="textChange" contenteditable v-once>
        {{node.text}}
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
        action: null,
        dropIndex: null
      }
    },
    computed: {
      ...mapState({
        node(state) {
          return state.templateNodes.items[this.id]
        }
      }),
    },
    methods: {
      log(thing) {
        console.log(thing)
      },
      onInput(e) {
        this.$emit('change', e)
      },
      textChange(e) {
        this.$store.commit('templateNodes/SET_TEXT', {id: this.id, value: e.target.textContent})
        // this.node.data = e.target.textContent
        // this.onInput()
      },
      isEmpty(node) {
        if (!node) return true
        return node.type === 'text' && /^\s*$/.test(node.data)
      },
      dragOver(e) {
        this.action = e.detail
      },
      dragOut(e) {
        this.action = null
        this.dropIndex = null
      },
      act({detail: {value: {action, childId}, e, el}}) {
        console.log('act:', action, childId, e, el)
        if (action === 'add') {
          if (this.node.type === 'text') throw new Error('Can\'t drop on text')
          el.dispatchEvent(new CustomEvent('gooddrop', {bubbles: true, cancelable: true}))

          if (childId) {
            console.log(this.heightToIndex(e), this.dropIndex)
            this.$store.commit('templateNodes/ADD_CHILD', {
              id: this.id,
              childId,
              index: this.heightToIndex(e)})
          } else {
            this.$store.dispatch('templateNodes/ADD_CHILD', {id: this.id})
          }
        }
      },
      removeSelf(e) {
        this.$emit('remove', this.id)
      },
      removeChild(childId) {
        this.$store.commit('templateNodes/REMOVE_CHILD', {id: this.id, childId})
      },
      drag(e) {
        console.log()
        this.dropIndex = this.heightToIndex(e.detail.e.clientY)
      },
      heightToIndex(e) {

        if (this.$refs.children) {
          let result = 0
          this.$refs.children.forEach((child, index)=>{
            // console.log(child.$el.offsetTop, e, result, index)
            if (child.$el.offsetTop < e) {
              console.log('set to', index)
              result = index+1
            }
          })
          console.log('result:', result)
          return result
        }

        return 0
      }
    },
    mounted() {
    },
    name: 'template-element'
  }
</script>



<style scoped>
.child {
}

.tagHead {
  background: hsla(200, 0%, 60%, 0.1);
  padding: 0.4em 0 0.4em 0.4em;
  border-radius: 0 0 0 0.4em;
  display: flex;
  cursor: pointer;
}

.aboveMe>.templateElement>.tagHead {
  border-top: 1px solid red;
}

.tagHead.span {
  background: hsla(200, 40%, 60%, 0.2);
}

.tagHead.div {
  box-shadow: -1px 1px 1px hsla(0,40%,60%,0.8);
}

.tagHead.text {
  box-shadow: -1px 1px 1px hsla(210,40%,60%,0.8);
}

.tagBody {
  padding: 0.4em 0 0.4em 0.6em;

}

.templateElement {
  margin-top: 1em;
  background: hsl(0, 0%, 99%);
  border-left: 1px solid rgba(0,0,0,0.05);
  border-radius: 0.4em 0 0 0.4em;
  /*box-shadow: -1px 1px 1px rgba(0,0,0,0.1);*/
}

.tag+.tag {
  margin-top: 0.4em;
}
</style>
