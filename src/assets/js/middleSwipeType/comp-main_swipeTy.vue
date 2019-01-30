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
                        <div class="content-img" style='background-image: url("images/noimg.png")'></div>
                        <div class="content-img" style='background-image: url("images/noimg.png")'></div>
                        <div class="content-img" style='background-image: url("images/noimg.png")'></div>
                        <div class="content-img" style='background-image: url("images/noimg.png")'></div>
                    </div>

                    <div class="expand-content-text">
                        <div class="content-text">
                            <h3>Rain</h3>
                        </div>
                        <div class="content-text">
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
                        </div>
                    </div>
                </div>
                <!-- fixed -->

            </div>

            <transition name="fade">
                <div class="expand-content-detail" v-show="isExpandContentDetailShow"  @click.stop.prevent="onClickExpandContent">
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

                    // this.checkBeforeScrollTop();
                    this.gotoExpandMode();
                } else {
                    this.gotoMainMode();
                }

            },




            // go to expand mode
            gotoExpandMode() {

                var ele = this.$el.querySelector(".expand-content-bgimg");
                var tgY = this.expand_content.offsetTop;
                var main = this.$el;


                console.log(tgY-window.scrollY)
                main.classList.add("mode-expand");

                var bgimg = this.$el.querySelector(".expand-content-bgimg");
                var bgimg_img = this.$el.querySelector(".expand-content-bgimg .content-img");

                var text = this.$el.querySelector(".expand-content-text");
                var text_txt = this.$el.querySelector(".expand-content-text .content-text");
                var about = this.$el.querySelector(".about-lab");
                var logo = this.$el.querySelector(".about-lab .logo");

                var time = 400;
                Velocity(
                    bgimg,
                    { left:0},
                    { easing: 'easeInOutCubic', duration: time, complete: function(){
                        console.log("complete", this.style)
                    } }
                );

                Velocity(
                    bgimg_img,
                    { width:100+'%', borderRadius: 0, backgroundSize:"130%" },
                    { easing: 'easeInOutCubic', duration: time, complete: function(){
                            console.log("complete", this.style)
                        } }
                );


                Velocity(
                    text,
                    { left:0, height:100+"%", color:"#ff0000"},
                    { easing: 'easeInOutCubic', duration: time }
                );

                Velocity(
                    text_txt,
                    { width:100+'%', fontSize:"2rem", opacity:1},
                    { easing: 'easeInOutCubic', duration: time }
                );




                Velocity(
                    about,
                    { height:0+'px', paddingTop:0, paddingBottom:0, backgroundColor:'#000000'},
                    { easing: 'easeInOutCubic', duration: time*1.5}
                );
                Velocity(
                    logo,
                    { marginTop:0},
                    { easing: 'easeInOutCubic', duration: time, complete: this.gotoExpandModeComplete }
                );


                this.isExpandMode = true;
                this.isExpandContentDetailShow = true;
                this.mx_scrollTo(0, 600);


            },


            gotoExpandModeComplete(e) {
                // this.mx_scrollTo(0, 300);

                this.isExpandContentDetailShow = true;

                // this.mx_scrollTo(0, 0);

                this.expand_wrapper.classList.add("mode-expand-end");
                this.expand_content.style = "";



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
                this.$el.classList.remove("mode-expand");
                this.isExpandMode = false;
                this.isExpandContentDetailShow = false;
                this.mx_scrollTo(0, 300);
                return;//


                this.mx_scrollTo(0, 300);

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
    $swipe-height: 30vh;

    $swipe-width: 80%;
    $swipe-gap: 15%;

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


            .expand-content {
                width: 100%;
                height: $swipe-height;
                background-color: #eeeeee;
                position: relative;
                top: 0;
                z-index: 1;
                /*overflow-y: hidden;
                overflow-x: scroll;
                -webkit-overflow-scrolling: touch;*/

                .expand-content-inner-wrapper {
                    white-space: nowrap;




                    .expand-content-bgimg {
                        position: absolute;
                        width: 100%;
                        height: $swipe-height;

                        left: 2rem;
                        /*transition: all 0.5s cubic-bezier(.03, .49, .28, .98);*/


                        .content-img {
                            display: inline-block;
                            width: $swipe-width;
                            margin: 0 5% 0 0%;
                            height: 100%;

                            background-size: 100%;
                            background-position: 50% 50%;
                            background-repeat: no-repeat;
                            border-radius: 5px;
                        }
                    }

                    .expand-content-text {
                        position: absolute;
                        width: 100%;
                        height: 100%;

                        left: 2rem;
                        /*transition: left 0.5s;*/
                        color: white;
                        .content-text {
                            display: inline-block;
                            width: $swipe-width;
                            margin: 0 5% 0 0%;
                            height: 100%;
                            font-size: 1.5rem;
                            opacity: 0.5;
                            font-weight: lighter;

                            h3{
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
            /*transition: all 0.3s;*/
            height: 25vh;
            .logo {
                /*transition: all 0.3s;*/
                margin: 2rem 0;

                .img-logo {
                    width: 104px;
                }
            }
        }


        .etc-contents-wrapper {
            padding: 2rem 2rem 2rem;
            transition: all 0.4s;
            /*transform: translate3d(200px,0,0);*/

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
                /*height: 0;*/
                /*transform: translate3d(0,-150px,0);
                transform-origin: 50% 200%;

                opacity: 0;*/

                /*padding: 0rem 2rem 0rem;*/

                .logo {
                    /*margin: 0 0;*/
                }
            }

            .etc-contents-wrapper {
                transform: translate3d(0,-30vh,0);
                transform-origin: 50% -100%;
                opacity: 0;
                background-color: black;
            }



            .expand-content {



                /*transition: height 0.4s cubic-bezier(.59, 0, .31, 1), transform 0.4s cubic-bezier(.59, 0, .31, 1);*/


                .expand-content-inner-wrapper {
                    /*padding: 0px;*/



                    .expand-content-bgimg {
                        box-shadow: 0 15px 30px 0 rgba(0,0,0,0.2);
                        /*position: fixed;*/
                        /*left: 0;*/
                        /*height: 50vh;*/
                        /*transition: all 0.5s;*/
                        /*top: 0;*/
                        /*transform: translate3d(0, 0, 0) !important;*/

                        .content-img {
                            /*width: 100%;*/
                            /*border-radius: 0px;*/
                        }
                    }
                }
            }

            .expand-content {


                &.reset-position {
                    height: $swipe-height;
                    top: var(--beforeScrollTop);
                    transition: all 0.4s;

                    .expand-content-inner-wrapper {

                        /*transition: padding 0.8s;*/
                        /*padding: 20px;*/
                    }


                }
            }

        }
    }

</style>