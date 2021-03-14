<template>
  <div v-if="show">
    <tool-button
      v-for="singleBtn in toolButtonGroup"
      :key="singleBtn.btnColor"
      :btn-icon="singleBtn.btnIcon"
      :btn-color="singleBtn.btnColor"
      :btn-on-click="singleBtn.btnOnClick"
      :tooltip-message="singleBtn.tooltipMessage"
    ></tool-button>
  </div>
</template>

<script>
import ToolButton from 'components/ToolButton'

export default {
  name: 'ToolGroup',
  components: { ToolButton },
  data () {
    return {
      show: true,
      // Color See: https://quasar.dev/style/color-palette
      // Icons See: https://material.io/resources/icons/?style=baseline
      toolButtonGroup: [
        {
          btnOnClick: this.top,
          btnIcon: 'navigation',
          btnColor: 'primary',
          tooltipMessage: ''
        },
        {
          btnOnClick: this.nextNode,
          btnIcon: 'redo',
          btnColor: 'cyan-5',
          tooltipMessage: ''
        },
        {
          btnOnClick: this.loadMore,
          btnIcon: 'replay_10',
          btnColor: 'warning',
          tooltipMessage: ''
        },
        {
          btnOnClick: this.leftDrawer,
          btnIcon: 'open_in_new',
          btnColor: 'pink-3',
          tooltipMessage: ''
        },
        {
          btnOnClick: this.setting,
          btnIcon: 'settings',
          btnColor: 'secondary',
          tooltipMessage: ''
        }
      ]
    }
  },
  computed: {
    refresh: function () {
      return this.$store.getters['uiControl/language']
    }
  },
  watch: {
    refresh: function () {
      this.updateLanguageCache()
    }
  },
  beforeMount () {
    this.updateLanguageCache()
  },
  methods: {
    updateLanguageCache: function () {
      // 直接写里面会因为数据有缓存，而导致不会即时更改
      // 但目前，有没有想到啥其他方法，所以选择这种垃圾写法
      const msgArr = [
        this.$t('top'),
        this.$t('next_one'),
        this.$t('loadManual'),
        this.$t('open_drawer'),
        this.$t('setting')
      ]
      this.toolButtonGroup.forEach((btn, index) => {
        btn.tooltipMessage = msgArr[index]
      })
    },
    top: function () {
      this.$log.debug('goto top')
      this.$bus.$emit('btn_click_goto_top')
    },
    nextNode: function () {
      this.$log.debug('nextNode')
      this.$bus.$emit('btn_click_nextNode')
    },
    loadMore: function () {
      this.$log.debug('loadMore')
      this.$bus.$emit('btn_click_loadMore')
    },
    leftDrawer: function () {
      this.$store.dispatch('uiControl/reverseLeftDrawerOpen')
    },
    setting: function () {
      this.$log.debug('setting')
      this.$bus.$emit('btn_click_setting')
      // revert
      // this.$store.dispatch(
      //   'uiControl/setShowSettingDialog',
      //   !this.$store.getters['uiControl/showSettingDialog']
      // )
    }
  }
}
</script>

<style scoped>

</style>
