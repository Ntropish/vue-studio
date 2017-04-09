<template>
    <v-list-item start-open="true">
        <v-list-tile slot="title" class="title" @click.native="open = !open">
            Components
            
            <v-btn floating small @click.native.stop="addComponent">
                <v-icon class="black--text">add</v-icon>
            </v-btn>            
            
        </v-list-tile>

        <v-list v-if="open">
            <v-list-item class="component" v-for="component in components" @click="select(component)">
                <v-list-tile v-if="component" :class="component !== selected? 'grey--text':''">
                    <editable-span :value="component.name" @input="setName(component.id, $event)"></editable-span>
                </v-list-tile>
            </v-list-item>
        </v-list>
        
    </v-list-item>
</template>

<script>

    import * as types from 'renderer/vuex/mutation-types'
    import { mapState, mapGetters } from 'vuex'
    import EditableSpan from 'renderer/components/widgets/EditableSpan'

    export default {
        data() {
            return {
                open: true
            }
        },
        methods: {
            select({id}) {
                this.$store.commit('select/ASSET', {from: 'components', id})
            },
            addComponent() {
                this.$store.dispatch('components/ADD', {name: 'Hello From Component Menu'})
            },
            setName(id, value) {
                this.$store.commit('components/SET_PROPERTY', {id, name: 'name', value})
            },
        },
        computed: { 
            ...mapState({
                components: state => state.components.items
            }),
            ...mapGetters({
                selected:'select/GET_ASSET'
            }),
        },
        components: {
            EditableSpan
        },
        name: 'component-menu'
  }
</script>

<style scoped>
</style>
