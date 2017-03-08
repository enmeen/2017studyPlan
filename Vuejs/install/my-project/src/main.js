import Vue from 'vue'
import App from './commonet/App.vue'
import Test from './commonet/test.vue';
import Demo from './commonet/demo.vue';
/*new Vue({
  el: '#app',
  render: h => h(App)
})
*/

new Vue({
	el:'#test',
	render:h => h(Test)
})

/*new Vue({
	el:'#demo',
	render:h => h(Demo)
})*/