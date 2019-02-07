<template>
    <div class="module">
        <div class="btn-change" @click.stop.prevent="onClickChange">
            L
        </div>
        <transition name="fade">
            <div class="trans-box" v-show="isTrans"></div>
        </transition>
        <div class="module__item">

            <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter"
                        @before-Leave="beforeLeave" @leave="leave" @after-leave="afterLeave"
                        >

                <div class="list-wrapper" v-if="isList">
                    <ul>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>

                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>

                    </ul>
                </div>
            </transition>

            <transition @before-enter="beforeEnter_contents" @enter="enter_contents" @after-enter="afterEnter_contents"
                        @before-Leave="beforeLeave_contents" @leave="leave_contents" @after-leave="afterLeave_contents"
            >

                <div class="contents-wrapper" v-if="isContent">
                    <ul>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>
                        <li>content blablabla</li>

                    </ul>
                </div>
            </transition>


        </div>
    </div>
</template>

<script>

    export default {
        name: "comp-fixed-layer",

        components: {
        },

        created() {

            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);

            // window.addEventListener('resize', () => {
            //     // We execute the same script as before
            //     vh = window.innerHeight * 0.01;
            //     document.documentElement.style.setProperty('--vh', `${vh}px`);
            //     alert(vh);
            //
            // });

            this.dragState = {};
            this.dragState.prevEleTop = 0;




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

        watch:{
            isContent(){
                console.log("changengnen")
                // this.scrollMax = this.scrollContainer.scrollHeight - window.innerHeight;
            }

        },

        methods: {
            onClickChange(e) {
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

                let tg = (dragState.prevEleTop || 0) + dragState.offsetTop;
                const overPow = 0.5;
                if(tg > 0) {
                    tg = tg * overPow;
                } else if(tg < -this.scrollMax){
                    tg = -this.scrollMax - ((-this.scrollMax - tg) * overPow);
                }

                this.scrollMoveContainer(tg, 0);



                console.log(dragState.prevEleTop, dragState.offsetTop)


            },

            dragEndEvent(event) {
                var dragState = this.dragState;
                var tg = dragState.prevEleTop + dragState.offsetTop + (-dragState.moveSpd * 10);


                var time = Math.max(Math.abs(dragState.moveSpd) * 15, 500);

                if(tg > 0) {
                    tg = 0;
                    time = time * 0.3;
                } else if(tg < -this.scrollMax){
                    tg = -this.scrollMax;
                    time = time * 0.3;
                }


                this.scrollMoveContainer(tg, time);

                dragState.prevEleTop = tg;

                console.log("end dadada")

            },




            scrollMoveContainer(tgY, time){

                const ti = time;

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
                console.log("beforenter")

            },

            enter: function (el, done) {
                el.addEventListener("webkitTransitionEnd", done, {once:true});
                console.log("enter : ")
                done();

            },
            afterEnter: function (el) {
                console.log("afterEnter : ")
                this.hideTransBox();


            },

            // --------
            // hide list
            // --------

            beforeLeave: function (el) {
                console.log("beforeLeave")
                this.showTransBox();
            },

            leave: function (el, done) {
                el.addEventListener("webkitTransitionEnd", done, {once:true});
                console.log("leave")
                done();
            },
            afterLeave: function (el) {
                console.log("afterLeave", el);

                this.scrollMoveContainer(0, 0);
                this.isContent = true;
            },






            // --------
            // show content
            // --------

            beforeEnter_contents: function (el) {
                console.log("beforenter_contents")
            },

            enter_contents: function (el, done) {
                el.addEventListener("webkitTransitionEnd", done, {once:true});
                console.log("enter_contents : ")
                done();

            },
            afterEnter_contents: function (el) {
                console.log("afterEnter_contents : ")
                this.hideTransBox();

            },

            // --------
            // hide Content
            // --------

            beforeLeave_contents: function (el) {
                console.log("beforeLeave_contents")
                // this.isTrans = true;
                this.showTransBox();

            },

            leave_contents: function (el, done) {
                el.addEventListener("webkitTransitionEnd", done, {once:true});
                console.log("leave_contents")
                done();
            },
            afterLeave_contents: function (el) {
                console.log("afterLeave_contents", el);
                this.scrollMoveContainer(0, 0);
                this.isList = true;
            },


            showTransBox() {
                this.isTrans = true;

            },

            hideTransBox(){
                this.isTrans = false;

            },



            showList(){

            },


            hideList(){

            },

            showContents(){

            },

            hideContents(){

            }


        }
    }


</script>


<style lang="scss">
    .fade-enter-active{
        transition: opacity 1s, transform 1s cubic-bezier(.37, 0, .34, 1);
    }

    .fade-leave-active {
        transition: opacity 1s, transform 1s cubic-bezier(.37, 0, .34, 1);
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: translate3d(0,0,0) scale(1.2);
        transform-origin: 50% 0;
    }





    body {

        /*position: relative;*/
        /*left: 0;*/
        /*width: 100%;*/
        /*height: 100vh;*/
        /*max-height: 100vh;*/
        /*overflow: hidden;*/
        /*margin: 0;*/
        /*background: #a0a5a8;*/
        /*user-select: none;*/



    }

    .module {
        height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
        height: calc(var(--vh, 1vh) * 100);
        overflow: hidden;
    }

    .module__item {
        /*display: flex;*/
        height: 100%;
        /*align-items: center;*/
        /*justify-content: center;*/
        /*transition: all 0.1s ease-out;*/
    }

    .module__item:nth-child(odd) {
        background-color: silver;
        color: #ffffff;
    }

    .module__item:nth-child(even) {
        background-color: #F73859;
        color: #F1D08A;
    }


    .list-wrapper {
        ul {

            li:nth-child(odd) {
                background-color: #ff3399;
                color: #ffffff;
            }

            li:nth-child(even) {
                background-color: #F73859;
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

    .contents-wrapper {
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


    .btn-change {
        position: fixed;
        top: 0;
        left: 0;
        width: 50px;
        height: 50px;
        background-color: black;
        text-align: center;
        color: white;
        z-index: 1;
        line-height: 50px;
        font-size: 1.5rem;
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
