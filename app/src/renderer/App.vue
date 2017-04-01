<template>
  <div id="#app">
    <router-view></router-view>
  </div>
</template>

<script>
  import store from 'renderer/vuex/store'

  // This is intended to make the loaded project up to date on the renderer when it starts
  store.dispatch('loadProject')

  export default {
    store
  }
</script>

<style>
  @import url(https://fonts.googleapis.com/css?family=Lato:300);

  * {
    margin: 0;
    padding: 0;
  }

  html,
  body { height: 100%; }

  body {
    align-items: center;
    background:
      radial-gradient(
        ellipse at center,
        rgba(255, 255, 255, 1) 0%,
        rgba(229, 229, 229, .85) 100%
      );
    background-position: center;
    display: flex;
    font-family: Lato, Helvetica, sans-serif;
    justify-content: center;
    text-align: center;
    color: white;
  }
  body>div {
    width: 100%;
    height: 100%;
  }
  .list-title {
    font-size: 1.4em;
    padding: 0.3em;
    background: rgba(255,255,255,0.05);
    border-bottom: 1px solid rgba(255,255,255,0.05);
    cursor: pointer;
  }
  .list-title:hover {
      background: rgba(255,255,255,0.06);
  }
  .list-content {
      font-size: 1.2em;
      padding: 0.3em;
  }
</style>
