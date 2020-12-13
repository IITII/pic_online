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
          tooltipMessage: this.$t('top')
        },
        {
          btnOnClick: this.loadMore,
          btnIcon: 'replay_10',
          btnColor: 'warning',
          tooltipMessage: this.$t('loadManual')
        },
        {
          btnOnClick: this.leftDrawer,
          btnIcon: 'open_in_new',
          btnColor: 'pink-3',
          tooltipMessage: this.$t('open_drawer')
        },
        {
          btnOnClick: this.setting,
          btnIcon: 'settings',
          btnColor: 'secondary',
          tooltipMessage: this.$t('setting')
        }
      ]
    }
  },
  computed: {
    refresh: function () {
      return this.$store.getters['uiControl/language']
    },
    top_computed: function () {
      return this.$t('top')
    },
    loadManual_computed: function () {
      return this.$t('loadManual')
    },
    open_drawer: function () {
      return this.$t('open_drawer')
    },
    setting_computed: function () {
      return this.$t('setting')
    }
  },
  watch: {
    refresh: function () {
      // 直接写里面会因为数据有缓存，而导致不会即时更改
      // 但目前，有没有想到啥其他方法，所以选择这种垃圾写法
      this.toolButtonGroup[0].tooltipMessage = this.top_computed
      this.toolButtonGroup[1].tooltipMessage = this.loadManual_computed
      this.toolButtonGroup[2].tooltipMessage = this.open_drawer
      this.toolButtonGroup[3].tooltipMessage = this.setting_computed
    }
  },
  methods: {
    top: function () {
      this.$log.debug('goto top')
      this.$bus.$emit('btn_click_goto_top')
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
