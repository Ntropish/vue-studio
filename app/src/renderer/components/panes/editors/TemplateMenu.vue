<template>
  <div class="templateMenu">
    <div>
      Drag us
    </div>

    <div class="templateMenuItem" v-drag="addElement" v-follow>
      <v-icon large class="grey--text text--darken-2">add</v-icon>
    </div>

    <div class="templateMenuItem" v-drag="copyElement" v-follow>
      <v-icon large class="grey--text text--darken-2">content_copy</v-icon>
    </div>

    <div class="templateMenuItem" v-drag="deleteElement" v-follow>
      <v-icon large class="grey--text text--darken-2">delete</v-icon>
    </div>

  </div>

</template>

<script>

  import { mapState } from 'vuex'

  export default {
    props: ['id'],
    data() {
      return {
        addElement: {
          action: 'add'
        },
        copyElement: {
          action: 'copy'
        },
        deleteElement: {
          action: 'delete'
        }
      }
    },
    computed: {
    },
    methods: {
    },
    components: {
    },
    name: 'template-menu'
  }
</script>

<style scoped>
.templateMenu {
  display: flex;
  flex-align: center;
}

.templateMenuItem {
  cursor: pointer;
}
</style>
