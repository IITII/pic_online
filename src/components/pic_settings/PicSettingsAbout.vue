<template>
  <div>
    <q-card class="bg-secondary text-white">
      <q-card-section>
        <div class="text-h6">{{ name }}</div>
        <div class="text-subtitle3">{{ author }}</div>
      </q-card-section>
      <q-card-section>
        {{ $t('repo_description') }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'PicSettingsAbout',
  props: {
    name: {
      type: String,
      required: false,
      default: 'Pic Online'
    },
    author: {
      type: String,
      required: false,
      default: 'Github@IITII'
    }
  }
}
</script>

<style scoped>

</style>
