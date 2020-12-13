<template>
  <div>
    <q-dialog ref="dialog" @hide="onDialogHide">
      <q-card>

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
            The QCard component is a great way to display important pieces of grouped content.
          </q-tab-panel>

          <q-tab-panel name="ui">
            With so much content to display at once, and often so little screen real-estate,
            Cards have fast become the design pattern of choice for many companies, including
            the likes of Google and Twitter.
          </q-tab-panel>
          <q-tab-panel name="about">
            <q-card
              class="bg-secondary text-white"
            >
              <q-card-section>
                <div class="text-h6☝︎">{{ authorInfo.repo.name }}</div>
                <div class="text-subtitle3">Github@IITII</div>
              </q-card-section>
              <q-card-section>
                {{ $t('repo_description') }}
              </q-card-section>
            </q-card>
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
export default {
  name: 'PicSettings',
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
      this.$refs.dialog.show()
    },

    // following method is REQUIRED
    // (don't change its name --> "hide")
    hide () {
      this.$refs.dialog.hide()
    },

    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$emit('hide')
    },

    onOKClick () {
      // on OK, it is REQUIRED to
      // emit "ok" event (with optional payload)
      // before hiding the QDialog
      this.$emit('ok')
      // or with payload: this.$emit('ok', { ... })

      // then hiding dialog
      this.hide()
    },

    onCancelClick () {
      // we just need to hide dialog
      this.hide()
    }
  }
}
</script>

<style scoped>

</style>
