<template>
    <div class="main-wrapper">

        <div class="about-lab">
            <h1 class="logo">
                <span class="blind">df lab</span>
                <img src="images/df_lab_logo_fit_b.svg" alt="DF Logo" class="img-logo">
            </h1>
            <p class="dec-lab">
                <span style="visibility: visible;">Creative freedom, a sense of responsibility and passionate</span>
            </p>
        </div>


        <div class="expand-content-wrapper">
            <div class="expand-content" @click.stop.prevent="onClickExpandContent">
                <!-- fixed -->
                <div class="expand-content-inner-wrapper">
                    <div class="expand-content-bgimg">
                        <div class="content-img" style='background-image: url("images/noimg.png")'></div>
                        <!--<div class="content-img" style='background-image: url("images/noimg.png")'></div>
                        <div class="content-img" style='background-image: url("images/noimg.png")'></div>
                        <div class="content-img" style='background-image: url("images/noimg.png")'></div>
                        <div class="content-img" style='background-image: url("images/noimg.png")'></div>-->
                    </div>

                    <div class="expand-content-text">
                        <div class="content-text">
                            <h3>Rain</h3>
                        </div>
                        <!--<div class="content-text">
                            <h3>Snow</h3>
                        </div>
                        <div class="content-text">
                            <h3>Fire</h3>
                        </div>
                        <div class="content-text">
                            <h3>Star</h3>
                        </div>
                        <div class="content-text">
                            <h3>Design</h3>
                        </div>-->
                    </div>
                </div>
                <!-- fixed -->

            </div>

            <transition name="fade">
                <div class="expand-content-detail" v-show="isExpandMode"  @click.stop.prevent="onClickExpandContent">
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



        <div class="etc-contents-wrapper">

            <div class="etc-contents-img" style='background-image: url("images/noimg_w.png")'></div>
            <p>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five
                centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It
                was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>

        </div>

    </div>
</template>

<script>

    import mixin from "../common/common_mixin.vue";
    // import velocity from Velocity;


    export default {
        name: "comp-main-swty",

        mixins: [mixin],

        data() {
            return {
                isExpandMode: false
            };
        },

        mounted() {
            this.expand_wrapper = this.$el.querySelector(".expand-content-wrapper");
            this.expand_content = this.$el.querySelector(".expand-content");
        },

        methods: {
            onClickExpandContent(e) {

                if (!this.isExpandMode) {
                    this.gotoExpandMode();
                } else {
                    this.gotoMainMode();
                }

            },




            // go to expand mode
            gotoExpandMode() {

                var main = this.$el;
                main.classList.add("mode-expand");

                var about = main.querySelector(".about-lab");
                var about_logo = main.querySelector(".about-lab .logo");
                var time = 400;

                Velocity(
                    about,
                    { height:0+'px', paddingTop:0, paddingBottom:0, backgroundColor:'#000000'},
                    { easing: 'easeInOutCubic', duration: time*1.5}
                );
                Velocity(
                    about_logo,
                    { marginTop:0},
                    { easing: 'easeInOutCubic', duration: time }
                );

                Velocity(
                    main,
                    { marginTop:0},
                    { easing: 'easeInOutCubic', duration: time, complete: this.gotoExpandModeComplete }
                );


                this.mx_scrollTo(0, 600);
            },


            gotoExpandModeComplete(e) {
                var main = this.$el;
                main.classList.add("mode-expand-end");

                this.isExpandMode = true;
                this.showExpandDetailContent();
            },



            //go to main mode (main)
            gotoMainMode() {

                var main = this.$el;
                main.classList.remove("mode-expand");

                var about = main.querySelector(".about-lab");
                var about_logo = main.querySelector(".about-lab .logo");
                var time = 400;

                Velocity(
                    about,
                    { height:25+'vh', paddingTop:2+"rem", paddingBottom:2+"rem", backgroundColor:'#ffffff'},
                    { easing: 'easeInOutCubic', duration: time*1.5}
                );
                Velocity(
                    about_logo,
                    { marginTop:2+"rem"},
                    { easing: 'easeInOutCubic', duration: time, complete: this.gotoMainModeComplete }
                );

                this.mx_scrollTo(0, 300);

                this.isExpandMode = false;
                this.hideExpandDetailContent();

            },

            gotoMainModeComplete(e) {

            },



            showExpandDetailContent(){


                let content = this.$el.querySelector(".etc-contents-wrapper");
                content.style.display = "none";
            },

            hideExpandDetailContent(){

                let content = this.$el.querySelector(".etc-contents-wrapper");
                content.style.display = "block";
            }




        }
    }
</script>

<style scoped lang="scss">
    $swipe-height: 25vh;
    $swipe-height-expand: 35vh;
    $swipe-width: 90%;

    $trans-time:0.4s;
    $trans-bezier:cubic-bezier(.37, 0, .34, 1);


    .fade-enter-active {
        transition: opacity 0.2s, transform 0.8s cubic-bezier(0, .91, .15, 1);
    }

    .fade-leave-active {
        transition: opacity 0.2s, transform 0.3s cubic-bezier(.37, 0, .34, 1);
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: translate3d(0, -400px, 0) scale(0.9);
    }


    .main-wrapper {
        background-color: white;
        color: black;

        /*overflow: hidden;*/


        .title {
            width: 100%;
            font-size: 2rem;
            text-align: center;
            padding: 60px 0;
        }


        .expand-content-wrapper {
            height: $swipe-height;
            transition: all $trans-time $trans-bezier;

            .expand-content {
                width: 100%;
                height: $swipe-height;
                /*background-color: #eeeeee;*/
                position: relative;
                top: 0;
                z-index: 1;

                .expand-content-inner-wrapper {
                    text-align: center;

                    .expand-content-bgimg {
                        position: absolute;
                        width: 100%;
                        height: $swipe-height;

                        transition: all $trans-time $trans-bezier;

                        .content-img {
                            display: inline-block;
                            width: $swipe-width;
                            height: 100%;

                            background-size: 100%;
                            background-position: 50% 50%;
                            background-repeat: no-repeat;
                            border-radius: 20px;

                            transition: all $trans-time $trans-bezier;
                        }
                    }

                    .expand-content-text {
                        position: absolute;
                        width: 100%;
                        height: $swipe-height;

                        /*left: 2rem;*/
                        color: white;
                        transition: all $trans-time $trans-bezier;
                        .content-text {
                            display: inline-block;
                            width: $swipe-width;
                            /*margin: 0 5% 0 0%;*/
                            height: 100%;
                            font-size: 1.5rem;
                            opacity: 0.5;
                            transition: all $trans-time $trans-bezier;

                            h3{
                                font-weight: lighter;
                                position: absolute;

                                margin-left: 2rem;
                                bottom: 2rem;
                                /*margin-top: 70%;*/

                            }




                            /*margin-top: calc(100% - 50px);*/
                        }
                    }




                }


            }





            .expand-content-detail {
                /*display: none;*/
                transform-origin: 50% 0%;
                .expand-content-detail-inner-wrapper {
                    position: relative;
                    box-sizing: border-box;
                    padding: 2rem 2rem 2rem;

                }

                /*padding-top: calc(var(--offsetTop) * -1 + 70vh);*/
                width: 100%;
                z-index: 0;

                position: relative;
                color: black;


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
                    /*opacity: 0.95;*/

                }

                .detail-wrap {
                    position: relative;
                }

            }
        }





        .about-lab {
            padding: 2rem 2rem 2rem;
            box-sizing: border-box;
            height: 25vh;
            .logo {
                margin: 2rem 0;

                .img-logo {
                    width: 104px;
                }
            }
        }


        .etc-contents-wrapper {
            padding: 2rem 2rem 2rem;
            transition: all 0.4s;

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
            .etc-contents-wrapper {
                transform: translate3d(0,20vh,0);
                transform-origin: 50% -100%;
                opacity: 0;
                /*background-color: black;*/
            }

            .expand-content-wrapper{
                height: $swipe-height-expand;
                .expand-content {
                    height: $swipe-height-expand;
                    .expand-content-inner-wrapper {
                        .expand-content-bgimg {
                            height: $swipe-height-expand;
                            box-shadow: 0 15px 15px 0 rgba(0,0,0,0.2);
                            left: 0;

                            .content-img {
                                width: 100%;
                                border-radius: 0px;
                                background-size: 130%;
                            }
                        }

                        .expand-content-text {
                            left:0;
                            height: $swipe-height-expand;
                            /*color: rebeccapurple;*/

                            .content-text {
                                width: 100%;
                                font-size: 2rem;
                                opacity: 1;

                            }
                        }
                    }
                }
            }


        }
    }

</style>