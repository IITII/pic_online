<template>
  <div>
    <q-btn flat round :icon="loadingIcon" :loading="loading" @click="reload">
      <template v-slot:loading>
        <q-spinner-hourglass/>
      </template>
      <q-tooltip>{{ $t('reload_files') }}</q-tooltip>
    </q-btn>
  </div>
</template>

<script>
/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2022/12/06
 */
'use strict'

export default {
  name: 'PicReloadFiles',
  data() {
    return {
      loadingIcon: 'autorenew',
      loading: false,
    }
  },
  methods: {
    reload() {
      const start = Date.now()
      this.loading = true
      return this.$axios.post('/api/file/reload', {})
        .then(sum => {
          const end = ((Date.now() - start) / 1000).toFixed(2)
          this.$log.debug('/api/file/reload', sum)
          this.$q.notify({
            type: 'info',
            message: this.$t('success'),
            caption: `图片总数: ${sum?.imgCount}, 视频总数: ${sum?.videoCount}, cost: ${end}s`,
          })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style scoped>

</style>
