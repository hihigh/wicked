<template>
    <div class="content-detail-wrapper">
        <div class="content-detail" @click.stop.prevent="onClick_gotoList">
            <comp-content-detail></comp-content-detail>
        </div>

    </div>
</template>

<script>
    import { EventBus } from '../common/EventBus';
    import mixin from "../common/common_mixin.vue";
    import comp_content_detail from '../common/comp-content_detail_w';

    export default {
        name: "comp-content",

        mixins: [mixin],

        components: {
            "comp-content-detail": comp_content_detail
        },

        props: {
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

        methods: {

            onClick_gotoList(){

                this.mx_scrollTo(0, 300);

                var _this = this;
                EventBus.$emit(EventBus.SHOW_LIST, _this.index);


            }
        }
    }
</script>

<style scoped  lang="scss">
    p {
        margin: 20px 0;
    }

    .image-area {
        height: 15rem;
        /*padding: 4rem 6rem;*/
        background-color: #f3f5f5;
        background-size: 5rem;
        background-position: center;
        background-repeat: no-repeat;

        margin: 20px 0;
    }

    .content-detail-wrapper {

        white-space: normal;
        text-align: left;
        z-index: 1;
        position: relative;
        transition: all 0.3s;
        .content-detail {
            /*width: calc(100% - 60px);*/
            margin: -40vh auto 0%;
        }

    }



</style>