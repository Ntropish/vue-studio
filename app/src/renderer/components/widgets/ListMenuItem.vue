<template>
    <div>
        <div class="title" @click="clickHandler" >
            <slot name="title">
                <h3>{{ title }}</h3>    
            </slot>
        </div>

        <div class="content" v-if="open">
            <slot></slot>        
        </div>
    </div>
</template>

<script>
    export default {
        props: ['title', 'startOpen'],
        data() {
            return {
                open: this.startOpen4
            }
        },
        methods: {
            clickHandler() {
                this.open = !this.open
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
