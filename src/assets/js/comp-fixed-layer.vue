<template>
    <div class="module">
        <div class="module__item">
            <div>100%</div>
        </div>
    </div>
</template>

<script>
    import comp_content_detail from './comp-content-detail';

    export default {
        name: "comp-fixed-layer",

        components: {
            'comp-content-detail': comp_content_detail
        },

        created() {

            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);

        },

        props: {
            contentsData: {
                type: Array,
                default: function() {return {};}
            },
            data: {
                type: Object,
                default: function() {return {};}
            },
            bgimg: {
                type:String,
                default: function() {return '';}
            },
            index: {
                type:Number,
                default: function() {return 0;}
            }
        },

        data() {
            return {
                isContent: false
            };
        }
    }


</script>


<style scope lang="scss">
    body {
        background-color: #333;
    }

    .module {
        height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
        height: calc(var(--vh, 1vh) * 100);
        margin: 0 auto;
        max-width: 100%;
    }

    .module__item {
        /*align-items: center;*/
        /*display: flex;*/
        height: 100%;
        /*justify-content: center;*/
    }

    .module__item:nth-child(odd) {
        background-color: #fff;
        color: #F73859;
    }

    .module__item:nth-child(even) {
        background-color: #F73859;
        color: #F1D08A;
    }

</style>


<!--<style lang="scss" src="../css/style.scss">-->
<!--</style>-->
