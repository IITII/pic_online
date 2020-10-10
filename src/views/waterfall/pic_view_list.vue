<template>
  <div>
    <single_pic
        v-for="url in urls"
        :key="url"
        :img_src="url"
        class="single-pic"
    >
    </single_pic>
  </div>
</template>

<script>
import single_pic from "@/components/single_pic";

export default {
  name: "pic_view_list",
  components: {
    single_pic
  },
  props: {
    urls: {
      type: [Array],
      required: true
    }
  },
  watch: {
    // Watch for props, if urls length
    // equal zero throws waring
    urls: function (new_val) {
      if (new_val.length === 0) {
        this.$notify({
          title: '警告',
          message: '节点为空',
          type: 'warning'
        });
      }
    }
  }
}
</script>

<style scoped>
.single-pic {
  height: auto;
  width: 30%;
  display: inline-flex;
  padding: 0.5%;
}
</style>