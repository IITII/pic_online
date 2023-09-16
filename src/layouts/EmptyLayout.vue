<template class="full-height-width">
  <router-view/>
</template>

<script>
/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2021/05/23 16:42
 */
'use strict'

import {mapState} from 'vuex'

export default {
  name: 'EmptyLayout',
  computed: {
    ...mapState({
      title: state => state.common.title,
    }),
  },
  mounted() {
    document.title = this.title
  },
}
</script>

<style scoped>

</style>
