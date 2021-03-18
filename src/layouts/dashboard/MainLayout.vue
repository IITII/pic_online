<template>
  <q-layout view="lhh lpr lfr" class="full-height-width">
    <pic-header/>
    <pic-drawer/>

    <q-page-container class="full-height-width">
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>

import PicHeader from 'components/PicHeader'
import PicDrawer from 'components/PicDrawer'

export default {
  name: 'MainLayout',
  components: {
    PicDrawer,
    PicHeader
  }
}
</script>
