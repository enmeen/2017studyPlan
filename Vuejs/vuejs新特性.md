###  vuejs

#### 1. 介绍

**声明式渲染**

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



**条件与循环**

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

**处理用户输入**

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

#### 2. Vue实例

实例通过构造函数Vue创建一个Vue的根实例启动。

**属性与方法**

每个实例都会代理其data对象里所有的属性。

**note**：代理的属性是响应的。只有在实例创建前添加才有效。

处理data属性，Vue实例暴露了一些有用的方法，方法前添加前缀$。

**生命周期**



#### 3. 模版语法

在底层的实现上， Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，在应用状态改变时， Vue 能够智能地计算出重新渲染组件的最小代价并应用到 DOM 操作上。

- **属性**

{{}}的写法不能在HTML属性中使用，应使用v-bind指令:

```html
<div v-bind:id='iamId'></div>
```

- **在模版中支持使用js表达式**

<u>注意区分表达式和语句的区别</u>

```html
{{ number + 1 }}
{{ ok ? 'YES' : 'NO' }}
{{ message.split('').reverse().join('') }}
<div v-bind:id="'list-' + id"></div>
```



- **指令**

指带有`v-`前缀的特殊属性。其职责是当表达式的值改变时相应地将某些行为应用到DOM上。

- **参数**

一些指令接收一个参数，指令后以冒号说明

```html
<a v-bind:href="url"></a>
//上面的href是参数，告知v-bind指令将href属性与表达式url的绑定
```

- **修饰符**

  ```html
  <form v-on:submit.prevent="onSubmit"></form>
  // .prevent 就是修饰符
  ```


- **过滤器**


- **缩写**

#### 4. 计算属性

- **为什么会有计算属性**

  直接在模版中写入的话会让模版变的过重和难以维护。

  ```html
  <div id="example">
    {{ message.split('').reverse().join('') }}
  </div>
  ```

  所以出现了*计算属性*

  ```html
  <div id="example">
    <p>Original message: "{{ message }}"</p>
    <p>Computed reversed message: "{{ reversedMessage }}"</p>
  </div>
  ```

  ```javascript
  var vm = new Vue({
    el: '#example',
    data: {
      message: 'Hello'
    },
    computed: {
      // a computed getter
      reversedMessage: function () {
        // `this` points to the vm instance
        return this.message.split('').reverse().join('')
      }
    }
  })
  ```

  上面案例代码中，我们声明了一个计算属性`reversedMessage`。

- **计算缓存 vs Methods**

  其实实现上面案例中的渲染可以通过method来达到同样的效果。

  ```html
  <p>Reversed message: "{{ reverseMessage() }}"</p>
  ```

  ```javascript
  // in component
  methods: {
    reverseMessage: function () {
      return this.message.split('').reverse().join('')
    }
  }
  ```

  对于结果，两种方式确实相同，但是**计算属性是基于它的依赖缓存**。即只要`message `不发生改变，直接返回之前的计算结果。

  而method调用总会执行函**数。**

- **计算属性 vs Watched Property**

#### 5. 组件系统

组件系统是vuejs的另一个重要概念，因为它提供了一种抽象，让我们可以用独立可复用的小组件来构建大型应用。

组件实质上是拥有预定义选项的一个Vue实例。

```javascript
Vue.component('todo-item',{
  template:'<li>this is a todo</li>'
});
```

```javascript
new Vue({
  el:'#example'
})
```

**局部注册**

```javascript
var Child = {
  template: '<div>A custom component!</div>'
}
new Vue({
  // ...
  components: {
    // <my-component> 将只在父模板可用
    'my-component': Child
  }
})
```

**当使用DOM 作为模版**

注意的是在默写标签下，自定义标签使用会受限制。如下，

```html
<table>
  <my-row>...</my-row>
</table>
```

上述的`<my-row>`被认为是无效内容，再此需要进行变通 使用 `is`属性。

```html
<table>
  <tr is="my-row"></tr>
</table>
```

*应当注意，如果您使用来自以下来源之一的字符串模板，这些限制将不适用：*

- `<script type="text/x-template">`


- JavaScript内联模版字符串
- .vue 组件

#### ★data必须是函数

注意是在使用了**组件系统**的前提下。

错误用法：

```javascript
Vue.component('my-component', {
  template: '<span>{{ message }}</span>',
  data: {
    message: 'hello'
  }
})
//The "data" option should be a function that returns a per-instance value in component definitions.
```

为什么要这样实现：

```html
<div id="example-2">
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
  <simple-counter></simple-counter>
</div>
```

```javascript
var data = { counter: 0 }
Vue.component('simple-counter', {
  template: '<button v-on:click="counter += 1">{{ counter }}</button>',
  // data 是一个函数，因此 Vue 不会警告，
  // 但是我们为每一个组件返回了同一个对象引用
  data: function () {
    return data
  }
})
new Vue({
  el: '#example-2'
})
```

这里三个组件共享了一个`data`，因此增加一个counter会影响所有组件。

改进：

```javascript
data: function () {
  return {
    counter: 0
  }
}
```

现在每个 counter 都有它自己内部的状态了

**构成组件**

父组件A与子组件B该如何相互通信呢：父组件要给子组件传递数据，子组件将内部发生的事情告知给父组件。并且组件之间需要做好良好的解耦。

在 Vue.js 中，父子组件的关系可以总结为 props down, events up 。父组件通过 props 向下传递数据给子组件，子组件通过 events 给父组件发送消息。看看它们是怎么工作的。

![](https://cn.vuejs.org/images/props-events.png)


**prop**

- 使用prop传递数据

  组件实例的作用域是孤立的。所以需要使用props把数据从父组件传递给子组件。

  ```javascript
  Vue.component('child', {
    // 声明 props
    props: ['message'],
    // 就像 data 一样，prop 可以用在模板内
    // 同样也可以在 vm 实例中像 “this.message” 这样使用
    template: '<span>{{ message }}</span>'
  })
  ```
- camelCase vs. kebab-case

  HTML 特性不区分大小写。当使用非字符串模版时，prop的名字形式会从 camelCase 转为 kebab-case（短横线隔开）

  ```javascript
  Vue.component('child', {
    // camelCase in JavaScript
    props: ['myMessage'],
    template: '<span>{{ myMessage }}</span>'
  })
  ```
  ```html
  <!-- kebab-case in HTML -->
  <child my-message="hello!"></child>
  ```


  	**note:使用字符串模版，不用在意这些限制。**

- 动态Prop

  ```html
  <div id="app-12">
          <input v-model="parent">
          <br>
          <child-d :my-message="parent"></child-d>
  </div>
  ```

  ```javascript
  Vue.component('child-d', {
    // camelCase in JavaScript
    props: ['myMessage'], // => my-message
    template: '<span>{{ myMessage }}</span>'
  })
  new Vue({
    el: "#app-12",
    data:function(){
      return {
        parent:'必须是函数写法，而且不能没有该函数'
      }
    }
  })
  ```


- 字面量预发VS动态预语法

  初学者常犯错误是使用字面量语法传递数值。

  ```html
  <!-- 传递了一个字符串"1" -->
  <comp some-prop="1"></comp>
  ```

  正确传递方法

  ```html
  <!-- 传递实际的数字 -->
  <comp v-bind:some-prop="1"></comp>
  ```


- 单向数据流

  prop 是单向绑定的：当父组件的属性变化时，将传导给子组件，但是不会反过来。这是为了防止子组件无意修改了父组件的状态——这会让应用的数据流难以理解。

  通常有两种改变 prop 的情况

  1. prop 作为初始值传入，子组件之后只是将它的初始值作为本地数据的初始值使用；
  2. prop 作为需要被转变的原始值传入。

  更确切的情况：

  1. 定义一个局部data属性，并且将prop的初始值作为局部数据的初始值。

     ```javascript
     props:['init'],
     data:function(){
       return {counter:this.init}
     }
     ```

  2. 定义一个computed属性，此属性从prop的值计算得出。

     ```javascript
     props: ['size'],
     computed: {
       normalizedSize: function () {
         return this.size.trim().toLowerCase()
       }
     }
     ```


- Prop验证

**自定义事件**

子组件通过自定义事件传递给父组件

- 使用`v-on`绑定自定义事件

  每个 Vue 实例都实现了事件接口(Events interface)，即：

  - 使用 $on(eventName) 监听事件


- 使用 $emit(eventName) 触发事件


- 给组件绑定原生事件

  ```javascript
  <my-component v-on:click.native="doTheThing"></my-component>
  ```

  ​

**使用Slot分发内容**

使用组件时常常需要这样组合组件

```html
<app>
  <app-header></app-header>
  <app-footer></app-footer>
</app>
```

注意两点：

1. \<app> 组件不知道它的挂载点会有什么内容。挂载点的内容是由<app>的父组件决定的。
2. \<app> 组件很可能有它自己的模版。

所以为了让组件能够组合，需要一种方式混合父组件的内容与子组件自己的模板。这个过程被称为 内容分发。使用特殊的 \<slot> 元素作为原始内容的插槽。

**编译作用域**

在深入内容分发 API 之前，我们先明确内容的编译作用域。

**单个Slot**

除非子组件模板包含至少一个 <slot> 插口，否则父组件的内容将会被丢弃。当子组件模板只有一个没有属性的 slot 时，父组件整个内容片段将插入到 slot 所在的 DOM 位置，并替换掉 slot 标签本身。

子组件模版：

```html
<div>
  <h2>我是子组件的标题</h2>
  <slot>
    只有在没有要分发的内容时才会显示。
  </slot>
</div>
```

父组件模版：

```html
<div>
  <h1>我是父组件的标题</h1>
  <my-component>
    如果这里没内容，则显示Slot标签中的内容
  </my-component>
</div>
```

**具名Slot**

\<slot> 元素可以用一个特殊的属性 name 来配置如何分发内容。多个 slot 可以有不同的名字。具名 slot 将匹配内容片段中有对应 slot 特性的元素。
仍然可以有一个匿名 slot ，它是默认 slot ，作为找不到匹配的内容片段的备用插槽。如果没有默认的 slot ，这些找不到匹配的内容片段将被抛弃。

子组件模版:

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

父组件模版：

```html
<app-layout>
  <h1 slot="header">这里可能是一个页面标题</h1>
  <p>主要内容的一个段落。</p>
  <p>另一个主要段落。</p>
  <p slot="footer">这里有一些联系信息</p>
</app-layout>
```

渲染结果：

```html
<div class="container">
  <header>
    <h1>这里可能是一个页面标题</h1>
  </header>
  <main>
    <p>主要内容的一个段落。</p>
    <p>另一个主要段落。</p>
  </main>
  <footer>
    <p>这里有一些联系信息</p>
  </footer>
</div>
```























