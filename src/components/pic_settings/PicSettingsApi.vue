<template>
  <div>
    <q-card-section>
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-card-section>
          <q-select
            v-model="api.tree.method"
            :label="$t('tree_request_method')"
            :options="api.tree.selectOptions"
            color="pink"
            :dark="false"
            :options-dark="false"
            dense
            :options-dense="false"
            emit-value
            map-options
            style="min-width: 7rem"
          />
          <q-input
            v-model="api.tree.url"
            :label="$t('tree_request_url')"
            :hint="api.tree.hint"
            :lazy-rules="true"
            :rules="api.validate.rules"
          ></q-input>
        </q-card-section>
        <q-card-section>
          <q-select
            v-model="api.pic.method"
            :label="$t('pic_request_method')"
            :options="api.pic.selectOptions"
            color="pink"
            :dark="false"
            :options-dark="false"
            dense
            :options-dense="false"
            emit-value
            map-options
            style="min-width: 7rem"
          />
          <q-input
            v-model="api.pic.url"
            :hint="api.pic.hint"
            :label="$t('pic_request_url')"
            :lazy-rules="true"
            :rules="api.validate.rules"
          ></q-input>
        </q-card-section>
        <q-card-actions
          align="right"
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
  name: 'PicSettingsApi',
  data () {
    return {
      api: {
        tree: {
          method: '',
          url: '',
          hint: 'https://api.example.com:8000/tree',
          selectOptions: [
            {
              value: 'GET',
              label: 'GET',
              disable: false
            },
            {
              value: 'POST',
              label: 'POST',
              disable: true
            }
          ]
        },
        pic: {
          method: '',
          url: '',
          hint: 'https://api.example.com:8000/pic',
          selectOptions: [
            {
              value: 'GET',
              label: 'GET',
              disable: true
            },
            {
              value: 'POST',
              label: 'POST',
              disable: false
            }
          ]
        },
        validate: {
          rules: [
            val => val.length > 0 || this.$t('data_validate_error')
          ]
        }
      }
    }
  },
  methods: {
    reset: function () {
      this.$log.debug("Reset form's values base on Vuex Store and localStorage")
      this.api.tree.method = this.$store.getters['apiSetting/treeMethod']
      this.api.tree.url = this.$store.getters['apiSetting/treeUrl']
      this.api.pic.method = this.$store.getters['apiSetting/picMethod']
      this.api.pic.url = this.$store.getters['apiSetting/picUrl']
    },
    onSubmit: function () {
      this.$log.debug('submit')
      this.$store.dispatch('apiSetting/setTreeMethod', this.api.tree.method)
      this.$store.dispatch('apiSetting/setTreeUrl', this.api.tree.url)
      this.$store.dispatch('apiSetting/setPicMethod', this.api.pic.method)
      this.$store.dispatch('apiSetting/setPicUrl', this.api.pic.url)
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

</style>
