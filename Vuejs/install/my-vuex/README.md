### readme
- 创建一个vuex文件  用来存放vuex相关js文件
- 由四个组件构成
    - 根组件 App.vue
    - 操作栏组件 Toolbar.vue
    - 别表组件 NotesList.vue
    - 笔记编辑组件 Editor.vue


### Q&A
- 关于点击新建笔记按钮后，明明分发了一个action事件，该事件用来commit mutations中的一个ADD_NOTE方法，但是会触发getters中的getAll事件的原因是由于vue数据响应的原因。因为两者都对state中的note进行了观察。
- Editor.vue的textarea标签中对内容的绑定写法
```javascript
// 正确写法
<textarea @input="editNote($event)" :value="getAct.text"></textarea>
// 错误写法 
// 这样写不会对{{getAct.text}}实时响应
<textarea @input="editNote($event)">{{getAct.text}}</textarea>
```
- 关于删除功能的实现。
    - 原计划是用 文章中的 $remove来实现不过vuex新版本已经不支持了
    - 后来考虑使用数组的index来进行定位。不过在Fav的列表中不是很方便
    - 由于删除的item属于notes中的元素，所以最后通过判定item在notes中的位置来实现，缺点是每次删除都要循环一遍
    - [地址](https://laracasts.com/discuss/channels/vue/removing-an-item-from-vue-js-data)