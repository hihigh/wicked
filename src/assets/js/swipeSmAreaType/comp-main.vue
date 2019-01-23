<template>
    <div class="main-wrapper">
        <div class="title">Lorem Ipsum</div>
        <div class="swipe-wrapper">
            <div class="swipe-content-wrapper" @click.stop.prevent="onClickContent">
                <div class="content-inner-wrapper">
                    <div class="content-img" style='background-image: url("images/sampleimg.png")'></div>
                </div>

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

        methods: {
            onClickContent(e) {

                var tgEle = e.toElement;
                var tgY = tgEle.offsetTop;

                // 0 - 142
                // 142 - 0
                // 160 -

                console.log( window.scrollY ,tgEle.offsetTop, tgY);
                tgEle.style.position = "absolute";
                tgEle.style.top = tgY+"px";

                tgEle.style.transform = "translate3d(0,"+ (window.scrollY-tgEle.offsetTop) +"px,0)";

                tgEle.classList.add("expand")
                tgEle.addEventListener("webkitTransitionEnd", this.moveContentComplete, {once:true});

                // this.moveScroll(300);
            },

            moveContentComplete(e){
                console.log("complete", e.target)
                var tgEle = e.target
                tgEle.classList.add("expand-complete")
                tgEle.style = "";

                // this.$el.querySelector(".contents-wrapper").style.display = "none"


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
        color: black;
        line-height: 1.4rem;


        .title {
            width: 100%;
            font-size: 2rem;
            text-align: center;
            padding: 60px 0 ;
        }


        .swipe-wrapper {
            height: $swipe-height;
            background-color: #a0a5a8;


            .swipe-content-wrapper {
                width: 100%;
                height: $swipe-height;
                background-color: aquamarine;
                position: relative;
                top: 0;

                &.expand {
                    transition: height 0.4s cubic-bezier(.59, 0, .31, 1), transform 0.4s cubic-bezier(.59, 0, .31, 1);
                    height: $swipe-height * 1.5;

                    .content-inner-wrapper {
                        padding: 0px;
                    }
                }

                &.expand-complete {
                    position: fixed;
                    transition: all 0s;
                    top: 0;
                    transform: translate3d(0,0,0);
                }


                .content-inner-wrapper {
                    pointer-events: none;
                    width: 100%;
                    height: 100%;
                    padding: 20px;
                    box-sizing: border-box;
                    transition: all 0.6s;
                    .content-img {
                        margin: 0 auto;
                        width: 100%;
                        height: 100%;
                        background-size: 15rem;
                        background-position: 50% 50%;
                    }
                }


            }
        }



        .contents-wrapper {
            padding: 30px;

            p {
                margin: 20px 0;
            }


            img {
                width: 100%;
            }
        }
    }

</style>