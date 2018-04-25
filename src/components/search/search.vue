<template>
  <div class="search">
    <div class="input-wraper" :class="showCancel?'input-wraper-search':''">
      <div class="wraper">
        <i class="search-icon"></i>
        <i class="delete-icon" v-if="searchText" @click.stop.prevent="deleteSearchText()"></i>
        <input class="input" type="search" placeholder="搜索歌曲、歌单、专辑"
               v-model="searchText"
               @focus="showSearch"
               @keypress.enter="search">
      </div>
      <span v-if="showCancel" class="cancel" @click="cancel">取消</span>
    </div>
    <div class="content">
      <div class="hot-key" v-if="!showCancel">
        <span v-for="(item,index) in hotKey" @click="searchHotKey(item)" class="text">{{item}}</span>
      </div>
      <div class="search-result">
        <iscroll :data="songList" class="search-result" v-if="hasResult&&songList.length">
          <song-list :list="songList"></song-list>
        </iscroll>
        <p class="tip" v-if="!hasResult">没有搜索结果...</p>
        <p class="tip" v-if="loading">正在载入中...</p>
      </div>
    </div>
  </div>
</template>

<script>
  import {getSearchResult} from "@/api/search"
  import {getHotKey} from "@/api/search"
  import SongList from '@/components/song-list/song-list'
  import Iscroll from '@/components/iscroll/iscroll'

  export default {
    data() {
      return {
        showCancel: false,
        songList: [],
        searchText: '',
        hasResult: true,
        loading: false,
        hotKey: []
      }
    },
    components: {
      SongList,
      Iscroll
    },
    created() {
      this._getHotKey()
    },
    methods: {
      showSearch() {
        this.showCancel = true
      },
      cancel() {
        this.showCancel = false
        this.searchText = ''
      },
      search() {
        let text = this.searchText.replace(/\s/g, '')
        this._getSearchResult(text)
      },
      deleteSearchText() {
        this.searchText = ''
      },
      searchHotKey(item) {
        this.searchText = item
        this.showCancel = true
        this._getSearchResult(item)
      },
      _getSearchResult(text) {
        this.loading = true
        getSearchResult(text).then(res => {
          if (res.code === 0) {
            let songList = res.data.song.list
            if (!songList.length) {
              this.hasResult = false
              this.loading = false
              return
            }
            this.loading = false
            this.hasResult = true
            this.songList = this.rewriteSongList(songList)
          }
        })
      },
      rewriteSongList(list) {
        let ret = []
        list.forEach((item) => {
          let singername = this.getSingerName(item.singer)
          ret.push({
            interval: item.interval,
            mid: item.songmid,
            singername: singername,
            songname: item.songname,
            img: `http://y.gtimg.cn/music/photo_new/T002R90x90M000${item.albummid}.jpg?max_age=2592000`,
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
      _getHotKey() {
        getHotKey().then(res => {
          if (res.code === 0) {
            let hotKey = res.data.hotkey
            this.hotKey = this.rewriteHotKey(hotKey)
          }
        })
      },
      rewriteHotKey(hotkey) {
        let ret = []
        for (let i = 0; i < hotkey.length; i++) {
          if (i > 5) {
            break
          }
          ret.push(hotkey[i].k)
        }
        return ret
      }
    },
    watch: {
      searchText(newValue) {
        if (!newValue) {
          this.songList = []
          this.hasResult = true
        }
      }
    }
  }
</script>

<style scoped>

  input::-webkit-search-cancel-button {
    display: none;
  }

  .search {
    position: fixed;
    top: 106px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }

  .input-wraper {
    position: relative;
    padding: 10px;
    background: #f4f4f4;
  }

  .input-wraper .cancel {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    margin-right: 15px;
    font-size: 15px;
  }

  .input-wraper-search {
    padding: 10px 60px 10px 10px;
  }

  .input-wraper .wraper {
    position: relative;
    height: 35px;
    line-height: 35px;
    background: #fff;
    border-radius: 5px;
    padding: 0 35px 0 35px;
  }

  .input-wraper .wraper .search-icon {
    position: absolute;
    top: 8px;
    left: 10px;
    width: 20px;
    height: 20px;
    background-image: url('../../assets/search.png');
    background-size: cover;
  }

  .input-wraper .wraper .delete-icon {
    position: absolute;
    top: 10px;
    right: 15px;
    width: 15px;
    height: 15px;
    background-image: url('../../assets/delete.png');
    background-size: cover;
  }

  .input-wraper .wraper .input {
    display: inline-block;
    width: 100%;
    height: 20px;
    line-height: 20px;
    border: 0 none;
    outline: 0 none;
    background: none;
    font-size: 13px;
  }

  .content {
    position: fixed;
    top: 161px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }

  .content .search-result {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }

  .content .search-result .tip {
    margin-top: 15px;
    text-align: center;
    font-size: 15px;
    color: rgba(0, 0, 0, .6);
  }

  .content .hot-key {
    position: absolute;
    top: 0;
    left: 0;
    padding: 20px 20px;
    z-index: 1;
  }

  .content .hot-key .text {
    display: inline-block;
    padding: 5px 10px;
    font-size: 15px;
    color: #000;
    border: 1px solid #000;
    border-radius: 15px;
    margin: 0 15px 15px 0;
  }
</style>
