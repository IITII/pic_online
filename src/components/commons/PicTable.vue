<template>
  <div class="">
    <q-table :columns="cols" :data="data" :filter="filter"
             :loading="loading" :no-data-label="no_data_label"
             :no-results-label="no_result_label"
             :row-key="null"
             :title="title">
      <template v-slot:top="props">
        <div class="col-2 q-table__title">{{ title }}</div>
        <q-space/>
        <q-input v-model="filter" :placeholder="$t('search')" borderless debounce="300" dense>
          <q-icon slot="append" name="search"/>
        </q-input>
        <q-btn class="q-ml-md" flat icon="archive" no-caps
               round @click="exportTable"/>
        <q-btn :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'" dense flat
               round
               @click="props.toggleFullscreen"/>
        <q-btn v-if="custom_function"
               dense
               flat icon="dashboard_customize" no-caps round
               @click="custom_function"/>
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
 * @date 2021/05/11 10:56
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
  name: 'PicTable',
  props: {
    title: {
      type: String,
      required: true
    },
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: false,
      default: null,
    },
    loading: {
      type: Boolean,
      required: false,
      default: false,
    },
    custom_function: {
      type: Function,
      required: false,
      default: null,
    },
    no_data_label: {
      type: String,
      required: false,
      default() {
        return this.$t('no_data_label')
      }
    },
    no_result_label: {
      type: String,
      required: false,
      default() {
        return this.$t('no_result_label')
      }
    },
    row_key: {
      type: String,
      required: false,
      default: null,
    }
  },
  computed: {
    cols() {
      return this.columns ? this.columns : this.getCols()
    }
  },
  data() {
    return {
      filter: '',
    }
  },
  methods: {
    getCols() {
      const tableData = this.data
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
}
</script>

<style scoped>

</style>
