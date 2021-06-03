<template>
  <q-card>
    <q-tabs v-model="selectTab"
            active-bg-color="pink-1"
            active-color="pink-4"
            align="justify"
            class="text-teal"
            indicator-color="pink-5">
      <q-tab v-for="t in tabs" :key="t"
             :label="$t(t)" :name="t"/>
    </q-tabs>
    <q-separator/>

    <q-tab-panels v-model="selectTab" animated>
      <q-tab-panel :name="tabs[0]">
        <moleculer-configuration/>
      </q-tab-panel>
      <q-tab-panel :name="tabs[1]">
        <moleculer-nodes/>
      </q-tab-panel>
      <q-tab-panel :name="tabs[2]">
        <moleculer-services/>
      </q-tab-panel>
    </q-tab-panels>

    <q-separator/>
    <q-card-section
      style="height: 25px;text-align: center;padding: 2px;">
      <a :href="authorInfo.repo.url" style="text-decoration: none;"
         target="_blank">
        <q-badge :color="badge.color" :text-color="badge.text_color"
                 outline>
          {{ authorInfo.repo.url }}
        </q-badge>
      </a>
    </q-card-section>
  </q-card>
</template>

<script>
/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2021/06/03 10:12
 */
'use strict'
import MoleculerConfiguration from 'components/moleculer_status/MoleculerConfiguration.vue'
import MoleculerNodes from 'components/moleculer_status/MoleculerNodes.vue'
import MoleculerServices from 'components/moleculer_status/MoleculerServices.vue'

const tabs = 'configure,nodes,services'.split(',')
export default {
  name: 'index',
  components: {MoleculerServices, MoleculerNodes, MoleculerConfiguration},
  data() {
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
      tabs, selectTab: tabs[0],
    }
  },
}
</script>

<style scoped>
.q-tab-panel {
  padding: 0;
}
</style>
