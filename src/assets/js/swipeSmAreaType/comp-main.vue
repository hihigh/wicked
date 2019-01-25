<template>
    <div class="main-wrapper">

        <div class="about-lab">
            <h1 class="logo">
                <span class="blind">df lab</span>
                <img src="images/df_lab_logo_fit_w.svg" alt="DF Logo" class="img-logo">
            </h1>
            <p class="dec-lab">
                <span style="visibility: visible;">Creative freedom, a sense of responsibility and passionate energies are the driving force behind our creation of innovative experiences. Our success has been recognized by numerous international accolades as well as strong relationship with international clients. We build the future of digital creativity.</span>
            </p>
        </div>


        <div class="swipe-wrapper">
            <div class="swipe-content-wrapper" @click.stop.prevent="onClickContent">
                <div class="content-inner-wrapper">
                    <div class="content-img" style='background-image: url("images/thumbnail-1200_21.jpg")'></div>

                </div>
            </div>

            <transition name="fade">
                <div class="swipe-content-detail" v-show="isDetailContentShow" @click.stop.prevent="onClickContent">
                    <div class="swipe-content-detail-inner-wrapper">
                        <div class="detail-bg"></div>
                        <div class="detail-wrap">
                            <h3>content title</h3>
                            <p>like Aldus PageMaker including versions</p>
                            <img src="images/thumbnail-1200_21.jpg" alt="">
                            <p>
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                unknown printer took a galley of type and scrambled it to make a type specimen book.<br>It
                                has survived not only five centuries, but also the leap into electronic typesetting,
                                remaining essentially unchanged. <br><br>It was popularised in the 1960s with the release of
                                Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing
                                software like Aldus PageMaker including versions of Lorem Ipsum.
                            </p>

                            <img src="images/thumbnail-1200_27.jpg" alt="">
                            <p>
                                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                                unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                    </div>


                </div>
            </transition>


        </div>

        <div class="contents-wrapper">

            <img src="images/img_01.png" alt="">
            <p>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five
                centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It
                was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>

            <img src="images/img_02.png" alt="">
            <p>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a type specimen book.
            </p>
        </div>

    </div>
</template>

<script>

    import mixin from "../common/common_mixin.vue"


    export default {
        name: "comp-main",

        mixins: [mixin],

        data() {
            return {
                isDetailMode: false,
                isDetailContentShow: false
            };
        },

        mounted() {
            this.swipe_wrapper = this.$el.querySelector(".swipe-wrapper");
            this.swipe_wrapper_content = this.$el.querySelector(".swipe-content-wrapper");
            this.saveDetailOffsetTop = this.swipe_wrapper_content.offsetTop;

            // this.transing = false;
            // this.isDetailMode = false;

            this.checkSwipeOffsetTop();



        },

        methods: {
            onClickContent(e) {

                if (!this.isDetailMode) {

                    this.checkBeforeScrollTop();
                    this.gotoDetailMode();
                } else {
                    this.gotoListMode();
                }

            },


            // go to detail mode
            gotoDetailMode() {
                this.checkSwipeOffsetTop();

                let tgY = this.swipe_wrapper_content.offsetTop;

                this.swipe_wrapper_content.addEventListener("webkitTransitionEnd", this.gotoDetailModeComplete, {once: true});
                this.swipe_wrapper.classList.add("mode-detail");

                this.swipe_wrapper_content.style.top = tgY + "px";
                this.swipe_wrapper_content.style.transform = "translate3d(0," + (window.scrollY - tgY) + "px,0)";


            },

            gotoDetailModeComplete(e) {
                this.mx_scrollTo(0, 0);

                this.swipe_wrapper.classList.add("mode-detail-end");
                this.swipe_wrapper_content.style = "";

                this.isDetailMode = true;

                this.showDetailContent();

            },


            showDetailContent(){
                this.isDetailContentShow = true;

                let content = this.$el.querySelector(".contents-wrapper");
                content.style.display = "none";


                // let detail_content = this.$el.querySelector(".swipe-content-detail");
                // detail_content.classList.add("offset-margin");
            },

            hideDetailContent(){
                this.isDetailContentShow = false;

                let content = this.$el.querySelector(".contents-wrapper");
                content.style.display = "block";

                // let detail_content = this.$el.querySelector(".swipe-content-detail");
                // detail_content.classList.remove("offset-margin");
            },



            gotoListMode() {
                console.log(this.beforeScTop, this.saveDetailOffsetTop)
                this.mx_scrollTo(this.saveDetailOffsetTop-this.beforeScTop, 300);

                this.swipe_wrapper_content.addEventListener("webkitTransitionEnd", this.gotoListModeComplete, {once: true});
                this.swipe_wrapper_content.classList.add("reset-position");

                this.hideDetailContent();

            },

            gotoListModeComplete(e) {
                this.swipe_wrapper_content.classList.remove("reset-position");
                this.swipe_wrapper.classList.remove("mode-detail");
                this.swipe_wrapper.classList.remove("mode-detail-end");
                this.isDetailMode = false;
            },


            scrollTo(to, duration) {
                const
                    element = document.scrollingElement || document.documentElement,
                    start = element.scrollTop,
                    change = to - start,
                    startDate = +new Date(),

                    // t = current time,  b = start value, c = change in value, d = duration
                    easeInOutQuad = function(t, b, c, d) {
                        t /= d/2;
                        if (t < 1) return c/2*t*t + b;
                        t--;
                        return -c/2 * (t*(t-2) - 1) + b;
                    },
                    animateScroll = function() {
                        const currentDate = +new Date();
                        const currentTime = currentDate - startDate;
                        element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
                        if(currentTime < duration) {
                            requestAnimationFrame(animateScroll);
                        }
                        else {
                            element.scrollTop = to;
                        }
                    };
                animateScroll();
            },

            checkSwipeOffsetTop() {
                // console.log(document.documentElement.style.getProperty('--offsetTop') )
                document.documentElement.style.setProperty('--offsetTop', `${this.swipe_wrapper_content.offsetTop}px`);
            },

            checkBeforeScrollTop() {
                // sc - 0 : top : 275
                // sc - 275 : top - 0
                // sc - 300 : top - -25
                // 275 - sc
                this.beforeScTop = this.swipe_wrapper_content.offsetTop-window.scrollY;
                document.documentElement.style.setProperty('--beforeScrollTop', `${this.beforeScTop}px`);
                console.log(this.beforeScTop)
            }
        }
    }
</script>

<style scoped lang="scss">
    $swipe-height: 200px;

    .fade-enter-active {
        transition: opacity 0.2s, transform 0.5s cubic-bezier(.03, .49, .28, .98);
    }

    .fade-leave-active {
        transition: opacity 0.2s, transform 0.3s cubic-bezier(.37, 0, .34, 1);
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: translate3d(0, 400px, 0);
    }


    .main-wrapper {
        background-color: black;
        color: white;


        .title {
            width: 100%;
            font-size: 2rem;
            text-align: center;
            padding: 60px 0;
        }


        .swipe-wrapper {
            height: $swipe-height;

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
                    transform: translate3d(0, 0, 0);

                    &.reset-position {
                        height: $swipe-height;
                        top: var(--beforeScrollTop);//var(--offsetTop);
                        transition: all 0.4s;

                        .content-inner-wrapper {
                            /*transition: padding 0.8s;*/
                            padding: 20px;
                        }


                    }
                }


            }


            .swipe-content-wrapper {
                width: 100%;
                height: $swipe-height;
                background-color: #222222;
                position: relative;
                top: 0;

                .content-inner-wrapper {
                    width: 100%;
                    height: 100%;
                    padding: 20px;
                    box-sizing: border-box;
                    transition: padding 0.8s;

                    .content-img {
                        transition: all 1s cubic-bezier(.03, .49, .28, .98);
                        margin: 0 auto;
                        width: 100%;
                        height: 100%;
                        background-size: cover;//20rem;
                        background-position: 50% 50%;
                        background-repeat: no-repeat;
                    }
                }


            }

            .swipe-content-detail {

                .swipe-content-detail-inner-wrapper {
                    position: relative;
                    box-sizing: border-box;
                    padding: 2rem 2rem 2rem;
                }

                padding-top: calc(var(--offsetTop) * -1 + 70vh);
                width: 100%;

                position: relative;
                color: black;

                &.offset-margin {
                    margin-top: calc(var(--offsetTop) * -1 + 70vh);
                }


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

                .detail-bg {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    background-color: white;
                    top: 0;//calc(var(--offsetTop) * -1 + 70vh - 2rem);
                    left: 0;
                    opacity: 0.95;

                }

                .detail-wrap {
                    position: relative;
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


        .about-lab {
            padding: 2rem 2rem 2rem;
            box-sizing: border-box;

            .logo {
                margin: 2rem 0;

                .img-logo {
                    width: 104px;
                }
            }
        }
    }

</style>