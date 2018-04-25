<template>
  <div class="player" v-if="songList.length">
    <transition name="fun">
      <div class="full-player" v-show="fullPlayer">
        <div class="bg-img" :style="{backgroundImage:`url(${currentSong.img})`}"></div>
        <transition name="fun-top">
          <div class="top" v-show="fullPlayer">
            <i class="back" @click="back"></i>
            <div class="text">
              <p class="song">{{currentSong.songname}}</p>
              <p class="singer">-- {{currentSong.singername}} --</p>
            </div>
          </div>
        </transition>
        <div class="middle">
          <img :src="currentSong.img" alt="">
        </div>
        <div class="bottom">
          <div class="progress-container">
            <span class="time">{{rewriteInterval(currentTime)}}</span>
            <div class="progress-bar">
              <div class="bar" ref="bar"></div>
              <div class="progress" ref="process"></div>
              <div class="circle" ref="circle"></div>
              <div class="controller" ref="controller" @touchstart.stop.prevent="onTouchStart"
                   @touchmove.stop.prevent="onTouchMove"
                   @touchend="onTouchEnd"></div>
            </div>
            <span class="time">{{rewriteInterval(currentSong.interval)}}</span>
          </div>
          <div class="btn-container">
            <div class="container">
              <i class="prev" @click.stop.prevent="prevSong"></i>
            </div>
            <div class="container">
              <i class="toggle-play" :class="playing?'play-btn':'pause-btn'" @click.stop.prevent="togglePlay"></i>
            </div>
            <div class="container">
              <i class="next" @click.stop.prevent="nextSong"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini-fun">
      <div class="mini-player" v-show="!fullPlayer" @click="toFullPlayer">
        <div class="container">
          <img :src="currentSong.img" alt="" class="pic">
          <div class="text">
            <p class="song" v-html="currentSong.songname"></p>
            <p class="singer" v-html="currentSong.singername"></p>
          </div>
          <i class="btn" :class="playing?'play-btn':'pause-btn'" @click.stop.prevent="togglePlay"></i>
        </div>
      </div>
    </transition>
    <audio :src="songUrl" ref="audio" @ended="nextSong" @timeupdate="timeUpdate"></audio>
  </div>
</template>

<script>
  import {mapGetters, mapMutations} from 'vuex'
  import {getSongUrl} from "@/api/songurl";

  export default {
    data() {
      return {
        currentTime: 0,
        percent: 0,
      }
    },
    computed: {
      ...mapGetters([
        'playing',
        'fullPlayer',
        'songList',
        'currentSong',
        'currentIndex',
        'songUrl'
      ])
    },
    created() {
      this.touch = {}
    },
    updated() {
      this.bar = this.$refs.bar
      this.process = this.$refs.process
      this.circle = this.$refs.circle
    },
    methods: {
      ...mapMutations([
        'setPlaying',
        'setFullPlayer',
        'setCurrentIndex',
        'setSongUrl'
      ]),
      timeUpdate(e) {
        let time = e.target.currentTime
        this.currentTime = Math.floor(time)
        let percent = this.currentTime / this.currentSong.interval
        this.percent = percent.toFixed(2)
      },
      onTouchStart(e) {
        this.touch.start = true
        this.changePercent(e)
      },
      onTouchMove(e) {
        if (this.touch.start) {
          this.setPlaying(false)
          this.changePercent(e)
        }
      },
      onTouchEnd(e) {
        this.setPlaying(true)
        this.touch.start = false
      },
      changePercent(e) {
        let allW = e.target.parentElement.clientWidth - this.$refs.circle.clientWidth
        let currentW = Math.min(allW, Math.max(0, e.touches[0].pageX - e.target.parentElement.offsetLeft))
        this.percent = (currentW / allW).toFixed(2)
        let currentTime = this.percent * this.currentSong.interval
        this.$refs.audio.currentTime = currentTime
        this.currentTime = currentTime
      },
      back() {
        this.setFullPlayer(false)
      },
      toFullPlayer() {
        this.setFullPlayer(true)
      },
      togglePlay() {
        this.playing ? this.setPlaying(false) : this.setPlaying(true)
      },
      prevSong() {
        let index = this.currentIndex
        index > 0 ? this.setCurrentIndex(index - 1) : this.setCurrentIndex(this.songList.length - 1)
        this._setSongUrl(this.currentSong.mid)
      },
      nextSong() {
        let index = this.currentIndex
        index < this.songList.length - 1 ? this.setCurrentIndex(index + 1) : this.setCurrentIndex(0)
        this._setSongUrl(this.currentSong.mid)
        this.setPlaying(true)
      },
      _setSongUrl(mid) {
        getSongUrl(mid).then(res => {
          this.setSongUrl(res)
        })
      },
      rewriteInterval(interval) {
        let minute = Math.floor(interval / 60)
        let second = Math.floor(interval % 60)
        minute < 10 ? minute = `0${minute}` : minute = minute
        second < 10 ? second = `0${second}` : second = second
        return `${minute}:${second}`
      }
    },
    watch: {
      playing(newValue) {
        if (newValue) {
          this.$nextTick(() => {
            this.$refs.audio.play()
          })
        } else {
          this.$nextTick(() => {
            this.$refs.audio.pause()
          })
        }
      },
      songUrl() {
        this.$nextTick(() => {
          this.$refs.audio.play()
        })
      },
      percent(_new) {
        let barW = this.bar.clientWidth
        let circleW = this.circle.clientWidth
        let _barW = barW - circleW
        this.process.style.width = `${barW * _new}px`
        this.circle.style.left = `${_barW * _new}px`
      }
    }
  }
</script>

<style scoped>
  .fun-enter-active, .fun-leave-active {
  }

  .fun-enter, .fun-leave-to {
  }

  .fun-top-enter-active, .fun-top-leave-active {
    transition: all .3s;
  }

  .fun-top-enter, .fun-top-leave-to {
    transform: translateY(-100%);
  }

  .mini-fun-enter-active, .mini-fun-leave-active {
    transition: all .3s;
  }

  .mini-fun-enter, .mini-fun-leave-to {
    transform: translateY(100%);
  }

  .full-player {
    position: fixed;
    top: 0;
    bottom: 0;
    width: 100%;
    background: rgb(41, 42, 43);
  }

  .full-player .bg-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
    filter: blur(65px);
    opacity: .6;
    overflow: hidden;
  }

  .full-player .top {
    position: relative;
    width: 100%;
    height: 80px;
  }

  .full-player .top .back {
    position: absolute;
    top: 25px;
    left: 15px;
    width: 25px;
    height: 25px;
    background-image: url("../../assets/back.png");
    background-size: cover
  }

  .full-player .top .text {
    position: absolute;
    top: 15px;
    left: 20%;
    width: 60%;
    overflow: hidden;
    text-align: center;
    color: #fff;
  }

  .full-player .top .text .song {
    font-size: 18px;
    margin-bottom: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .full-player .top .text .singer {
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .full-player .middle {
    position: absolute;
    top: 80px;
    bottom: 160px;
    width: 100%;
  }

  .full-player .middle img {
    display: block;
    width: 70%;
    border-radius: 50%;
    margin: 0 auto;
  }

  .full-player .bottom {
    position: fixed;
    left: 0;
    bottom: 60px;
    width: 100%;
  }

  .full-player .bottom .progress-container {
    display: flex;
    align-items: center;
    width: 90%;
    height: 25px;
    margin: 0 auto 15px;
  }

  .full-player .bottom .progress-container .time {
    font-size: 13px;
    color: #31c27c;
  }

  .full-player .bottom .progress-container .progress-bar {
    flex: 1;
    position: relative;
    height: 100%;
    margin: 0 10px;
  }

  .full-player .bottom .progress-container .progress-bar .bar {
    position: absolute;
    top: 11px;
    left: 0;
    width: 100%;
    height: 3px;
    border-radius: 5px;
    background: rgba(255, 255, 255, .1);
  }

  .full-player .bottom .progress-container .progress-bar .progress {
    position: absolute;
    top: 11px;
    left: 0;
    width: 0;
    height: 3px;
    border-radius: 5px;
    background: #31c27c;
  }

  .full-player .bottom .progress-container .progress-bar .circle {
    position: absolute;
    top: 5px;
    left: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background: #31c27c;
  }

  .full-player .bottom .progress-container .progress-bar .controller {
    position: absolute;
    top: 11px;
    left: 0;
    width: 100%;
    height: 3px;
    border-radius: 5px;
  }

  .full-player .bottom .btn-container {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .full-player .bottom .btn-container .container {
    flex: 1;
  }

  .full-player .bottom .btn-container .container .prev {
    display: block;
    width: 45px;
    height: 45px;
    background-image: url("../../assets/prev.png");
    background-size: cover;
    margin: 0 auto
  }

  .full-player .bottom .btn-container .container .toggle-play {
    display: block;
    width: 60px;
    height: 60px;
    background-size: cover;
    margin: 0 auto
  }

  .full-player .bottom .btn-container .container .next {
    display: block;
    width: 45px;
    height: 45px;
    background-image: url("../../assets/next.png");
    background-size: cover;
    margin: 0 auto
  }

  .mini-player {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    background: #fff;
    box-shadow: 0 0 15px 0 rgba(49, 194, 124, .6);
  }

  .mini-player .container {
    display: flex;
    padding: 10px;
    align-items: center;
  }

  .mini-player .container .pic {
    flex: 0 0 45px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }

  .mini-player .container .text {
    flex: 1;
    margin: 0 15px;
    overflow: hidden;
  }

  .mini-player .container .text .song {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    margin-bottom: 5px;
  }

  .mini-player .container .text .singer {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    color: rgba(0, 0, 0, .6);
  }

  .mini-player .container .btn {
    display: block;
    width: 30px;
    height: 30px;
    background-size: cover;
    margin-right: 15px;
  }

  .play-btn {
    background-image: url('../../assets/pause.png');
  }

  .pause-btn {
    background-image: url('../../assets/play.png');
  }
</style>
