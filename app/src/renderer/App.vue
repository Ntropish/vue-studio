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
  button {
    border: 1px solid transparent;
    background: none;
    color: white;
    box-sizing: border-box;
    font-size: 1.2em;
    border-radius: 0.2em;
  }
  button:hover {
    border: 1px solid rgba(255,255,255,0.2);
    box-shadow: 0 2px 1px rgba(0,0,0,0.5);
  }
  button:active {
    border: 1px solid rgba(0,0,0,0.2);
    box-shadow: 0 2px 5px rgba(0,0,0,0.2) inset;
  }
  button:focus:not(:active) {
    border: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 2px 1px rgba(0,0,0,0.2);
  }
  button:focus {
    outline: none;
    
  }
</style>
