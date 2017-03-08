<template>
    <div id='nav'>
        <ul class=''>
            <li v-for="todo in todos" class='list' v-text="todo.text" v-bind:class='{active:todo.isAct}' v-on:click='greet(todo,todos)'>
            </li>
        </ul>
        <p>
        	you choose {{content}}
        </p>
    </div>
</template>
<script>
export default {
    name: 'nav',
    data() {
        return {
            todos: [{
                text: "HOME",
                isAct:false
            }, {
                text: "CONTENT",
                isAct:false
            }, {
                text: "ABOUT",
                isAct:false
            }],
            content:''
        }
    },
    methods: {
        greet: function(todo,todos) {
        	var isAct = todo.isAct;
        	todos.forEach(function(el){
        		el.isAct = false;
        	})
        	if(isAct){
        		todo.isAct=false;
        	}else{
        		todo.isAct=true;
        	}
        	this.content = todo.text

        }
    }
}
</script>
<style>
.list {
    width: 100px;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background: #5597B4;
    cursor: pointer;
    color: #fff;
}

.active {
    background: #E35885;
}
</style>
