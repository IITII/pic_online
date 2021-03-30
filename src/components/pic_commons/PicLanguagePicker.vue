<template>
  <div>
    <q-select
      v-model="lang"
      :options="langOptions"
      color="pink"
      :dark="true"
      :options-dark="false"
      dropdown-icon="translate"
      dense
      :options-dense="false"
      borderless
      emit-value
      map-options
    />
  </div>
</template>

<script>
export default {
  name: 'PicLanguagePicker',
  data () {
    return {
      langOptions: [
        {
          value: 'en-us',
          label: 'English'
        },
        {
          value: 'zh-cn',
          label: '简体中文'
        }
      ]
    }
  },
  computed: {
    lang: {
      get: function () {
        this.$log.debug('Get language setting')
        return this.$store.getters['uiControl/language'] || this.$q.lang.getLocale() || 'zh-cn'
      },
      set: function (lang) {
        this.$log.debug(`Set language to ${lang}`)
        this.$i18n.locale = lang
        this.$store.dispatch('uiControl/setLanguage', lang)
      }
    }
  },
  beforeMount () {
    this.$i18n.locale = this.lang
  }
}
</script>

<style scoped>

</style>
