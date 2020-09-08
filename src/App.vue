<template>
  <div id="app" class="full-height">
    <el-container class="full-height">
      <el-header>
        <pic_nav_bar
            :tree_data="tree_data"
            @pic_node_click="update_node_id"
        />
      </el-header>
      <el-main id="water-fall">
        <div id="content">
          <vue_waterfall_easy
              :imgs-arr="render_waterfall_by_urls"
              link-range="img"
              @imgError="imgErrorEvent"
              @scrollReachBottom="getData"
          >
            <span slot-scope="props" class="some-info">
              {{ props.value.info }}
            </span>
            <div slot="waterfall-over">waterfall-over</div>
          </vue_waterfall_easy>
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
import vue_waterfall_easy from "vue-waterfall-easy";
// import pic_view_list from "@/views/pic_view_list";
import axios from 'axios';

const path = require('path');

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
    vue_waterfall_easy
  },
  data() {
    return {
      keyMap: [],
      tree_data: {},
      node_id: 1,
      image_group: 1,
      PRE_MAX: 10,
      img_urls: [],
      current_img_array: [],
    }
  },
  methods: {
    update_node_id: function (node_id) {
      // console.log(`App.vue node id: ${node_id}`);
      this.node_id = node_id;
      this.image_group = 0;
    },
    imgErrorEvent: function (imgItem) {
      console.log('图片加载错误', imgItem)
    },
    isNil: function (object) {
      return object == null;
    },
    getData: function () {
      this.image_group++;
      console.log(this.image_group);
      let high = this.image_group * this.PRE_MAX;
      console.log(`high: ${high},length: ${this.img_urls.length}`)
      if (high > this.img_urls.length) {
        console.log(">");
        this.current_img_array = this.img_urls;
        this.$refs.waterfall.waterfallOver();
      } else if (high < this.img_urls.length) {
        console.log("<");
        this.current_img_array = this.img_urls.slice(0, high);
      }
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
    /**
     * re-calc for waterfall
     * @return {[]|*[]}
     */
    render_waterfall_by_urls: function () {
      let tmp = [];
      this.img_urls.forEach(e => {
        let info = path.basename(e).split(".");
        // remove extend name
        info.pop();
        info = info.join('.');
        tmp.push({
          src: e,
          href: e,
          info: info,
        });
      });
      // console.log(`waterfall: ${JSON.stringify(tmp)}`);
      return tmp;
    },
  },
  watch: {
    node_id: function (new_val) {
      let map = new Map(this.keyMap);
      this.img_urls = map.get(new_val);
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
            // Init array
            this.current_img_array = this.img_urls.slice(0, this.PRE_MAX);
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
    bottom: 0;
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
