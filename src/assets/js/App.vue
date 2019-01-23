
<template>
    <div class="wrapper">

        <!--<router-link to="/">project</router-link>-->
        <!--<router-link to="/about">about</router-link>-->
        <!--<router-view :contents-data='this.contentsData'></router-view>-->


        <comp-list :contents-data='this.contentsData'></comp-list>

        <!--<div class="overflow-wrapper">
        <comp-fixed :contents-data='this.contentsData'></comp-fixed>
        </div>-->

    </div>

</template>

<script>

    import comp_frame from './comp-frame';
    import comp_list from './comp-list-contents';
    import comp_fixed from './comp-fixed-layer';


    export default {
        name: "app",

        components: {
            'comp-list': comp_list,
            'comp-fixed': comp_fixed
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
