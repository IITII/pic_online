<template>
  <div>
    <q-table :columns="columns" :data="service"
             :filter="filter" :no-data-label="$t('no_data_label')"
             :no-results-label="$t('no_result_label')"
             :title="$t('service_action')"
             flat>
      <template v-slot:top="props">
        <div class="col-2 q-table__title">{{ $t('service_action') }}</div>
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
      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="service_action" :props="props">
            <q-badge :label="props.row.service_action" color="accent"/>
            <q-badge v-if="props.row.version" :label="props.row.version"/>
          </q-td>
          <q-td key="rest" :props="props">
            <q-badge :label="'/' + props.row.rest" color="brown"/>
          </q-td>
          <q-td key="parameters" :props="props">
            <q-badge :label="props.row.parameters" color="blue-grey"/>
          </q-td>
          <q-td key="instances" :props="props">
            <q-badge v-for="id in props.row.instance" :key="id"
                     :label="id" color="primary"/>
          </q-td>
          <q-td key="status" :props="props">
            <q-badge v-if="props.row.status" :label="$t('online')" color="green"/>
            <q-badge v-else :label="$t('offline')" color="red"/>
          </q-td>
        </q-tr>
        <q-tr v-for="action in getServiceActions(props.row.service_action)"
              :key="action.name"
              :props="props">
          <q-td>
            {{ action.name }}
            <q-badge v-if="action.action.cache" :label="$t('cached')" color="orange"/>
          </q-td>
          <q-td v-html="getActionRest(action)"/>
          <q-td>
            {{ getActionParams(action, 40) }}
          </q-td>
          <q-td/>
          <q-td key="status">
            <q-badge v-if="action.available" :label="$t('online')" color="green"/>
            <q-badge v-else :label="$t('offline')" color="red"/>
          </q-td>
        </q-tr>
      </template>
      <!--      因为 q-tr 计数有问题，所以隐藏底部控件-->
      <template v-slot:bottom style="min-height: 0; height: 0"/>

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
 * @date 2021/06/02 23:44
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

let timer

export default {
  name: 'MoleculerServices',
  data() {
    return {
      filter: '',
      service: [],
      actions: {},
    }
  },
  computed: {
    columns() {
      const col = 'service_action,rest,parameters,instances,status'.split(',')
      return col.map(k => {
        return {
          name: k, align: 'left', field: k,
          sortable: true,
          format: val => `${val}`,
          label: this.$t(k).toUpperCase(),
        }
      })
    }
  },
  methods: {
    getActions() {
      return this.$axios.get('/dev/~node/actions')
        .then(_ => _.filter(s => !s.name.startsWith('$')))
        .then(res => {
          res.sort((a, b) => a.name.localeCompare(b.name))
          return res.reduce((a, b) => {
            a[b.name] = b
            return a
          }, {})
        })
        .then(_ => this.actions = _)
        .catch(e => this.$q.notify({type: 'error', message: e.message}))
    },
    getService() {
      this.$axios.get('/dev/~node/services')
        .then(_ => _.filter(s => !s.name.startsWith('$')))
        .then(_ => {
          _.sort((a, b) => a.name.localeCompare(b.name))
          _.forEach(s => s.nodes.sort())
          return _
        })
        .then(_ => _.map(n => {
          return {
            service_action: n.name,
            version: n.version,
            rest: n.settings.rest ? n.settings.rest : n.fullName,
            parameters: undefined,
            instance: n.nodes,
            status: n.nodes.length > 0
          }
        }))
        .then(_ => this.service = _)
        .catch(e => this.$q.notify({type: 'error', message: e.message}))
    },
    getServiceActions(name) {
      return Object.keys(this.actions)
        .filter(n => n.startsWith(name))
        .map(name => this.actions[name])
    },
    getActionRest(action) {
      if (action.action.rest) {
        if (typeof action.action.rest == 'string') {
          const p = action.action.rest.split(' ')
          if (p.length > 1) {
            // return '<span class=\'badge\'>' + p[0] + '</span> ' + p[1]
            return `<div role="alert" class="q-badge flex inline items-center no-wrap q-badge--single-line bg-indigo">${p[0]}</div> ${p[1]}`
          } else {
            return `<div role="alert" class="q-badge flex inline items-center no-wrap q-badge--single-line bg-indigo">*</div> ${p[0]}`
          }
        } else {
          return `<div role="alert" class="q-badge flex inline items-center no-wrap q-badge--single-line bg-indigo">${action.action.rest.method || '*'}</div> action.action.rest.path`
        }
      }
      return '';
    },
    getActionParams(action, maxLen) {
      if (action.action && action.action.params) {
        const s = Object.keys(action.action.params).join(', ');
        return s.length > maxLen ? s.substr(0, maxLen) + '…' : s;
      }
      return '-';
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
    },
  },
  mounted() {
    this.getActions()
      .then(_ => this.getService())
  }
}
</script>

<style scoped>

</style>
