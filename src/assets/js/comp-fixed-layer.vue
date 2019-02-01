<template>
    <div class="module">
        <div class="module__item">
            <div class="list-wrapper">
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


                </ul>
            </div>

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
                isContent: false
            };
        },

        mounted(){
            this.addEvent();
        },

        methods: {

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

                console.log('start');

            },

            dragMoveEvent(event) {
                const dragState = this.dragState;
                const touch = event.changedTouches ? event.changedTouches[0] : event;

                dragState.moveSpd = dragState.currentTop - touch.pageY;

                dragState.currentLeft = touch.pageX;
                dragState.currentTop = touch.pageY;
                dragState.currentTopAbsolute = touch.clientY;

                dragState.offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute;
                // dragState.prevEleTop = (dragState.currentTopAbsolute - dragState.startTopAbsolute) || 0;


                /*
                var offsetLeft = dragState.currentLeft - dragState.startLeft;
                var offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute;
                var distanceX = Math.abs(offsetLeft);
                var distanceY = Math.abs(dragState.offsetTop);



                if (distanceY < 5 || (distanceY >= 5 && distanceX >= 1.73 * distanceY)) {
                    return;
                } else {
                    event.preventDefault();
                }

                offsetLeft = Math.min(Math.max(-dragState.pageWidth + 1, offsetLeft), dragState.pageWidth - 1);
*/

                if (Math.abs(dragState.offsetTop) < 5) {
                    dragState.moveSpd = 0;
                    dragState.offsetTop = 0;
                    return;
                }

                const element = this.$el.querySelector(".module__item");

                Velocity(
                    element,
                    { translateY: (dragState.prevEleTop || 0) + dragState.offsetTop},
                    { easing: 'easeOutCubic', duration: 0 }
                );

                console.log(dragState.prevEleTop, touch.pageY, touch.clientY)


            },

            dragEndEvent(event) {
                var dragState = this.dragState;
                var tg = dragState.prevEleTop + dragState.offsetTop + (-dragState.moveSpd * 10);

                //reset
                var element = this.$el.querySelector(".module__item");
                Velocity(
                    element,
                    { translateY: tg},
                    { easing: 'easeOutCubic', duration: 200 }
                );

                dragState.prevEleTop = tg;

                console.log("end dadada", tg, dragState.moveSpd)



                var offsetLeft = dragState.currentLeft - dragState.startLeft;

                if (Math.abs(offsetLeft) > 20) {

                } else {

                    return;

                }


            }

        }
    }


</script>


<style lang="scss">
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
        transition: all 0.1s ease-out;
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

</style>


<!--<style lang="scss" src="../css/style.scss">-->
<!--</style>-->
