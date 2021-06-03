<template>
  <div>
    <q-layout view="hHh lpR fff">
      <q-page-container style="padding-bottom: 0">
        <pic-background/>
        <div class="container">
          <div class="content">
            <link href="https://fonts.cat.net/css?family=Roboto:300" rel="stylesheet">
            <div class="title"> {{ title }}</div>
            <div class="textContent"> {{ description }}</div>
            <div>
              <q-btn v-if="token" :to="routeBaseOnUserType"
                     round>
                <q-avatar size="42px">
                  <q-icon name="dashboard"/>
                </q-avatar>
              </q-btn>
              <q-btn v-for="(btn, index) in btnGroup"
                     v-else
                     :key="index"
                     :label="btn.label"
                     :to="btn.link" class="button-group"
              ></q-btn>
            </div>
          </div>
        </div>
      </q-page-container>

      <q-page-container>
        <q-img v-for="(image, index) in images" :key="index" :src="image"/>
      </q-page-container>

    </q-layout>
  </div>
</template>

<script>/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2021/04/29 18:37
 */
'use strict'

import PicBackground from 'components/commons/PicBackground.vue'
import {afterLogin, afterLogout, getDocumentHeight} from 'src/utils/utils'
import {mapState} from 'vuex'

export default {
  name: 'Public',
  components: {PicBackground},
  data() {
    return {
      background: '',
      images: [],
    }
  },
  computed: {
    ...mapState({
      title: state => state.common.title,
      description: state => state.common.description,
      user_type: state => state.user.user_type,
      token: state => state.user.token
    }),
    routeBaseOnUserType() {
      return '/' + this.$store.getters['user/user_type']
    },
    btnGroup() {
      return [
        {label: this.$t('login'), link: '/login'},
        // {label: this.$t('register'), link: '/register'}
      ]
    }
  },
  methods: {
    verifyToken() {
      const token = this.$store.getters['user/token']
      if (!token) return

      return this.$axios.post('/limit/user/login_by_token', {token})
        .then(_ => _.user)
        .then(_ => afterLogin(_, this.$store, this.$router, this.$axios, false))
        .catch(e => {
          this.$log.debug(e)
          this.$q.notify({type: 'error', message: e.message})
          afterLogout(this.$store, this.$axios)
        })
    }
  },
  mounted() {
    this.verifyToken()
    // 手动设置背景图片size
    const container = document.getElementsByClassName('container')[0]
    container.style.height = `${getDocumentHeight()}px`
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

.container {
  text-align: center;
  display: table-cell;
  vertical-align: middle;
  height: calc(100vh);
  width: calc(100vw);
  margin: 0;
  padding: 0;
  font-weight: 100;
  font-family: "Roboto", sans-serif;
}

.content {
  text-align: center;
  display: inline-block;
  color: steelblue;
}

.title {
  font-size: 96px;
}

.textContent {
  font-size: 50px;
}

.container div {
  display: block;
}

.button-group {
  margin: 1em 1em 0 1em;
}

</style>
