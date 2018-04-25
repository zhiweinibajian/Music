<template>
  <div class="top">
    <div class="new">
      <i class="icon"></i>
    </div>
    <tab></tab>
  </div>
</template>

<script>
  import Tab from '@/components/tab/tab'

  export default {
    components: {
      Tab
    },
    methods: {}
  }
</script>

<style scoped>
  .new {
    position: relative;
    height: 40px;
    line-height: 40px;
    background: #31c27c;
    padding: 5px 0;
  }

  .new .icon {
    display: block;
    width: 40px;
    height: 40px;
    background-image: url("../../assets/music.png");
    background-size: cover;
    margin: 0 auto;
  }
</style>
