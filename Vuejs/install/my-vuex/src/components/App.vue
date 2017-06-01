<template>
    <div class="app">
        <Toolbar></Toolbar>
        <NotesList></NotesList>
        <Editor></Editor>
    </div>
</template>
<script>
    import Toolbar from './Toolbar.vue'
    import NotesList from './NotesList.vue'
    import Editor from './Editor.vue'

    export default {
        name: '',
        data () {
            return {

            }
        },
        components: {
            Toolbar,
            NotesList,
            Editor
        }
    }
</script>

<style>

</style>