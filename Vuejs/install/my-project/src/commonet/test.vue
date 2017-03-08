<!--实现输入input后按enter 会在下方生成一个list，点击会有下划线-->
<!-- 1. 添加watch-->
<!-- 2. 增加清空缓存按钮-->
<!-- 3. 增加拖拽功能 -->
<!-- 4. todo: 未完成list和完成list各自有localStorage 存储*/-->
<template>
    <div id='test'>
        <h1>{{title}}</h1>
        <input v-model='message' v-on:keyup.enter='entermethod' class='input'>
        <ul>
            <li v-for="(item,index) in items" v-bind:class="{xuhuan:item.isTrue}" class='message-li' draggable="true" v-on:dragstart='drap(item,$event)' v-bind:id='index'>
                {{item.time}}&nbsp;{{item.label}}
            </li>
        </ul>
        <button v-on:click='clear()'>清空缓存</button>
        <div class='finish' v-on:drop='drop($event)' v-on:dragover='allowDrop($event)'>
            <h1>FINISH</h1>
            <ol class='finish-box'>
                <li v-for="(value,index) in completeItem" v-bind:class="{xuhuan:value.isTrue}" class='message-li'>
                    {{value.time}}&nbsp;{{value.label}}
                </li>
            </ol>
        </div>
    </div>
</template>
<script>

import Store from '../lib/store.js';
import Time from '../lib/time.js';
const VUE_PENDING = 'VUE_PENDING';
const VUE_COMPLETE = 'VUE_COMPLETE';
var PENDING = Store(VUE_PENDING);
var COMPLETE = Store(VUE_COMPLETE);

export default {
    name: 'test',
    data() {
        return {
            title: '代办事项',
            items: PENDING.fetch() || [],
            completeItem: COMPLETE.fetch() || [],
            message: ''
        }
    },
    watch: {
        items: {
            handler(items) {
                PENDING.save(items)
            },
            deep: true
        }

    },
    methods: {
        register:function(obj){//寄存器
           Object.defineProperty(obj,key,{
              get:function(){

              },
              set:function(){

              }
           })
        },
        drop: function(e) {
            e.preventDefault();
            var data = e.dataTransfer.getData("Text");
            console.log(data)
            e.target.appendChild(document.getElementById(data[0]));

        },
        drap: function(item,e) {
            e.dataTransfer.setData("Text", [e.target.id,item] );
        },
        allowDrop: function(e) {
            e.preventDefault();
        },
        entermethod() {
            this.items.push({
                label: this.message,
                isTrue: true,
                time: Time.getTime() || ''

            });
            this.message = '';
        },
        clear() {
            //???? this.items = [];可以正确实现， items = [];无效
            this.items = [];
            PENDING.clear();
        }

    }
}

</script>

<style>
.message-li {
    display: block;
    min-width: 200px;
    margin: 0 auto;
    text-align: left;
    margin: 4px auto;
}

#test {
    width: 400px;
    margin: 0 auto;
    text-align: center;
    font-size: 24px;
    color: #7D87F4;
}

.xuhuan {
    font-size: 22px;
    color: green;
}

.input {
    width: 200px;
    font-size: 22px;
    border: 1px solid #000;
}

.underline {
    text-decoration: underline
}

.finish {
    position: absolute;
    right: 0;
    top: 10px;
    font-size: 24px;
    min-width: 200px;
    height: 800px;
    border: 1px solid green;
}

.finish-box {
    color: #000;
    padding-left: 10px;
}

</style>
