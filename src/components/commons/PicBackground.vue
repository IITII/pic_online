<template>
  <div v-show="back">
    <div class="background">
      <img :alt="imgAlt" :src="back" class="img">
    </div>
  </div>
</template>

<script>/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2021/05/04 10:02
 */
'use strict'

import {getDocumentHeight} from 'src/utils/utils.js'
import {mapState} from 'vuex'

export default {
  name: 'PicBackground',
  computed: {
    ...mapState({
      background: state => state.common.background
    }),
    back() {
      return this.backgroundImage || this.background
    },
  },
  beforeMount() {
    this.$log.debug(this.background)
    this.resizeImage()
  },
  methods: {
    resizeImage() {
      // 手动设置背景图片size
      let background = document.getElementsByClassName('background')
      if (background && background.length > 0) {
        background = background[0]
        const size = `${getDocumentHeight()}px`
        this.$log.debug(`Resize image height to ${size}`)
        background.style.height = size
      }
    }
  },
  watch: {
    back(b) {
      if (b) {
        this.resizeImage()
      }
    }
  },
  props: {
    backgroundImage: {
      type: String,
      default: ''
    },

    imgAlt: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.background {
  z-index: -1;
  position: absolute;
  top: 0;
  height: calc(100vh);
  width: 100%;
  transition: all 0.2s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.img {
  transform: scale(1.02);
  transition: all 0.2s linear;
  background: var(--background-darken-color);
  filter: blur(3px);
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
