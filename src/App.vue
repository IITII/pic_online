<template>
  <div id="app">
    <el-container>
      <el-header>
        <pic_nav_bar :tree_data="tree_data"/>
      </el-header>
      <el-main>
        <pic_view_list :urls="update_urls_by_node_id"/>
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
import pic_view_list from "@/views/pic_view_list";
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
    pic_view_list,
    pic_footer,
    pic_nav_bar,
  },
  data() {
    return {
      keyMap: [],
      tree_data: {},
      node_id: 1,
    }
  },
  methods: {
    update_node_id: function (node_id) {
      console.log(`App.vue node id: ${node_id}`)
      this.node_id = node_id;
    }
  },
  computed: {
    update_urls_by_node_id: function () {
      let string = this.keyMap.get(this.node_id);
      console.log(string)
      if (string.length === 0) {
        return [];
      }
      return string;
    }
  },
  mounted() {
    pic_axios.get('files')
        .then(res => {
          if (res.status === 200) {
            console.log(res.data)
            let parse = res.data;
            this.tree_data = parse.tree_data;
            // Using Map to store url arrays
            this.keyMap = new Map(parse.keyMap);
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
