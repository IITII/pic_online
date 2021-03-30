<template>
  <div>
    <q-btn
      :icon="btnIcon"
      :color="btnColor"
      :round="btnRound"
      @click="btnOnClick"
    >
      <q-tooltip
        :anchor="tooltipAnchor"
        :self="tooltipSelf"
        v-if="tooltipMessage.length !== 0"
      >
        {{ tooltipMessage }}
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'ToolButton',
  props: {
    btnOnClick: {
      type: Function,
      required: true
    },
    btnIcon: {
      type: String,
      required: true
    },
    btnColor: {
      type: String,
      required: true,
      default: 'primary'
    },
    btnRound: {
      type: Boolean,
      required: false,
      default: true
    },
    tooltipMessage: {
      type: String,
      required: true,
      default: ''
    },
    tooltipAnchor: {
      type: String,
      required: false,
      default: 'center left'
    },
    tooltipSelf: {
      type: String,
      required: false,
      default: 'center right'
    }
  }
}
</script>

<style scoped>

</style>
