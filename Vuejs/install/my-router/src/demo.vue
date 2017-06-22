<template>
    <div id="nav">
        <ul class="nav__ul">
            <router-link tag="li" :to="item.routerName" v-for="(item,index) in items" :key="index" class="nav__li"
                         :class="{nav__hover:hoverNav === item}" @click.native="actNav(item)">
                <a class="nav__a">{{item.navName}}</a>
            </router-link>
        </ul>
        <router-view class="nav__view"></router-view>
    </div>
</template>

<script>

    export default {
        name: 'nav',
        data () {
            return {
                items: [{
                    navName: '首页',
                    routerName: '/'
                }, {
                    navName: '内容',
                    routerName: '/content'
                }, {
                    navName: '信息',
                    routerName: '/info'
                }],
                hoverNav: ''
            }
        },
        methods: {
            actNav: function (item) {
                this.hoverNav = item;
            }
        }
    }
</script>

<style>
    #nav{
        width: 100%;
    }
    .nav__ul {
        list-style: none;
    }

    .nav__li {
        display: inline-block;
        width: 70px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        background-color: darkblue;

    }

    .nav__a {
        display: block;
        color: #fff;
        text-decoration: none;
    }

    .nav__view {

    }

    .nav__hover {
        background-color: lightblue;
    }
</style>