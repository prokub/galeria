import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Album from './components/Album.vue'
import AddGallery from './components/AddGallery.vue'
import VueResource from 'vue-resource'
import VueLazyLoad from 'vue-lazyload'



Vue.component('album', Album);
Vue.component('add-gallery', AddGallery);
Vue.use(VueResource);
Vue.use(VueLazyLoad);



Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
