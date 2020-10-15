<template>
  <div class="full-height">
    <el-container class="full-height">
      <el-header class="aside">
        <pic_nav_bar
            :tree_data="tree_data"
            @pic_handle_checkbox="change_img_info"
            @pic_node_click="update_node_id"
        />
      </el-header>
      <el-main class="waterfall_container">
        <div class="waterfall_content">
          <vue-waterfall-easy
              v-if="water_fall.img_urls.length !== 0"
              :imgs-arr="water_fall.current_img_array"
              :loadingDotCount="water_fall.loadingDotCount"
              :loadingTimeOut="water_fall.loadingTimeOut"
              :reachBottomDistance="reach_bottom_distance"
              link-range="img"
              @imgError="imgErrorEvent"
              @scrollReachBottom="getData"
          >
            <span
                v-show="show_pic_title"
                slot-scope="props"
                class="some-info"
            >
              {{ props.value.info }}
            </span>
            <div slot="waterfall-over">waterfall-over</div>

          </vue-waterfall-easy>
          <span v-if="show">
              真的一张也没有了
            </span>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import pic_nav_bar from "@/components/pic_nav_bar";
import vueWaterfallEasy from "vue-waterfall-easy";
import axios from 'axios';
import {equalsIgnoreCase, isNil} from '@/utils/validate';

export default {
  name: 'pic_waterfall',
  components: {
    // pic_view_list,
    pic_nav_bar,
    vueWaterfallEasy
  },
  data() {
    return {
      keyMap: [],
      tree_data: {},
      node_id: 1,
      //See: https://github.com/lfyfly/vue-waterfall-easy/blob/master/README-CN.md#3-%E7%BB%84%E4%BB%B6%E5%8F%82%E6%95%B0
      water_fall: {
        image_group: 0,
        PRE_MAX: 10,
        img_urls: [],
        current_img_array: [],
        loadingDotCount: 3,
        // img_info: false,
        loadingTimeOut: 500,
      },
      axios: {
        requestURL: 'http://localhost:3000/files',
        timeout: 2000,
        timeoutErrorMessage: '连接超时, 请检查设置',
      },
    }
  },
  methods: {
    update_node_id: function (node_id) {
      // console.log(`waterfall.vue node id: ${node_id},this.node_id:${this.node_id}`);
      if (node_id !== this.node_id) {
        // Reset value
        this.water_fall.image_group = 0;
        this.water_fall.loadingDotCount = 3;
        this.water_fall.img_urls = new Map(this.keyMap).get(node_id);
        this.node_id = node_id;
        this.water_fall.current_img_array = [];
        this.getData();
      } else {
        this.node_id = node_id;
      }
    },
    imgErrorEvent: function (imgItem) {
      this.$notify({
        title: '图片加载错误',
        message: `${imgItem.src}`,
        type: 'warning'
      });
    },
    getData: function (low = null) {
      this.water_fall.image_group++;
      low = low === null
          ? (this.water_fall.image_group - 1) * this.water_fall.PRE_MAX
          : low;
      let high = this.water_fall.image_group * this.water_fall.PRE_MAX;
      // console.log(`high: ${high},length: ${this.water_fall.img_urls.length}`);
      if (low <= this.water_fall.img_urls.length) {
        // console.log("low<");
        let data = this.water_fall.img_urls.slice(low, high);
        this.water_fall.current_img_array = this.water_fall.current_img_array.concat(data);
      }
      if (high > this.water_fall.img_urls.length) {
        // console.log("waterfall over");
        // this.$refs.waterfall.waterfallOver();
        this.water_fall.loadingDotCount = 0;
      }
    },
    change_img_info: function (value) {
      // console.log(`change_img_info:${value}`);
      this.water_fall.img_info = value;
      // TODO: render waterfall after change
    },
    beforeunloadFn: function () {
      this.$log.debug(`refresh or close, saving node_id: ${this.node_id}`);
      this.$store.dispatch('ui_control/setTreeNodeId', this.node_id);
      // show dialog when user try to refresh page
      // e.returnValue = 'dialog';
    },
  },
  computed: {
    /**
     * getUrls from this.keyMap by using node_id as key
     */
    update_urls_by_node_id: function () {
      let map = new Map(this.keyMap);
      let string = map.get(this.node_id);
      // console.log(`node_id: ${this.node_id}, value: ${string}`);
      if (isNil(string)) {
        return [];
      }
      return string;
    },
    show: function () {
      return this.water_fall.image_group * this.water_fall.PRE_MAX > this.water_fall.img_urls.length;
    },
    reach_bottom_distance: function () {
      const proportion = 0.3;
      return screen.height * proportion;
    },
    show_pic_title: function () {
      let tmp = this.$store.getters['ui_control/checkboxGroup'];
      return tmp.indexOf(0) >= 0;
    }
  },
  beforeMount() {
    // this.$notify({
    //   title: 'Cookies URL 解析失败',
    //   message: `Error Info: ${e.message}, URL: ${tmp}`,
    //   type: 'error'
    // });
    // this.$notify({
    //   title: '警告',
    //   message: `使用默认URL地址，URL: ${this.axios.requestURL}`,
    //   type: 'warning'
    // });
    // init
    axios.defaults.timeout = this.axios.timeout;
    axios.defaults.timeoutErrorMessage = this.axios.timeoutErrorMessage;
    let localStorageNodeId = this.$store.getters['ui_control/treeNodeId'];
    this.$log.debug(localStorageNodeId);
    this.node_id = localStorageNodeId;
    let tmp;
    let method = this.$store.getters['api_setting/method'];
    let url = this.$store.getters['api_setting/url'];
    if (equalsIgnoreCase('GET', method)) {
      tmp = axios.get(url);
    } else {
      tmp = axios.get(url);
    }
    // request for data
    tmp.then(res => {
      if (res.status === 200) {
        try {
          let parse = res.data;
          this.tree_data = parse.tree_data;
          this.keyMap = parse.keyMap;
          // update to img_urls
          let map = new Map(this.keyMap);
          this.water_fall.img_urls = map.get(this.node_id);
          this.getData();
          this.$notify({
            title: '成功',
            message: "成功获取并解析数据!!!",
            type: 'success'
          });
        } catch (e) {
          this.$notify({
            title: e.name,
            message: "数据解析失败!!!",
            type: 'warning'
          });
        }
      } else {
        this.$notify({
          title: '警告',
          message: `加载失败!!! `
              + `Error Code: ${res.status}, `
              + `Error Message: ${res.statusText}`,
          type: 'warning'
        });
        console.error({
          status: res.status,
          statusText: res.statusText,
          body: res.data
        });
      }
    })
        .catch(e => {
          this.$notify({
            title: e.name,
            message: e.message,
            type: 'error'
          });
          console.log(e);
        });
  },
  created() {
    window.addEventListener('beforeunload', e => this.beforeunloadFn(e));
  },
  destroyed() {
    window.removeEventListener('beforeunload', e => this.beforeunloadFn(e));
  }
}
</script>

<!--style for waterfall-->
<style lang="scss">

* {
  margin: 0;
  padding: 0;
}

a {
  color: #000;
  text-decoration: none;

  &:active {
    color: #000;
  }
}

html,
body,
.waterfall_container {
  height: 100%;
}

.waterfall_container {
  position: relative;

  .waterfall_content {
    position: absolute;
    top: 3px;
    bottom: 24px;
    width: 100%;
  }
}

.waterfall_container {
  overflow: auto;
  position: relative;
  // rewrite el-main style
  padding: 0;

  .some-info {
    line-height: 1.6;
    text-align: center;
  }
}
</style>
