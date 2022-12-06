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
      this.loading = true
      return this.$axios.post('/api/file/reload', {})
        .then(() => {
          this.$q.notify({type: 'info', message: this.$t('success')})
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
