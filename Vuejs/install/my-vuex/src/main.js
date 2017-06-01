import Vue from 'vue'
import store from './vuex/store'
import App from './components/App.vue'

new Vue({
    store, // 注入到所有子组件
    el: '#body',
    components: { App }
})