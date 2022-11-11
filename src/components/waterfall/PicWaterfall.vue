<template>
  <q-page class="full-height-width">
    <!--    <tool-group class="tool-group"/>-->
    <pic-viewer
      :images="water_fall.img_urls"
      :img-index="viewer.imgIndex"
      :visible.sync="viewer.visible"
      @loadMore="loadMore"/>
    <vue-waterfall-easy
      v-if="water_fall.show"
      ref="waterfall"
      :imgs-arr="water_fall.img_urls"
      :loadingDotCount="loadingDotCount"
      :loadingTimeOut="loadingTimeOut"
      :maxCols="waterfall_col"
      :reachBottomDistance="reach_bottom_distance"
      style="text-align: center"
      @click="card_click_event"
      @imgError="imgErrorEvent"
      @scrollReachBottom="loadMore">
      <span v-if="show_img_title"
            slot-scope="props"
            class="some-info">
        {{ props.value.info }}
      </span>
      <div slot="waterfall-over">
        {{ $t('waterfallOver') }}
      </div>
    </vue-waterfall-easy>
    <tool-group/>
    <q-dialog ref="dialog" @hide="onDialogHide">
      <pic-store-settings class="btn-group-setting"/>
    </q-dialog>
  </q-page>
</template>

<script>/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2021/05/24 17:26
 */
'use strict'
import PicViewer from 'components/commons/PicViewer'
import PicVPlayer from 'components/commons/PicVPlayer.vue'
import ToolGroup from 'components/pic_tools/ToolGroup.vue'
import {getDocumentHeight} from 'src/utils/utils.js'

import vueWaterfallEasy from 'vue-waterfall-easy'
import {mapState} from 'vuex'
import PicStoreSettings from 'components/commons/PicStoreSettings'

let self = null,
  viewer = null,
  water_fall = null
export default {
  name: 'PicWaterfall',
  components: {PicStoreSettings, ToolGroup, vueWaterfallEasy, PicViewer},
  props: {
    api_url: {
      type: String,
      required: true,
    },
    storeName: {
      type: String,
      required: true,
    },
    waterfall_type: {
      type: String,
      required: false,
      default: 'image',
      validate: v => 'video,image'.split(',').indexOf(v) >= 0,
    },
  },
  data() {
    return {
      viewer: {
        imgIndex: 0,
        visible: false,
      },
      water_fall: {
        // 使用 v-if 来通过重新创建和销毁组件的方式来实现类似于界面刷新的效果
        show: true,
        no_more: false,
        page: 0,
        img_urls: [],
      },
    }
  },
  computed: {
    ...mapState({
      node_key: state => state[self.storeName].node_key,
      waterfall_col: state => state[self.storeName].waterfall_col,
      show_img_title: state => state[self.storeName].show_img_title,
      skip_empty_dir: state => state[self.storeName].skip_empty_dir,
      waterfall_stride: state => state[self.storeName].waterfall_stride,
      title_max_length: state => state[self.storeName].title_max_length,
      auto_next: state => state[self.storeName].auto_next,
    }),
    loadingDotCount: () => 3,
    loadingTimeOut: () => 500,
    reach_bottom_distance() {
      const height = getDocumentHeight()
      return Math.floor(height * 0.2)
    },
  },
  watch: {
    node_key(n) {
      this.$log.debug(`nodeKey updated: ${n}`)
      this.resetConfig()
      this.loadMore()
      // this.rebuildWaterfall()
    },
  },
  methods: {
    show() {
      this.$log.debug('show')
      this.$log.debug(this.$refs)
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$log.debug('hide')
      this.$refs.dialog.hide()
    },

    onDialogHide() {
      this.$log.debug('hide')
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },
    imgErrorEvent: function (i) {
      return this.$q.notify({
        type: 'warning',
        message: this.$t('img_load_error') + '',
        caption: `${i.src}`,
      })
    },
    card_click_event(_, v) {
      switch (this.waterfall_type) {
        case 'video':
          return this.showVideoDialog(v)
        case 'image':
        default:
          return this.showImageViewer(v)
      }
    },
    showImageViewer(v) {
      this.$log.debug('showImageViewer')
      this.viewer.visible = true
      this.viewer.imgIndex = parseInt(v.index) || 0
    },
    showVideoDialog(v) {
      this.$log.debug('showVideoDialog', v)
      const media = v.value
      return this.$q.dialog({
        component: PicVPlayer, parent: this,
        ...media,
        // title: media.info, video: media.video,
        // poster: media.src,
      })
    },
    resetConfig() {
      // this.$log.debug(viewer)
      // this.$log.debug(water_fall)
      for (const k in viewer) {
        this.viewer[k] = viewer[k]
      }
      for (const k in water_fall) {
        this.water_fall[k] = water_fall[k]
      }
      this.water_fall.no_more = false
    },
    loadMore() {
      if (this.water_fall.no_more) {
        this.$q.notify({type: 'warn', message: this.$t('no_more_pic') + ''})
        if (this.auto_next) {
          this.$q.notify({type: 'positive', message: `auto_next success!!!`})
          this.$bus.$emit('btn_click_nextNode')
        }
        return
      }
      const data = {
        nodeKey: this.node_key,
        page: this.water_fall.page,
        page_size: this.waterfall_stride,
      }
      return this.$axios.post(this.api_url, data)
        .then(_ => {
          this.$log.debug(_)
          // 意味着已经没有更多的数据了
          if (_.length < data.page_size) {
            this.water_fall.no_more = true
            this.$refs.waterfall.waterfallOver && this.$refs.waterfall.waterfallOver()
          }
          return _
        })
        .then(_ => _.map(i => {
          let src = i.video ? i.video : i.src
          src = src.includes('%') ? decodeURI(src) : src
          let info = src.split('/').pop().split('.')
          info.pop()
          info = info.join('.').slice(0, this.title_max_length)
          i['info'] = info
          return i
        }))
        .then(_ => {
          this.$log.debug(_)
          this.water_fall.img_urls = this.water_fall.img_urls.concat(_)
        })
        .then(() => this.water_fall.page++)
        .catch(e => {
          this.$q.notify({type: 'warn', message: e.message})
          return this.$refs.waterfall.waterfallOver()
        })
    },
    btn_click_goto_top() {
      this.$refs.waterfall.$refs.scrollEl.scrollTop = 0
    },
    btn_click_loadMore() {
      return this.loadMore()
    },
  },
  beforeCreate() {
    // simple copy for access `props`
    self = this
  },
  created() {
    // deep copy
    // store default values for reset
    // this.$log.debug(this.viewer)
    viewer = JSON.parse(JSON.stringify(this.viewer))
    water_fall = JSON.parse(JSON.stringify(this.water_fall))
    this.$bus.$on('btn_click_goto_top', this.btn_click_goto_top)
    this.$bus.$on('btn_click_loadMore', this.btn_click_loadMore)
    this.$bus.$on('btn_click_setting', this.show)
  },
  mounted() {
    if (this.storeName === 'video') {
      this.$store.dispatch(`${this.storeName}/show_img_title`, true)
    }
    this.loadMore()
  },
  destroyed() {
    this.$log.debug('waterfall destroy')
    this.$bus.$off('btn_click_goto_top', this.btn_click_goto_top)
    this.$bus.$off('btn_click_loadMore', this.btn_click_loadMore)
    this.$bus.$off('btn_click_setting', this.show)
  },
}
</script>


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

.btn-group-setting {
  margin: 0 0 0 0;
  width: 60%;
  min-width: 350px;
}
</style>

