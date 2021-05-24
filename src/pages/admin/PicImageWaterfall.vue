<template>
  <div>
    <pic-waterfall-drawer></pic-waterfall-drawer>
    <pic-waterfall></pic-waterfall>
  </div>
</template>

<script>
/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2021/05/24 17:50
 */
'use strict'

import PicWaterfall from 'components/waterfall/PicWaterfall.vue'
import PicWaterfallDrawer from 'components/waterfall/PicWaterfallDrawer.vue'

export default {
  name: 'PicImageWaterfall',
  components: {PicWaterfallDrawer, PicWaterfall}
}
</script>

<style scoped>

</style>
