<template>
  <q-page class="flex flex-center full-height-width">
    <tool-group class="tool-group"/>
    <pic-viewer
      :images="water_fall.img_urls"
      :visible.sync="viewer.visible"
      @loadMore="loadMore"
    />
    <vue-waterfall-easy
      ref="waterfall"
      v-if="water_fall.show"
      :maxCols="maxCols"
      :imgs-arr="water_fall.img_urls"
      :loadingTimeOut="water_fall.loadingTimeOut"
      :loadingDotCount="water_fall.loadingDotCount"
      :reachBottomDistance="reach_bottom_distance"
      @click="viewerNextLister"
      @imgError="imgErrorEvent"
      @scrollReachBottom="loadMore"
      style="text-align: center"
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
import PicSettings from 'components/pic_settings'
import ToolGroup from 'components/pic_tools/ToolGroup'
import PicViewer from 'components/pic_commons/PicViewer'

import vueWaterfallEasy from 'vue-waterfall-easy'
import { mapState } from 'vuex'

export default {
  name: 'PageIndex',
  components: {
    PicViewer,
    ToolGroup,
    vueWaterfallEasy
  },
  data () {
    return {
      viewer: {
        visible: false
      },
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
    viewerNextLister () {
      this.$log.debug('clicked')
      this.viewer.visible = true
    },
    rebuildWaterfall: function () {
      this.water_fall.show = false
      setTimeout(() => {
        this.water_fall.show = true
        if (this.water_fall.img_urls.length === 0) {
          // 没有图片就加载
          // 为了防止因为空文件夹导致 waterfall 无限加载
          this.loadMore(this.skipEmptyDir)
        }
      }, 1)
    },
    btn_click_goto_top: function () {
      this.$log.debug(this.$refs.waterfall.$refs.scrollEl)
      this.$log.debug(this.$refs.waterfall.$refs.scrollEl.scrollTop)
      this.$log.debug('btn_click_goto_top listener')
      // this.rebuildWaterfall()
      this.$refs.waterfall.$refs.scrollEl.scrollTop = 0
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
            // href: _,
            info
          }
        })
    },
    loadMore: function (skipEmptyDir = false) {
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
          this.$log.debug(`Req: ${JSON.stringify(postData)}`)
          axios = this.$axios.post(url, postData)
          break
      }
      axios.then(res => {
        this.$log.debug(`Res: ${JSON.stringify({
          status: res.status,
          data: res.data
        })}`)
        this.water_fall.lowIndex = this.water_fall.highIndex
        this.water_fall.highIndex += this.stride
        return res.data
      })
        .then(res => {
          if (res.length === 0 && skipEmptyDir) {
            // skip empty node via simulation `NextNode Button` Click.
            this.$bus.$emit('btn_click_nextNode')
            this.$q.notify({
              message: this.$t('skip_empty_dir'),
              caption: this.$t('disable_skip_empty_dir'),
              type: 'info'
            })
          } else if (res.length < this.stride) {
            this.$refs.waterfall.waterfallOver()
            this.$q.notify({
              message: this.$t('waterfallOver'),
              caption: this.$t('no_more_pic'),
              type: 'info'
            })
          }
          return res
        })
        .then(res => {
          this.water_fall.current_img_array = res
          this.water_fall.img_urls = this.water_fall.img_urls.concat(this.convertToTree(res))
          return res
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
    ...mapState({
      maxCols: state => state.uiControl.waterfallCol,
      stride: state => state.uiControl.waterfallStride,
      skipEmptyDir: state => state.uiControl.skipEmptyDir,
      nodeKeyComputed: state => state.uiControl.nodeKey,
      show_pic_title: state => state.uiControl.showImgTitle,
      maxTitleLength: state => state.uiControl.imgTitleMaxLength
    }),
    reach_bottom_distance: function () {
      const proportion = 0.3
      return screen.height * proportion
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
    this.$log.warn(this.$refs)
    this.loadMore(this.skipEmptyDir)
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
