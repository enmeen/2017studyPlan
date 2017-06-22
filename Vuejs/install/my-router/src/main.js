import Vue from 'vue'
import VueRouter from 'vue-router'
import Demo from './demo.vue'
// router-view
import Content from './content.vue'
import Info from './info.vue'
import Home from './home.vue'

Vue.use(VueRouter);
/*const Foo = {template: `<div>{{ $route.params.id }}<router-view></router-view></div>`}
const Info = {template: `<div>信息页面</div>`}
const UserHome = {template: `<div>HOME</div>`}
const UserLogin = {template: `<div>UserLogin</div>`}*/

const routes = [
    { path: '/', component: Home },
    { path: '/content', component: Content },
    { path: '/info', component: Info },

]

const router = new VueRouter({
    routes
});
new Vue({
    el: '#body',
    router,
    components: {Demo}
})
