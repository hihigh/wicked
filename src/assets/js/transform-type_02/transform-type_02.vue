<template>
    <div class="main-wrapper">

        <!--<div class="about-lab">
            <h1 class="logo">
                <span class="blind">df lab</span>
                <img src="images/df_lab_logo_fit_w.svg" alt="DF Logo" class="img-logo">
            </h1>
            <p class="dec-lab">
                <span style="visibility: visible;">Creative freedom, a sense of responsibility and passionate energies are the driving force behind our creation of innovative experiences. Our success has been recognized by numerous international accolades as well as strong relationship with international clients. We build the future of digital creativity.</span>
            </p>
        </div>-->
        <comp-content-about></comp-content-about>

        <div class="expand-content-wrapper">
            <div class="expand-content" @click.stop.prevent="onClickExpandContent">
                <div class="expand-content-inner-wrapper">
                    <div class="content-img" style='background-image: url("images/thumbnail-1200_27.jpg")'></div>

                </div>
            </div>

            <transition name="fade">
                <div class="expand-content-detail" v-show="isExpandContentDetailShow" @click.stop.prevent="onClickExpandContent">
                    <div class="expand-content-detail-inner-wrapper">
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



        <comp-content-detail></comp-content-detail>

    </div>
</template>

<script>

    import mixin from "../common/common_mixin.vue";
    import comp_about from '../common/comp-content_about_b';
    import comp_content_detail from '../common/comp-content_detail_w';


    export default {
        name: "transform-type_02",

        components: {
            "comp-content-detail": comp_content_detail,
            "comp-content-about": comp_about
        },


        mixins: [mixin],

        data() {
            return {
                isExpandMode: false,
                isExpandContentDetailShow: false
            };
        },

        mounted() {
            this.expand_wrapper = this.$el.querySelector(".expand-content-wrapper");
            this.expand_content = this.$el.querySelector(".expand-content");

            this.checkBeforeScrollTop();
            this.checkExpandContentOffsetTop();

        },

        methods: {
            onClickExpandContent(e) {

                if (!this.isExpandMode) {

                    this.checkBeforeScrollTop();
                    this.gotoExpandMode();
                } else {
                    this.gotoMainMode();
                }

            },




            // go to expand mode
            gotoExpandMode() {
                this.checkExpandContentOffsetTop();

                let tgY = this.expand_content.offsetTop;

                this.expand_content.addEventListener("webkitTransitionEnd", this.gotoExpandModeComplete, {once: true});
                this.expand_wrapper.classList.add("mode-expand");
                this.$el.classList.add("mode-expand");

                this.expand_content.style.top = tgY + "px";
                this.expand_content.style.transform = "translate3d(0," + (window.scrollY - tgY) + "px,0)";
            },

            gotoExpandModeComplete(e) {
                this.mx_scrollTo(0, 0);

                this.expand_wrapper.classList.add("mode-expand-end");
                this.expand_content.style = "";

                this.isExpandMode = true;

                this.showExpandDetailContent();

            },


            showExpandDetailContent(){
                this.isExpandContentDetailShow = true;

                let content = this.$el.querySelector(".etc-contents-wrapper");
                content.style.display = "none";
            },

            hideExpandDetailContent(){
                this.isExpandContentDetailShow = false;

                let content = this.$el.querySelector(".etc-contents-wrapper");
                content.style.display = "block";
            },





            //go to main mode (main)
            gotoMainMode() {
                this.mx_scrollTo(this.expandContentOffsetTop-this.saveScrollPosition, 300);

                this.expand_content.addEventListener("webkitTransitionEnd", this.gotoMainModeComplete, {once: true});
                this.expand_content.classList.add("reset-position");
                this.$el.classList.remove("mode-expand");

                this.hideExpandDetailContent();

            },

            gotoMainModeComplete(e) {
                this.expand_content.classList.remove("reset-position");
                this.expand_wrapper.classList.remove("mode-expand");

                this.expand_wrapper.classList.remove("mode-expand-end");
                this.isExpandMode = false;
            },






            //set data
            checkExpandContentOffsetTop() {
                // console.log(document.documentElement.style.getProperty('--offsetTop') )
                this.expandContentOffsetTop = this.expand_content.offsetTop;
                document.documentElement.style.setProperty('--offsetTop', `${this.expand_content.offsetTop}px`);
            },

            checkBeforeScrollTop() {
                // sc - 0 : top : 275
                // sc - 275 : top - 0
                // sc - 300 : top - -25
                // 275 - sc
                this.saveScrollPosition = this.expand_content.offsetTop-window.scrollY;
                document.documentElement.style.setProperty('--beforeScrollTop', `${this.saveScrollPosition}px`);
                console.log("this.saveScrollPosition : ", this.saveScrollPosition)
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


        .expand-content-wrapper {
            height: $swipe-height;

            &.mode-expand {
                .expand-content {
                    position: absolute;
                    transition: height 0.4s cubic-bezier(.59, 0, .31, 1), transform 0.4s cubic-bezier(.59, 0, .31, 1);
                    height: 100vh;

                    .expand-content-inner-wrapper {
                        padding: 0px;
                    }
                }
            }

            &.mode-expand-end {
                .expand-content {
                    position: fixed;
                    transition: all 0s;
                    top: 0;
                    transform: translate3d(0, 0, 0);

                    &.reset-position {
                        height: $swipe-height;
                        top: var(--beforeScrollTop);//var(--offsetTop);
                        transition: all 0.4s;

                        .expand-content-inner-wrapper {
                            /*transition: padding 0.8s;*/
                            /*padding: 20px;*/
                        }


                    }
                }


            }


            .expand-content {
                width: 100%;
                height: $swipe-height;
                background-color: #222222;
                position: relative;
                top: 0;
                z-index: 1;

                .expand-content-inner-wrapper {
                    width: 100%;
                    height: 100%;
                    /*padding: 20px;*/
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

            .expand-content-detail {

                .expand-content-detail-inner-wrapper {
                    position: relative;
                    box-sizing: border-box;
                    padding: 2rem 2rem 2rem;

                }

                padding-top: calc(var(--offsetTop) * -1 + 70vh);
                width: 100%;
                z-index: 1;

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





        .about-lab {

            transition: all 0.5s;

        }


        .etc-contents-wrapper {
            padding: 4rem 2rem 2rem;
            transition: all 0.5s;

            .etc-contents-img {

                background-size: cover;
                background-position: 50% 50%;
                width: 100%;
                height: 200px;

            }

            p {
                margin: 20px 0;
            }


            img {
                width: 100%;
            }
        }


        &.mode-expand {
            .about-lab {
                transform: scale(0.9);
                transform-origin: 50% 100%;
                opacity: 0;
            }

            .etc-contents-wrapper {
                transform: scale(0.9);
                transform-origin: 50% 0%;
                opacity: 0;
            }
        }
    }

</style>