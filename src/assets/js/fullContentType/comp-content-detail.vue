<template>
    <div class="content-detail-wrapper">
        <div class="content-detail" @click.stop.prevent="onClick_gotoList">
            <p v-html="data.description"></p>
            <div class="image-area" :style="{ 'background-image': 'url(' + 'images/image.png' + ')' }">
                <!--<img src="../images/image.png" ></img>-->
            </div>

            <p v-html="data.content"></p>
            <p v-html="data.description"></p>
            <div class="image-area" :style="{ 'background-image': 'url(' + 'images/image.png' + ')' }">
                <!--<img src="../images/image.png" ></img>-->
            </div>
            <p v-html="data.description"></p>
        </div>

    </div>
</template>

<script>
    import { EventBus } from '../EventBus';
    import velocity from 'velocity-animate'


    export default {
        name: "comp-content-detail",

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
            onClickContent(){
                EventBus.$emit(EventBus.SHOW_CONTENT, this.index);
            },

            onClick_gotoList(){

                scrollToTop(300);

                var _this = this;
                EventBus.$emit(EventBus.SHOW_LIST, _this.index);

                function scrollToTop(scrollDuration) {
                    var cosParameter = window.scrollY / 2,
                        scrollCount = 0,
                        oldTimestamp = performance.now();
                    function step (newTimestamp) {
                        scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
                        if (scrollCount >= Math.PI) window.scrollTo(0, 0);
                        if (window.scrollY === 0) {
                            return;
                        }
                        window.scrollTo(0, Math.round(cosParameter + cosParameter * Math.cos(scrollCount)));
                        oldTimestamp = newTimestamp;
                        window.requestAnimationFrame(step);
                    }
                    window.requestAnimationFrame(step);
                }

                function endEvent(){

                }

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



</style>