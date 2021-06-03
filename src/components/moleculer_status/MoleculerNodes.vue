<template>
  <div>
    <pic-table :data="nodes" :loading="firstLoad && loading"
               :title="$t('node_status')"/>
  </div>
</template>

<script>
/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2021/06/03 10:10
 */
'use strict'

import PicTable from 'components/commons/PicTable.vue'

let timer

export default {
  name: 'MoleculerNodes',
  components: {PicTable},
  data() {
    return {
      firstLoad: true,
      loading: false,
      nodes: [],
    }
  },
  methods: {
    getNodes() {
      this.loading = true
      return this.$axios.get('/dev/~node/list')
        .then(_ => _.map(n => {
          return {
            node_id: n.id,
            type: n.client.type,
            version: n.client.version,
            ip: n.ipList[0],
            hostname: n.hostname,
            status: n.available,
            cpu: n.cpu
          }
        }))
        .then(_ => this.nodes = _)
        .then(() => {
          this.firstLoad = false
          this.loading = false
        })
        .catch(e => this.$q.notify({type: 'error', message: e.message}))
    },
    getCols() {
      const tableData = this.nodes
      if (tableData.length < 1) return []
      const data = tableData[0]
      const cols = []
      for (const k in data) {
        cols.push({
          name: k, align: 'left', field: k,
          sortable: true,
          format: val => `${val}`,
          label: this.$t(k).toUpperCase(),
        })
      }
      return cols
    },
  },
  mounted() {
    this.getNodes()
      // 定时刷新不仅会一直请求，传入的 props 值也是同一个不会变更
      // 而且组件也并不会完全销毁，会有重复请求的问题
      .then(() => timer = setInterval(this.getNodes, 1000))
  },
  beforeDestroy() {
    this.$log.debug('Clear Timer')
    clearInterval(timer)
  },
}
</script>

<style scoped>

</style>
