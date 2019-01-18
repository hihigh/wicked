
<template>
    <div class="wrapper">

        <!--<router-link to="/">project</router-link>-->
        <!--<router-link to="/about">about</router-link>-->

        <!--<ul>-->
            <!--<li class='category-list' v-for='content in contentsData'>-->
                <!--<router-link :to="`/${content.name}`">{{content.title}}</router-link>-->
            <!--</li>-->
        <!--</ul>-->


        <router-view :contents-data='this.contentsData'></router-view>

        <!--<comp_frame :contents-data='this.contentsData'></comp_frame>-->
        <!--<comp_list :contents-data='this.contentsData'></comp_list>-->

    </div>

</template>

<script>

    import comp_frame from './comp-frame';
    import comp_list from './comp-list-contents';


    export default {
        name: "app",

        components: {
            comp_frame,
            comp_list
        },

        created() {

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
    }
    .category-list {
        /*margin: 10px 0!important;*/
    }
</style>
