
<template>
    <div class="wrapper">
        <div class="frame-wrapper">
            <ul>
                <li v-for="(i, index) in ui_arr" v-on:click="onClickli(index)" :class='ui_index==index ? "active" : ""'>
                    {{ i }}
                </li>
            </ul>
        </div>

        <!--<router-link to="/">project</router-link>-->
        <!--<router-link to="/about">about</router-link>-->
        <!--<router-view :contents-data='this.contentsData'></router-view>-->


        <!-- full swipe card type-->
        <comp-list v-if="ui_index == 0" :contents-data='this.contentsData'></comp-list>

        <!-- middle content type -->
        <comp-main v-else-if="ui_index == 1" :contents-data='this.contentsData'></comp-main>

        <!-- middle content type -->
        <comp-main-swty v-else-if="ui_index == 2" :contents-data='this.contentsData'></comp-main-swty>

        <!-- middle content type -->
        <scroll-fixed-type-01 v-else-if="ui_index == 3" :contents-data='this.contentsData'></scroll-fixed-type-01>

        <comp-fixed  v-else-if="ui_index == 4" :contents-data='this.contentsData'></comp-fixed>

    </div>

</template>

<script>

    //full content type
    import comp_list from './transform-type_01/comp-list-contents';

    //middle box -> full kv
    import comp_main from './transform-type_02/comp-main';

    //middle box -> scroll content
    import comp_main_swty from './transform-type_03/comp-main_swipeTy';


    //scroll - fixed - type_01
    import scroll_fixed_type_01 from './scroll_fixed-type_01/scroll_fixed-type_01'



    //test
    import comp_fixed from './comp-fixed-layer';




    export default {
        name: "app",

        data() {
            return {
                ui_index: 4,
                ui_arr: ["A", "B", "C", "D", "E"]
            };
        },

        components: {
            'comp-list': comp_list,
            'comp-fixed': comp_fixed,
            'comp-main': comp_main,
            'comp-main-swty': comp_main_swty,
            'scroll-fixed-type-01': scroll_fixed_type_01
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

                background-color: #dddddd;
                color: silver;

                font-weight: bold;

                &.active {
                    background-color: #ff3399;
                    color: white;
                }
            }
        }


    }
</style>
