<template>
  <div v-if="show" class="tool-group" ref="tools">
    <tool-button
      v-for="singleBtn in toolButtonGroup"
      :key="singleBtn.btnColor"
      v-bind="singleBtn"/>
  </div>
</template>

<script>
import ToolButton from 'components/pic_tools/ToolButton'
import {mapState} from 'vuex'

const scrollDistance = window.innerHeight
// const scrollDistance = window.innerHeight * 3 / 4
const keymap = {
  scrollUp: ['w','ArrowUp'],
  scrollDown: ['s', 'ArrowDown'],
  btn_click_preNode: ['a','ArrowLeft'],
  // leftDrawer: ['a','ArrowLeft'],
  loadMore: ['d','ArrowRight'],
  top: ['q'],
  nextNode: ['e'],
  reloadPage: ['r'],
}

export default {
  name: 'ToolGroup',
  components: {ToolButton},
  props: {
    enableShortcut: {
      type: Boolean,
      required: false,
      default: false,
    },
    shortcutElement: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      show: true,
    }
  },
  computed: {
    ...mapState({
      tool_group_force_right: state => state.common.tool_group_force_right,
      image_shortcut: state => state.common.image_shortcut,
    }),
    shortcutEle() {
      // 尝试使用 refs 绑定, 但是失败了
      return this.shortcutElement || document
    },

    // Color See: https://quasar.dev/style/color-palette
    // Icons See: https://material.io/resources/icons/?style=baseline
    toolButtonGroup() {
      return [
        {
          btnOnClick: this.top,
          btnIcon: 'navigation',
          btnColor: 'primary',
          tooltipMessage: this.$t('top'),
        },
        {
          btnOnClick: this.nextNode,
          btnIcon: 'redo',
          btnColor: 'cyan-5',
          tooltipMessage: this.$t('next_one'),
        },
        {
          btnOnClick: this.loadMore,
          btnIcon: 'replay_10',
          btnColor: 'warning',
          tooltipMessage: this.$t('loadManual'),
        },
        {
          btnOnClick: this.leftDrawer,
          btnIcon: 'open_in_new',
          btnColor: 'pink-3',
          tooltipMessage: this.$t('open_drawer'),
        },
        {
          btnOnClick: this.setting,
          btnIcon: 'settings',
          btnColor: 'secondary',
          tooltipMessage: this.$t('setting'),
        },
      ]
    },
  },
  methods: {
    top: function () {
      this.$log.debug('go top')
      this.$bus.emit('btn_click_goto_top')
    },
    nextNode: function () {
      this.$log.debug('nextNode')
      this.$bus.emit('btn_click_nextNode')
    },
    reloadPage: function () {
      this.$log.debug('reloadPage')
      location.reload()
    },
    btn_click_preNode() {
      this.$log.debug('preNode')
      this.$bus.emit('btn_click_preNode')
    },
    loadMore: function () {
      this.$log.debug('loadMore')
      this.$bus.emit('btn_click_loadMore')
    },
    leftDrawer: function () {
      this.$log.debug('leftDrawer')
      this.$bus.emit('btn_click_leftDrawer')
    },
    setting: function () {
      this.$log.debug('setting')
      this.$bus.emit('btn_click_setting')
    },
    scrollUp(event) {
      event.preventDefault()
      window.scrollBy({ top: -scrollDistance, behavior: 'smooth' })
    },
    scrollDown(event) {
      event.preventDefault()
      window.scrollBy({ top: scrollDistance, behavior: 'smooth' })
    },
    shortcut: function(event) {
      if (!this.image_shortcut) {
        return
      }
      // this.$log.debug('enableShortcut', this.shortcutEle)
      const keyName = event.key
      this.$log.debug(`keyName: ${keyName}`)
      const viewer = document.getElementsByClassName('viewer-open')
      if (viewer.length > 0) {
        this.$log.debug('viewer-open, ignore shortcut')
        return
      }
      for (const k in keymap) {
        if (keymap[k].indexOf(keyName) >= 0) {
          this.$log.debug(`find ${keyName} in keymap[${k}] -> ${keymap[k]}, call...`)
          this[k](event)
          break
        }
      }
    }
  },
  mounted() {
    // this.$log.debug(this.$q.platform.is.mobile)
    // this.$log.debug(this.$refs.tools, this.$refs.tools.style)
    const style = {
      web: {
        right: '1.5rem',
        bottom: '20px',
      }, mobile: {
        left: '1.5rem',
        bottom: '60px',
      },
    }
    const isMobile = this.$q.platform.is.mobile && !this.tool_group_force_right ? 'mobile' : 'web'
    for (const s in style[isMobile]) {
      this.$refs.tools.style[s] = style[isMobile][s]
    }
    if (this.enableShortcut) {
      this.shortcutEle.addEventListener('keyup', this.shortcut)
    }
  },
  unmounted() {
    if (this.enableShortcut) {
      this.shortcutEle.removeEventListener('keyup', this.shortcut)
    }
  },
}
</script>

<style lang="sass" scoped>
.tool-group
  position: fixed
  z-index: 2001

.tool-group div
  margin: 3px
</style>
