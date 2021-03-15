<template>
  <div>

    <q-header
      elevated
      show-if-above
    >
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawer"
        />

        <q-toolbar-title>
          {{ selectNodeTitle }}
        </q-toolbar-title>

        <pic-language-picker/>
      </q-toolbar>
    </q-header>
  </div>
</template>

<script>
import PicLanguagePicker from 'components/PicLanguagePicker'
export default {
  name: 'PicHeader',
  components: { PicLanguagePicker },
  methods: {
    leftDrawer: function () {
      this.$store.dispatch('uiControl/reverseLeftDrawerOpen')
    }
  },
  computed: {
    selectNodeTitle: {
      get: function () {
        return this.$store.getters['uiControl/selectedNodeTitle']
      }
    }
  }
}
</script>

<style scoped>

</style>
