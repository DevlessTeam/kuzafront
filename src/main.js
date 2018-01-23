// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import Devless from './utils/devless'
import store from './store/index'

Vue.config.productionTip = true

const DV = {
  install (v) {
    Vue.prototype.$devless = Devless
  }
}

Vue.use(DV)

/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  components: { App },
  template: '<App/>'
})
