<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div class="text-h2" style="opacity:.4">
        Oops. Nothing here...
      </div>

      <div>
        <q-btn :label="$t('home')"
               class="q-mt-xl" color="white"
               no-caps style="margin-right: 1vh"
               text-color="blue"
               to="/" unelevated
        />
        <q-btn :label="$t('back')"
               class="q-mt-xl" color="white"
               no-caps style="margin-left: 1vh"
               text-color="blue"
               unelevated
               @click="$router.go(-1)"
        />
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2021/04/29 18:32
 */
'use strict'

export default {
  name: 'NotFoundLayout'
}
</script>

<style scoped>

</style>
