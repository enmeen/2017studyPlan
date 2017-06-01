<!--
Toolbar组件需要知道当前选中的笔记是哪一条，且拥有以下功能：
1. 新增
2. 收藏
3. 删除
-->
<template>
    <div id="toobar">
        <i class="glyphicon glyphicon-plus" @click="addNote"></i>
        <i class="glyphicon glyphicon-star" @click="toggleFavorite" :class="{starred: this.$store.state.activeNote.favorite}"></i>
        <i class="glyphicon glyphicon-remove" @click="deleteNote"></i>
    </div>
</template>

<script>
    // store已经由父组件注入到自组件中了。
    //import {addNote,deleteNote,toggleFavorite} from '../vuex/actions.js';
    import {mapActions} from 'vuex';
    export default {
        name: '',
        data () {
            return {}
        },
        methods:mapActions([
            'addNote',
            'deleteNote',
            'toggleFavorite'
        ])
    }
</script>

<style>
    .starred{
        color:blueviolet;
    }
    #toobar{
        
    }
</style>