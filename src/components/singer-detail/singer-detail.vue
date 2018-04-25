<template>
  <div class="singer-detail">
    <detail :message="singer" :songList="songList"></detail>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import {getSingerDetail} from "@/api/singer"
  import Detail from '@/components/detail/detail'

  export default {
    data() {
      return {
        songList: []
      }
    },
    components: {
      Detail
    },
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      let mid = this.singer.mid
      if (!mid) {
        this.$router.push({path: '/singer'})
        return
      }
      this._getSingerDetail(mid)
    },
    methods: {
      _getSingerDetail(mid) {
        getSingerDetail(mid).then(res => {
          if (res.code === 0) {
            let songList = res.data.list
            this.songList = this.rewriteSongList(songList)
          }
        })
      },
      rewriteSongList(list) {
        let ret = []
        list.forEach((item) => {
          let singername = this.getSingerName(item.musicData.singer)
          ret.push({
            interval: item.musicData.interval,
            mid: item.musicData.songmid,
            singername: singername,
            songname: item.musicData.songname,
            img: `http://y.gtimg.cn/music/photo_new/T002R90x90M000${item.musicData.albummid}.jpg?max_age=2592000`,
          })
        })
        return ret
      },
      getSingerName(list) {
        let ret = []
        list.forEach((item) => {
          ret.push(item.name)
        })
        return ret.join('/')
      }
    }
  }
</script>

<style scoped>
  .singer-detail {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
  }
</style>
