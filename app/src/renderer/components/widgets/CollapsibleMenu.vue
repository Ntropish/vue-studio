<template>
    <div class="collapsibleMenu">
      <div class="collapsibleItem"
        v-for="item in items"
        @click="onClick(item)"
        :title="item.title"
      >
        <div class="title">
            <slot name="item-title" :item="item"></slot>    
        </div>
        <div class="content" v-if="openedMenus.get(item)">
            <slot name="content" :item="item"></slot>    
        </div>
      </div>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
        props: ['onItemClick', 'items'],
        data() {
            return {
                openedMenus: new WeakMap()
            }
        },
        methods: {
            onClick(clickedItem) {
                // Remake opened state every time to maintain reactivity
                let newOpenedState = new WeakMap()

                // Clicked on an open item
                if (this.openedMenus.get(clickedItem)) {
                    this.items.forEach((item)=>{
                        let newState = false
                        if (item !== clickedItem) {
                            this.openedMenus.get(item)
                        }
                        newOpenedState.set(item, newState)
                    })

                // Clicked on a closed item
                } else {
                    this.items.forEach((item)=>{
                        newOpenedState.set(item, item === clickedItem)
                    })

                }
                if (this.onItemClick) this.onItemClick(clickedItem)

                this.openedMenus = newOpenedState
            }
        },
        computed: {

        },
    }
</script>

<style scoped>

</style>
