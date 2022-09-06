<template>
  <div>
    <q-select
      v-model="lang" :dark="true"
      :options="langOptions"
      :options-dark="false"
      :options-dense="false"
      borderless
      color="pink" dense dropdown-icon="translate"
      emit-value map-options/>
  </div>
</template>

<script>
/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2021/05/06 15:56
 */
'use strict'

export default {
  name: 'PicLanguagePicker',
  data() {
    return {
      langOptions: [
        {
          value: 'en-us',
          // label: 'En',
          label: 'English',
        },
        {
          value: 'zh-hans',
          label: '简体',
          // label: '简体中文',
        }
      ]
    }
  },
  computed: {
    lang: {
      get: function () {
        this.$log.debug('Get language setting')
        return this.$store.getters['user/language'] || this.$q.lang.getLocale() || 'zh-hans'
      },
      set: function (lang) {
        this.$log.debug(`Set language to ${lang}`)
        this.$i18n.locale = lang
        this.$store.dispatch('user/language', lang)
      }
    }
  },
  beforeMount() {
    this.$i18n.locale = this.lang
  }
}
</script>

<style scoped>

</style>
