<template>
    <div id="wrapper">

        <comp-content-about></comp-content-about>


        <comp-scroll-fixed top="100" :scroll-y="scrollY"></comp-scroll-fixed>



        <comp-content-detail></comp-content-detail>
        <comp-content-detail></comp-content-detail>


    </div>
</template>

<script>
    import comp_scroll_fixed from './comp-scroll_fixed';
    import comp_content_detail from '../common/comp-content_detail_w';
    import comp_content_about from '../common/comp-content_about_w';


    export default {
        name: "scroll-fixed-type-01",

        data() {
            return {
                scrollY: 0
            };
        },

        mounted() {
            window.addEventListener('scroll', (event) => {
                this.scrollY = window.scrollY;
            });
        },


        components: {
            "comp-scroll-fixed": comp_scroll_fixed,
            "comp-content-detail": comp_content_detail,
            "comp-content-about": comp_content_about
        }
    }
</script>

<style scoped lang="scss">
    #wrapper {
        /*height: 1200px;*/
        background-color: white;
    }

    .etc-contents-wrapper {
        position: relative;
        z-index: 1;
        background-color: white;

    }

</style>