<template>
    <div class="main-wrapper">
        <div class="title">Lorem Ipsum</div>
        <div class="swipe-wrapper">


            <div class="swipe-content-wrapper" @click.stop.prevent="onClickContent">
                <div class="content-inner-wrapper">
                    <div class="content-img" style='background-image: url("images/thumbnail-1200.jpg")'></div>
                </div>
            </div>

            <div class="swipe-content-detail">
                <img src="images/thumbnail-1200_12.jpg" alt="">
                <p>
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>

                <img src="images/thumbnail-1200_21.jpg" alt="">
                <p>
                    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                </p>
            </div>


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

        mounted(){
            this.swipe_wrapper = this.$el.querySelector(".swipe-wrapper");
            this.swipe_wrapper_content = this.$el.querySelector(".swipe-content-wrapper");

            this.transing = false;
            this.isDetailMode = false;
            this.save
        },

        methods: {
            onClickContent(e) {

                if(!this.isDetailMode){

                    this.gotoDetailMode();
                } else {
                    this.gotoListMode();
                }

                // this.moveScroll(300);
            },



            // go to detail mode
            gotoDetailMode(){
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

            },

            gotoListMode(){
                this.moveScroll(300);
                // this.swipe_wrapper.classList.remove("mode-detail-end");

                this.swipe_wrapper_content.addEventListener("webkitTransitionEnd", this.gotoListModeComplete, {once:true});
                this.swipe_wrapper_content.classList.add("sm");

                // hide detail content
                // show main content
                // move before scrollTop
                // change visual - del fix -> change absol(before positon) -> move -> del absol
            },

            gotoListModeComplete(e){
                this.swipe_wrapper_content.classList.remove("sm");
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
            }
        }
    }
</script>

<style scoped lang="scss">
    $swipe-height: 300px;

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
            background-color: #a0a5a8;

            &.mode-detail {
                .swipe-content-wrapper {
                    position: absolute;
                    transition: height 0.4s cubic-bezier(.59, 0, .31, 1), transform 0.4s cubic-bezier(.59, 0, .31, 1);
                    height: $swipe-height * 2;

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

                    &.sm {
                        padding: 20px;
                        box-sizing: border-box;
                        height: $swipe-height;
                        top: 142px;
                        transition: all 0.4s;
                    }
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
                display: none;
                width: 100%;
                background-color: aquamarine;
                position: relative;
                /*top: 0;*/

                img {
                    width: 100%;
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