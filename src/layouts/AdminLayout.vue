<template>
  <q-layout class="full-height-width" view="lhh lpR lff">
    <div>
      <q-header :class="toolbar_style" elevated show-if-above>
        <q-toolbar>
          <q-avatar icon="perm_media"/>
          <q-toolbar-title>
            {{ toolbar_title }}
          </q-toolbar-title>
          <pic-language-picker/>
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

export default {
  name: 'AdminLayout',
  components: {PicLanguagePicker, PicMenu},
  computed: {
    ...mapState({
      selectedNodeTitle: state => state.uiControl.selectedNodeTitle,
      user_type: state => state.user.user_type,
    }),
    toolbar_title() {
      return this.$router.currentRoute.name === 'pic_waterfall'
        ? this.selectedNodeTitle
        : 'Pic Online'
    },
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
      ]
    }
  }
}
</script>

<style scoped>

</style>
