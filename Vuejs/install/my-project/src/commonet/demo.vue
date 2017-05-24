<template>
	<div id="example">
  		<p>Original message: "{{ message }}"</p>
  		<p>Computed reversed message: "{{ reversedMessage }}"</p>
	</div>
</template>
<script>
	export default{
	    props:['message'],
		data(){
			return {

			}
		},
		computed:{
			reversedMessage: function () {
      			return this.message.split('').reverse().join('')
    		}
		}
	}
</script>