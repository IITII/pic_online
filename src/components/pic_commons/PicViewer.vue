<template>
  <div>
    <viewer
      ref="viewer"
      :images="images"
      :options="viewer.options"
      class="viewer"
      @inited="initViewer"
    >
      <template slot-scope="scope">
        <div class="hidden">
          <figure class="images">
            <div v-for="{info, src} in scope.images" :key="src" class="image-wrapper">
              <img :alt="info" :src="src" class="image"/>
            </div>
          </figure>
        </div>
      </template>
    </viewer>
  </div>
</template>

<script>
/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2021/03/30 18:39
 */
'use strict'
import 'viewerjs/dist/viewer.css'
import Viewer from 'v-viewer'

import Vue from 'vue'
import { mapState } from 'vuex'

Vue.use(Viewer, {
  debug: true
})

export default {
  name: 'PicViewer',
  props: {
    visible: {
      type: Boolean,
      required: true,
      default: false
    },
    images: {
      type: Array,
      required: true
    }
  },
  watch: {
    visible (v) {
      this.$log.warn(v)
      if (v) {
        this.$viewer.show()
      }
    }
  },
  data () {
    return {
      viewer: {
        options: {
          toolbar: true,
          // Enable keyboard support.
          keyboard: true,
          // Focus the active item in the navbar when initialized.
          /// Requires the keyboard option set to true.
          focus: true,
          // The amount of time to delay between
          // automatically cycling an image when playing.
          interval: 2000,
          // Define where to get the original image URL for viewing.
          /// If it is a function, it should return a valid image URL.
          /// If string, it should be one of the attributes of each image element.
          url: 'src',
          // Indicate if enable loop viewing or not.
          /// If the current image is the last one,
          /// then the next one to view is the first one, and vice versa.
          loop: false
        }
      }
    }
  },
  computed: {
    ...mapState({
      viewerPlayInterval: state => state.uiControl.viewerPlayInterval
    })
  },
  methods: {
    // Redefine `next()` and `hide()` function
    initViewer (viewer) {
      this.$log.warn(viewer)
      const hide = viewer.hide,
        next = viewer.next,
        self = this
      viewer.hide = function () {
        // see: https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6
        self.$emit('update:visible', false)
        hide.call(viewer)
      }
      viewer.next = function () {
        if (viewer.index === viewer.length - 1) {
          self.$emit('loadMore')
        }
        next.call(viewer)
      }

      this.$viewer = viewer
    },
    show () {
      this.visible = true
    }
  },
  mounted () {
    this.$log.debug('PicViewer Mounted.')
    this.$log.debug(`this.viewerPlayInterval: ${this.viewerPlayInterval}`)
    this.viewer.options.interval = this.viewerPlayInterval
  },
  beforeDestroy () {
    this.$log.debug('PicViewer BeforeDestroy.')
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

.viewer {
  height: 100%;

  .images {
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    flex-wrap: wrap;
    padding: 5px;

    .image-wrapper {
      display: inline-block;
      width: calc(33% - 20px);
      margin: 5px 5px 0 5px;

      .image {
        width: 100%;
        max-width: 400px;
        cursor: pointer;
        display: inline-block;
      }
    }
  }
}
</style>
