<template>
  <div id="app">
    <top></top>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
  import Top from '@/components/top/top'
  import Player from '@/components/player/player'

  export default {
    components: {
      Top,
      Player
    }
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  ul {
    list-style: none;
  }
</style>
