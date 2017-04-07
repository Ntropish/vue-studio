<template>
  <div id="#app">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'renderer/vuex/store'

  export default {
    store
  }

  //   button {
  //   border: 1px solid transparent;
  //   background: none;
  //   color: white;
  //   box-sizing: border-box;
  //   font-size: 1.2em;
  //   border-radius: 0.2em;
  // }
  // button:hover {
  //   border: 1px solid rgba(255,255,255,0.2);
  //   box-shadow: 0 2px 1px rgba(0,0,0,0.5);
  // }
  // button:active {
  //   border: 1px solid rgba(0,0,0,0.2);
  //   box-shadow: 0 2px 5px rgba(0,0,0,0.2) inset;
  // }
  // button:focus:not(:active) {
  //   border: 1px solid rgba(255,255,255,0.1);
  //   box-shadow: 0 2px 1px rgba(0,0,0,0.2);
  // }
  // button:focus {
  //   outline: none;
    
  // }
</script>

<style>


  html,
  body { height: 100%; }

  body>div {
    width: 100%;
    height: 100%;
  }

</style>
