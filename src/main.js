import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

if (!window.Event || window.Event.constructor.name !== 'Vue') {
  window.Event = new Vue();
}

new Vue({
  render: h => h(App),
}).$mount('#app')
