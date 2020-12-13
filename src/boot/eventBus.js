/**
 * @author iitii
 * @date 2020/12/17 00:31
 */
'use strict'
import Vue from 'vue'

// simple eventbus for vue
const bus = new Vue()

Vue.prototype.$bus = bus
