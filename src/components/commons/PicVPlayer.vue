<template>
  <div>
    <q-dialog ref="player">
      <q-card :style="computedCardStyle"
              class="player">
        <q-card-section v-if="info"
                        ref="player_title"
                        :class="color"
                        style="padding: 0.5rem">
          <div class="text-h6">{{ info }}</div>
        </q-card-section>
        <q-card-section class="player-padding">
          <video-player ref="videoPlayer"
                        :playback-rate="playbackRate"
                        :options="playerOpts"
                        customEventName="changed"
                        @changed="playerStateChanged($event)"
                        @ready="playerIsReady"/>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2021/05/11 17:18
 */
'use strict'
// require styles
import 'video.js/dist/video-js.css'
import 'videojs-hotkeys'

import {VideoPlayer} from '@videojs-player/vue'
import { toRaw } from '@vue/reactivity'
import {mapState} from 'vuex'
import {getDocumentHeight, getDocumentWidth} from 'src/utils/utils.js'

export default {
  name: 'PicVPlayer',
  components: {VideoPlayer},
  props: {
    info: {
      type: String,
      required: false,
      default: '',
    },
    video: {
      type: String,
      required: true,
    },
    src: {
      type: String,
      required: false,
      default: '',
    },
    height: {
      type: Number,
      required: false,
      default: 300,
    },
    width: {
      type: Number,
      required: false,
      default: 600,
    },
  },
  computed: {
    ...mapState({
      user_type: state => state.user.user_type,
    }),
    color() {
      const admins = [0, 1]
      return admins.indexOf(this.user_type) >= 0
        ? 'bg-pink-4 text-white text-center'
        : 'bg-primary text-white text-center'
    },
    player() {
      return this.$refs.videoPlayer.player
    },
    // 对播放器进行等比例缩放
    computedSize() {
      const rate = this.height / this.width,
        // 4:3, 18:9
        innerWidth = getDocumentWidth() * 0.8,
        innerHeight = getDocumentHeight() * 0.8,
        maxWidth = this.width > innerWidth ? innerWidth : this.width,
        maxHeight = this.height > innerHeight ? innerHeight : this.height,
        // max width
        tmpHeight = Math.floor(maxWidth * rate),
        // max height
        tmpWidth = Math.floor(maxHeight / rate),
        res = {height: 0, width: 0}
      if (tmpHeight > maxHeight) {
        res.height = maxHeight
        res.width = tmpWidth
      } else if (tmpWidth > maxWidth) {
        res.height = tmpHeight
        res.width = maxWidth
      } else {
        res.height = tmpHeight
        res.width = tmpWidth
      }
      return res
    },
    computedCardStyle() {
      // this.$log.debug('player_title: ' + this.$refs.player_title.$el.innerText)
      const res = [],
        computed = this.computedSize
      for (const k in computed) {
        // 需要加上 dialog 标题栏的高度
        // 最好可以通过 this.$refs 获取到标题栏的高度
        res.push(`${k}: ${k === 'height' ? computed[k] + 48 : computed[k]}px`)
      }
      return res.join(';')
    },
    playerOpts() {
      return {
        autoplay: false,
        language: 'zh',
        languages: ['zh', 'en'],
        liveui: true,
        controls: true,
        html5: {
          nativeControlsForTouch: true,
        },
        playbackRates: [0.7, 1.0, 1.1, 1.2, 1.5, 2.0],
        ...this.computedSize,
        sources: [{
          // type: 'video/mp4',
          src: this.video,
          // techOrder: ['flash'],
        }],
        poster: this.src,
        plugins: {
          hotkeys: {
            volumeStep: 0.1,
            seekStep: 5,
            enableModifiersForNumbers: false,
            // eslint-disable-next-line no-unused-vars
            fullscreenKey: function (event, player) {
              // override fullscreen to trigger when pressing the F key or Ctrl+Enter or Enter
              return ((event.which === 70) || (event.ctrlKey && event.which === 13)) || event.which === 13
            },
          },
        },
      }
    },
  },
  data() {
    return {
      playbackRate: 1.1,
    }
  },
  methods: {
    playerStateChanged(playerCurrentState) {
      // this.$log.debug('player state changed', playerCurrentState)
    },
    playerIsReady(player) {
      this.$log.debug('player ready!', player, toRaw(player), player.target.player)
      // debugger
    },

    show() {
      this.$log.debug('show')
      this.$refs.player.show()
      // this.$log.debug(this.$refs.player)
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide() {
      this.$log.debug('hide')
      this.$refs.player.hide()
    },

    onDialogHide() {
      this.$log.debug('hide')
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick() {
      this.$log.debug('onClick')
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick() {
      this.$log.debug('onCancelClick')
      // we just need to hide dialog
      this.hide()
    },
  },
  mounted() {
    this.$log.debug('mounted', this.$refs.player.$el)
    // support for pot player hotkeys
    this.$refs.player.$el.onkeydown = (e) => {
      this.$log.debug('keydown', e)
      switch (e.key) {
        case 'c':
          this.playbackRate += 0.1
          break
        case 'x':
          this.playbackRate -= 0.05
          break
        case 'z':
          this.playbackRate = 1.0
          break
      }
      this.playbackRate = +this.playbackRate.toFixed(2)
    }
  },
  unmounted() {
    this.$log.debug('unmounted')
  },
}
</script>

<style scoped>
.player {
  width: 600px;
  max-width: 100vw;
  max-height: 100vh;
}

.player-padding {
  /*padding: 16px 0 0 0;*/
  padding: 0;
}
</style>
