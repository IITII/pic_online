<template>
  <div id="app" class="full-height">
    <el-container class="full-height">
      <el-header class="aside">
        <pic_nav_bar
            :tree_data="tree_data"
            @pic_node_click="update_node_id"
            @pic_handle_checkbox="change_img_info"
        />
      </el-header>
      <el-main id="water-fall">
        <!--        <div id="water-fall">-->
        <div id="content">
          <vue-waterfall-easy
              v-if="water_fall.img_urls.length !== 0"
              link-range="img"
              @imgError="imgErrorEvent"
              @scrollReachBottom="getData"
              :imgs-arr="water_fall.current_img_array"
              :loadingDotCount="water_fall.loadingDotCount"
              :loadingTimeOut="water_fall.loadingTimeOut"
              :reachBottomDistance="reach_bottom_distance"
          >
            <span
                v-show="water_fall.img_info"
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
          <!--          <el-divider></el-divider>-->
          <!--          <pic_view_list-->
          <!--              v-if="false"-->
          <!--              :urls="update_urls_by_node_id"-->
          <!--          />-->
        </div>
        <!--        </div>-->
      </el-main>
    </el-container>
  </div>
</template>

<script>
import pic_nav_bar from "@/components/pic_nav_bar";
import vueWaterfallEasy from "vue-waterfall-easy";
import axios from 'axios';
import cookies_op from "@/utils/cookies_op";

axios.defaults.timeout = 2000;
axios.defaults.timeoutErrorMessage = 'timeout';

const cookies_name = {
  requestURL: 'request_url',
};

export default {
  name: 'app',
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
        img_info: false,
        loadingTimeOut: 500,
      },
      axios: {
        requestURL: 'http://localhost:3000/files'
      },
    }
  },
  methods: {
    update_node_id: function (node_id) {
      // console.log(`App.vue node id: ${node_id},this.node_id:${this.node_id}`);
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
      console.log('图片加载错误', imgItem)
    },
    isNil: function (object) {
      return object == null;
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
    }
  },
  computed: {
    /**
     * getUrls from this.keyMap by using node_id as key
     * @return {*[]|unknown}
     */
    update_urls_by_node_id: function () {
      let map = new Map(this.keyMap);
      let string = map.get(this.node_id);
      // console.log(`node_id: ${this.node_id}, value: ${string}`);
      if (this.isNil(string)) {
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
  },
  mounted() {
    // load setting from cookies
    cookies_op.parseCookies();
    let tmp = cookies_op.getCookieValueByKey(cookies_name.requestURL);
    if (tmp !== '') {
      try {
        new URL(tmp);
        this.axios.requestURL = tmp;
      } catch (e) {
        this.$notify({
          title: 'Cookies URL 解析失败',
          message: `Error Info: ${e.message}, URL: ${tmp}`,
          type: 'error'
        });
        this.$notify({
          title: '警告',
          message: `使用默认URL地址，URL: ${this.axios.requestURL}`,
          type: 'warning'
        });
        // remove invalid cookies
        cookies_op.deleteCookie(cookies_name.requestURL);
      }
    }
    // request for data
    axios.get(this.axios.requestURL)
        .then(res => {
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
  }
}
</script>

<style scoped>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.aside {
  position: absolute;
  width: 100%;
}
</style>

<!--style for waterfall-->
<style lang="scss">

.full-height {
  height: 100%;
}

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
#water-fall {
  height: 100%;
}

#water-fall {
  position: relative;

  #content {
    position: absolute;
    top: 3px;
    bottom: 24px;
    width: 100%;
  }
}

#water-fall {
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
