<template>
  <div id="app" class="full-height">
    <el-container class="full-height">
      <el-header>
        <pic_nav_bar
            :tree_data="tree_data"
            @pic_node_click="update_node_id"
            @pic_handle_checkbox="change_img_info"
        />
        <!--        <pic_nav_bar-->
        <!--            :tree_data="tree_data"-->
        <!--            @pic_node_click="update_node_id"-->
        <!--        />-->
      </el-header>
      <el-main id="water-fall">
        <div id="content">
          <vue-waterfall-easy
              :imgs-arr="current_img_array"
              link-range="img"
              @imgError="imgErrorEvent"
              @scrollReachBottom="getData"
              v-if="img_urls.length !== 0"
              :loadingDotCount="loadingDotCount"
          >
            <span
                v-show="img_info"
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
      </el-main>
    </el-container>
  </div>
</template>

<script>
import pic_nav_bar from "@/components/pic_nav_bar";
import vueWaterfallEasy from "vue-waterfall-easy";
import axios from 'axios';

const op = {
  baseURL: "http://127.0.0.1:3000/",
  timeout: 5000,
  timeoutErrorMessage: 'timeout',
  proxy: null,
};
const pic_axios = axios.create(op);

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
      image_group: 0,
      PRE_MAX: 10,
      img_urls: [],
      current_img_array: [],
      loadingDotCount: 3,
      img_info: false,
    }
  },
  methods: {
    update_node_id: function (node_id) {
      // console.log(`App.vue node id: ${node_id},this.node_id:${this.node_id}`);
      if (node_id !== this.node_id) {
        // Reset value
        this.image_group = 0;
        this.loadingDotCount = 3;
        this.img_urls = new Map(this.keyMap).get(node_id);
        this.node_id = node_id;
        this.current_img_array = [];
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
      this.image_group++;
      low = low === null
          ? (this.image_group - 1) * this.PRE_MAX
          : low;
      let high = this.image_group * this.PRE_MAX;
      // console.log(`high: ${high},length: ${this.img_urls.length}`);
      if (low <= this.img_urls.length) {
        // console.log("low<");
        let data = this.img_urls.slice(low, high);
        this.current_img_array = this.current_img_array.concat(data);
      }
      if (high > this.img_urls.length) {
        // console.log("waterfall over");
        // this.$refs.waterfall.waterfallOver();
        this.loadingDotCount = 0;
      }
    },
    change_img_info: function (value) {
      // console.log(`change_img_info:${value}`);
      this.img_info = value;
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
      return this.image_group * this.PRE_MAX > this.img_urls.length;
    }
  },
  mounted() {
    pic_axios.get('files')
        .then(res => {
          if (res.status === 200) {
            let parse = res.data;
            this.tree_data = parse.tree_data;
            this.keyMap = parse.keyMap;
            // update to img_urls
            let map = new Map(this.keyMap);
            this.img_urls = map.get(this.node_id);
            this.getData();
          } else {
            console.error({
              status: res.status,
              statusText: res.statusText,
              body: res.data
            });
            alert("加载失败!!!");
          }
        })
        .catch(e => console.log(e));
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

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
    top: 32px;
    bottom: 24px;
    width: 100%;
  }
}

#water-fall {
  overflow: auto;
  position: relative;

  .some-info {
    line-height: 1.6;
    text-align: center;
  }
}
</style>
