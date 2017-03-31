/**
 * Created by desen on 2017-3-20.
 */

//注册一个 全局 组件
Vue.component('child', {
    props: ['message'],
    template: '<div>我来自子组件,{{message}}</div>'
});

//常用》 注册一个局部>> 局部是指只有在父元素可用
var ChildTwo = {
    template: '<div><slot></slot>我来自子组件，我是老二.{{info}}</div>',
    data: function(){
        return {
            info: 'info'
        }
    }
};
new Vue({
    el: '#cls',
    components: {
        "child-two": ChildTwo

    },
    data: function () {
        return {

        }
    },
    methods: {
        hello: function () {
            alert(1)
        }
    }
});

