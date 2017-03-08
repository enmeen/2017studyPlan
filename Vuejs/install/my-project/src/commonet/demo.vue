<template>
	<div id="example">
  		<p>Original message: "{{ message }}"</p>
  		<p>Computed reversed message: "{{ reversedMessage }}"</p>
	</div>
</template>
<script>
	export default{
		name:'demo',
		data(){
			return {
				message:'hello world',
				
			}
		},
		computed:{
			reversedMessage: function () {
      			return this.message.split('').reverse().join('')
    		}
		}
	}
</script>