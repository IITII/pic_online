<template>
  <div>
    <pic-background/>
    <div class="fixed fixed-center login">
      <q-form class="flex-center text-center"
              @reset="onReset"
              @submit="onSubmit">
        <q-card>
          <q-card-section class="bg-primary text-white">
            <div class="text-h6">{{ title }}</div>
          </q-card-section>
          <q-card-section>
            <q-list>
              <q-item>
                <q-item-section>
                  <q-input v-model.trim="input.name" :label="$t('username')" :lazy-rules="true"
                           :rules="validate.name" autofocus
                           clearable counter
                           maxlength="10" required type="text"/>
                </q-item-section>
              </q-item>
              <q-item>
                <q-item-section>
                  <q-input v-model="input.password"
                           :label="$t('password')" :lazy-rules="true" :rules="validate.password"
                           :type="isPwd ? 'password' : 'text'"
                           clearable counter
                           maxlength="10" required>
                    <template v-slot:append>
                      <q-icon
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                </q-item-section>
              </q-item>
            </q-list>
          </q-card-section>
          <q-card-actions align="around">
            <q-btn flat type="submit">{{ $t('login') }}</q-btn>
            <q-btn flat type="reset">{{ $t('reset') }}</q-btn>
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </div>
</template>

<script>/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2021/04/29 18:40
 */
'use strict'

import PicBackground from 'components/commons/PicBackground.vue'
import {afterLogin} from 'src/utils/utils'
import {mapState} from 'vuex'

export default {
  name: 'Login',
  components: {PicBackground},
  computed: {
    ...mapState({
      title: state => state.common.title
    })
  },
  data() {
    return {
      input: {
        name: '',
        password: '',
      },
      isPwd: true,
      validate: {
        name: [
          val => (val && 3 <= val.length && val.length <= 10) || this.$t('username_length_between_3_and_10')
        ],
        password: [
          val => (val && 1 <= val.length && val.length <= 10) || this.$t('password_length_between_1_and_10')
        ]
      }
    }
  },
  mounted() {
  },
  methods: {
    onSubmit() {
      const data = {
        name: this.input.name,
        password: this.input.password,
      }
      return this.$axios.post('/limit/user/login', data)
        .then(_ => _.user)
        .then(_ => afterLogin(_, this.$store, this.$router, this.$axios))
        .catch(e => this.$q.notify({type: 'error', message: e.message}))
    },

    onReset() {
      for (const k in this.input) {
        this.input[k] = ''
      }
    }
  }
}
</script>

<style scoped>
.login {
  padding-top: 10vh;
  min-width: 350px;
  min-height: 600px;
  width: 40%;
  height: 60%;
}
</style>
