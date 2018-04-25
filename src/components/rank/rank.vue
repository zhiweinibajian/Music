<template>
  <div>
    <iscroll class="rank" :data="rank" ref="rankIscroll">
      <div class="container">
        <ul>
          <li class="rank-item" v-for="(item,index) in rank" @click="toDetail(item)">
            <img :src="item.img" alt="" class="img">
            <div class="text">
              <h3 class="title">{{item.name}}</h3>
              <p class="about" v-for="(item1,index1) in item.songList">
                <span class="num">{{index1+1}}</span>
                <span class="song">{{item1.singer_name}}--{{item1.track_name}}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
      <loading v-if="!rank.length"></loading>
    </iscroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getRank} from "@/api/rank"
  import Iscroll from '@/components/iscroll/iscroll'
  import Loading from '@/components/loading/loading'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    data() {
      return {
        rank: []
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
      this._getRank()
    },
    methods: {
      ...mapMutations([
        'setRank'
      ]),
      toDetail(item) {
        this.setRank(item)
        this.$router.push({path: `/rank/${item.id}`})
      },
      _getRank() {
        getRank().then(res => {
          if (res.code === 0) {
            let rank = res.toplist.data.group_list[0].list
            this.rank = this.rewriteRank(rank)
          }
        })
      },
      rewriteRank(list) {
        let ret = []
        list.forEach((item) => {
          ret.push({
            date: item.update_key,
            id: item.id,
            name: item.name,
            img: item.pic,
            songList: item.songlist
          })
        })
        return ret
      }
    },
    watch: {}
  }
</script>

<style scoped>
  .rank {
    position: fixed;
    top: 106px;
    bottom: 0;
    width: 100%;
    overflow: hidden;
  }

  .rank .container .rank-item {
    display: flex;
    align-items: center;
    padding: 20px 20px 0 20px;
    overflow: hidden;
  }

  .rank .container .rank-item .img {
    flex: 0 0 100px;
    width: 100px;
    height: 100px;
    margin-right: 15px;
  }

  .rank .container .rank-item .text {
    flex: 1;
    overflow: hidden;
  }

  .rank .container .rank-item .text .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 10px;
    font-size: 15px;
  }

  .rank .container .rank-item .text .about {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 12px;
    margin-bottom: 3px;
  }
</style>
