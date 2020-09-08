<template>
  <div>
    <el-divider></el-divider>
    <footer>
      <el-collapse v-model="activeName" accordion disabled="disable">
        <el-collapse-item name="1" title="About">
          <div style="text-align: left">
            <ul>
              <li>
                Author: <a href="https://github.com/IITII"
                           target="_blank">
                Github@IITII
              </a>
              </li>
              <li>
                Repo: <a href="https://github.com/IITII/pic_online"
                         target="_blank">
                IITII@Pic_Online
              </a>
              </li>
            </ul>
          </div>
        </el-collapse-item>
        <el-collapse-item name="2" title="Feedback">
          <div>Github issues:
            <a href="https://github.com/IITII/pic_online/issues">
              Pic_Online@ISSUE
            </a>
          </div>
        </el-collapse-item>
      </el-collapse>
    </footer>
  </div>
</template>

<script>
export default {
  name: "pic_footer",
  data() {
    return {
      activeName: '0'
    };
  }
}
</script>

<style scoped>
</style>