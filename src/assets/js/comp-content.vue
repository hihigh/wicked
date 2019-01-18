<template>
    <li class="list-content">

        <div class="inner-wrapper" :style="{ 'background-image': 'url(' + bgimg + ')' }" @click.stop.prevent="onClickContent">
            <!--<router-link to="/">project</router-link>-->
            <h3>{{data.title}}</h3>
            <!--<p>{{data.description}}</p>-->
            <!--<router-link :to="`/${data.name}`"><button>view detail> {{data.title}}</button></router-link>-->
        </div>
        <transition @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter"

                    @before-Leave="beforeLeave"
                    @leave="leave"
                    @after-leave="afterLeave"
                    :css="false">
            <comp-content-detail :data="data" :bgimg="bgimg" :index="index"></comp-content-detail>
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

            EventBus.$on(EventBus.SHOW_CONTENT, this.changeContentMode);
            EventBus.$on(EventBus.SHOW_LIST, this.changeListMode);

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
                    this.$el.classList.remove("view-content")

                } else {
                    this.$el.style.display = ""
                }
            },

            changeContentMode(showindex){
                // console.log("change content : ", this.$el, this.index, showindex)
                if(this.index == showindex){
                    this.isContent = true;
                    this.$el.classList.add("view-content")
                } else {
                    this.$el.style.display = "none"
                }

            },


            // --------
            // 진입
            // --------

            beforeEnter: function (el) {
                console.log("beforenter")
            },
            // done 콜백은 CSS와 함께 사용할 때 선택 사항입니다.
            enter: function (el, done) {
                console.log("enter : ")
                done()
                this.$el.classList.add("view-content")
            },
            afterEnter: function (el) {
                console.log("afterEnter : ")
            },

            // --------
            // 진출
            // --------

            beforeLeave: function (el) {
                console.log("beforeLeave")
            },
            // done 콜백은 CSS와 함께 사용할 때 선택 사항입니다.
            leave: function (el, done) {
                console.log("leave")
                done()
            },
            afterLeave: function (el) {
                console.log("afterLeave")
                this.$el.classList.remove("view-content")
            }
        }
    }
</script>

<style lang="scss">

    .fade-enter-active, .fade-leave-active {
        transition: opacity 2s;
    }
    .fade-enter, .fade-leave-to {
        transition: opacity 2s;
        opacity: 0;
    }




    .view-content {
        .inner-wrapper {
            position: fixed;
            height: calc(100vh - 50px);
            margin: 50px 0px 5vh ;
            width: 100%;
            /*opacity: 0.2;*/

            h3 {
                transform: translate3d(-50%,-250%,0);
                font-size: 5rem;
            }
        }

        .content-detail-wrapper {
            z-index: 1;
            //position: relative;
            opacity: 1;
            /*margin: 50vh auto 0%;*/

            .content-detail {


            }
        }
    }

    .content-detail-wrapper {
        transition: all 3s;
        opacity: 0;
        /*<!--margin: -50vh auto 0%;-->*/





        white-space: normal;
        text-align: left;
        line-height: 1.5rem;
        font-size: 0.8rem;


        .content-detail {
            width: calc(100% - 60px);
            margin: 0vh auto 0%;

        }

        img {
            width: 100%;
        }
    }





    .list-content {
        color: white;
        width: 100vw;
        /*height: 100vh;*/
        display: inline-block;
        text-align: center;
        vertical-align: top;
    }

    .inner-wrapper {
        width: calc(100% - 60px);
        height: 50vh;
        background-size: cover;
        background-position: center;

        display: block;
        position: relative;
        margin: 25vh 30px;

        transition: all 0.5s;
    }



    h3 {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%,-50%,0);
        font-weight: lighter;
        font-size: 3rem;
        transition: all 0.5s;
    }


</style>