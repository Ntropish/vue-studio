<template>
    <div class="dotVueEditor">
        <div class="workspace">
            <pre><code>{{script}}</code></pre>    
        </div>
        <div class="menu">
            <name-editor :parsed="componentName" @input="updateFile"></name-editor>
            <methods-editor :parsed="componentMethods" @intput="updateFile"></methods-editor>
            
            <div>props: {{componentProps}}</div>
            <div>Components: {{componentComponents}}</div>
            <div>Computed: {{componentComputed}}</div>
        </div>
    </div>
</template>

<script>
    // <collapsible-menu :items="componentProperties">
    //     <template scope="props" slot="item-title">
    //         {{props.item.type}}
    //     </template>
    //     <template scope="props" slot="content">
    //         {{props.item.value}}
    //     </template>
    // </collapsible-menu>
    import { mapState } from 'vuex'

    import esprima from 'esprima'
    import CollapsibleMenu from '../../widgets/CollapsibleMenu'

    import NameEditor from '../NameEditor'
    import MethodsEditor from '../MethodsEditor'

    export default {
        props: ['code', 'selectedComponentPropertyLocator'],
        data() {
            return {
                selected: null,
                currentCode: this.code,
                scriptIndex: 0,
            }
        },
        methods: {
            logSelected() {
                let selected = this.$store.state.selected.item
                    console.log(selected) 
            },
            matchTag(tag) {
                let lazyTagMatcher = new RegExp(`<${tag}.*?>((.|\n)*)?<\/${tag}>`, 'm')
                let match = this.currentCode.match(lazyTagMatcher)

                return match
            },
            updateFile(updateInstructions) {

                let computedOffset = 0

                if (typeof updateInstructions.offset === 'string') {
                    if (updateInstructions.offset === 'script') {
                        computedOffset = this.scriptIndex
                    }
                }
                let before = this.currentCode.slice(0, updateInstructions.start + computedOffset +2)
                let middle = updateInstructions.value
                let after = this.currentCode.slice(updateInstructions.end + computedOffset)
                this.currentCode = before + middle + after
            },
        },
        computed: {
            template() {
                return this.matchTag('template')[1]
            },
            script() {
                let match = this.matchTag('script')

                if (match) {
                    this.scriptIndex = match.index + 7
                    return match[1]
                } else {
                    this.scriptIndex = null
                    return ''
                }
                
            },
            style() {
                return this.matchTag('style')[1]
            },
            parsedScript() {
                return esprima.parse(this.script, {sourceType: 'module', range: true})
            },
            componentDefinition() {
                let result = null
                this.parsedScript.body.some((expression) => {
                    if (expression.type === 'ExportDefaultDeclaration') {
                        result = expression
                        return true
                    }
                })
                return result
            },
            componentProperties() {
                if (!this.componentDefinition) return {}
                let result = {}

                this.componentDefinition.declaration.properties.forEach((property)=>{
                    result[property.key.name] = property.value
                })
                return result
            },

            componentName() {
                if (!this.componentProperties.name) return '==Not Named=='

                return this.componentProperties.name
            },

            componentProps() {
                if (!this.componentProperties.props) return

                if (this.componentProperties.props.type === 'ArrayExpression') {
                    return this.componentProperties.props.elements.map((element)=>element.value)
                } else {
                    return 'UNHANDLED'
                }
            },

            componentMethods() {
                if (!this.componentProperties.methods) return
                
                return this.componentProperties.methods
            },

            componentComponents() {
                if (!this.componentProperties.components) return
                
                if (this.componentProperties.components.type === "ObjectExpression") {
                    return this.componentProperties.components.properties.map(e=>e.key.name)
                }
                return this.componentProperties.components
                
            },

            componentComputed() {
                if (!this.componentProperties.computed) return
                
                if (this.componentProperties.computed.type === "ObjectExpression") {
                    return this.componentProperties.computed.properties.map(e=>e.key.name)
                }

                return this.componentProperties.computed
            },

            selectedComponentProperty() {
                if (!this.selectedComponentPropertyLocator) {
                    return null
                }

                let type = this.selectedComponentPropertyLocator.type
                let name = this.selectedComponentPropertyLocator.name

                return componentProperties[type][name]
            }
        },

        components: {
            CollapsibleMenu,
            NameEditor,
            MethodsEditor,
        },

        watch: {
            code() {
                this.currentCode = this.code
            }
        },
        name: 'dot-vue-editor',
  }
</script>

<style scoped>
code {
    font-family: consolas;
}

.dotVueEditor {
    display: flex;
}

.workspace {
    flex: 1 1 10em;
}

.menu {
    flex: 0 0 15em;
}
</style>
