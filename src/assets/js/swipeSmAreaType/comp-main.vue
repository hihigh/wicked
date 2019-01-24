<template>
    <div class="main-wrapper">
        <h2 class="title">Lorem Ipsum</h2>

        <p>like Aldus PageMaker including versions</p>
        <p>
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>



        <div class="swipe-wrapper">
            <div class="swipe-content-wrapper" @click.stop.prevent="onClickContent">
                <div class="content-inner-wrapper">
                    <div class="content-img" style='background-image: url("images/thumbnail-1200.jpg")'></div>
                </div>
            </div>

            <transition name="fade">
                <div class="swipe-content-detail" v-show="isDetailContentShow">
                    <h3>content title</h3>
                    <p>like Aldus PageMaker including versions</p>
                    <img src="images/thumbnail-1200_21.jpg" alt="">
                    <p>
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                    </p>

                    <img src="images/thumbnail-1200_27.jpg" alt="">
                    <p>
                        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                    </p>
                </div>
            </transition>


        </div>

        <div class="contents-wrapper">

            <img src="images/sampleimg.png" alt="">
            <p>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>

            <img src="images/sampleimg.png" alt="">
            <p>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
            </p>
        </div>

    </div>
</template>

<script>
    export default {
        name: "comp-main",

        data() {
            return {
                isDetailMode: false,
                isDetailContentShow: false
            };
        },

        mounted(){
            this.swipe_wrapper = this.$el.querySelector(".swipe-wrapper");
            this.swipe_wrapper_content = this.$el.querySelector(".swipe-content-wrapper");

            this.transing = false;
            // this.isDetailMode = false;

            this.checkSwipeOffsetTop();
        },

        methods: {
            onClickContent(e) {

                if(!this.isDetailMode){

                    this.gotoDetailMode();
                } else {
                    this.gotoListMode();
                }

                // this.moveScroll(300);

                console.log(this.swipe_wrapper_content.offsetTop);
            },



            // go to detail mode
            gotoDetailMode(){
                this.checkSwipeOffsetTop();

                let tgY = this.swipe_wrapper_content.offsetTop;

                this.swipe_wrapper_content.addEventListener("webkitTransitionEnd", this.gotoDetailModeComplete, {once:true});
                this.swipe_wrapper.classList.add("mode-detail");

                this.swipe_wrapper_content.style.top = tgY+"px";
                this.swipe_wrapper_content.style.transform = "translate3d(0,"+ (window.scrollY-tgY) +"px,0)";


            },

            gotoDetailModeComplete(e){
                this.swipe_wrapper.classList.add("mode-detail-end");
                this.swipe_wrapper_content.style = "";

                this.isDetailMode = true;
                this.isDetailContentShow = true;


                let content = this.$el.querySelector(".contents-wrapper");
                content.style.display = "none"

                this.moveScroll(0);

            },

            gotoListMode(){
                this.moveScroll(300);
                // this.swipe_wrapper.classList.remove("mode-detail-end");

                this.swipe_wrapper_content.addEventListener("webkitTransitionEnd", this.gotoListModeComplete, {once:true});
                this.swipe_wrapper_content.classList.add("reset-position");

                this.isDetailContentShow = false;
                let content = this.$el.querySelector(".contents-wrapper");
                content.style.display = "block"
                // hide detail content
                // show main content
                // move before scrollTop
                // change visual - del fix -> change absol(before positon) -> move -> del absol
            },

            gotoListModeComplete(e){
                this.swipe_wrapper_content.classList.remove("reset-position");
                this.swipe_wrapper.classList.remove("mode-detail");
                this.swipe_wrapper.classList.remove("mode-detail-end");
                this.isDetailMode = false;
            },


            moveScroll(scrollDuration){
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
            },

            checkSwipeOffsetTop(){
                // console.log(document.documentElement.style.getProperty('--offsetTop') )
                document.documentElement.style.setProperty('--offsetTop', `${this.swipe_wrapper_content.offsetTop}px`);
            }
        }
    }
</script>

<style scoped lang="scss">
    $swipe-height: 300px;

    .fade-enter-active{
        transition: opacity 0.2s, transform 0.5s cubic-bezier(.03, .49, .28, .98);
    }

    .fade-leave-active {
        transition: opacity 0.2s, transform 0.3s cubic-bezier(.37, 0, .34, 1);
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: translate3d(0,400px,0);
    }



    .main-wrapper {
        background-color: black;
        color: white;



        .title {
            width: 100%;
            font-size: 2rem;
            text-align: center;
            padding: 60px 0 ;
        }


        .swipe-wrapper {
            height: $swipe-height;
            /*background-color: #a0a5a8;*/

            &.mode-detail {
                .swipe-content-wrapper {
                    position: absolute;
                    transition: height 0.4s cubic-bezier(.59, 0, .31, 1), transform 0.4s cubic-bezier(.59, 0, .31, 1);
                    height: 100vh;

                    .content-inner-wrapper {
                        padding: 0px;
                    }
                }
            }

            &.mode-detail-end {
                .swipe-content-wrapper {
                    position: fixed;
                    transition: all 0s;
                    top: 0;
                    transform: translate3d(0,0,0);

                    &.reset-position {
                        height: $swipe-height;
                        top: var(--offsetTop);
                        transition: all 0.4s;

                        .content-inner-wrapper {
                            transition: padding 0.8s;
                            padding: 20px;
                        }


                    }
                }

                .swipe-content-detail {
                    margin-top: var(--offsetTop);

                }
            }


            .swipe-content-wrapper {
                width: 100%;
                height: $swipe-height;
                background-color: #333333;
                position: relative;
                top: 0;

                .content-inner-wrapper {
                    width: 100%;
                    height: 100%;
                    padding: 20px;
                    box-sizing: border-box;
                    transition: padding 0.8s;
                    .content-img {
                        margin: 0 auto;
                        width: 100%;
                        height: 100%;
                        background-size: cover;//15rem;
                        background-position: 50% 50%;
                    }
                }


            }

            .swipe-content-detail {
                /*display: none;*/
                /*opacity: 0;*/

                box-sizing: border-box;
                padding: 2rem 2rem 2rem;
                width: 100%;
                background-color: white;
                position: relative;
                color: black;
                //margin-top: $swipe-height;

                /*top: 0;*/

                h3 {
                    font-size: 2rem;
                    margin-bottom: 20px;
                }
                p {
                    color: #888888;
                }
                img {
                    width: 100%;
                    margin: 20px 0;
                }

            }
        }



        .contents-wrapper {
            padding: 4rem 2rem 2rem;


            p {
                margin: 20px 0;
            }


            img {
                width: 100%;
            }
        }
    }

</style>