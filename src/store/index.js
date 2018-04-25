import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    playing: false,
    songList: [],
    currentIndex: -1,
    fullPlayer: true,
    songUrl: '',
    rank: {},
    singer: {}
  },
  getters: {
    playing: state => state.playing,
    songList: state => state.songList,
    currentIndex: state => state.currentIndex,
    currentSong: state => state.songList[state.currentIndex],
    fullPlayer: state => state.fullPlayer,
    songUrl: state => state.songUrl,
    rank: state => state.rank,
    singer: state => state.singer
  },
  mutations: {
    setPlaying(state, playing) {
      state.playing = playing
    },
    setSongList(state, list) {
      state.songList = list
    },
    setCurrentIndex(state, index) {
      state.currentIndex = index
    },
    setFullPlayer(state, player) {
      state.fullPlayer = player
    },
    setSongUrl(state, url) {
      state.songUrl = url
    },
    setRank(state, rank) {
      state.rank = rank
    },
    setSinger(state, singer) {
      state.singer = singer
    }
  }
})
