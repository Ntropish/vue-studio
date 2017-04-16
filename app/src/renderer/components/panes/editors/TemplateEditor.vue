<template>
  <div class="templateEditor">
    <div ref="box" style="width: 8em; height: 8em; background: red"></div>
    <button @click="addListener">ADD</button>
    <button @click="removeListener">REMOVE</button>
    </br>
    </br>
    <v-text-field
      label="Template"
      v-model="modelText"
      multi-line
    ></v-text-field>
    <template-element :node="rootNode"></template-element>
  </div>
  
</template>

<script>

  function handler(e) {
    console.log('beep')
  }

  import { mapState } from 'vuex'

  import htmlparser from 'htmlparser'
  import templateElement from './TemplateElement'
  export default {
    props: ['id'],
    data() {

      let handler = new htmlparser.DefaultHandler((err, dom) => {
        if (err) throw err
        this.parsed = dom
      })

      let parser = new htmlparser.Parser(handler)

      return {
        parser,        
        parsed: null,
      }
    },
    computed: {
      ...mapState({
        text: function(state) {
          return state.components.items[this.id].template.text
        }
      }),
      modelText: {
        get() {
          return this.text
        },
        set(value) {
          this.setText(value)
        }
      },
      rootNode() {
        return this.parsed? this.parsed[0] : {}
      }
    },
    methods: {
      addListener() {
        this.$refs.box.addEventListener('mousedown', handler)
      },
      removeListener() {
        this.$refs.box.removeEventListener('mousedown', handler)
      },
      setText(value) {
        this.$store.commit('components/SET_TEMPLATE', {id: this.id, value})
      },
      writeNodes() {
        let value = this.writeNode(this.rootNode)
        this.$store.commit('components/SET_TEMPLATE', {id: this.id, value})
        
      },
      writeNode(node) {
        if (node.type === 'tag') {
          let open = `<${node.data}>`
          let body = node.children.map(this.writeNode).join('\n')
          let close = `</${node.name}>`

          return `${open}\n\t${body}\n${close}`
        }

        if (node.type === 'text') {
          return `${node.data.trim()}`
        }

        return ''

      }
    },
    watch: {
      text(newText) {
        this.parser.parseComplete(newText)
      }
    },
    mounted() {
      this.parser.parseComplete(this.text)      
    },
    components: {
      templateElement,
    },
    name: 'template-editor'
  }
</script>

<style>
.templateEditor>.templateElement {
}
</style>
