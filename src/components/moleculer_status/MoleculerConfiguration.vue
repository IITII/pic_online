<template>
  <div>
    <div class="boxes">
      <q-card v-for="k in Object.keys(configure)" :key="k"
              class="q-ma-sm bg-secondary text-white">
        <q-card-section>
          <div class="text-subtitle2 text-center">
            {{ $t(k) }}
          </div>
          <div class="text-center">
            {{ configure[k] }}
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-separator/>
    <div class="text-center">
      <q-btn :label="$t('show_broker_config')" class="q-ma-sm"
             @click="showBroker = !showBroker"/>
      <div v-show="showBroker">
        <vue-code-highlight language="JavaScript">
          {{ broker }}
        </vue-code-highlight>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * @author IITII <ccmejx@gmail.com>
 * @date 2021/06/03 10:09
 */
'use strict'
import 'vue-code-highlight/themes/window.css'
// import "vue-code-highlight/themes/duotone-sea.css"
import 'vue-code-highlight/themes/prism-tomorrow.css'
import {component as VueCodeHighlight} from 'vue-code-highlight'

export default {
  name: 'MoleculerConfiguration',
  components: {VueCodeHighlight},
  data() {
    return {
      showBroker: false,
      loading: false,
      broker: null
    }
  },
  computed: {
    configure() {
      const broker = this.broker
      if (broker) {
        return {
          namespace: broker.namespace || '<not set>',
          transporter: broker.transporter || '<no transporter>',
          serializer: broker.serializer || 'JSON',
          strategy: broker.registry.strategy || 'Round Robin',
          cacher: broker.cacher ? 'Enabled' : 'Disabled',
          logger: broker.logger ? 'Enabled' : 'Disabled',
          metrics: broker.metrics.enabled ? 'Enabled' : 'Disabled',
          tracing: broker.tracing.enabled ? 'Enabled' : 'Disabled',
        }
      } else {
        return {}
      }

    }
  },
  methods: {
    getConfiguration() {
      this.loading = true
      this.$axios.get('/dev/~node/options')
        .then(_ => this.broker = _)
        .then(() => this.loading = false)
        .catch(e => this.$q.notify({type: 'error', message: e.message}))
    }
  },
  mounted() {
    this.getConfiguration()
  }
}
</script>

<style scoped>
.boxes {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.boxes .q-card {
  min-width: 200px;
}

</style>
