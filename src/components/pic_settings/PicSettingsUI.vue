<template>
  <div>
    <q-card-section>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-card-section
          class="margin0 padding0"
        >
          <q-input
            v-model="nodeKey"
            :label="$t('node_key_value')"
            :hint="$t('do_not_touch')"
            type="number"
            :lazy-rules="true"
            :rules="validate.rules.greaterOrEqualZero"
          ></q-input>
          <q-input
            v-model="waterfallCol"
            :label="$t('waterfall_col')"
            type="number"
            :lazy-rules="true"
            :rules="validate.rules.greaterThanZero"
          ></q-input>
          <q-input
            v-model="waterfallStride"
            :label="$t('waterfall_stride')"
            type="number"
            :lazy-rules="true"
            :rules="validate.rules.greaterThanZero"
          ></q-input>
          <q-input
            v-model="imgTitleMaxLength"
            :label="$t('img_title_max_length')"
            type="number"
            :lazy-rules="true"
            :rules="validate.rules.greaterThanZero"
          ></q-input>
          <q-input
            v-model="viewerPlayInterval"
            :label="$t('viewer_play_interval')"
            :lazy-rules="true"
            :rules="validate.rules.greaterThanZero"
            type="number"
          ></q-input>
        </q-card-section>
        <q-card-section
          class="margin0 padding0"
        >
          <q-list>
            <q-item v-ripple tag="label">
              <q-item-section>
                <q-item-label>{{ $t('show_img_title_or_not') }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-toggle
                  v-model="showImgTitle"
                  checked-icon="check"
                  color="pink"
                  keep-color
                  left-label
                  unchecked-icon="clear"
                />
              </q-item-section>
            </q-item>
            <q-item v-ripple tag="label">
              <q-item-section>
                <q-item-label>{{ $t('skip_empty_dir') }}</q-item-label>
              </q-item-section>
              <q-item-section avatar>
                <q-toggle
                  v-model="skipEmptyDir"
                  checked-icon="check"
                  color="pink"
                  keep-color
                  left-label
                  unchecked-icon="clear"
                />
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
        <q-card-actions
          align="right"
          class="margin0 padding0"
        >
          <q-btn
            :label="$t('submit')"
            type="submit"
            color="primary"
          />
          <q-btn
            :label="$t('reset')"
            @dblclick="onResetDbClick"
            type="reset"
            color="warning"
          />
        </q-card-actions>
      </q-form>
    </q-card-section>
  </div>
</template>

<script>
export default {
  name: 'PicSettingsUI',
  data () {
    return {
      nodeKey: 0,
      showImgTitle: false,
      skipEmptyDir: true,
      waterfallCol: 0,
      waterfallStride: 0,
      imgTitleMaxLength: 0,
      viewerPlayInterval: 0,
      validate: {
        rules: {
          greaterThanZero: [
            val => val > 0 || this.$t('data_validate_error')
          ],
          greaterOrEqualZero: [
            val => val >= 0 || this.$t('data_validate_error')
          ]
        }
      }
    }
  },
  methods: {
    reset: function () {
      this.$log.debug('Reset form\'s values base on Vuex Store and localStorage')
      this.nodeKey = this.$store.getters['uiControl/nodeKey']
      this.skipEmptyDir = this.$store.getters['uiControl/skipEmptyDir']
      this.waterfallCol = this.$store.getters['uiControl/waterfallCol']
      this.waterfallStride = this.$store.getters['uiControl/waterfallStride']
      this.imgTitleMaxLength = this.$store.getters['uiControl/imgTitleMaxLength']
      this.viewerPlayInterval = this.$store.getters['uiControl/viewerPlayInterval']
      this.showImgTitle = this.$store.getters['uiControl/showImgTitle']
    },
    onSubmit: function () {
      this.$log.debug('submit')
      this.$store.dispatch('uiControl/setNodeKey', this.nodeKey)
      this.$store.dispatch('uiControl/setSkipEmptyDir', this.skipEmptyDir)
      this.$store.dispatch('uiControl/setWaterfallCol', this.waterfallCol)
      this.$store.dispatch('uiControl/setWaterfallStride', this.waterfallStride)
      this.$store.dispatch('uiControl/setImgTitleMaxLength', this.imgTitleMaxLength)
      this.$store.dispatch('uiControl/setViewerPlayInterval', this.viewerPlayInterval)
      this.$store.dispatch('uiControl/setShowImgTitle', this.showImgTitle)
      this.$q.notify({
        message: this.$t('success'),
        type: 'positive',
        closeBtn: false,
        actions: [
          {
            label: this.$t('reload_page'),
            color: 'white',
            handler: () => {
              window.location.reload()
            }
          }
        ]
      })
    },
    onReset: function () {
      this.$log.debug('reset')
      this.reset()
      this.$q.notify({
        message: this.$t('success'),
        caption: this.$t('double_click_to_clean_all'),
        type: 'info'
      })
    },
    onResetDbClick: function () {
      this.$log.debug('Double Click...')
      localStorage.clear()
      this.$q.notify({
        message: this.$t('success'),
        type: 'info',
        closeBtn: false,
        actions: [
          {
            label: this.$t('reload_page'),
            color: 'white',
            handler: () => {
              window.location.reload()
            }
          }
        ]
      })
    }
  },
  mounted () {
    this.reset()
  }
}
</script>

<style scoped>

.margin0 {
  margin-top: 0;
  margin-bottom: 0;
}

.padding0 {
  padding-top: 0;
}
</style>
