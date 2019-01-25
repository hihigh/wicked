
<template>
    <div class="wrapper">
        <div class="frame-wrapper">
            <ul>
                <li v-for="(i, index) in ui_arr" v-on:click="onClickli(index)">
                    {{ i }}
                </li>
            </ul>
        </div>

        <!--<router-link to="/">project</router-link>-->
        <!--<router-link to="/about">about</router-link>-->
        <!--<router-view :contents-data='this.contentsData'></router-view>-->


        <!-- full swipe card type-->
        <comp-list v-show="ui_index == 0" :contents-data='this.contentsData'></comp-list>

        <!-- middle content type -->
        <comp-main v-show="ui_index == 1" :contents-data='this.contentsData'></comp-main>

        <!--<div class="overflow-wrapper">
        <comp-fixed :contents-data='this.contentsData'></comp-fixed>
        </div>-->

    </div>

</template>

<script>

    //full content type
    import comp_list from './fullContentType/comp-list-contents';

    //test
    import comp_fixed from './comp-fixed-layer';

    import comp_main from './swipeSmAreaType/comp-main';


    export default {
        name: "app",

        data() {
            return {
                ui_index: 1,
                ui_arr: ["A", "B"]
            };
        },

        components: {
            'comp-list': comp_list,
            'comp-fixed': comp_fixed,
            'comp-main': comp_main
        },

        created() {
            console.log("app.vue -- created")
        },

        props: {
            contentsData: {
                type: Array,
                default: function() {return [];}
            }
        },

        methods: {
            onClickli(index) {
                this.ui_index = index;
                console.log("dd", index)
            }
        }
    }
</script>


<style scope lang="scss">
    body {
        /*background-image: linear-gradient(to top right, #005a96, #07a5e0);*/
        /*overflow: hidden;*/
        background-color: #555555;
        font-size: 0.75rem;
        line-height: 1.375rem;
        font-weight: 100;

    }

    .frame-wrapper {
        position: fixed;
        z-index: 1000;
        top: 0;
        right: 0;

        ul {
            padding: 10px;

            li {
                display: inline-block;
                margin: 5px 5px 0 5px;
                padding: 5px 13px 7px;
                background-color: #ff3399;
                font-weight: bold;
            }
        }


    }
</style>
