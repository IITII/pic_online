<template>
  <div>
    <pic-background/>
    <pic-store-settings/>
  </div>
</template>

<script>
/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2022/06/04
 */
'use strict'

import PicBackground from 'components/commons/PicBackground'
import PicStoreSettings from 'components/commons/PicStoreSettings'

export default {
  name: "StoreSetting",
  components: {PicStoreSettings, PicBackground},
}
</script>

<style scoped>
</style>
