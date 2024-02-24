<template>
  <div>
    <q-drawer v-model="leftDrawerSync" content-class="bg-grey-1" elevated
              show-if-above id="drawer" :width="drawer_width">
      <div class="q-pa-md q-gutter-sm">
        <div style="text-align: center">
          <q-badge :color="badge.color" :text-color="badge.text_color">
            {{ selectNodeTitle }}
          </q-badge>
        </div>
        <div>
          <q-input ref="filter" v-model="tree.filter" :label="$t('filter')" filled
                   @input="inputListener" @focusin="filterFocusIn" @focusout="filterFocusOut">
            <template v-slot:append>
              <q-icon v-if="tree.filter !== ''" class="cursor-pointer" name="clear" @click="resetFilter"/>
            </template>
          </q-input>
        </div>
        <div id="drawer_tree">
          <q-tree ref="qtree" no-transition v-model:expanded="tree.expanded"
                  :filter="tree.filter" :nodes="tree.nodes"
                  v-model:selected="tree.selectedNodeSync" node-key="nodeKey" @lazy-load="onLazyLoad"
                  @update:selected="update_selected">
            <template v-slot:default-header="prop">
              <div :id="prop.node.nodeKey" class="row items-center">
                <span :class="currentNodeKey === prop.node.nodeKey ? 'text-pink-4' : ''">{{ prop.node.label }}</span>
                <q-badge v-if="prop.node.dirCount" :color="badge.color"
                         :text-color="badge.text_color" class="q-ml-sm">
                  {{ prop.node.dirCount }}
                </q-badge>
                <q-badge v-if="prop.node.hasOwnProperty('fileCount')" :text-color="badge.text_color"
                         class="q-ml-sm" color="warning">
                  {{ prop.node.fileCount }}
                </q-badge>
              </div>
            </template>
          </q-tree>
        </div>
      </div>
    </q-drawer>
  </div>
</template>

<script>
import {mapState} from 'vuex'

let self = null
export default {
  name: 'PicDrawer',
  props: {
    api_url: {
      type: String,
      required: true
    },
    lazy_url: {
      type: String,
      required: false
    },
    storeName: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      leftDrawerOpen: true,
      image_shortcut: false,
      tree: {
        filter: '',
        nodes: [],
        nodeKeyMap: new Map(),
        expanded: [],
        selectedNodeSync: 1,
      },
      badge: {
        color: 'primary',
        text_color: 'white'
      }
    }
  },
  computed: {
    ...mapState({
      currentNodeKey: state => state[self.storeName].node_key,
      node_dir: state => state[self.storeName].node_dir,
      drawer_open: state => state[self.storeName].drawer_open,
      drawer_width: state => state[self.storeName].drawer_width,
    }),
    leftDrawerSync: {
      get: function () {
        return this.$store.getters[`${this.storeName}/drawer_open`]
      },
      set: function (v) {
        // this.$log.warn(v)
        // this.$log.warn(this.leftDrawerSync)
        return this.$store.dispatch(`${this.storeName}/drawer_open`, v)
        // return this.$store.dispatch(`${this.storeName}/drawer_open`, !this.drawer_open)
      }
    },
    selectNodeTitle: {
      get: function () {
        return this.$store.getters[`${this.storeName}/title`]
      },
      set: function (t) {
        if (t) {
          return this.$store.dispatch(`${this.storeName}/title`, t)
        }
      }
    }
  },
  methods: {
    filterFocusIn: function () {
      this.$log.debug('filterFocusIn')
      this.image_shortcut = this.$store.getters['common/image_shortcut']
      this.$store.dispatch('common/image_shortcut', false)
    },
    filterFocusOut: function () {
      this.$log.debug('filterFocusOut')
      this.$store.dispatch('common/image_shortcut', this.image_shortcut)
    },
    // Convert nodes to map
    nodesToNodeKeyMap: function (nodes) {
      const hashMap = new Map()

      function dfs(node, parentNodeKey = Infinity, map = hashMap) {
        if (parentNodeKey !== Infinity) {
          map.set(node.nodeKey, parentNodeKey)
        }
        if (Array.isArray(node.children) && node.children.length > 0) {
          node.children.forEach(n => dfs(n, node.nodeKey))
        }
      }

      nodes.forEach(n => dfs(n))
      return hashMap
    },
    // Get parent nodeKey of given nodeKey
    nodeKeyMapToExpandNodes: function (nodeKey, root = 1) {
      const map = this.tree.nodeKeyMap,
        nodeKeyArr = [nodeKey]
      let tmpNodeKey = nodeKey
      while (tmpNodeKey !== root) {
        // Get parent nodeKey value and add to arr
        tmpNodeKey = map.get(tmpNodeKey)
        nodeKeyArr.push(tmpNodeKey)
      }
      return nodeKeyArr
    },
    resetFilter: function () {
      this.tree.filter = ''
      this.$refs.filter.focus()
    },
    inputListener: function (value) {
      if (value === '') {
        this.tree.expanded = this.nodeKeyMapToExpandNodes(this.currentNodeKey)
      } else {
        this.$refs.qtree.expandAll()
      }
    },
    onLazyLoad: function ({node, key, done, fail}) {
      this.$log.debug('lazy load:', node, key)
      return this.$axios({method: 'POST', url: this.lazy_url, params: {nodeKey: key}, timeout: 2000})
        .then(_ => done(_))
        .catch(e => {
          this.$log.error(e.response?.data?.message || e.message)
          fail([])
        })
    },
    highlightNodeInView: function (nodeKey) {
      const scroll = document.querySelector("#drawer")
      const allNodes = Array.from(document.querySelectorAll('#drawer_tree .q-tree__node .row')).filter(_ => _.id)
      let nodes = allNodes.map(_ => ({id: parseInt(_.id), top: _.offsetTop, height: _.offsetHeight, bottom: _.offsetBlockEnd}))
      // 标题和输入框高度
      let height = 4 + 21 + 4 + 56 + 4
      for (const node of nodes) {
        // padding + 每个节点高度
        height += node.top + node.height
        if (node.id === nodeKey) {
          break
        }
      }
      this.$log.debug(`scroll drawer to ${height}`)
      scroll.scrollTop = height
    },
    update_selected: function (key, autoNext = undefined) {
      this.$log.debug(key, this.tree.selectedNodeSync)
      if (key !== null) {
        // if (key !== null || key !== this.tree.selectedNodeSync) {
        this.$store.dispatch(`${this.storeName}/node_key`, key)
        // 对应上面的 ref="qtree"
        // 这里也可能是接口数据未获取
        const node = this.$refs.qtree.getNodeByKey(key)
        this.$log.debug(node)
        if (node) {
          this.$store.dispatch(`${this.storeName}/title`, node.label)
          this.$store.dispatch(`${this.storeName}/node_dir`, node.dir)
          if (autoNext !== undefined) {
            this.$store.dispatch(`${this.storeName}/auto_next`, autoNext)
          }
          // Update expand nodeKeys
          this.tree.expanded = this.nodeKeyMapToExpandNodes(key)
          // update select node
          this.tree.selectedNodeSync = key
          this.highlightNodeInView(key)
        } else {
          // lazy load 情况下 node 为 null, 直接强制加载默认值
          this.$log.debug('??? unkown node, redirect to 1')
          this.update_selected(1)
        }
      }
    },
    btn_click_preNode: function () {
      this.update_selected(this.currentNodeKey - 1, false)
    },
    btn_click_nextNode: function () {
      this.update_selected(this.currentNodeKey + 1, true)
    },
    btn_click_leftDrawer() {
      this.leftDrawerSync = !this.leftDrawerSync
      if (this.leftDrawerSync) {
        // 将当前节点滚动到可视区域
        document.getElementById(this.currentNodeKey).scrollIntoView()
      }
    },
    btn_click_setting() {
    }
  },
  beforeCreate() {
    self = this
  },
  created() {
    this.$bus.on('btn_click_preNode', this.btn_click_preNode)
    this.$bus.on('btn_click_nextNode', this.btn_click_nextNode)
    this.$bus.on('btn_click_leftDrawer', this.btn_click_leftDrawer)
    this.$bus.on('btn_click_setting', this.btn_click_setting)
  },
  unmounted() {
    this.$bus.off('btn_click_preNode', this.btn_click_preNode)
    this.$bus.off('btn_click_nextNode', this.btn_click_nextNode)
    this.$bus.off('btn_click_leftDrawer', this.btn_click_leftDrawer)
    this.$bus.off('btn_click_setting', this.btn_click_setting)
  },
  beforeMount() {
    // this.$store.dispatch('apiSetting/setTreeUrl', 'http://localhost:3000/private/tree')
  },
  mounted() {
    this.$axios({method: 'GET', url: this.api_url})
      .then(_ => {
        // Update nodes
        this.tree.nodes = _
        return _
      })
      .then(_ => {
        // Update nodeKeyMap
        this.tree.nodeKeyMap = this.nodesToNodeKeyMap(_)
        // 避免因为后台数据更新以后，前台标题信息没有及时更新
        this.update_selected(this.currentNodeKey)
        return _
      })
      .then(_ => {
        // Update expand nodeKeys
        const expanded = this.nodeKeyMapToExpandNodes(this.currentNodeKey)
        this.$log.debug(`expandedNodes: ${expanded}`)
        this.tree.expanded = expanded
      })
      .then(_ => {
        this.highlightNodeInView(this.currentNodeKey)
      })
      .catch(e => {
        this.$log.error('connection_fail', e)
        this.$q.notify({
          message: this.$t('connection_fail'),
          caption: `${e.response?.data?.message || e.message}`,
          type: 'negative'
        })
      })
  }
}
</script>

<style scoped>

</style>
