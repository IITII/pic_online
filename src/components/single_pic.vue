<template>
  <div
      class="block"
  >
    <el-card
        :body-style="{ padding: '0px' }"
        shadow="always"
    >
      <el-image
          :src=img_src
          class="single-pic"
          fit="cover"
          lazy
          @click="origin_url"
      >
        <div slot="error" class="image-slot">
          <i class="el-icon-picture-outline"></i>
        </div>
      </el-image>
      <div style="padding: 3%;">
        <el-tooltip
            :content=pic_basename
            class="item"
            effect="dark"
            placement="bottom"
        >
          <span><slot>
          {{ base_src }}
        </slot></span>
        </el-tooltip>
      </div>
    </el-card>
  </div>
</template>

<script>
const path = require('path');
export default {
  name: "single_pic",
  props: {
    img_src: {
      type: [URL, String],
      required: true
    },
    "preview-src-list": {
      type: [Array],
      required: false
    }
  },
  computed: {
    // 箭头函数会带有函数上下文，
    // 使得该函数不再指向 Vue,
    // 导致出错
    pic_basename: function () {
      return path.basename(this.img_src);
    },
    base_src: function () {
      let base_name = path.basename(this.img_src);
      if (base_name.length > 12) {
        return base_name.slice(0, 12) + "...";
      } else {
        return base_name;
      }
    }
  },
  methods: {
    origin_url: function () {
      window.location.href = this.img_src;
    }
  },
}
</script>

<style scoped>
</style>