<template>
  <div class="full-height-width">
    <pic-drawer :api_url="api.drawer" :store-name="storeName"/>
    <pic-waterfall :api_url="api.waterfall"
                   :store-name="storeName"
                   :waterfall_type="waterfall_type"/>
  </div>
</template>

<script>
/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2021/05/24 17:50
 */
'use strict'

import PicWaterfall from 'components/waterfall/PicWaterfall.vue'
import PicDrawer from 'components/waterfall/PicDrawer.vue'

export default {
  name: 'PicImageWaterfall',
  components: {PicDrawer, PicWaterfall},
  data() {
    return {
      api: {
        drawer: '/api/file/pic_tree',
        waterfall: '/api/file/pic_map'
      },
      storeName: 'image',
      waterfall_type: 'image',
    }
  },
  mounted() {
    // 作用域不用，无法访问其他组件的 refs
    // setTimeout(_ => this.$log.warn(this), 2000)
  }
}
</script>

<style scoped>

</style>
