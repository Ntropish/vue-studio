<template>
    <div class="fileDisplay">
        <div class="directory" v-for="dir in dirsInList">
            
            <div class="directoryName" @click="showDir(dir.name)" :style="indentInEms">{{dir.name}}</div>

            <file-display 
                :indent="indent + 1"
                v-if="open[dir.name]"
                class="directoryContents"
                :dirs="dir.content.dirs" 
                :files="dir.content.files">
            </file-display>
        </div>
        <div 
            class="file" 
            v-for="file in filesInList" 
            :style="indentInEms"
            @click="select(file)">
        
            {{file.name}}
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'

    import * as types from 'renderer/vuex/mutation-types'


    export default {
        props: { 
            dirs: Object, 
            files: Object, 
            indent: { 
                type: Number,
                default: 1
            }
        },
        data() {
            return {
                open: {}
            }
        },
        methods: {
            showDir(dirname) {
                Vue.set(this.open, dirname, !this.open[dirname])
            },
            select(thingToSelect) {
                this.$store.dispatch('select', thingToSelect.content)
            },
        },
        computed: {
            dirsInList() {
                if (!this.dirs) return
                return Object.keys(this.dirs).map(dirname=>{
                    return {
                        name: dirname,
                        content: this.dirs[dirname]
                    }
                })
            },
            filesInList() {
                if (!this.files) return
                return Object.keys(this.files).map(filename=>{
                    
                    return {
                        name: filename,
                        content: this.files[filename]
                    }
                })
            },
            indentInEms() {
                return 'padding-left: ' + (this.indent * 0.5) + 'em;'
            }
        },
        name: 'file-display'
    }
</script>

<style scoped>
.directoryName {
}
.file { 
}
.file, .directoryName {
    height: 1.5em; 
    cursor: pointer; 
    padding: 0 0.5em;  
}
.directoryName:hover, .file:hover {
    background: rgba(255,255,255,0.06);
}

.fileDisplay {
    text-align: left;
}
</style>
