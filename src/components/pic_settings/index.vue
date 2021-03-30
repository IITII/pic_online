<template>
  <div>
    <q-dialog ref="dialog" @hide="onDialogHide">
      <q-card
        class="pic_settings_card"
      >

        <q-tabs
          v-model="tab"
          class="text-teal"
          active-bg-color="pink-1"
          active-color="pink-4"
          indicator-color="pink-5"
        >
          <q-tab :label="$t('api_setting')" name="api"/>
          <q-tab :label="$t('ui_setting')" name="ui"/>
          <q-tab :label="$t('about')" name="about"/>
        </q-tabs>

        <q-separator/>

        <q-tab-panels v-model="tab"
                      animated
        >
          <q-tab-panel name="api">
            <pic-settings-api/>
          </q-tab-panel>

          <q-tab-panel name="ui">
            <pic-settings-u-i/>
          </q-tab-panel>
          <q-tab-panel name="about">
            <pic-settings-about
              :name="authorInfo.repo.name"
              :author="authorInfo.repo.author"
            />
          </q-tab-panel>
        </q-tab-panels>

        <q-separator/>

        <q-card-section
          style="
height: 25px;
text-align: center;
padding: 2px;
"
        >
          <div>
            <a
              :href="authorInfo.repo.url"
              target="_blank"
            >
              <q-badge
                :color="badge.color"
                :text-color="badge.text_color"
                outline
              >
                {{ authorInfo.repo.url }}
              </q-badge>
            </a>
          </div>

        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import PicSettingsApi from 'components/pic_settings/PicSettingsApi'
import PicSettingsUI from 'components/pic_settings/PicSettingsUI'
import PicSettingsAbout from 'components/pic_settings/PicSettingsAbout'

export default {
  name: 'PicSettings',
  components: {
    PicSettingsAbout,
    PicSettingsUI,
    PicSettingsApi
  },
  data () {
    return {
      authorInfo: {
        repo: {
          name: 'Pic Online',
          url: 'https://github.com/iitii/pic_online',
          author: 'Github@IITII'
        }
      },
      badge: {
        color: 'pink',
        text_color: 'white'
      },
      tab: 'about'
    }
  },
  methods: {
    // following method is REQUIRED
    // (don't change its name --> "show")
    show () {
      this.$log.debug('show')
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$log.debug('hide')
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      this.$log.debug('hide')
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      this.$log.debug('onClick')
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      this.$log.debug('onCancelClick')
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>

<style scoped>
.pic_settings_card {
  width: 30rem;
}

</style>
