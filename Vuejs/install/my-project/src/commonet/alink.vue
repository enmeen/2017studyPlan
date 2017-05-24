<template>
    <div class="box">
        <!--<a :href="item" v-for="item in alinkObj" :link="alinkObj"></a>-->
        <a :href="item" v-for="item in mess">{{item}}</a>
    </div>
</template>

<script>

    export default {
        name: '',
        props:['mess'],
        data () {
            return {}
        }
    }
</script>

<style>

</style>