<template>
  <div class="propEditor">
    {{prop}}
  </div>
  
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    props: ['id'],
    data() {
      return {
      }
    },
    computed: {
      ...mapState({
        prop: function(state) {
          return state.props.items[this.id]

        }
      }),
    },
    methods: {
    },
    name: 'prop-editor'
  }
</script>

<style scoped>
</style>
