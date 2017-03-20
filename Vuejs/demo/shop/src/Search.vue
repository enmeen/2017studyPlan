<template>
    <div id='search'>
        <h1>即时搜索</h1>
        <input type="text" class='input-box' v-model="searchString" />
        <div class="show-box">
            <p v-for='todo in todos'>{{searchMethod(todo.text)}}</p>
        </div>
    </div>
</template>

<script>
  
export default {
  name: 'search',
  data () {
    return {
        searchString:'',
        todos:[
            {
                text:'hello world'
            },
            {
                text:'i am so cool'
            },{
                text:'i can fly~'
            }
        ]
    }
  },
  
  methods:{w
      searchMethod:function(value){// value 为未过滤值， searchstring为输入的文字
        this.searchString = this.searchString.toLowerCase();
        //array过滤方法
        if(value.indexOf(this.searchString) > -1){
            return value
        }
      }
  }
}
</script>

<style>
    #search {
        margin-left: 100px
    }
</style>