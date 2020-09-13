import Vue from 'vue'
import App from './App.vue'
import { router } from './router'
import store from "./store/store"


Vue.filter("currency", (value) => {
  return parseFloat(value).toLocaleString(undefined, { minimumFractionDigits: 2 }) + " TL";
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
