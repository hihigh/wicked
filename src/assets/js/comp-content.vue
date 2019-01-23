<template>
    <li class="list-content">

        <div class="inner-wrapper"
             @click.stop.prevent="onClickContent">
            <!--  :style="{ 'background-image': 'url(' + bgimg + ')' }"  -->
            <!--<router-link to="/">project</router-link>-->
            <!--<p>{{data.description}}</p>-->
            <!--<router-link :to="`/${data.name}`"><button>view detail> {{data.title}}</button></router-link>-->
            <div class="bg-image">
                <div class="img-area" :style="{ 'background-image': 'url(' + bgimg + ')' }"></div>
                <div class="dimmed"></div>
            </div>
            <!--  :style="{ 'background-image': 'url(' + bgimg + ')' }" -->
            <h3 class="content-title">{{data.title}}</h3>
            <transition name="fade">
                <p class="content-subtitle" v-show="isContent" >{{data.subtitle}}</p>
            </transition>


            <!--<img :src="@/assets/images/image.png" alt="">-->
            <!--<img src="@/images/image.png" alt="">-->

        </div>
        <transition @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter"

                    @before-Leave="beforeLeave"
                    @leave="leave"
                    @after-leave="afterLeave"
                    name="fade">
            <comp-content-detail v-show="isContent" :data="data" :bgimg="bgimg" :index="index"></comp-content-detail>
        </transition>
    </li>
</template>

<script>

    import { EventBus } from './EventBus';
    import comp_content_detail from './comp-content-detail';

    export default {
        name: "Content",

        components: {
            'comp-content-detail': comp_content_detail
        },

        created() {

            console.log("================", this.bgimg)

            EventBus.$on(EventBus.SHOW_CONTENT, this.changeContentMode);
            EventBus.$on(EventBus.SHOW_CONTENT_COMPLETE, this.changeContentModeComplete);
            EventBus.$on(EventBus.SHOW_LIST, this.changeListMode);
            EventBus.$on(EventBus.SHOW_LIST_COMPLETE, this.changeListModeComplete);



            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);

            window.addEventListener('resize', () => {
                // We execute the same script as before
                vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
                alert(vh);
            });

        },

        mounted(){
            this.kv = this.$el.querySelector(".inner-wrapper");
        },

        data() {
            return {
                isContent: false
            };
        },

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
                EventBus.$emit(EventBus.SHOW_LIST, this.index);
            },

            changeListMode(showindex){
                // console.log("change list : ", this.index, showindex)
                if(this.index == showindex){
                    this.isContent = false;
                    // this.$el.classList.remove("view-content")

                } else {

                }
            },
            changeContentModeComplete(e){

            },

            changeContentMode(showindex){
                // console.log("change content : ", this.$el, this.index, showindex)
                if(this.index == showindex){
                    this.isContent = true;
                    // this.$el.classList.add("view-content")
                } else {
                    this.$el.style.display = "none"
                }

            },

            changeListModeComplete(e){
                this.$el.style.display = ""
            },


            // --------
            // show content
            // --------

            beforeEnter: function (el) {
                console.log("beforenter")
            },

            enter: function (el, done) {
                console.log("enter : ")
                el.addEventListener("webkitTransitionEnd", done, {once:true});
                //done()
                // this.$el.classList.add("view-content")

                this.kv.classList.add("mode-content");
                this.kv.classList.add("mode-content-fixed");



                console.log(this.kv )
            },
            afterEnter: function (el) {
                // el.removeEventListener("webkitTransitionEnd");
                console.log("afterEnter : ")
                EventBus.$emit(EventBus.SHOW_CONTENT_COMPLETE, this.index);


            },

            // --------
            // show list
            // --------

            beforeLeave: function (el) {
                console.log("beforeLeave")
            },

            leave: function (el, done) {
                console.log("leave")
                el.addEventListener("webkitTransitionEnd", done, {once:true});
                this.kv.classList.remove("mode-content");
                // velocity(document.body, { duration: 1000, offset: 100 })
            },
            afterLeave: function (el) {
                console.log("afterLeave", el)
                // this.$el.classList.remove("view-content")
                EventBus.$emit(EventBus.SHOW_LIST_COMPLETE, this.index);
                this.kv.classList.remove("mode-content-fixed");
            }
        }
    }
</script>

<style lang="scss">

    .fade-enter-active{
        transition: opacity 0.7s, transform 0.7s cubic-bezier(.37, 0, .34, 1);
    }

    .fade-leave-active {
        transition: opacity 0.2s, transform 0.3s cubic-bezier(.37, 0, .34, 1);
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: translate3d(0,200px,0);
    }



    .list-content {
        height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
        height: calc(var(--vh, 1vh) * 100);
        margin: 0 auto;
        max-width: 100%;

        /*height: 100vh;*/
        display: inline-block;
        text-align: center;
        vertical-align: top;


        .inner-wrapper {

            &.mode-content {
                /*opacity: 0.5;*/

                .bg-image {
                    height: 100vh;
                    margin: 0px 0px 0vh ;
                    width: 100%;
                    transition: all 0.8s cubic-bezier(.59, 0, .31, 1);

                    .img-area {
                        background-size: 30rem;
                        width: 100%;
                        height: 100%;
                    }

                    .dimmed {
                        opacity: 0.4;
                    }

                }
                .content-title {
                    top: 30%;
                }
                .content-subtitle  {
                    transition: transform 0.4s, opacity 0.2s 0.1s;
                }
            }

            &.mode-content-fixed {
                .bg-image {
                    position: fixed;
                }


            }


            display: block;
            position: relative;
            width: 100vw;
            height: 100%;
            top:0;
            /*background-color: #F73859;*/

            .bg-image {
                /*display: none;*/
                /*position: absolute;*/
                /*top: 50%;
                left:50%;
                transform: translate3d(-50%,-50%,0);
                width: calc(100% - 60px);
                height: 50vh;*/

                width: 80%;
                height: 60%;

                position: absolute;
                top: 50%;
                left:50%;
                transform: translate3d(-50%,-50%,0);

                background-color: #cbd5de;


                transition: all 0.5s cubic-bezier(.59, 0, .31, 1);

                .img-area {
                    width: 100%;
                    height: 100%;
                    /*background-size: cover;*/
                    /*background-position: center;*/

                    background-size: 20rem;
                    background-position: center center;
                    background-repeat: no-repeat;
                    background-color: #000000;
                    transition: all 0.5s cubic-bezier(.59, 0, .31, 1);
                }

                .dimmed {
                    width: 100%;
                    height: 100%;
                    background-color: black;
                    position: absolute;
                    top: 0;
                    opacity: 0.2;
                    transition: opacity 0.5s;
                }

            }

            .content-title {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate3d(-50%,-50%,0);
                font-weight: lighter;
                font-size: 3rem;
                transition: all 0.5s;
                color: blue;
            }

            .content-subtitle {
                position: absolute;
                width: 100%;
                top: 37%;
                /*left: 50%;*/
                /*font-weight: lighter;*/
                font-size: 1rem;
                transition: transform 0.5s, opacity 0.1s;
            }

        }
    }



    .content-detail-wrapper {

        white-space: normal;
        text-align: left;
        line-height: 1.5rem;
        font-size: 0.8rem;
        z-index: 1;
        position: relative;
        /*background-color: #f9fafd;*/

        .content-detail {
            width: calc(100% - 60px);
            margin: -40vh auto 0%;

        }

        img {
            width: 100%;
        }
    }











</style>