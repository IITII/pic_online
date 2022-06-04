<template>
  <div>
    <pic-background/>
    <q-card class="setting_sty">
      <q-tabs v-model="selectTab"
              active-bg-color="pink-1"
              active-color="pink-4"
              align="justify"
              class="text-teal"
              indicator-color="pink-5">
        <q-tab v-for="t in namespace.keys()" :key="t"
               :label="t" :name="t"/>
      </q-tabs>
      <q-separator/>

      <q-tab-panels v-model="selectTab" animated>
        <q-tab-panel v-for="(t, i) in namespace.keys()" :key="i" :name="t">
          <q-input
            v-for="item in namespace.get(selectTab)"
            :key="item"
            v-model="store[item]"
            :label="item"
            :dense="dense">
          </q-input>
        </q-tab-panel>
      </q-tab-panels>

      <q-card-section style="text-align: center;padding: 3px;">
        <q-btn @click="submit" color="primary" :label="$t('submit')" class="btn-style"/>
        <q-btn @click="reset" color="accent" :label="$t('revert')" class="btn-style"/>
        <q-btn @click="btn_default" color="negative" :label="$t('default')" class="btn-style"/>
      </q-card-section>

      <q-separator/>

      <q-card-section
        style="height: 25px;text-align: center;padding: 2px;">
        <a :href="authorInfo.repo.url" style="text-decoration: none;"
           target="_blank">
          <q-badge :color="badge.color" :text-color="badge.text_color"
                   outline>
            {{ authorInfo.repo.name }}
          </q-badge>
        </a>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2022/06/04
 */
'use strict'

import PicBackground from 'components/commons/PicBackground'

export default {
  name: "StoreSetting",
  components: {PicBackground},
  data() {
    return {
      selectTab: '',
      store: {},
      dense: false,
      authorInfo: {
        repo: {
          name: 'Vue Store Management by IITII',
          url: 'https://github.com/iitii/pic_online',
          author: 'Github@IITII',
        },
      },
      badge: {
        color: 'pink',
        text_color: 'white',
      },
    }
  },
  mounted() {
    this.reset()
  },
  computed: {
    namespace() {
      const namespaces = new Map()
      const defaultNamespace = 'default'
      for (let key in this.store) {
        const k = key.includes('/') ? key.split('/')[0] : defaultNamespace
        if (namespaces.has(k)) {
          namespaces.set(k, namespaces.get(k).concat(key))
        } else {
          namespaces.set(k, [key])
        }
      }
      return namespaces
    },
  },
  methods: {
    submit() {
      const statesName = this.namespace.get(this.selectTab)
      for (let key in statesName) {
        const stateName = statesName[key]
        this.$store.dispatch(stateName, this.store[stateName])
      }
    },
    reset() {
      this.store = JSON.parse(JSON.stringify(this.$store.getters))
      this.$log.debug(this.namespace.keys().next().value)
      this.selectTab = this.namespace.keys().next().value
    },
    btn_default() {
      localStorage.clear()
    },
  },
}
</script>

<style scoped>
.btn-style {
  width: 30%;
  margin-right: 3%;
}

.setting_sty {
  width: 90%;
  margin: 3% 3% 3% 3%;
}
</style>
