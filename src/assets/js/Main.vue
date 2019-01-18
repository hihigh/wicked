<template>
    <div class="main-wrapper">
        <router-view :contents-data='this.contentsData'></router-view>
    </div>
</template>

<script>
    export default {
        name: "Main",

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