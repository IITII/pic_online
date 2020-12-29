<template>
  <q-page class="flex flex-center full-height-width">
    <tool-group class="tool-group"/>
    <vue-waterfall-easy
      ref="waterfall"
      v-if="water_fall.show"
      :maxCols="maxCols"
      :imgs-arr="water_fall.img_urls"
      :loadingTimeOut="water_fall.loadingTimeOut"
      :loadingDotCount="water_fall.loadingDotCount"
      :reachBottomDistance="reach_bottom_distance"
      @imgError="imgErrorEvent"
      @scrollReachBottom="loadMore"
    >
      <span
        v-if="show_pic_title"
        slot-scope="props"
        class="some-info"
      >
        {{ props.value.info }}
      </span>
      <div slot="waterfall-over">
        {{ $t('waterfallOver') }}
      </div>
    </vue-waterfall-easy>
  </q-page>
</template>

<script>
import ToolGroup from 'components/ToolGroup'
import vueWaterfallEasy from 'vue-waterfall-easy'
import PicSettings from 'components/PicSettings'

export default {
  name: 'PageIndex',
  components: {
    ToolGroup,
    vueWaterfallEasy
  },
  data () {
    return {
      water_fall: {
        // 使用 v-if 来通过重新创建和销毁组件的方式来实现类似于界面刷新的效果
        show: true,
        nodeKey: 1,
        lowIndex: 0,
        highIndex: 0,
        img_urls: [],
        current_img_array: [],
        loadingDotCount: 3,
        loadingTimeOut: 500
      }
    }
  },
  methods: {
    imgErrorEvent: function (imgItem) {
      this.$q.notify({
        message: this.$t('img_load_error'),
        caption: `${imgItem.src}`,
        type: 'warning'
      })
    },
    beforeunloadFn: function (e) {
      this.$log.debug(`before unload function ${e}`)
      // // Cancel the event as stated by the standard.
      // e.preventDefault()
      // // Chrome requires returnValue to be set.
      // e.returnValue = '233'
    },
    rebuildWaterfall: function () {
      this.water_fall.show = false
      setTimeout(() => {
        this.water_fall.show = true
        if (this.water_fall.img_urls.length === 0) {
          // 没有图片就加载
          // 为了防止因为空文件夹导致 waterfall 无限加载
          this.loadMore()
        }
      }, 1)
    },
    btn_click_goto_top: function () {
      this.$log.debug('btn_click_goto_top listener')
      this.rebuildWaterfall()
    },
    resetConfig: function () {
      this.$log.debug('Reset config')
      this.water_fall.lowIndex = 0
      this.water_fall.highIndex = this.water_fall.lowIndex + this.stride
      this.water_fall.current_img_array = []
      this.water_fall.img_urls = []
    },
    showSettings: function () {
      this.$log.debug('Showing setting dialog...')
      this.$q.dialog({
        component: PicSettings,

        // optional if you want to have access to
        // Router, Vuex store, and so on, in your
        // custom component:
        parent: this,
        // becomes child of this Vue node
        // ("this" points to your Vue component)
        // (prop was called "root" in < 1.1.0 and
        // still works, but recommending to switch
        // to the more appropriate "parent" name)

        // props forwarded to component
        // (everything except "component" and "parent" props above):
        text: 'something'
        // ...more.props...
      }).onOk(() => {
        this.$log.debug('OK')
      }).onCancel(() => {
        this.$log.debug('Cancel')
      }).onDismiss(() => {
        this.$log.debug('Called on OK or Cancel')
      })
    },
    convertToTree: function (array) {
      return array
        .map(_ => {
          let info = _.split('/').pop().split('.')
          info.pop()
          info = info.join('.').slice(0, this.maxTitleLength)
          return {
            src: _,
            href: _,
            info
          }
        })
    },
    loadMore: function () {
      const url = this.$store.getters['apiSetting/picUrl']
      const method = this.$store.getters['apiSetting/picMethod']
      let axios
      const postData = {
        nodeKey: this.nodeKeyComputed,
        low: this.water_fall.lowIndex,
        high: this.water_fall.highIndex
      }
      switch (method) {
        case 'GET':
          axios = this.$axios.get(url)
          break
        case 'POST':
        default:
          this.$log.debug(`nodeKey: ${this.nodeKeyComputed}`)
          this.$log.debug(`post data: ${JSON.stringify(postData)}`)
          axios = this.$axios.post(url, postData)
          break
      }
      axios.then(res => {
        this.$log.debug(`axios post response: ${JSON.stringify(res)}`)
        this.water_fall.lowIndex = this.water_fall.highIndex
        this.water_fall.highIndex += this.stride
        return res.data
      })
        .then(res => {
          this.water_fall.current_img_array = res
          this.water_fall.img_urls = this
            .water_fall.img_urls
            .concat(this.convertToTree(res))
          return res
        })
        .then(res => {
          if (res.length < this.stride) {
            this.$refs.waterfall.waterfallOver()
            this.$q.notify({
              message: this.$t('waterfallOver'),
              caption: this.$t('no_more_pic'),
              type: 'info'
            })
          }
        })
        .catch(e => {
          this.$q.notify({
            message: this.$t('waterfall_load_error'),
            caption: `${e.message}`,
            type: 'negative'
          })
        })
    }
  },
  computed: {
    nodeKeyComputed: function () {
      return this.$store.getters['uiControl/nodeKey']
    },
    stride: function () {
      return this.$store.getters['uiControl/waterfallStride']
    },
    reach_bottom_distance: function () {
      const proportion = 0.3
      return screen.height * proportion
    },
    show_pic_title: function () {
      return this.$store.getters['uiControl/showImgTitle']
    },
    maxTitleLength: function () {
      return this.$store.getters['uiControl/imgTitleMaxLength']
    },
    maxCols: function () {
      return this.$store.getters['uiControl/waterfallCol']
    }
  },
  watch: {
    nodeKeyComputed: function (node) {
      this.$log.debug(`nodeKey updated: ${node}`)
      this.resetConfig()
      this.rebuildWaterfall()
    }
  },
  beforeMount () {
    // init variables before mount
    // this.$store.dispatch('apiSetting/setPicUrl', 'http://localhost:3000/private/pic')
    this.resetConfig()
  },
  mounted () {
    this.$log.debug(this.$refs)
    this.loadMore()
  },
  created () {
    window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
    this.$bus.$on('btn_click_goto_top', this.btn_click_goto_top)
    this.$bus.$on('btn_click_loadMore', this.loadMore)
    this.$bus.$on('btn_click_setting', this.showSettings)
  },
  destroyed () {
    window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
    this.$bus.$off('btn_click_goto_top', this.btn_click_goto_top)
    this.$bus.$off('btn_click_loadMore', this.loadMore)
    this.$bus.$off('btn_click_setting', this.showSettings)
  }
}
</script>

<!--style for waterfall-->
<style lang="scss">

* {
  margin: 0;
  padding: 0;
}

a {
  color: #000;
  text-decoration: none;

  &:active {
    color: #000;
  }
}

html,
body,
.waterfall_container {
  height: 100%;
}

.waterfall_container {
  position: relative;

  .waterfall_content {
    position: absolute;
    top: 3px;
    bottom: 3px;
    //bottom: 24px;
    width: 100%;
  }
}

.waterfall_container {
  overflow: auto;
  position: relative;
  padding: 0;

  .some-info {
    line-height: 1.6;
    text-align: center;
  }
}
</style>
