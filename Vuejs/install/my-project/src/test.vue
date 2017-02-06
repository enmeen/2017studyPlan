<!--实现输入input后按enter 会在下方生成一个list，点击会有下划线-->
<!-- 1. 添加watch-->
<!-- 2. 增加清空缓存按钮-->
<template>
	<div id='test'>
		<h1>{{title}}</h1>
		<input v-model='message' v-on:keyup.enter='entermethod' class='input'>
		<ul>
			<li v-for="item in items" v-bind:class="{xuhuan:item.isTrue,underline:item.isLine}" v-on:click='clickEvent(item)'>
			     {{item.time}}&nbsp;{{item.label}}
			</li>
		</ul>
    <button v-on:click='clear()'>清空缓存</button>
	</div>
</template>

<script>
import Store from './store';
import Time from './time';

export default {
  		name: 'test',
  		data () {
   		 return {
      		title: 'desen is a cool man',
      		items:  Store.fetch() || [],
      		message:''
    	}
  	},
    watch:{
      items:{
         handler(items){
           Store.save(items)
         },
         deep:true
      }
     
    },
  	methods:{
  		clickEvent:function (item) {
  			var isline = item.isLine;
  			if(item.isLine){
  				item.isLine = false;
  			}else{
  				item.isLine = true;
  			}
  		},
  		entermethod(){
  			this.items.push({
  				label:this.message,
  				isTrue:true,
  				isLine:false,
          time:Time.getTime() || ''
  			});
  			this.message = '';
  		},
      clear(){
        //???? this.items = [];可以正确实现， items = [];无效
        this.items = [];
        Store.clear();
      }

  	}
}

</script>


<style>
	li{
	   display: block;
     width: 200px;
     margin: 0 auto;
     text-align: left;
		}
	#test{
    width: 400px;
		height: 100px;
    margin: 0 auto;
		text-align: center;
		font-size: 12px;
		color: red;
	}
	.xuhuan{
		font-size: 12px;
		color:green;

	}
  .input{
    width: 200px;
    border: 1px solid #000;
  }
	.underline{
		text-decoration:underline
	}
	
</style>

