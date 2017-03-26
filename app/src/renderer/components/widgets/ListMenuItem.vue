<template>
    <div>
        <h3 class="title" @click="clickHandler" >{{ title }}</h3>
        <div class="content" v-if="open">
            <slot></slot>        
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title', 'open'],
        methods: {
            clickHandler() {
                // Consider this item clicked only when the header is clicked
                this.$emit('click')
            }
        },
        name: 'list-menu-item'
    }
</script>

<style scoped>
.title {
    padding: 0.3em;
    background: rgba(255,255,255,0.05);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    cursor: pointer;
}
.title:hover {
    background: rgba(255,255,255,0.06);
}
.content {
}
</style>
