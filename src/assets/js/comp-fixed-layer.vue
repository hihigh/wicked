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

                console.log('start');

            },

            dragMoveEvent(event) {
                var dragState = this.dragState;
                var touch = event.changedTouches ? event.changedTouches[0] : event;

                dragState.currentLeft = touch.pageX;
                dragState.currentTop = touch.pageY;
                dragState.currentTopAbsolute = touch.clientY;

                var offsetLeft = dragState.currentLeft - dragState.startLeft;
                var offsetTop = dragState.currentTopAbsolute - dragState.startTopAbsolute;
                var distanceX = Math.abs(offsetLeft);
                var distanceY = Math.abs(offsetTop);
                if (distanceY < 5 || (distanceY >= 5 && distanceX >= 1.73 * distanceY)) {
                    return;
                } else {
                    event.preventDefault();
                }

                offsetLeft = Math.min(Math.max(-dragState.pageWidth + 1, offsetLeft), dragState.pageWidth - 1);

                var element = this.$el.querySelector(".module__item");
                element.style.webkitTransform = `translate3d(0, ${offsetTop}px, 0)`;

                console.log(distanceY, offsetTop)


            },

            dragEndEvent(event) {
                var dragState = this.dragState;
                var offsetLeft = dragState.currentLeft - dragState.startLeft;

                if (Math.abs(offsetLeft) > 20) {

                } else {
                    //reset
                    console.log("end dadada", offsetLeft)

                    return;

                }


            }

        }
    }


</script>


<style scope lang="scss">
    body {
        background-color: #333;
    }

    .module {
        height: 100vh; /* Use vh as a fallback for browsers that do not support Custom Properties */
        height: calc(var(--vh, 1vh) * 100);
        margin: 0 auto;
        max-width: 100%;
        overflow: hidden;
    }

    .module__item {
        /*display: flex;*/
        height: 100%;
        /*align-items: center;*/
        /*justify-content: center;*/
        transition: all 0.1s;
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
