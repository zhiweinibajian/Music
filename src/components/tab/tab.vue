<template>
  <div class="tab">
    <router-link tag="div" to="/newsong" class="tab-item">新歌</router-link>
    <router-link tag="div" to="/singer" class="tab-item">歌手</router-link>
    <router-link tag="div" to="/rank" class="tab-item">排行</router-link>
    <router-link tag="div" to="/search" class="tab-item">搜索</router-link>
  </div>
</template>

<script>
  export default {}
</script>

<style scoped>
  .tab {
    display: flex;
    align-items: center;
  }

  .tab .tab-item {
    flex: 1;
    text-align: center;
    font-size: 16px;
    color: rgba(0, 0, 0, .6);
    padding: 15px 0;
  }

  .tab .router-link-active {
    color: #31c27c;
    border-bottom: 2px solid #31c27c;
  }
</style>
