<template>
    <div class="list-contents-wrapper">
        <comp-content v-for="(content, index) in contentsData" :key="index" :data="content" :bgimg="content.bgimage" :index="index"></comp-content>
    </div>
</template>

<script>
    import comp_content from './comp-content';
    import { EventBus } from './EventBus';

    export default {
        name: "comp-list-contents",

        components: {
            'comp-content': comp_content
        },

        data() {
            return {
                ready: false,
                dragging: false,
                userScrolling: false,
                animating: false,
                index: 0,
                pages: [],
                timer: null,
                reInitTimer: null,
                noDrag: false
            };
        },

        props: {
            contentsData: {
                type: Array,
                default: function() {return [];}
            }
        },

        created() {
            console.log("comp-list.vue -- created")
            this.dragState = {};
            EventBus.$on(EventBus.SHOW_CONTENT, this.changeContentMode);
            EventBus.$on(EventBus.SHOW_CONTENT_COMPLETE, this.changeContentModeComplete);
            EventBus.$on(EventBus.SHOW_LIST, this.changeListMode);
            EventBus.$on(EventBus.SHOW_LIST_COMPLETE, this.changeListModeComplete);

        },


        methods: {

            changeContentMode(e){
                let element = this.$el;
                element.removeEventListener('touchstart', this.dragStartEvent);
                element.removeEventListener('touchmove', this.dragMoveEvent);
                element.removeEventListener('touchend', this.dragEndEvent);

                element.style.webkitTransition = '';
                element.style.webkitTransform = '';

            },

            changeContentModeComplete(e){

            },

            changeListMode(e){

            },

            changeListModeComplete(e){
                let element = this.$el;
                element.addEventListener('touchstart', this.dragStartEvent);
                element.addEventListener('touchmove', this.dragMoveEvent);
                element.addEventListener('touchend', this.dragEndEvent);

                var dragState = this.dragState;
                var tgX = -dragState.pageWidth * this.index;

                element.style.webkitTransition = '';
                element.style.webkitTransform = `translate3d(${tgX}px, 0, 0)`;
            },

            dragStartEvent(event) {
                if(this.animating) return;

                var element = this.$el;
                var dragState = this.dragState;
                var touch = event.changedTouches ? event.changedTouches[0] : event;

                dragState.startTime = new Date();
                dragState.startLeft = touch.pageX;
                dragState.currentLeft = touch.pageX;
                dragState.startTopAbsolute = touch.clientY;

                dragState.pageWidth = element.offsetWidth;
                dragState.pageHeight = element.offsetHeight;

                this.dragging = true;
                console.log('start', this.dragState);

            },

            dragMoveEvent(event) {
                if(this.animating || !this.dragging) return;

                var dragState = this.dragState;
                var touch = event.changedTouches ? event.changedTouches[0] : event;

                dragState.currentLeft = touch.pageX;
                dragState.currentTop = touch.pageY;
                dragState.currentTopAbsolute = touch.clientY;

                var offsetLeft = dragState.currentLeft - dragState.startLeft;
                var offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute;
                var distanceX = Math.abs(offsetLeft);
                var distanceY = Math.abs(offsetTop);
                if (distanceX < 5 || (distanceX >= 5 && distanceY >= 1.73 * distanceX)) {
                    this.userScrolling = true;
                    this.dragging = false;
                    this.controlSwipe(this.index);
                    return;
                } else {
                    this.userScrolling = false;
                    event.preventDefault();
                }

                offsetLeft = Math.min(Math.max(-dragState.pageWidth + 1, offsetLeft), dragState.pageWidth - 1);
                var towards = offsetLeft < 0 ? 'next' : 'prev';


                var element = this.$el;

                if(this.index == 0 && offsetLeft > 0 || this.index == this.contentsData.length-1 && offsetLeft < 0){
                    offsetLeft = offsetLeft * 0.2;
                }

                offsetLeft = offsetLeft + (dragState.prevHoldX || 0);
                element.style.webkitTransform = `translate3d(${offsetLeft}px, 0, 0)`;

                // console.log(offsetLeft, towards, this.userScrolling)


            },

            dragEndEvent(event) {
                if(this.animating || !this.dragging) return;
                this.animating = true;

                var dragState = this.dragState;
                var dragDuration = new Date() - dragState.startTime;

                var towards = null;
                var offsetLeft = dragState.currentLeft - dragState.startLeft;

                if (Math.abs(offsetLeft) > 20) {
                    towards = offsetLeft < 0 ? 'next' : 'prev';
                } else {
                    //reset
                    console.log("end dadada", offsetLeft)
                    if(Math.abs(offsetLeft) > 2) {
                        this.controlSwipe(this.index);

                    } else {
                        this.animating = false;
                        this.dragging = false;
                    }
                    return;

                }

                var tgIndex = this.index;
                if(towards != "next"){
                    tgIndex -= 1;
                    if(tgIndex < 0) tgIndex = 0;
                } else {
                    tgIndex += 1;
                    if(tgIndex > this.contentsData.length-1) tgIndex = this.contentsData.length-1;
                }

                this.controlSwipe(tgIndex);


            },

            controlSwipe(index){

                this.index = index;

                var dragState = this.dragState;
                var tgX = -dragState.pageWidth * this.index;


                var element = this.$el;
                var speed = 200;
                element.style.webkitTransition = '-webkit-transform ' + speed + 'ms ease-out';
                setTimeout(() => {
                    element.style.webkitTransform = `translate3d(${tgX}px, 0, 0)`;
                }, 50);

                var transitionEndCallback = () => {
                    element.style.webkitTransition = '';
                    element.style.webkitTransform = `translate3d(${tgX}px, 0, 0)`;
                    dragState.prevHoldX = tgX;
                    this.animating = false;
                    this.dragging = false;
                    // if (callback) {
                    //     callback.apply(this, arguments);
                    // }
                };

                // once(element, 'webkitTransitionEnd', transitionEndCallback);
                setTimeout(transitionEndCallback, speed + 100);
            }

        },

        mounted() {
            let element = this.$el;

            element.addEventListener('touchstart', this.dragStartEvent);
            element.addEventListener('touchmove', this.dragMoveEvent);
            element.addEventListener('touchend', this.dragEndEvent);
        }
    }
</script>

<style scoped>
    .list-contents-wrapper {
        white-space: nowrap;
        /*overflow-x: hidden;*/
    }
</style>