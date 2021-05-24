<template>
  <div>
    <q-header :class="toolbar_style" elevated show-if-above>
      <q-toolbar>
        <q-avatar icon="perm_media"/>

        <q-toolbar-title>
          {{ toolbar_title }}
        </q-toolbar-title>

        <pic-language-picker/>

        <pic-menu/>
      </q-toolbar>
    </q-header>
  </div>
</template>

<script>
import PicLanguagePicker from 'components/commons/PicLanguagePicker'
import {mapState} from 'vuex'
import {bgClassBaseOnRole} from 'src/utils/utils.js'

export default {
  name: 'PicHeader',
  components: {PicLanguagePicker},
  props: {},
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
  }
}
</script>

<style scoped>

</style>
