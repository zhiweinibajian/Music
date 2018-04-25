<template>
  <div class="detail">
    <div class="top">
      <div class="bg-color"></div>
      <img class="img" :src="message.img" alt="">
      <i class="back" @click.stop.prevent="back"></i>
      <h3 class="title">{{message.name}}</h3>
    </div>
    <iscroll class="iscroll" :data="songList">
      <div>
        <div class="empty"></div>
        <song-list :list="songList" class="list"></song-list>
      </div>
      <loading v-if="!songList.length"></loading>
    </iscroll>
  </div>
</template>

<script>
  import Iscroll from '@/components/iscroll/iscroll'
  import SongList from '@/components/song-list/song-list'
  import Loading from '@/components/loading/loading'

  export default {
    props: {
      message: {
        type: Object,
        default: {}
      },
      songList: {
        type: Array,
        default: []
      }
    },
    components: {
      Iscroll,
      SongList,
      Loading
    },
    methods: {
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .iscroll {
    position: fixed;
    top: 60px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }

  .iscroll .empty {
    width: 100%;
    height: 214px;
  }

  .iscroll .list {
    background: #fff;
  }

  .top {
    position: relative;
  }

  .top .img {
    display: block;
    width: 100%;
    height: 274px;
    filter: blur(3px);
    transform: scale(1.1);
    opacity: .6;
  }

  .top .bg-color {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 274px;
    background: grey;
  }

  .top .back {
    position: absolute;
    left: 15px;
    top: 15px;
    width: 25px;
    height: 25px;
    background-image: url('../../assets/back.png');
    background-size: cover;
    z-index: 1;
  }

  .top .title {
    position: absolute;
    top: 0;
    left: 15%;
    width: 70%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
