<template>
    <div class="main-wrapper">
        <!--<router-view :contents-data='this.contentsData'></router-view>-->
        <comp-list :contents-data='this.contentsData'></comp-list>
    </div>
</template>

<script>

    import comp_list from './comp-list-contents';

    export default {
        name: "Main",

        components: {
            'comp-list': comp_list
        },

        props: {
            contentsData: {
                type: Array,
                default: function() {return '';}
            }
        }
    }
</script>

<style scoped>
    .main-wrapper {

        overflow: hidden;
        width: 100%;
    }

</style>




<!--
https://codepen.io/qwe10251025/pen/VVoqzN
-->