<template>
  <div>
    <iscroll class="new-song" :data="newSong" ref="newSongIscroll">
      <div class="content">
        <ul>
          <li v-for="(item,index) in newSong" class="item" @click.stop.prevent="toPlayer(item,index)">
            <img :src="item.img" alt="" class="img">
            <div class="text">
              <p class="song" v-html="item.songname"></p>
              <p class="singer" v-html="item.singername"></p>
            </div>
            <span class="interval">{{reWriteInterval(item.interval)}}</span>
          </li>
        </ul>
      </div>
      <loading v-if="!newSong.length"></loading>
    </iscroll>
  </div>
</template>

<script>
  import {getNewSong} from "@/api/new-song"
  import {getSongUrl} from "@/api/songurl"
  import Iscroll from '@/components/iscroll/iscroll'
  import Loading from '@/components/loading/loading'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        newSong: [],
      }
    },
    components: {
      Iscroll,
      Loading
    },
    computed: {
      ...mapGetters([
        'fullPlayer',
      ])
    },
    created() {
      this._getNewSong()
    },
    methods: {
      ...mapMutations([
        'setPlaying',
        'setSongList',
        'setCurrentIndex',
        'setFullPlayer',
        'setSongUrl'
      ]),
      toPlayer(item, index) {
        this._getSongUrl(item.mid)
        this.fullPlayer ? this.setFullPlayer(true) : this.setFullPlayer(false)
        this.setSongList(this.newSong)
        this.setCurrentIndex(index)
      },
      _getSongUrl(mid) {
        getSongUrl(mid).then(res => {
          this.setSongUrl(res)
          this.setPlaying(true)
        })
      },
      _getNewSong() {
        getNewSong().then(res => {
          if (res.code === 0) {
            let newSong = res.new_song.data.song_list
            this.newSong = this.rewriteNewSong(newSong)
          }
        })
      },
      rewriteNewSong(list) {
        let ret = []
        list.forEach((item) => {
          let singername = this.getSingerName(item.singer)
          ret.push({
            interval: item.interval,
            mid: item.mid,
            singername: singername,
            songname: item.title,
            img: `http://y.gtimg.cn/music/photo_new/T002R90x90M000${item.album.mid}.jpg?max_age=2592000`,
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
      reWriteInterval(interval) {
        let minute = Math.floor(interval / 60)
        let second = Math.floor(interval % 60)
        minute < 10 ? minute = `0${minute}` : minute = minute
        second < 10 ? second = `0${second}` : second = second
        return `${minute}:${second}`
      }
    },
    watch: {}
  }
</script>

<style scoped>
  .new-song {
    position: fixed;
    top: 106px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }

  .item {
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #eee;
    font-size: 13px;
  }

  .item .img {
    flex: 0 0 50px;
    width: 50px;
    height: 50px;
    margin-right: 20px;
  }

  .item .text {
    flex: 1;
    overflow: hidden;
    margin-right: 20px;
  }

  .item .text .song {
    font-size: 16px;
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item .text .singer {
    font-size: 13px;
    color: rgba(0, 0, 0, .6);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

</style>
