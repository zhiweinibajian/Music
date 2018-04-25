<template>
  <div class="iscroll" ref="iscroll">
    <slot></slot>
  </div>
</template>

<script>
  import IScroll from 'iscroll'
  import {mapGetters} from 'vuex'

  export default {
    props: {
      data: {
        type: Array,
        default: []
      }
    },
    computed: {},
    mounted() {
      this.iscroll = new IScroll(this.$refs.iscroll, {
        disablePointer: true,
        disableTouch: false,
        click: true
      })
    },
    watch: {
      data() {
        setTimeout(() => {
          this.iscroll.refresh()
        }, 0)
      }
    }
  }
</script>

<style scoped>

</style>
