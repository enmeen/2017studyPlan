<!--实现输入input后按enter 会在下方生成一个list，点击会有下划线-->
<template>
	<div id='test'>
		<h1>{{title}}</h1>
		<input v-model='message' v-on:keyup.enter='entermethod'>
		<ul>
			<li v-for="item in items" v-bind:class="{xuhuan:item.isTrue,underline:item.isLine}" v-on:click='clickEvent(item)'>
			{{item.label}}
			</li>
		</ul>
	</div>
</template>

<script>
import Store from './store';
console.log(Store);

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
  				isLine:false
  			});
  			this.message = '';
  		}

  	}
}

</script>


<style>
	li{
	display: block;
		}
	#test{

		height: 100px;
		text-align: center;
		font-size: 12px;
		color: red;
	}
	.xuhuan{
		font-size: 12px;
		color:green;

	}
	.underline{
		text-decoration:underline
	}
	
</style>