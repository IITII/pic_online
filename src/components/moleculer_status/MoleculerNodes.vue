<template>
  <div>
    <q-table :columns="getCols" :data="nodes"
             :filter="filter" :loading="firstLoad && loading"
             :no-data-label="$t('no_data_label')"
             :no-results-label="$t('no_result_label')"
             :title="$t('node_status')"
             row-key="node_id">
      <template v-slot:top="props">
        <div class="col-2 q-table__title">{{ $t('node_status') }}</div>
        <q-space/>
        <q-input v-model="filter" :placeholder="$t('search')" borderless debounce="300" dense>
          <q-icon slot="append" name="search"/>
        </q-input>
        <q-btn class="q-ml-md" flat icon="archive" no-caps
               round @click="exportTable"/>
        <q-btn :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" dense flat
               round
               @click="props.toggleFullscreen"/>
      </template>
      <template v-slot:body-cell="props">
        <q-td :props="props">
          <q-badge :label="props.value" color="primary"/>
        </q-td>
      </template>

      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center text-accent q-gutter-sm">
          <q-icon name="sentiment_dissatisfied" size="2em"/>
          <span>{{ message }}</span>
          <q-icon :name="filter ? 'filter_b_and_w' : icon" size="2em"/>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script>
/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2021/06/03 10:10
 */
'use strict'
import {exportFile} from 'quasar'

function wrapCsvValue(val, formatFn) {
  let formatted = formatFn !== void 0
    ? formatFn(val)
    : val

  formatted = formatted === void 0 || formatted === null
    ? ''
    : String(formatted)

  formatted = formatted.split('"').join('""')
  /**
   * Excel accepts \n and \r in strings, but some other CSV parsers do not
   * Uncomment the next two lines to escape new lines
   */
  // .split('\n').join('\\n')
  // .split('\r').join('\\r')

  return `"${formatted}"`
}


export default {
  name: 'MoleculerNodes',
  components: {},
  data() {
    return {
      firstLoad: true,
      loading: false,
      timer: null,
      filter: '',
      nodes: [],
    }
  },
  computed: {
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
    exportTable() {
      // naive encoding to csv format
      const content = [this.cols.map(col => wrapCsvValue(col.label))].concat(
        this.data.map(row => this.cols.map(col => wrapCsvValue(
          typeof col.field === 'function'
            ? col.field(row)
            : row[col.field === void 0 ? col.name : col.field],
          col.format
        )).join(','))
      ).join('\r\n')

      const status = exportFile(
        'table-export.csv',
        content,
        'text/csv'
      )

      if (status !== true) {
        this.$q.notify({
          message: 'Browser denied file download...',
          color: 'negative',
          icon: 'warning'
        })
      }
    }
  },
  mounted() {
    this.getNodes()
      // 定时刷新不仅会一直请求，传入的 props 值也是同一个不会变更
      // 而且组件也并不会完全销毁，会有重复请求的问题
      .then(() => this.timer = setInterval(this.getNodes, 3000))
      // See: https://cn.vuejs.org/v2/guide/components-edge-cases.html#%E7%A8%8B%E5%BA%8F%E5%8C%96%E7%9A%84%E4%BA%8B%E4%BB%B6%E4%BE%A6%E5%90%AC%E5%99%A8
      .then(() => this.$once('hook:beforeDestroy', _ => clearInterval(this.timer)))
  },
}
</script>

<style scoped>

</style>
