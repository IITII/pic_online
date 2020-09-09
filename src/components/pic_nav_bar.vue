<template>

  <div>
    <!--    <el-radio-group v-model="direction">-->
    <!--      <el-radio label="ltr">从左往右开</el-radio>-->
    <!--    </el-radio-group>-->
    <div style="display: inline">
      <el-button style="width: 50%" type="primary" @click="drawer = true">
        点我打开
      </el-button>
      <el-checkbox
          :checked="checked_box"
          border
          style="margin-left: 5%"
          @change="handleCheckBox"
      >
        显示标题
      </el-checkbox>
    </div>
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
        <pic_footer/>
      </div>

    </el-drawer>
    <el-divider></el-divider>
  </div>
</template>

<script>
import pic_footer from "@/components/pic_footer";

export default {
  name: "nav_bar",
  components: {
    pic_footer,
  },
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
    },
    handleCheckBox: function (value) {
      // console.log(`handleCheckBox ${value}`);
      this.$emit('pic_handle_checkbox', value);
    }
  },
  mounted() {
    this.windows_href = window.location.href;
  },
  data() {
    return {
      checked_box: false,
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