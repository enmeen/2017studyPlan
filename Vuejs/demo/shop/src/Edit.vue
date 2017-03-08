<template>
    <div id='edit' v-on:click.stop='clickEvent(isAct,$event)'>
        <input type="text" name="" v-model='message' class='input' :class=' {act:isAct}' id='input'/>
        <p class='content'>{{message}}</p>
    </div>
</template>
<script>
export default {
    name: 'edit',
    data() {
        return {
          message:'点我输入',
          isAct:false
        }
    },
    methods: {
        clickEvent:function(isAct,event){
            
            var p = document.getElementById('input');
            if(event.target === p){
                return
            }
            if(isAct){
                this.isAct = false;
            }else{
                this.isAct = true;
                p.focus();
            }
        }
    }
}
</script>
<style>
    #edit{
        width: 100%;
        height: 100px;
        border: 1px solid red;
        text-align: center;
    }
    .input{
        display: none;
        width: 200px;
        height: 30px;
        line-height: 30px;
        font-size: 24px;
        position: absolute;
        left: 50%;
        margin-left: -100px;
        z-index: 1;

    }
    .act{
        display: block;
    }
    p.content{
        text-align: center;
        margin-top: 50px;
        font-size: 30px;
        cursor: pointer;
    }
</style>
