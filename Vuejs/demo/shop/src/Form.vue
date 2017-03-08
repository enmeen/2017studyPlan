<template>
    <div id='form'>
        <ul>
            <li v-for='todo in todos' v-bind:class='{active:todo.isAct}' class='price-box' v-on:click="choose(todo,todos)">价格：{{todo.price}}</li>
        </ul>
        <p class='zj'>总价:{{total}}</p>
    </div>
</template>
<script>
export default {
    name: 'form',
    data() {
        return {
            todos: [{
                price: 300,
                isAct: false
            }, {
                price: 200,
                isAct: false
            }, {
                price: 150,
                isAct: false
            }],
            total: 0
        }
    },
    methods: {
        choose: function(todo, todos) {

            var isAct = todo.isAct;
            if (isAct) {
                todo.isAct = false;
            } else {
                todo.isAct = true;
            }
            var _price = 0;
            todos.forEach(function(el) {
                if (el.isAct) {
                    _price += el.price
                }
            })
            
            this.total = _price;

        }
    }
}
</script>
<style>
.price-box {
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: #5597B4;
    cursor: pointer;
    color: #fff;
    display: block;
    margin-top: 10px;
}

.active {
    background: #E35885;
}

.zj {
    width: 100px;
    height: 40px;
    text-align: center;
}
</style>
