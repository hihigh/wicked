
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
        <transform-type-01 v-if="ui_index == 0" :contents-data='this.contentsData'></transform-type-01>

        <!-- middle content type -->
        <transform-type-02 v-else-if="ui_index == 1" :contents-data='this.contentsData'></transform-type-02>

        <!-- middle content type -->
        <transform-type-03 v-else-if="ui_index == 2" :contents-data='this.contentsData'></transform-type-03>

        <transform-type-04  v-else-if="ui_index == 3" :contents-data='this.contentsData'></transform-type-04>
        <!-- middle content type -->
        <scroll-fixed-type-01 v-else-if="ui_index == 4" :contents-data='this.contentsData'></scroll-fixed-type-01>

    </div>

</template>

<script>

    //full content type
    import transform_type_01 from './transform-type_01/transform-type_01';

    //middle box -> full kv
    import transform_type_02 from './transform-type_02/transform-type_02';

    //middle box -> scroll content
    import transform_type_03 from './transform-type_03/transform-type_03';


    //scroll - fixed - type_01
    import scroll_fixed_type_01 from './scroll_fixed-type_01/scroll_fixed-type_01'


    import transform_type_04 from './transform-type_04/transform-type_04';

    import Velocity from 'velocity-animate'


    export default {
        name: "app",

        data() {
            return {
                ui_index: 0,
                ui_arr: ["A", "B", "C", "D", "E"]
            };
        },

        components: {
            'transform-type-01': transform_type_01,
            'transform-type-02': transform_type_02,
            'transform-type-03': transform_type_03,
            'transform-type-04': transform_type_04,
            'scroll-fixed-type-01': scroll_fixed_type_01
        },

        created() {
            console.log("app.vue -- created")

            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
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
