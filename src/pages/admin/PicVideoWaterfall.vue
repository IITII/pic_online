<template>
  <div class="full-height-width">
    <pic-drawer :api_url="api.drawer" :store-name="storeName" :lazy_url="api.lazy"/>
    <pic-waterfall :api_url="api.waterfall" :del_url="api.del"
                   :store-name="storeName" :waterfall_type="waterfall_type"/>
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
  name: 'PicVideoWaterfall',
  components: {PicDrawer, PicWaterfall},
  data() {
    return {
      api: {
        drawer: '/api/file/video_tree',
        lazy: '/api/file/pic_lazy',
        del: '/api/file/video_del',
        waterfall: '/api/file/video_map'
      },
      storeName: 'video',
      waterfall_type: 'video',
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
