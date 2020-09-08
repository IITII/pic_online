<template>
  <div id="app">
    <el-container>
      <el-header>
        <pic_nav_bar
            :tree_data="tree_data"
            @pic_node_click="update_node_id"
        />
      </el-header>
      <el-main>
        <vue_waterfall_easy
            :imgs-arr="render_waterfall_by_urls"
            link-range="img"
            @imgError="imgErrorEvent"
        ></vue_waterfall_easy>
        <el-divider></el-divider>
        <pic_view_list
            :urls="update_urls_by_node_id"
        />
      </el-main>
      <el-footer>
        <pic_footer/>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import pic_footer from "@/components/pic_footer";
import pic_nav_bar from "@/components/pic_nav_bar";
import vue_waterfall_easy from "vue-waterfall-easy";
import pic_view_list from "@/views/pic_view_list";
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
    pic_view_list,
    pic_footer,
    pic_nav_bar,
    vue_waterfall_easy
  },
  data() {
    return {
      keyMap: [],
      tree_data: {},
      node_id: 1,
      pic_urls: '',
    }
  },
  methods: {
    update_node_id: function (node_id) {
      // console.log(`App.vue node id: ${node_id}`)
      this.node_id = node_id;
    },
    imgErrorEvent: function (imgItem) {
      console.log('图片加载错误', imgItem)
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
      if (string === undefined || string === null || string.length === 0) {
        return [];
      }
      return string;
    },
    /**
     * re-calc for waterfall
     * @return {[]|*[]}
     */
    render_waterfall_by_urls: function () {
      let map = new Map(this.keyMap);
      let string = map.get(this.node_id);
      if (string === undefined || string === null || string.length === 0) {
        return [];
      }
      let tmp = [];
      string.forEach(e => {
        tmp.push({
          src: e,
          href: e,
          info: path.basename(e)
        });
      });
      // console.log(tmp);
      return tmp;
    }
  },
  mounted() {
    pic_axios.get('files')
        .then(res => {
          if (res.status === 200) {
            let parse = res.data;
            this.tree_data = parse.tree_data;
            this.keyMap = parse.keyMap;
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

<style>
#app {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
