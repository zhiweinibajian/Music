<template>
  <div>
    <iscroll :data="singer" class="singer" ref="singerIscroll">
      <ul>
        <li class="item" v-for="(item,index) in singer" @click.stop.prevent="toSingerDetail(item)">
          <img :src="item.img" alt="" class="img">
          <p class="name">{{item.name}}</p>
        </li>
      </ul>
      <loading v-if="!singer.length"></loading>
    </iscroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getSinger} from "@/api/singer"
  import Iscroll from '@/components/iscroll/iscroll'
  import Loading from '@/components/loading/loading'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        singer: []
      }
    },
    components: {
      Iscroll,
      Loading
    },
    computed: {
      ...mapGetters([
        'fullPlayer'
      ])
    },
    created() {
      this._getSinger()
    },
    methods: {
      ...mapMutations([
        'setSinger'
      ]),
      toSingerDetail(item) {
        this.$router.push({path: `/singer/${item.mid}`})
        this.setSinger(item)
      },
      _getSinger() {
        getSinger().then(res => {
          if (res.code === 0) {
            let singer = res.data.list
            this.singer = this.rewriteNewSong(singer)
          }
        })
      },
      rewriteNewSong(list) {
        let ret = []
        list.forEach((item) => {
          ret.push({
            mid: item.Fsinger_mid,
            name: item.Fsinger_name,
            img: `http://y.gtimg.cn/music/photo_new/T001R300x300M000${item.Fsinger_mid}.jpg?max_age=2592000`,
          })
        })
        return ret
      },
      onIscroll(scroll) {
        this.iscroll = scroll
      }
    },
    watch: {}
  }
</script>

<style scoped>
  .singer {
    position: fixed;
    top: 106px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }

  .item {
    display: flex;
    padding: 30px 20px 0 20px;
    align-items: center;
  }

  .item .img {
    flex: 0 0 45px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 20px;
  }

  .item .name {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

</style>
