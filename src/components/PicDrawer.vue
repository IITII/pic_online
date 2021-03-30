<template>
  <div>
    <q-drawer
      v-model="leftDrawerSync"
      show-if-above
      elevated
      content-class="bg-grey-1"
    >
      <div class="q-pa-md q-gutter-sm">
        <div style="text-align: center">
          <q-badge
            :color="badge.color"
            :text-color="badge.text_color"
          >
            {{ selectNodeTitle }}
          </q-badge>
        </div>
        <div>
          <q-input
            ref="filter"
            filled
            v-model="tree.filter"
            :label="$t('filter')"
            @input="inputListener"
          >
            <template v-slot:append>
              <q-icon v-if="tree.filter !== ''" name="clear" class="cursor-pointer" @click="resetFilter"/>
            </template>
          </q-input>
        </div>
        <div>
          <q-tree
            :nodes="tree.nodes"
            node-key="nodeKey"
            ref="qtree"
            :dark="tree.dark"
            :filter="tree.filter"
            :expanded.sync="tree.expanded"
            :selected.sync="tree.selectedNodeSync"
            @update:selected="update_selected"
          >
            <template v-slot:header-root="prop">
              <div class="row items-center">
                {{ prop.node.label }}
                <q-badge
                  v-if="prop.node.children.length > 0"
                  :color="badge.color"
                  :text-color="badge.text_color"
                  class="q-ml-sm"
                >
                  {{ prop.node.children.length }}
                </q-badge>
                <q-badge
                  v-if="prop.node.hasOwnProperty('fileCount')"
                  :text-color="badge.text_color"
                  class="q-ml-sm"
                  color="warning"
                >
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
import { mapState } from 'vuex'

export default {
  name: 'PicDrawer',
  data () {
    return {
      leftDrawerOpen: false,
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
      currentNodeKey: state => state.uiControl.nodeKey,
      treeUrl: state => state.apiSetting.treeUrl,
      treeMethod: state => state.apiSetting.treeMethod
    }),
    leftDrawerSync: {
      get: function () {
        return this.$store.getters['uiControl/leftDrawerOpen']
      },
      set: function () {
        return this.$store.dispatch('uiControl/reverseLeftDrawerOpen')
      }
    },
    selectNodeTitle: {
      get: function () {
        return this.$store.getters['uiControl/selectedNodeTitle']
      },
      set: function (nodeTitle) {
        this.$log.debug(nodeTitle)
        if (nodeTitle !== null || nodeTitle !== '') {
          return this.$store.dispatch('uiControl/setSelectedNodeTitle', nodeTitle)
        }
      }
    }
  },
  methods: {
    // Convert nodes to map
    nodesToNodeKeyMap: function (nodes) {
      const hashMap = new Map()

      function dfs (node, parentNodeKey = Infinity, map = hashMap) {
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
    beforeunloadFn: function (e) {
      this.$log.debug(`before unload function ${e}`)
      // // Cancel the event as stated by the standard.
      // e.preventDefault()
      // // Chrome requires returnValue to be set.
      // e.returnValue = '233'
    },
    btn_click_nextNode: function () {
      this.update_selected(this.currentNodeKey + 1)
    },
    update_selected: function (key) {
      this.$log.debug(key)
      this.$log.debug(key === null)
      if (key !== null) {
        this.$store.dispatch('uiControl/setNodeKey', key)
        // 对应上面的 ref="qtree"
        const node = this.$refs.qtree.getNodeByKey(key)
        this.$store.dispatch('uiControl/setSelectedNodeTitle', node.label)
        // Update expand nodeKeys
        this.tree.expanded = this.nodeKeyMapToExpandNodes(key)
        // update select node
        this.tree.selectedNodeSync = key
      }
    }
  },
  created () {
    window.addEventListener('beforeunload', e => this.beforeunloadFn(e))
    this.$bus.$on('btn_click_nextNode', this.btn_click_nextNode)
  },
  destroyed () {
    window.removeEventListener('beforeunload', e => this.beforeunloadFn(e))
    this.$bus.$off('btn_click_nextNode', this.btn_click_nextNode)
  },
  beforeMount () {
    // this.$store.dispatch('apiSetting/setTreeUrl', 'http://localhost:3000/private/tree')
  },
  mounted () {
    const url = this.treeUrl
    let axios = null
    switch (this.treeMethod) {
      case 'GET':
        axios = this.$axios.get(url)
        break
      case 'POST':
        axios = this.$axios.post(url)
        break
      default:
        axios = this.$axios.get(url)
        break
    }
    axios.then(res => {
      this.$log.debug(`Tree Res: ${JSON.stringify({
        status: res.status,
        data: res.data
      }).slice(0, 1000)}`)
      // Update nodes
      this.tree.nodes = res.data
      return res.data
    })
      .then(res => {
        // Update nodeKeyMap
        this.tree.nodeKeyMap = this.nodesToNodeKeyMap(res)
        // 避免因为后台数据更新以后，前台标题信息没有及时更新
        this.update_selected(this.currentNodeKey)
        return res
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
