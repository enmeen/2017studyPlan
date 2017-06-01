/**
 * Created by desen on 2017/5/26.
 */
/*// 新增一条笔记
 export const addNote = ({commit}) => {
 commit('ADD_NOTE');
 };
 // 编辑一条笔记
 export const editNote = ({commit}, e) => {
 commit('EDIT_NOTE', e.target.value)
 };
 // 删除一条笔记
 export const deleteNote = ({commit}) => {
 commit('DELETE_NOTE')
 };
 // 将笔记切换为当前笔记{
 export const updateActiveNote = ({commit}, note) => {
 commit('SET_ACTIVE_NOTE', note)
 };
 // 设置收藏
 export const toggleFavorite = ({commit}) => {
 commit('TOGGLE_FAVORITE')
 };*/

export const actions = {
    addNote: ({commit}) => {
        commit('ADD_NOTE');
    },
    editNote: ({commit}, e) => {
        commit('EDIT_NOTE', e.target.value)
    },
    deleteNote: ({commit}) => {
        commit('DELETE_NOTE')
    },
    updateActiveNote: ({commit}, note) => {
        commit('SET_ACTIVE_NOTE', note)
    },
    toggleFavorite: ({commit}) => {
        commit('TOGGLE_FAVORITE')
    }
}