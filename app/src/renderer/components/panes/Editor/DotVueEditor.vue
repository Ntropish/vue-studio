<template>
    <div class="dotVueEditor">
        <div class="workspace">
            <pre><code>{{selectedCode}}</code></pre>    
        </div>
        <div class="menu">
            <name-editor :parsed="componentName" @input="updateFile"></name-editor>
            <methods-editor :parsed="componentMethods" @select="selectPortion"></methods-editor>
            <props-selector :parsed="componentProps" @select="selectPortion"></props-selector>
            <components-editor :parsed="componentComponents" @select="selectPortion"></components-editor>
            <computed-selector :parsed="componentComputed" @select="selectPortion"></computed-selector>
            <data-selector :parsed="componentData" @select="selectPortion"></data-selector>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'

    import esprima from 'esprima'
    import CollapsibleMenu from '../../widgets/CollapsibleMenu'

    import NameEditor from '../NameEditor'
    import MethodsEditor from '../MethodsEditor'
    import PropsSelector from '../PropsSelector'
    import ComponentsEditor from '../ComponentsEditor'
    import ComputedSelector from '../ComputedSelector'
    import DataSelector from '../DataSelector'
    

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

                let computedOffset = this.getOffset(updateInstructions.offset)

                let before = this.currentCode.slice(0, updateInstructions.start + computedOffset +2)
                let middle = updateInstructions.value
                let after = this.currentCode.slice(updateInstructions.end + computedOffset)
                this.currentCode = before + middle + after
            },
            
            selectPortion(selectInstructions) {
                let computedOffset = this.getOffset(selectInstructions.offset)
                this.selected = {
                    start: selectInstructions.start + computedOffset,
                    end: selectInstructions.end + computedOffset +1,
                    }
            },

            getOffset(offset) {
                if (typeof offset === 'string') {
                    if (offset === 'script') {
                        return this.scriptIndex

                    }
                }
                return 0
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
                    return this.componentProperties.props
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

                return this.componentProperties.components
                
            },

            componentComputed() {
                if (!this.componentProperties.computed) return
                
                if (this.componentProperties.computed.type === "ObjectExpression") {
                    return this.componentProperties.computed.properties.map(e=>e.key.name)
                }

                return this.componentProperties.computed
            },

            componentData() {
                if (!this.componentProperties.data) return

                return this.componentProperties.data
            },

            selectedCode() {
                if (!this.selected) {
                    return ''
                }
                return this.currentCode.slice(this.selected.start, this.selected.end)
            }
        },

        components: {
            CollapsibleMenu,
            NameEditor,
            MethodsEditor,
            PropsSelector,
            ComponentsEditor,
            ComputedSelector,
            DataSelector,
        },

        watch: {
            code() {
                console.log('new code:', this.code)
                this.currentCode = this.code
                this.selected = null
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
