<template>
  <div>
    <q-drawer
      v-model="leftDrawerSync"
      content-class="bg-grey-1"
      elevated
      show-if-above>
      <div class="q-pa-md q-gutter-sm">
        <div style="text-align: center">
          <q-badge
            :color="badge.color"
            :text-color="badge.text_color">
            {{ selectNodeTitle }}
          </q-badge>
        </div>
        <div>
          <q-input
            ref="filter"
            v-model="tree.filter"
            :label="$t('filter')"
            filled
            @input="inputListener">
            <template v-slot:append>
              <q-icon v-if="tree.filter !== ''" class="cursor-pointer" name="clear" @click="resetFilter"/>
            </template>
          </q-input>
        </div>
        <div>
          <q-tree
            ref="qtree"
            :dark="tree.dark"
            :expanded.sync="tree.expanded"
            :filter="tree.filter"
            :nodes="tree.nodes"
            :selected.sync="tree.selectedNodeSync"
            node-key="nodeKey"
            @update:selected="update_selected">
            <template v-slot:header-root="prop">
              <div class="row items-center">
                {{ prop.node.label }}
                <q-badge
                  v-if="prop.node.children.length > 0"
                  :color="badge.color"
                  :text-color="badge.text_color"
                  class="q-ml-sm">
                  {{ prop.node.children.length }}
                </q-badge>
                <q-badge
                  v-if="prop.node.hasOwnProperty('fileCount')"
                  :text-color="badge.text_color"
                  class="q-ml-sm"
                  color="warning">
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
    storeName: {
      type: String,
      required: true
    },
  },
  data() {
    return {
      leftDrawerOpen: true,
      tree: {
        filter: '',
        nodes: [],
        nodeKeyMap: new Map(),
        expanded: [],
        selectedNodeSync: 1,
        dark: false
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
      drawer_open: state => state[self.storeName].drawer_open,
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
    update_selected: function (key) {
      this.$log.debug(key)
      if (key !== null) {
        this.$store.dispatch(`${this.storeName}/node_key`, key)
        // 对应上面的 ref="qtree"
        const node = this.$refs.qtree.getNodeByKey(key)
        this.$store.dispatch(`${this.storeName}/title`, node.label)
        // Update expand nodeKeys
        this.tree.expanded = this.nodeKeyMapToExpandNodes(key)
        // update select node
        this.tree.selectedNodeSync = key
      }
    },
    btn_click_nextNode: function () {
      this.update_selected(this.currentNodeKey + 1)
    },
    btn_click_leftDrawer() {
      this.leftDrawerSync = !this.leftDrawerSync
    },
    btn_click_setting() {
    }
  },
  beforeCreate() {
    self = this
  },
  created() {
    this.$bus.$on('btn_click_nextNode', this.btn_click_nextNode)
    this.$bus.$on('btn_click_leftDrawer', this.btn_click_leftDrawer)
    this.$bus.$on('btn_click_setting', this.btn_click_setting)
  },
  destroyed() {
    this.$bus.$off('btn_click_nextNode', this.btn_click_nextNode)
    this.$bus.$off('btn_click_leftDrawer', this.btn_click_leftDrawer)
    this.$bus.$off('btn_click_setting', this.btn_click_setting)
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
      .catch(e => {
        this.$q.notify({
          message: this.$t('connection_fail'),
          caption: `${e.message}`,
          type: 'negative'
        })
      })
  }
}
</script>

<style scoped>

</style>
