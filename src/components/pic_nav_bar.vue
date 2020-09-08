<template>

  <div>
    <!--    <el-radio-group v-model="direction">-->
    <!--      <el-radio label="ltr">从左往右开</el-radio>-->
    <!--    </el-radio-group>-->

    <el-button style="width: 100%" type="primary" @click="drawer = true">
      点我打开
    </el-button>

    <el-drawer
        :before-close="handleClose"
        :direction="direction"
        :title="windows_href"
        :visible.sync="drawer">
      <div>
        <el-input
            v-model="filterText"
            placeholder="输入关键字进行过滤">
        </el-input>

        <el-tree
            ref="tree"
            :data="tree_data"
            :filter-node-method="filterNode"
            :props="defaultProps"
            class="filter-tree"
            :empty-text="empty_text"
            default-expand-all
            @node-click="handleNodeClick">
        </el-tree>

      </div>

    </el-drawer>
    <el-divider></el-divider>
  </div>
</template>

<script>
export default {
  name: "nav_bar",
  props: {
    tree_data: {
      required: true
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    handleNodeClick(data) {
      this.$emit('pic_node_click', data.id);
    },
    handleClose(done) {
      done();
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  mounted() {
    this.windows_href = window.location.href;
  },
  data() {
    return {
      empty_text: "...",
      windows_href: "",
      drawer: false,
      direction: 'ltr',
      filterText: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  }
}
</script>

<style scoped>

</style>