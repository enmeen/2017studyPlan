import Vue from 'vue'
import App from './App.vue'
import Test from './test.vue';
import Demo from './demo.vue';
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