<template>
  <div>
    <div class="float_container">
      <div class="control_btn">
        <div>
          <el-tooltip class="item" content="打开侧栏" effect="dark" placement="left">
            <el-button circle
                       icon="el-icon-s-unfold"
                       type="primary"
                       @click="treeDrawer.visible = true"
            />
          </el-tooltip>
        </div>
        <div>
          <el-tooltip class="item" content="设置" effect="dark" placement="left">
            <el-button circle
                       icon="el-icon-setting"
                       type="info"
                       @click="treeDrawer.visible = true"
            />
          </el-tooltip>
        </div>
        <div>
          <el-checkbox
              :checked="checked_box"
              border
              @change="handleCheckBox"
          >
          </el-checkbox>
        </div>
        <div>
          <el-backtop
              target="#content"
          />
        </div>
      </div>
    </div>
    <el-drawer
        :before-close="handleClose"
        :direction="treeDrawer.direction"
        :modal="common.modal"
        :size="drawer_size"
        :title="common.windows_href"
        :visible.sync="treeDrawer.visible"
    >
      <div>
        <el-input
            v-model="treeDrawer.filterText"
            placeholder="输入关键字进行过滤">
        </el-input>

        <el-tree
            ref="tree"
            :data="tree_data"
            :filter-node-method="filterNode"
            :props="defaultProps"
            class="filter-tree"
            :empty-text="common.empty_text"
            default-expand-all
            @node-click="handleNodeClick">
        </el-tree>
        <pic_footer/>
      </div>

    </el-drawer>
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
    this.common.windows_href = window.location.href;
  },
  data() {
    return {
      checked_box: false,
      common: {
        empty_text: "...",
        windows_href: "",
        modal: false,
      },
      treeDrawer: {
        visible: false,
        direction: 'ltr',
        filterText: '',
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    };
  },
  computed: {
    drawer_size: function () {
      const userAgentInfo = navigator.userAgent;
      const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
      const size = ['30%', '70%'];
      let isPc = true;
      for (let v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
          isPc = false;
          break;
        }
      }
      // 电脑端，drawer size 始终设置为 30%
      if (isPc) {
        return size[0];
      }
      // 手机端，进行 3:2 检测
      if (screen.width * 3 > screen.height * 2) {
        return size[0];
      } else {
        return size[1];
      }
    }
  }
}
</script>

<style scoped>
.float_container {
  position: fixed;
  z-index: 502;
  right: 25px;
  bottom: 30px;
}

.control_btn {
  /*position: absolute;*/
  width: 40px;
}

.control_btn div {
  margin: 1px;
}

</style>

<!--为了使 css 样式透传，去除了 scope-->
<!--See: https://vue-loader-v14.vuejs.org/zh-cn/features/scoped-css.html-->
<style lang="scss">

/*1.显示滚动条：当内容超出容器的时候，可以拖动：*/
.el-drawer__body {
  overflow: auto;
}

/*2.隐藏滚动条，太丑了*/
.el-drawer__container ::-webkit-scrollbar {
  display: none;
}
</style>