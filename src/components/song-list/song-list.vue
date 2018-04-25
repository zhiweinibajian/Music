<template>
  <div class="song-list">
    <ul>
      <li class="item" v-for="(item,index) in list" @click="toPlayer(item,index)">
        <span class="num">{{index+1}}</span>
        <div class="text">
          <p class="song">{{item.songname}}</p>
          <p class="singer">{{item.singername}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {mapGetters,mapMutations} from 'vuex'
  import {getSongUrl} from "@/api/songurl";

  export default {
    props: {
      list: {
        type: Array,
        default: []
      }
    },
    computed:{
      ...mapGetters([
        'fullPlayer'
      ])
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
        this.fullPlayer?this.setFullPlayer(true):this.setFullPlayer(false)
        this.setSongList(this.list)
        this.setCurrentIndex(index)
      },
      _getSongUrl(mid) {
        getSongUrl(mid).then(res => {
          this.setSongUrl(res)
          this.setPlaying(true)
        })
      },
    }
  }
</script>

<style scoped>
  .item {
    display: flex;
    align-items: center;
    padding: 20px 20px 0 20px;
  }

  .item .num {
    margin-right: 20px;
    color: #ccc;
    font-size: 13px;
  }

  .item:nth-child(1) .num, .item:nth-child(2) .num, .item:nth-child(3) .num {
    color: red;
  }

  .item .text {
    flex: 1;
    overflow: hidden;
  }

  .item .text .song {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 5px;
    font-size: 15px;
  }

  .item .text .singer {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    color: rgba(0, 0, 0, .6);
  }
</style>
