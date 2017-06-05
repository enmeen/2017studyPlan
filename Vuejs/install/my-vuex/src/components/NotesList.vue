<!--
NotesList组件，且拥有以下功能：
1. 渲染笔记列表
2. 允许用户全选，或者只显示"收藏的笔记本"
3. 当用户点击其中一条时，将activeNot更新
-->
<template>
    <div id="list">
        <div class="top">
            <h2>NotesList</h2>
            <div class="btn-group" role="group" aria-label="...">
                <button type="button" class="btn btn-default" @click="AllBtn">All Notes</button>
                <button type="button" class="btn btn-default" @click="FavBtn">Favorite</button>
            </div>
        </div>
        <div class="list">
            <article v-for="(item,index) in filterList" @click="checkNote(item,index)">{{item}}</article>
        </div>
    </div>
</template>

<script>

    export default {
        name: 'list',
        data () {
            return {
                showAll: true
            }
        },
        computed: {
            filterList(){
                if (this.showAll === true) {
                    return this.$store.getters.getAllNotes
                } else {
                    return this.$store.getters.getFav
                }
            }
        },
        methods: {
            FavBtn(){
                this.showAll = false;
            },
            AllBtn(){
                this.showAll = true;
            },
            checkNote(item){
                this.$store.dispatch('updateActiveNote', item);
            }
        }
    }
</script>

<style>

</style>