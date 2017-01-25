var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})

var app2 = new Vue({
  el: '#app-2',
  data: {
    message: 'You loaded this page on ' + new Date()
  }
})


var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})

var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [{
      text: 'Learn JavaScript'
    }, {
      text: 'Learn Vue'
    }, {
      text: 'Build something awesome'
    }]
  }
})

var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function() {
      this.message = this.message.split('').reverse().join('')
    }
  }
})

var app6 = new Vue({
  el: '#app-6',
  data: {
    message: 'Hello Vue!'
  }
})

Vue.component('todo-item', {
  props: ['todo'],
  template: '<li>{{ todo.text }}</li>'
})
var app7 = new Vue({
  el: '#app-7',
  data: {
    groceryList: [{
      text: 'Vegetables'
    }, {
      text: 'Cheese'
    }, {
      text: 'Whatever else humans are supposed to eat'
    }]
  }
})

//全局注册
/*组件系统*/
Vue.component('todo-it', {
  template: '<p>i am a component</p>'
});

var com = new Vue({
  el: '#app-8',
  methods: {
    event: function() {
      alert(1)
    }
  }
})


//局部注册
var child = {
  template: '<div>局部注册</div>'
}
new Vue({
  el: "#app-9",
  components: {
    'com-demo': child
  }
})

//DOM作为模版
Vue.component('div-demo', {
  template: '<tr>DOM作为模版</tr>'
});

var com = new Vue({
  el: '#app-10',
})


//
Vue.component('com-one', {
  template: '<span>{{ message }}</span>',
  data: {
    message: 'hello'
  }
})
new Vue({
  el: '#app-11'
})


//局部注册
Vue.component('child-d', {
  // camelCase in JavaScript
  props: ['myMessage'], // => my-message
  template: '<span>{{ myMessage }}</span>'
})
new Vue({
  el: "#app-12",
  data:function(){
    return {
      parent:'nihaop1'
    }
  }
})
/*自定义事件*/
Vue.component('button-counter',{
  template:'<button v-on:click="increment">{{counter}}</button>',
  data:function(){
    return {
      counter:0
    }
  },
  methods:{
    increment:function(){
      this.counter += 1 ;
      this.$emit('increment');
    }
  }
})
new Vue({
  el:'#counter-event-example',
  data:{
    total:0
  },
  methods:{
    incrementTotal:function(){
      this.total += 1;
    }
  }
})


//内容风发
Vue.component('slot-demo',{
  template:"<div><h2>我是子组件的标题</h2><slot>只有在没有要分发的内容时才会显示。</slot></div>",
  data:{

  }
})

new Vue({
  el:'#slot'
})

function run(fn){
  var gen = fn();
  function next(err, data) {
    var result = gen.next(data);
    if (result.done) return;
    result.value(next);
  }
  next();
}

var g = function* (){
  var f1 = yield function(){console.log(1)};
  var f2 = yield function(){console.log(2)};
  var f3 = yield function(){console.log(3)};
};