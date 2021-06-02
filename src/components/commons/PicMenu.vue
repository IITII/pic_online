<template>
  <div>
    <q-btn dense flat icon="more" round>
      <q-menu fit>
        <q-list>
          <q-item v-for="(v,k) in links" :key="k"
                  v-close-popup :to="v.link"
                  clickable>
            <q-item-section v-if="v.icon" avatar>
              <q-icon :name="v.icon"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ v.title }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item v-close-popup clickable @click="logout">
            <q-item-section avatar>
              <q-icon name="logout"/>
            </q-item-section>
            <q-item-section>{{ $t('logout') }}</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
  </div>
</template>

<script>
/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2021/05/23 19:46
 */
'use strict'

import {afterLogout} from 'src/utils/utils.js'

export default {
  name: 'PicMenu',
  components: {},
  props: {
    menuLinks: {
      type: Array,
      required: false,
      default: _ => []
    }
  },
  computed: {
    links() {
      // const defaultLinks = [
      //   {
      //     title: this.$t('image'),
      //     icon: 'image',
      //     link: '/user/image'
      //   },
      //   {
      //     title: this.$t('video'),
      //     icon: 'movie',
      //     link: '/user/video'
      //   },
      // ]
      // return this.menuLinks.length > 0
      //   ? this.menuLinks
      //   : defaultLinks
      return this.menuLinks
    }
  },
  methods: {
    logout() {
      return afterLogout(this.$store, this.$axios)
    },
  },
}
</script>

<style scoped>

</style>
