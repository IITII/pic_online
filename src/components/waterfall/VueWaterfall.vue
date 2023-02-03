<template>
  <div class="vue3-waterfall" id="waterfallBox">
    <div class="vue3-waterfall-scroller" ref="scrollElRef">
      <div
        v-for="(item, index) in waterfallList"
        :key="index"
        class="vue3-waterfall-item" :style="{top: item._top+'px', left: item._left+'px', width: item._width+'px', height:item._height+'px'}"
      >
        <div class="vue3-waterfall-item_image">
          <slot :item="item">
            <img :src="item.imgSrc">
          </slot>
        </div>
        <div class="vue3-waterfall-item_footer" :style="{height: footerHeight + 'px'}">
          <slot name="footer" :item="item">
            <p class="title">{{ item.title }}</p>
            <p class="info">{{ item.info }}</p>
          </slot>
        </div>
      </div>
    </div>
    <!-- 加载更多 -->
    <div class="vue3-waterfall-loading" v-if="isPreloading && !nomore">
      <slot name="loading">
        加载中...
      </slot>
    </div>
    <div class="vue3-waterfall-nomore" v-if="nomore">
      <slot name="nomore">
        没有更多数据了
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs, onMounted, onUnmounted, watch, nextTick, Ref, computed } from 'vue'

interface IWaterfallProps {
  width?: number
  height?: number
  gap: number
  colWidth?: number
  cols?: number
  footerHeight: number
  list: any[]
  nomore: boolean
  scrollDisabled: boolean
  scrollDelay: number
  scrollDistance: number
  scrollImmediate: boolean
}

export default defineComponent({
  name: 'VueWaterfall',
  props: {
    width: Number,
    height: Number,
    colWidth: Number,
    cols: Number,
    gap: {
      type: Number,
      default: 15
    },
    // 图片底部块高度
    footerHeight: {
      type: Number,
      default: 0
    },
    // 数据列表
    list: {
      type: Array,
      default: () => ([])
    },
    // 是否已加载完
    nomore: {
      type: Boolean,
      default: false
    },
    // 是否禁用滚动加载
    scrollDisabled: {
      type: Boolean,
      default: false
    },
    // 节流时延，单位为ms
    scrollDelay: {
      type: Number,
      default: 200
    },
    // 触发加载的距离阈值，单位为px
    scrollDistance: {
      type: Number,
      default: 0
    },
    // 是否立即执行加载方法，以防初始状态下内容无法撑满容器
    scrollImmediate: {
      type: Boolean,
      default: true
    }
  },
  setup(props: IWaterfallProps, ctx) {
    const state: {
      containerWidth: number
      colW: number
      colC: number
      beginIndex: number
      heightArr: number[]
      waterfallList: any[]
      isPreloading: boolean
    } = reactive({
      // 容器宽
      containerWidth: props.width || 0,
      // 列宽
      colW: props.colWidth || 240,
      // 列数
      colC: props.cols || 0,
      beginIndex: 0,
      heightArr: [],
      waterfallList: [],
      isPreloading: false
    })
    const scrollElRef: Ref<HTMLDivElement | null> = ref(null)

    const initWaterfall = () => {
      // 初始化容器宽度
      if (!props.width) {
        const dom: HTMLDivElement | null = document.querySelector('#waterfallBox')
        dom && (state.containerWidth = dom.offsetWidth)
      }
      // 初始化列宽
      if (props.cols) {
        state.colW = Math.floor((state.containerWidth - (props.cols - 1) * props.gap) / props.cols)
      } else {
        state.colC = Math.floor(state.containerWidth / (state.colW + props.gap))
      }
      if (state.beginIndex === 0) {
        state.waterfallList = []
        state.heightArr = new Array(state.colC)
        for (let i = 0; i < state.heightArr.length; i++) {
          state.heightArr[i] = 0
        }
      }
      preload()
    }

    const preload = () => {
      if (state.isPreloading || !props.list.length) return false
      state.isPreloading = true
      for (let i = state.beginIndex; i < props.list.length; i++) {
        const item = props.list[i]
        let img = new Image()
        img.src = item.imgSrc
        img.onload = img.onerror = (e: any) => {
          const minIndex = filterMin()
          item._width = state.colW
          item._height = Math.floor(state.colW * img.height / img.width + props.footerHeight)
          item._top = state.heightArr[minIndex]
          item._left = minIndex * (item._width + props.gap)
          state.heightArr[minIndex] += (item._height + props.gap)
          state.waterfallList.push(item)
          if (e.type === 'error') {
            item._error = true
            ctx.emit('imageError', item)
          }
          if (i === props.list.length - 1) {
            state.beginIndex = props.list.length
            ctx.emit('preLoaded')
            state.isPreloading = false
            // 判断是否自动加载
            if (!props.scrollDisabled) {
              props.scrollImmediate && scrollFn()
            }
          }
        }
      }
    }

    const filterMin = () => {
      const min = Math.min.apply(null, state.heightArr)
      return state.heightArr.indexOf(min)
    }

    const response = () => {
      state.beginIndex = 0
      initWaterfall()
    }

    const scrollFn = () => {
      if (state.isPreloading || props.nomore) return false
      const scrollEl = scrollElRef.value
      const minHeight = Math.max.apply(null, state.heightArr)
      if (scrollEl !== null && scrollEl.scrollTop + scrollEl.offsetHeight + props.gap >= minHeight - props.scrollDistance) {
        state.isPreloading = true
        ctx.emit('scrollReachBottom') // 滚动触底
      }
    }

    const reset = () => {
      state.beginIndex = 0
      state.isPreloading = false
      initWaterfall()
    }

    watch(() => props.list, (val, oldVal) => {
      if (val.length) {
        // 首次
        if (!oldVal || !oldVal.length) {
          nextTick(() => {
            initWaterfall()
          })
        } else if (oldVal.length !== val.length) {
          state.isPreloading = false
          preload()
        }
      } else {
        reset()
      }
    }, {
      immediate: true
    })

    onMounted(() => {
      window.addEventListener('resize', response)
      // 监听滚动事件
      if (!props.scrollDisabled && scrollElRef.value !== null) {
        scrollElRef.value.addEventListener('scroll', scrollFn)
      }
    })

    onUnmounted(() => {
      window.removeEventListener('resize', response)
    })

    return {
      ...toRefs(state),
      ...toRefs(props),
      scrollElRef
    }
  }
})
</script>

<style scoped>
.vue3-waterfall{
  position: relative;
  width: 100%;
  height: 100%;
}
.vue3-waterfall-scroller{
  position: relative;
  width: 100%;
  height: 100%;
  /*overflow-x: hidden;*/
  /*overflow-y: scroll;*/
  -webkit-overflow-scrolling: touch;
}
.vue3-waterfall-item{
  position: absolute;
  box-sizing: border-box;
  box-shadow: 0 2px 6px 0 rgb(0 0 0 / 10%);
}
.vue3-waterfall-item img{
  display: block;
  width: 100%;
  height: auto;
}
.vue3-waterfall-item_footer{
  overflow: hidden;
}
.vue3-waterfall-item_footer .title{
  margin: 0;
}
.vue3-waterfall-item_footer .info{
  margin: 0;
}
.vue3-waterfall-loading{
  position: absolute;
  bottom: 15px;
  width: 100%;
  text-align: center;
}
.vue3-waterfall-nomore{
  width: 100%;
  text-align: center;
}
</style>
