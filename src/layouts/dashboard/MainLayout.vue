<template>
  <q-layout view="lhh lpr lfr" class="full-height-width">
    <pic-header/>
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
              </div>
            </template>
          </q-tree>
        </div>
      </div>
    </q-drawer>

    <q-page-container class="full-height-width">
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script>

import PicHeader from 'components/PicHeader'

export default {
  name: 'MainLayout',
  components: {
    PicHeader
  },
  data () {
    return {
      leftDrawerOpen: false,
      tree: {
        filter: '',
        nodes: [],
        expanded: [],
        selectedNodeSync: '',
        dark: false
      },
      badge: {
        color: 'primary',
        text_color: 'white'
      }
    }
  },
  computed: {
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
    updateExpandedNodeByNodesBfs: function (nodeArray, maxNodeCount = 16) {
      let queue = [],
        tmpQueue = [],
        res = [],
        tmpRes = [],
        tmpNodeCount = 0

      queue = queue.concat(nodeArray)

      while (queue.length !== 0) {
        const tmp = queue.shift()
        tmpRes.push(tmp.nodeKey)
        if (tmp.children !== undefined) {
          if (tmp.children.length !== 0) {
            tmpQueue = tmpQueue.concat(tmp.children)
            tmpNodeCount += tmp.children.length
          }
          if (res.length + tmpNodeCount >= maxNodeCount) {
            // 当根目录文件过多的时候，还是选择默认展开根目录
            // 因为好歹会展开这个目录，还不如自动做这个任务
            if (res.length === 0) {
              continue
            } else {
              break
            }
          } else {
            res = res.concat(tmpRes)
            tmpRes = []
          }
        }
        if (queue.length === 0) {
          queue = queue.concat(tmpQueue)
          tmpQueue = []
        }
      }
      return res
    },
    updateExpandedNodeByNodes: function (nodeArray, depth) {
      let tmp = []
      if (depth < 1) {
        return []
      }
      nodeArray.forEach(node => {
        // 对应上面的 node-key="nodeKey"
        node.nodeKey !== undefined && tmp.push(node.nodeKey)
        if (node.children !== undefined && node.children.length !== 0) {
          tmp = tmp.concat(this.updateExpandedNodeByNodes(node.children, depth - 1))
        }
      })
      return tmp
    },
    resetFilter: function () {
      this.tree.filter = ''
      this.$refs.filter.focus()
    },
    expandNode: function (nodes) {
      this.$log.debug(nodes)
    },
    beforeunloadFn: function (e) {
      this.$log.debug(`before unload function ${e}`)
      // // Cancel the event as stated by the standard.
      // e.preventDefault()
      // // Chrome requires returnValue to be set.
      // e.returnValue = '233'
    },
    btn_click_nextNode: function () {
      const currentNodeKey = this.$store.getters['uiControl/nodeKey']
      this.update_selected(currentNodeKey + 1)
    },
    update_selected: function (key) {
      this.$log.debug(key)
      this.$log.debug(key === null)
      if (key !== null) {
        this.$store.dispatch('uiControl/setNodeKey', key)
        // 对应上面的 ref="qtree"
        const node = this.$refs.qtree.getNodeByKey(key)
        this.$store.dispatch('uiControl/setSelectedNodeTitle', node.label)
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
    const url = this.$store.getters['apiSetting/treeUrl']
    const method = this.$store.getters['apiSetting/treeMethod']
    let axios = null
    switch (method) {
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
      this.$log.debug(`axios response: ${JSON.stringify(res)}`)
      this.tree.expanded = this.updateExpandedNodeByNodesBfs(this.tree.nodes)
      this.tree.nodes = res.data
      return res.data
    })
      .then(res => {
        this.$log.debug(`expandedNodes: ${this.updateExpandedNodeByNodesBfs(res)}`)
        this.tree.expanded = this.updateExpandedNodeByNodesBfs(res)
        // 避免因为后台数据更新以后，前台标题信息没有及时更新
        this.update_selected(this.$store.getters['uiControl/nodeKey'])
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
