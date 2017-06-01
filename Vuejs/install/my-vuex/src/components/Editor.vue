<!--
Editor组件，且拥有以下功能：
1. 从 store 获取当前笔记activeNote，把它的内容展示在 textarea
2. 在用户更新笔记的时候，调用 editNote() action
-->
<template>
    <div id="editor">
        <h2>当前笔记</h2>
        <textarea @input="editNote($event)" :value="getAct.text"></textarea>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    export default {
        name: '',
        data () {
            return {}
        },
        computed: mapGetters(['getAct']),
        methods: {
            editNote(e){
                this.$store.dispatch('editNote',e)
            }
        }


    }
</script>

<style>

</style>