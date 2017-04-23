<template>
  <div class="templateEditor">
    <template-menu id="">

    </template-menu>
    <template-element :id="id" @change="writeNodes"></template-element>

  </div>

</template>

<script>

  import { mapState } from 'vuex'

  import htmlparser from 'htmlparser'
  import templateElement from './TemplateElement'
  import templateMenu from './TemplateMenu'
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
    },
    methods: {
      setText(value) {
        // this.$store.commit('components/SET_TEMPLATE', {id: this.id, value})
      },
      writeNodes() {
        // let value = this.writeNode(this.rootNode)

        // this.$store.commit('components/SET_TEMPLATE', {id: this.id, value})

      },
      writeNode(node) {
        if (node.type === 'tag') {
          let open = `<${node.data}>`
          let body = (node.children || []).map(this.writeNode).join('\n')
          let close = `</${node.name}>`

          return `${open}\n\t${body}\n${close}`
        }

        if (node.type === 'text') {
          return `${node.data.trim()}`
        }

        return ''

      }
    },
    components: {
      templateElement,
      templateMenu,
    },
    name: 'template-editor'
  }
</script>

<style>
.templateEditor>.templateElement {
}
</style>
