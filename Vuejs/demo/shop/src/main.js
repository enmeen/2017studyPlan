import Vue from 'vue'
import App from './App.vue'
import Nav from './Nav.vue'
import Edit from './Edit.vue'
import Form from './Form.vue'

/*new Vue({
  el: '#app',
  render: h => h(App)
});
*/
new Vue({
  el: '#nav',
  render: h => h(Nav)
});

new Vue({
  el: '#edit',
  render: h => h(Edit)
});

new Vue({
  el: '#form',
  render: h => h(Form)
})
