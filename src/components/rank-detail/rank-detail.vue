<template>
  <div class="rank-detail">
    <detail :message="rank" :songList="songList"></detail>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getRankDetail} from "@/api/rank"
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
        'rank'
      ])
    },
    created() {
      let id = this.rank.id
      let date = this.rank.date
      if (!id) {
        this.$router.push({path: '/rank'})
      }
      this._getRankDetail(date, id)
    },
    methods: {
      _getRankDetail(date, id) {
        getRankDetail(date, id).then(res => {
          if (res.code === 0) {
            let songList = res.songlist
            this.songList = this.rewriteSongList(songList)
          }
        })
      },
      rewriteSongList(list) {
        let ret = []
        list.forEach((item) => {
          let singername = this.getSingerName(item.data.singer)
          ret.push({
            interval: item.data.interval,
            mid: item.data.songmid,
            singername: singername,
            songname: item.data.songname,
            img: `http://y.gtimg.cn/music/photo_new/T002R90x90M000${item.data.albummid}.jpg?max_age=2592000`,
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
      },
      back() {
        this.$router.back()
      }
    }
  }
</script>

<style scoped>
  .rank-detail {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
  }
</style>
