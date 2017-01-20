###  vuejs的基本方法

#### 1. 声明式渲染

```html
<div id='app-1'>
	{{message}}
</div>
```

```javascript
var app_1 = new Vue({
  el:'#app',
  data:{
    message:'hello Vue!'
  }
})
```

另一种方式绑定DOM元素属性

```html
<div id='app-2'>
	<span v-bind:title='message'>
  		 Hover your mouse over me for a few seconds to see my dynamically bound title!  
    </span>
</div>
```

```javascript
var app2 = new Vue({
  el:'#app-2',
  data:{
  		message:'You loaded this page on ' + new Date();
	}
})
```



#### 2. 条件与循环

**条件**

```html
<div id="app-3">
  <p v-if="seen">Now you see me</p>
</div>
```

```javascript
var app3 = new Vue({
  el: '#app-3',
  data: {
    seen: true
  }
})
```

控制台输入`app3.seen = false`，会发现"Now you see me"消失。

**循环**

```html
<div id="app-4">
  <ol>
    <li v-for="todo in todos">
      {{ todo.text }}
    </li>
  </ol>
</div>
```

```javascript
var app4 = new Vue({
  el: '#app-4',
  data: {
    todos: [
      { text: 'Learn JavaScript' },
      { text: 'Learn Vue' },
      { text: 'Build something awesome' }
    ]
  }
})
```

在控制台里，输入 `app4.todos.push({ text: 'New item' })`。你会发现列表中多了一栏新内容。

#### 3. 处理用户输入

用 `v-on` 指令绑定一个监听事件用于调用我们 Vue 实例中定义的方法：

```html
<div id="app-5">
  <p>{{ message }}</p>
  <button v-on:click="reverseMessage">Reverse Message</button>
</div>
```

```javascript
var app5 = new Vue({
  el: '#app-5',
  data: {
    message: 'Hello Vue.js!'
  },
  methods: {
    reverseMessage: function () {
      this.message = this.message.split('').reverse().join('')
    }
  }
})
```

#### 4. 组件系统

组件系统是vuejs的另一个重要概念，因为它提供了一种抽象，让我们可以用独立可复用的小组件来构建大型应用。

组件实质上是拥有预定义选项的一个Vue实例。

```javascript
Vue.component('todo-item',{
  template:'<li>this is a todo</li>'
});
```



