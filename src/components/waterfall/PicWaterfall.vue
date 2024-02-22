<template>
  <q-page class="full-height-width">

    <vue-waterfall ref="waterfall"
                   :gutter="8" :lazyload="true" :delay="400"
                   :list="water_fall.img_urls" :loadProps="loadProps"
                   :breakpoints="breakpoints" :crossOrigin="false"
                   :backgroundColor="backgroundColor">
      <template #item="{ item, url }">
        <div class="text-center" @click="card_click_event('imgBoxClickEvent', item)">
          <lazy-img class="img_box" :url="url" @error="imgErrorEvent"/>
          <span v-if="show_img_title">{{ item.info }}</span>
        </div>
      </template>
    </vue-waterfall>
    <span v-if="water_fall.no_more" class="waterfall-nomore">
      {{ $t('waterfallOver') }}
    </span>

    <tool-group :enable-shortcut="waterfall_type === 'image'"/>
    <q-dialog ref="dialog" @hide="onDialogHide">
      <pic-store-settings class="btn-group-setting"/>
    </q-dialog>
  </q-page>
</template>

<script>
/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2021/05/24 17:26
 */
'use strict'

import {mapState} from 'vuex'
import {getDocumentHeight} from 'src/utils/utils.js'

import PicVPlayer from 'components/commons/PicVPlayer.vue'
import ToolGroup from 'components/pic_tools/ToolGroup.vue'
import PicStoreSettings from 'components/commons/PicStoreSettings'
// import VueWaterfall from 'components/waterfall/VueWaterfall.vue'
// import VueWaterfall from 'vue3-waterfall'
// import 'vue3-waterfall/dist/style.css'
import {LazyImg, Waterfall as VueWaterfall} from 'vue-waterfall-plugin-next'
import 'vue-waterfall-plugin-next/dist/style.css'
import 'viewerjs/dist/viewer.css'
import loading from 'assets/Spinner-1s-200px.svg'
import loadError from 'assets/failed-1.1s-200px.svg'

let self = null,
  water_fall = null
export default {
  name: 'PicWaterfall',
  components: {ToolGroup, PicStoreSettings, VueWaterfall, LazyImg},
  props: {
    api_url: {
      type: String,
      required: true,
    },
    del_url: {
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
      water_fall: {
        // 使用 v-if 来通过重新创建和销毁组件的方式来实现类似于界面刷新的效果
        show: true,
        no_more: false,
        page: 0,
        img_urls: [],
      },
      breakpoints: {
        1500: {rowPerView: 6},
        1250: {rowPerView: 5},
        1000: {rowPerView: 4,},
        750: {rowPerView: 3,},
        //当屏幕宽度小于等于500
        500: {rowPerView: 2,},
        300: {rowPerView: 1,},
      }
    }
  },
  computed: {
    ...mapState({
      reload_timeout: state => state.common.reload_timeout,
      node_title: state => state[self.storeName].title,
      node_key: state => state[self.storeName].node_key,
      node_dir: state => state[self.storeName].node_dir,
      waterfall_col: state => state[self.storeName].waterfall_col,
      show_img_title: state => state[self.storeName].show_img_title,
      skip_empty_dir: state => state[self.storeName].skip_empty_dir,
      waterfall_stride: state => state[self.storeName].waterfall_stride,
      title_max_length: state => state[self.storeName].title_max_length,
      auto_next: state => state[self.storeName].auto_next,
    }),
    reach_bottom_distance() {
      const height = getDocumentHeight()
      return Math.floor(height * 0.2)
    },
    backgroundColor() {
      this.$log.debug(`dark mode: `, this.$q.dark.isActive)
      // return this.$q.dark.isActive ? '#303133' : '#ffffff'
      return this.$q.dark.isActive ? '#121212' : '#ffffff'
    },
    loadProps() {
      return {loading, error: loadError}
    }
  },
  watch: {
    node_key(n) {
      this.$log.debug(`nodeKey updated: ${n}`)
      this.resetConfig()
      this.loadMore()
      // gotop for lazy load imgs
      this.btn_click_goto_top()
      // this.rebuildWaterfall()
    },
  },
  methods: {
    footerHeight() {
      return this.show_img_title ? 18 : 0
    },
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
    // TODO: 图片加载失败提示
    imgErrorEvent: function (i) {
      let {origin} = window.location
      if (i.startsWith(origin)) {
        i = i.slice(origin.length)
      }
      return this.$q.notify({
        type: 'warning',
        message: this.$t('img_load_error') + '',
        caption: `${i}`,
      })
    },
    card_click_event(_, v) {
      this.$log.debug('card_click_event', _, v)
      switch (this.waterfall_type) {
        case 'video':
          return this.showVideoDialog(v)
        case 'image':
        default:
          return this.showImageViewer(v)
      }
    },
    showImageViewer(v) {
      let imgIndex = parseInt(v.index)
        || Math.max(0, this.water_fall.img_urls.indexOf(v))
      this.$log.debug('showImageViewer', imgIndex)
      this.$viewerApi(this.viewerOpts(imgIndex))
    },
    showVideoDialog(v) {
      this.$log.debug('showVideoDialog', v)
      return this.$q.dialog({
        component: PicVPlayer, parent: this,
        componentProps: {...v},
        // title: media.info, video: media.video,
        // poster: media.src,
      })
    },
    resetConfig() {
      // this.$log.debug(water_fall)
      for (const k in water_fall) {
        this.water_fall[k] = water_fall[k]
      }
      this.water_fall.no_more = false
    },
    autoNext() {
      if (this.auto_next) {
        this.$q.notify({type: 'positive', message: `auto_next success!!!`})
        this.$bus.emit('btn_click_nextNode')
      }
    },
    loadMore() {
      if (this.water_fall.no_more) {
        this.$q.notify({type: 'warn', message: this.$t('no_more_pic') + ''})
        this.autoNext()
        return
      }
      const data = {
        nodeKey: this.node_key,
        page: this.water_fall.page,
        page_size: this.waterfall_stride,
      }
      return this.$axios.post(this.api_url, data)
        .then(_ => {
          this.$log.debug('req res:', _)
          // 意味着已经没有更多的数据了
          if (_.length < data.page_size) {
            this.water_fall.no_more = true
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
        .then(_ => _.map(i => ({...i, imgSrc: i.src})))
        .then(_ => {
          this.$log.debug('set waterfall urls', _)
          this.water_fall.img_urls = this.water_fall.img_urls.concat(_)
          // 加载后仍然为 0，说明没有数据
          if (this.water_fall.img_urls.length === 0) {
            this.autoNext()
          }
        })
        .then(() => this.water_fall.page++)
        .catch(e => {
          this.$q.notify({type: 'warn', message: e.response?.data?.message || e.message})
          // this.$refs.waterfall.waterfallOver && this.$refs.waterfall.waterfallOver()
          // this.water_fall.no_more = true
        })
    },
    tryDelDirs(nodeKey, dir) {
      if (!nodeKey || !dir) return
      const data = {
        nodeKey,
        dir,
        recursive: false,
      }
      return this.$axios.post(this.del_url, data)
        .then(_ => {
          this.$log.debug('req res:', _)
          return _
        })
        .then(_ => {
          this.$q.notify({
            type: 'positive', message: this.$t('success'),
            caption: `共删除 ${_.dirs} 个目录，${_.files} 个文件`
          })
          return _
        })
        .then(_ => {
          this.$log.info(`delete success, reload page after ${this.reload_timeout}ms, -1 for disable`)
          if (this.reload_timeout < 0) return
          setTimeout(_ => {
            window.location.reload()
          }, this.reload_timeout)
        })
        .catch(e => {
          this.$q.notify({
            type: 'warn', message: this.$t('failed'),
            caption: e.response?.data?.message || e.message
          })
          return e
        })
    },
    async btnClickDelDirs() {
      if (window.confirm(`确定要删除 ${this.node_title} 吗？`)) {
        await this.tryDelDirs(this.node_key, this.node_dir)
      } else {
        this.$log.debug('cancel delete')
      }
    },
    btn_click_goto_top() {
      this.$log.debug('waterfall', this.$refs.waterfall.$el)
      // debugger
      document.querySelector('html').scrollTop = 0
    },
    btn_click_loadMore() {
      this.$store.dispatch(`${this.storeName}/auto_next`, true)
      return this.loadMore()
    },
    viewerOpts(initialViewIndex = 0) {
      let options = {
        toolbar: true,
        // Enable keyboard support.
        keyboard: true,
        // Focus the active item in the navbar when initialized.
        /// Requires the keyboard option set to true.
        focus: true,
        // The amount of time to delay between
        // automatically cycling an image when playing.
        interval: 2000,
        // Define where to get the original image URL for viewing.
        /// If it is a function, it should return a valid image URL.
        /// If string, it should be one of the attributes of each image element.
        url: 'src',
        // Indicate if enable loop viewing or not.
        /// If the current image is the last one,
        /// then the next one to view is the first one, and vice versa.
        loop: false,
      }
      let opts = {
        images: this.water_fall.img_urls,
        options: {
          ...options,
          initialViewIndex,
        }
      }
      return opts
    },
  },
  beforeCreate() {
    // simple copy for access `props`
    self = this
    this.$log.debug(this.$store.getters)
  },
  created() {
    // deep copy
    // store default values for reset
    water_fall = JSON.parse(JSON.stringify(this.water_fall))
    this.$bus.on('btn_click_goto_top', this.btn_click_goto_top)
    this.$bus.on('btn_click_loadMore', this.btn_click_loadMore)
    this.$bus.on('btn_click_setting', this.show)
    this.$bus.on('btnClickDelDirs', this.btnClickDelDirs)
  },
  mounted() {
    if (this.storeName === 'video') {
      this.$store.dispatch(`${this.storeName}/show_img_title`, true)
    }
    this.loadMore()
  },
  unmounted() {
    this.$log.debug('waterfall destroy')
    this.$bus.off('btn_click_goto_top', this.btn_click_goto_top)
    this.$bus.off('btn_click_loadMore', this.btn_click_loadMore)
    this.$bus.off('btn_click_setting', this.show)
    this.$bus.off('btnClickDelDirs', this.btnClickDelDirs)
  },
}
</script>


<style lang="scss">
.lazy__img[lazy=loading] {
  padding: 5em 0;
  width: 48px;
}

.lazy__img[lazy=loaded] {
  width: 100%;
}

.lazy__img[lazy=error] {
  padding: 5em 0;
  width: 48px;
}

.img_box {
  border-radius: 6px;
  overflow: hidden;
}

.waterfall-nomore {
  position: fixed;
  bottom: 10px;
  color: antiquewhite;
  font-size: 90%;
  left: 50%;
  transform: translateX(-50%);
}

.btn-group-setting {
  margin: 0 0 0 0;
  width: 60%;
  min-width: 350px;
}
</style>

