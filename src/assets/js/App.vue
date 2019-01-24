
<template>
    <div class="wrapper">

        <!--<router-link to="/">project</router-link>-->
        <!--<router-link to="/about">about</router-link>-->
        <!--<router-view :contents-data='this.contentsData'></router-view>-->


        <!-- full swipe card type-->
        <!--<comp-list :contents-data='this.contentsData'></comp-list>-->

        <!-- middle content type -->
        <comp-main :contents-data='this.contentsData'></comp-main>

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
        }
    }
</script>


<style>
    body {
        /*background-image: linear-gradient(to top right, #005a96, #07a5e0);*/
        /*overflow: hidden;*/
        background-color: silver;
        font-size: 0.75rem;
        line-height: 1.375rem;
        font-weight: 100;

    }
    .category-list {
        /*margin: 10px 0!important;*/
    }

    .wrapper {
        /*overflow-x: hidden;*/
        /*height: 667px;*/
        /*overflow-x: hidden;*/

    }

    .overflow-wrapper {
        /*overflow: visible;*/
    }
</style>
