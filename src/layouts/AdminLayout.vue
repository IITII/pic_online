<template>
  <q-layout class="full-height-width" view="lhh lpR lff">
    <div>
      <q-header :class="toolbar_style" elevated show-if-above>
        <q-toolbar>
          <q-avatar icon="perm_media" @click="leftDrawer"/>
          <q-toolbar-title>
            {{ toolbar_title() }}
          </q-toolbar-title>
          <pic-language-picker/>
          <pic-reload-files/>
          <pic-menu :menu-links="links"/>
        </q-toolbar>
      </q-header>
    </div>

    <q-page-container class="full-height-width">
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>
/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2021/05/23 16:43
 */
'use strict'

import PicMenu from 'components/commons/PicMenu.vue'
import {mapState} from 'vuex'
import {bgClassBaseOnRole} from 'src/utils/utils.js'
import PicLanguagePicker from 'components/commons/PicLanguagePicker.vue'
import PicReloadFiles from 'components/commons/PicReloadFiles.vue'

export default {
  name: 'AdminLayout',
  components: {PicReloadFiles, PicLanguagePicker, PicMenu},
  computed: {
    ...mapState({
      image: state => state.image.title,
      video: state => state.video.title,
      user_type: state => state.user.user_type,
    }),
    toolbar_style() {
      return bgClassBaseOnRole(this.user_type)
    },
    links() {
      return [
        {
          title: this.$t('image'),
          icon: 'image',
          link: '/admin/image'
        },
        {
          title: this.$t('video'),
          icon: 'movie',
          link: '/admin/video'
        },
        {
          title: this.$t('status'),
          icon: 'dns',
          link: '/admin/status'
        },
        {
          title: this.$t('setting'),
          icon: 'settings',
          link: '/admin/setting'
        },
      ]
    }
  },
  methods: {
    /**
     * 使用 computed，无法实现数据更新
     * 可能是因为递归调用导致数据绑定失败
     */
    toolbar_title() {
      const updateTitle = ['image', 'video']
      for (let title of updateTitle) {
        if (this.$router.currentRoute.path.endsWith(title)) {
          return this[title] + '' || 'Pic Online'
        }
      }
      return 'Pic Online'
    },
    leftDrawer: function () {
      this.$log.debug('leftDrawer')
      this.$bus.$emit('btn_click_leftDrawer')
    },
  },
}
</script>

<style scoped>

</style>
