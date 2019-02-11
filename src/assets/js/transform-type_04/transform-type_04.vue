<template>
    <div class="module">
        <transition name="fade">
            <div class="trans-box" v-show="isTrans"></div>
        </transition>

        <div class="module__item">

            <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
                        @before-Leave="beforeLeave" @leave="leave" @after-leave="afterLeave"
                        >

                <div class="list-wrapper" v-if="isList"  @click.stop.prevent="onClickChange">
                    <comp-content-about></comp-content-about>
                    <ul>
                        <li>
                            <div class="list-img" style='background-image: url("images/noimg.png")'>
                                <!--<img src="images/noimg.png" alt="">-->
                            </div>
                            <div class="list-title"><p>Content Title</p></div>
                        </li>
                        <li>
                            <div class="list-img" style='background-image: url("images/noimg.png")'>
                                <!--<img src="images/noimg.png" alt="">-->
                            </div>
                            <div class="list-title"><p>Content Title</p></div>
                        </li>
                        <li>
                            <div class="list-img" style='background-image: url("images/noimg.png")'>
                                <!--<img src="images/noimg.png" alt="">-->
                            </div>
                            <div class="list-title"><p>Content Title</p></div>
                        </li>
                        <li>
                            <div class="list-img" style='background-image: url("images/noimg.png")'>
                                <!--<img src="images/noimg.png" alt="">-->
                            </div>
                            <div class="list-title"><p>Content Title</p></div>
                        </li>
                        <li>
                            <div class="list-img" style='background-image: url("images/noimg.png")'>
                                <!--<img src="images/noimg.png" alt="">-->
                            </div>
                            <div class="list-title"><p>Content Title</p></div>
                        </li>
                        <li>
                            <div class="list-img" style='background-image: url("images/noimg.png")'>
                                <!--<img src="images/noimg.png" alt="">-->
                            </div>
                            <div class="list-title"><p>Content Title</p></div>
                        </li>
                        <li>
                            <div class="list-img" style='background-image: url("images/noimg.png")'>
                                <!--<img src="images/noimg.png" alt="">-->
                            </div>
                            <div class="list-title"><p>Content Title</p></div>
                        </li>
                        <li>
                            <div class="list-img" style='background-image: url("images/noimg.png")'>
                                <!--<img src="images/noimg.png" alt="">-->
                            </div>
                            <div class="list-title"><p>Content Title</p></div>
                        </li>
                        <li>
                            <div class="list-img" style='background-image: url("images/noimg.png")'>
                                <!--<img src="images/noimg.png" alt="">-->
                            </div>
                            <div class="list-title"><p>Content Title</p></div>
                        </li>
                        <li>
                            <div class="list-img" style='background-image: url("images/noimg.png")'>
                                <!--<img src="images/noimg.png" alt="">-->
                            </div>
                            <div class="list-title"><p>Content Title</p></div>
                        </li>
                        <li>
                            <div class="list-img" style='background-image: url("images/noimg.png")'>
                                <!--<img src="images/noimg.png" alt="">-->
                            </div>
                            <div class="list-title"><p>Content Title</p></div>
                        </li>
                        <li>
                            <div class="list-img" style='background-image: url("images/noimg.png")'>
                                <!--<img src="images/noimg.png" alt="">-->
                            </div>
                            <div class="list-title"><p>Content Title</p></div>
                        </li>
                        <li>
                            <div class="list-img" style='background-image: url("images/noimg.png")'>
                                <!--<img src="images/noimg.png" alt="">-->
                            </div>
                            <div class="list-title"><p>Content Title</p></div>
                        </li>
                        <li>
                            <div class="list-img" style='background-image: url("images/noimg.png")'>
                                <!--<img src="images/noimg.png" alt="">-->
                            </div>
                            <div class="list-title"><p>Content Title</p></div>
                        </li>

                    </ul>
                </div>
            </transition>

            <transition @before-enter="beforeEnter_contents" @enter="enter_contents" @after-enter="afterEnter_contents"
                        @before-Leave="beforeLeave_contents" @leave="leave_contents" @after-leave="afterLeave_contents"
            >

                <div class="contents-wrapper" v-if="isContent"  @click.stop.prevent="onClickChange">
                    <div class="contents-kv" style='background-image: url("images/thumbnail-1200_28.jpg")'>

                    </div>
                    <comp-content-detail></comp-content-detail>
                    <comp-content-detail></comp-content-detail>
                </div>
            </transition>


        </div>
    </div>
</template>

<script>
    import comp_content_detail from '../common/comp-content_detail_b';
    import comp_about from '../common/comp-content_about_w';
    import loremipsum from '../common/lorem-ipsum';

    export default {
        name: "transform-type_04",

        components: {
            "comp-content-detail": comp_content_detail,
            "comp-content-about": comp_about
        },

        created() {
            var ipsum = new LoremIpsum();
            console.log(ipsum.sentence(1));
            // let vh = window.innerHeight * 0.01;
            // document.documentElement.style.setProperty('--vh_tt04', `${vh}px`);

            // window.addEventListener('resize', () => {
            //     // We execute the same script as before
            //     vh = window.innerHeight * 0.01;
            //     document.documentElement.style.setProperty('--vh', `${vh}px`);
            //     alert(vh);
            //
            // });

            this.dragState = {};
            this.dragState.prevEleTop = 0;
            this.contentKvHeight = 667;




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
                isContent: false,
                isList: true,
                isTrans: false
            };
        },

        mounted(){
            this.addEvent();
            this.scrollContainer = this.$el.querySelector(".module__item");
            this.scrollMax = this.scrollContainer.scrollHeight - window.innerHeight;
        },

        /*watch:{
            isContent(){
                console.log("changengnen")
                // this.scrollMax = this.scrollContainer.scrollHeight - window.innerHeight;
            }

        },*/

        methods: {
            onClickChange(e) {
                if(this.isTrans) return;

                if(this.isList){
                    this.isList = !this.isList;
                } else {
                    this.isContent = !this.isContent;
                }

                console.log("click : ", this.isContent)
                e.preventDefault();

            },

            addEvent() {
                let element = this.$el;
                element.addEventListener('touchstart', this.dragStartEvent);
                element.addEventListener('touchmove', this.dragMoveEvent);
                element.addEventListener('touchend', this.dragEndEvent);
            },

            removeEvent() {
                let element = this.$el;
                element.removeEventListener('touchstart', this.dragStartEvent);
                element.removeEventListener('touchmove', this.dragMoveEvent);
                element.removeEventListener('touchend', this.dragEndEvent);
            },


            dragStartEvent(event) {
                var element = this.$el;
                var dragState = this.dragState;
                var touch = event.changedTouches ? event.changedTouches[0] : event;


                dragState.startTime = new Date();
                dragState.startLeft = touch.pageX;
                dragState.currentLeft = touch.pageX;
                dragState.startTopAbsolute = touch.clientY;

                dragState.pageWidth = element.offsetWidth;
                dragState.pageHeight = element.offsetHeight;

                dragState.moveSpd = 0;
                dragState.offsetTop = 0;



                var dvStyle = this.scrollContainer.getAttribute('style');
                if(dvStyle){
                    var transZRegex = /\.*translateY\((.*)px\)/i;
                    var zTrans = transZRegex.exec(dvStyle)[1];

                    Velocity(this.scrollContainer, "stop");
                    dragState.prevEleTop = parseInt(zTrans);
                }


                this.scrollMax = this.scrollContainer.scrollHeight - window.innerHeight;

            },

            dragMoveEvent(event) {
                const dragState = this.dragState;
                const touch = event.changedTouches ? event.changedTouches[0] : event;

                dragState.moveSpd = dragState.currentTop - touch.pageY;

                dragState.currentLeft = touch.pageX;
                dragState.currentTop = touch.pageY;
                dragState.currentTopAbsolute = touch.clientY;

                dragState.offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute;


                if (Math.abs(dragState.offsetTop) < 5) {
                    dragState.moveSpd = 0;
                    dragState.offsetTop = 0;
                    return;
                } else {
                    event.preventDefault();
                }

                var content_kv = this.$el.querySelector(".contents-kv");
                let tg = (dragState.prevEleTop || 0) + dragState.offsetTop;
                let tgScale = 1;
                const overPow = 0.5;
                if(tg > 0) {
                    tg = tg * overPow;
                    if(content_kv) tgScale = (this.contentKvHeight + tg)/this.contentKvHeight;
                } else if(tg < -this.scrollMax){
                    tg = -this.scrollMax - ((-this.scrollMax - tg) * overPow);
                }

                this.scrollMoveContainer(tg, 0);


                if(content_kv){
                    Velocity(content_kv, "stop");
                    Velocity(
                        content_kv,
                        { scale: tgScale},
                        { easing: 'easeOutCubic', duration: 0 }
                    );
                }

            },

            dragEndEvent(event) {
                var dragState = this.dragState;
                var tg = dragState.prevEleTop + dragState.offsetTop + (-dragState.moveSpd * 10);


                var time = Math.max(Math.abs(dragState.moveSpd) * 15, 500);

                if(tg > 0) {
                    tg = 0;
                    time = time * 0.6;

                    var content_kv = this.$el.querySelector(".contents-kv");
                    if(content_kv){
                        Velocity(content_kv, "stop");
                        Velocity(
                            content_kv,
                            { scale: 1},
                            { easing: 'easeOutCubic', duration: time }
                        );
                    }



                } else if(tg < -this.scrollMax){
                    tg = -this.scrollMax;
                    time = time * 0.6;
                }


                this.scrollMoveContainer(tg, time);

                dragState.prevEleTop = tg;

                // console.log("end dadada")

            },




            scrollMoveContainer(tgY, time){

                const ti = time;
                Velocity(this.scrollContainer, "stop");
                Velocity(
                    this.scrollContainer,
                    { translateY: tgY},
                    { easing: 'easeOutCubic', duration: ti }
                );
            },





            // --------
            // show list
            // --------

            beforeEnter: function (el) {
                // console.log("beforenter")
                this.scrollMoveContainer(0, 0);
            },

            enter: function (el, done) {
                // console.log("enter : ")
                this.hideTransBox();
                this.showList(done);
            },
            afterEnter: function (el) {
                console.log("------------ show list complete")

            },

            // --------
            // hide list
            // --------

            beforeLeave: function (el) {
                // console.log("beforeLeave")

            },

            leave: function (el, done) {
                // console.log("leave")
                // done();
                this.showTransBox();
                this.hideList(done)
            },
            afterLeave: function (el) {
                console.log("------------ hide list complete")

                this.isContent = true;
            },






            // --------
            // show content
            // --------

            beforeEnter_contents: function (el) {
                this.scrollMoveContainer(0, 0);
                // console.log("beforenter_contents")
            },

            enter_contents: function (el, done) {
                // console.log("enter_contents : ")
                this.hideTransBox();
                this.showContents(done);

            },
            afterEnter_contents: function (el) {
                console.log("------------ show contents complete")



            },

            // --------
            // hide Content
            // --------

            beforeLeave_contents: function (el) {
                // console.log("beforeLeave_contents")
                // this.isTrans = true;

            },

            leave_contents: function (el, done) {
                // console.log("leave_contents")
                this.showTransBox();
                this.hideContents(done);

            },
            afterLeave_contents: function (el) {
                console.log("------------ hide contents complete")
                this.isList = true;


            },







            showTransBox() {
                this.isTrans = true;

            },

            hideTransBox(){
                this.isTrans = false;

            },






            showList(done){
                const element = this.$el.querySelector(".list-wrapper")
                Velocity(element,
                    { opacity:1, translateY:200+"px"},
                    { easing: 'easeOutCubic', duration: 0}
                )
                Velocity(element,
                    { opacity:1, translateY:0+"px"},
                    { easing: 'easeOutCubic', duration: 1500, complete: done }
                )
            },


            hideList(done){
                const element = this.$el.querySelector(".list-wrapper");

                Velocity(element,
                    { opacity:0, translateY:-200+"px"},
                    { easing: 'easeInOutCubic', duration: 1000, complete: done }
                )
            },


            showContents(done){
                const element = this.$el.querySelector(".contents-wrapper")
                Velocity(element,
                    { translateY:200+"px"},
                    { easing: 'easeOutCubic', duration: 0}
                )
                Velocity(element,
                    { translateY:0+"px"},
                    { easing: 'easeOutCubic', duration: 1500, complete: done }
                )

                var content_kv = this.$el.querySelector(".contents-kv");
                if(content_kv) this.contentKvHeight = content_kv.clientHeight;
            },

            hideContents(done){
                const element = this.$el.querySelector(".contents-wrapper")
                Velocity(element,
                    { opacity:0, translateY:-200+"px"},
                    { easing: 'easeInOutCubic', duration: 1000, complete: done }
                )
            }


        }
    }


</script>


<style lang="scss">
    .fade-enter-active{
        transition: transform 1s cubic-bezier(.50, 0, .14, 1);
    }

    .fade-leave-active {
        transition: opacity 1s, transform 0.8s cubic-bezier(.50, 0, .14, 1);

        //cubic-bezier(0, .40, .28, 1), cubic-bezier(.74, 0, 1, .51)
    }
    .fade-enter {
        /*opacity: 0;*/
        transform: translate3d(0,100%,0);
        transform-origin: 50% 0;
    }

    .fade-leave-to {
        /*opacity: 0;*/
        transform: translate3d(0,-100%,0);
        transform-origin: 50% 0;
    }





    body {


    }

    .module {
        height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
        height: calc(var(--vh, 1vh) * 100);
        overflow: hidden;
        background-color: white;

    }

    .module__item {

    }



    .list-wrapper {
        ul {
            padding: 1rem 2.6rem;
            display: grid;
            grid-template-columns: repeat(2, 1fr);

            li:nth-child(odd) {
                padding: 0rem 1.3rem 4rem 0rem;
            }

            li:nth-child(even) {
                padding: 0rem 0rem 4rem 1.3rem;
            }

            li {
                color: black;
                width: 100%;
                box-sizing: border-box;

                .list-img {
                    width: 100%;
                    height: 12.5rem;
                    background-position: 50% 50%;
                    background-size: cover;
                }
                .list-title {
                    margin-top: 0.9rem;
                    font-size: 0.9rem;
                    font-weight: lighter;
                }
            }
        }
    }

    .contents-wrapper {
        .contents-kv {
            width: 100%;
            height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
            height: calc(var(--vh, 1vh) * 70);
            background-position: 50% 50%;
            background-size: cover;
            transform-origin: 50% 100%;

        }

        ul {

            li:nth-child(odd) {
                background-color: #3399dd;
                color: #ffffff;
            }

            li:nth-child(even) {
                background-color: #9933dd;
                color: #F1D08A;
            }

            li {
                text-align: center;
                width: 100%;
                height: 70px;

                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }



    .trans-box {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
        height: calc(var(--vh, 1vh) * 100);
        background-color: black;
        z-index: 2;
        /*opacity: 0.5;*/

    }



</style>


<!--<style lang="scss" src="../css/style.scss">-->
<!--</style>-->
