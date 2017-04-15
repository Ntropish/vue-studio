<template>
    <div class="list-menu">

        Properties

    </div>
</template>

<script>
    import { mapState } from 'vuex'

    export default {
        data() {74
            return {
                openedMenus: [

                ]
            }
        },
        methods: {
            logSelected() {
                let selected = this.$store.state.selected
                    console.log(selected) 
            }
        },
        computed: {
            ...mapState({
                menus: state => {
                    return []
                },
                selected: state => state.selected.item
            })
        },
        name: 'property-menu'
  }
</script>

<style scoped>
</style>
