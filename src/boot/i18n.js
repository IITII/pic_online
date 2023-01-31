import { boot } from 'quasar/wrappers'
// disable for i18n warning
import { createI18n } from 'vue-i18n/dist/vue-i18n.cjs.js'
import messages from 'src/i18n'

const i18n = createI18n({
  locale: 'zh-CN',
  fallbackLocale: 'en-US',
  messages
})

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n)
})

export { i18n }
