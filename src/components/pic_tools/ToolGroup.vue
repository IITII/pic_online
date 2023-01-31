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

export default {
  name: 'ToolGroup',
  components: {ToolButton},
  data() {
    return {
      show: true,
    }
  },
  computed: {
    ...mapState({
      tool_group_force_right: state => state.common.tool_group_force_right,
    }),

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
