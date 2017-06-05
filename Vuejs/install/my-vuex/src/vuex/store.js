/**
 * Created by desen on 2017/5/24.
 */
import Vue from "vue";
import Vuex from "vuex";
import {actions} from "./actions.js";
//Vuex 通过 store 选项，提供了一种机制将状态从根组件『注入』到每一个子组件中（需调用 Vue.use(Vuex)）：
Vue.use(Vuex);
//笔记列表(notes: [])包含了 NodesList 组件要渲染的 notes 对象。
// 当前笔记(activeNote: {})则包含当前选中的笔记对象
const state = {
    notes: [],
    activeNote: {}
};
const getters = {
    getAllNotes: state => {
        return state.notes;
    },
    getAct: state => {
        return state.activeNote
    },
    getFav: state => {
        // filter 为非变异方法。
        return state.notes.filter((element,index) => {
            if(element.favorite){
                //element.index = index;
                return element
            }
        });
    }
};
//要实现的 mutation 方法包括： 增删改查
const mutations = {
    ADD_NOTE (state) {// 新增
        const newNote = {
            id: +new Date(),
            text: 'New Note',
            favorite: false
        };
        state.notes.push(newNote);
        state.activeNote = newNote;
    },
    EDIT_NOTE (state, text) { // 编辑
        state.activeNote.text = text
    },

    DELETE_NOTE (state) { // 删除
        let notes = state.notes;
        let len = notes.length - 1;
        for(let i = 0; i < len;i++){
           if(notes[i] === state.activeNote){
               state.notes.splice(i,1);
               state.activeNote = state.notes[0];
           }
        }


    },

    TOGGLE_FAVORITE (state) { // 添加收藏
        state.activeNote.favorite = !state.activeNote.favorite;
    },

    SET_ACTIVE_NOTE (state, note) {
        state.activeNote = note
    }
};

export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})