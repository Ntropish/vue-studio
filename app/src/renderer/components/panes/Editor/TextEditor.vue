<template>
    <div class="fileEditor">

        <pre><code>{{code}}</code></pre>
        
    </div>
</template>

<script>

    export default {
        props: ['code'],
        name: 'text-editor'
  }
</script>

<style scoped>
.fileEditor {
    text-align: left;
}
</style>
