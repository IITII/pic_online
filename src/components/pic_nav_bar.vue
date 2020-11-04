<template>
  <div>
    <div class="float_container">
      <div class="control_btn">
        <div>
          <el-tooltip :content="control_btn.load_more.tooltip" class="item" effect="dark" placement="left">
            <el-button circle
                       icon="el-icon-bicycle"
                       type="warning"
                       @click="load_more"
            />
          </el-tooltip>
        </div>
        <div>
          <el-tooltip :content="control_btn.drawer.tooltip" class="item" effect="dark" placement="left">
            <el-button circle
                       icon="el-icon-s-unfold"
                       type="primary"
                       @click="treeDrawer.visible = true"
            />
          </el-tooltip>
        </div>
        <div>
          <el-tooltip :content="control_btn.dialog.tooltip" class="item" effect="dark" placement="left">
            <el-button circle
                       icon="el-icon-setting"
                       type="info"
                       @click="setting_visible_sync = !setting_visible_sync"
            />
          </el-tooltip>
        </div>
      </div>
    </div>
    <!--    drawer-->
    <div>
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
              :placeholder="treeDrawer.placeHolder">
          </el-input>

          <el-tree
              ref="tree"
              :data="tree_data"
              :empty-text="common.empty_text"
              :filter-node-method="filterNode"
              :props="defaultProps"
              class="filter-tree"
              default-expand-all
              @node-click="handleNodeClick">
          </el-tree>
          <pic_footer/>
        </div>

      </el-drawer>
    </div>
    <!--    dialog-->
    <setting/>
  </div>
</template>

<script>
import pic_footer from "@/components/pic_footer";
import setting from '@/components/setting';
import {adaptiveLayout} from '@/utils/validate';

export default {
  name: "nav_bar",
  components: {
    setting,
    pic_footer,
  },
  props: {
    tree_data: {
      required: true
    },
    load_more: {
      type: Function,
      required: true,
    },
  },
  watch: {
    /**
     * 通过对内部属性 filterText 使用 computed 和 watch 进行计算和监听
     * 当然如果使用单引号或者双引号将变量名称包裹也是可以实现的，比如：
     * <code>
     *   watch:{
     *     "treeDrawer.filterText": function(){
     *        // do something
     *     }
     *   }
     * </code>
     * @param val
     */
    filter_text_computed(val) {
      this.$log.debug(`Filtering ${val}`);
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    handleNodeClick(data) {
      this.$log.debug(data.id);
      this.$emit('pic_node_click', data.id);
    },
    handleClose(done) {
      done();
    },
    filterNode(value, data) {
      this.$log.debug(`Filtering Node ${value}`);
      if (!value) {
        return true;
      }
      return data.label.indexOf(value) !== -1;
    },
  },
  mounted() {
    this.common.windows_href = window.location.href;
  },
  data() {
    return {
      control_btn: {
        load_more: {
          tooltip: '手动加载图片',
        },
        drawer: {
          tooltip: '打开侧栏',
        },
        dialog: {
          tooltip: '设置',
        },
      },
      checked_box: false,
      // setting_visible_sync: false,
      common: {
        empty_text: "...",
        windows_href: "",
        modal: false,
      },
      treeDrawer: {
        visible: false,
        direction: 'ltr',
        filterText: '',
        placeHolder: '输入关键字进行过滤',
      },
      defaultProps: {
        children: 'children',
        label: 'label'
      },
    };
  },
  computed: {
    filter_text_computed: function () {
      return this.treeDrawer.filterText;
    },
    setting_visible_sync: {
      get: function () {
        return this.$store.getters['ui_control/showSettingDialog'];
      },
      set: function () {
        return this.$store.dispatch('ui_control/reverseShowSettingDialog')
      }
    },
    drawer_size: function () {
      const size = ['30%', '70%'];
      return adaptiveLayout(size[0], size[1]);
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
