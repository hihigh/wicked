<template>
    <div class="stiky-box" :style="myStyle">
        <div class="bg-image" style='background-image: url("images/thumbnail-1200.jpg")'></div>
    </div>

</template>

<script>
    export default {
        name: "comp-scroll-fixed",

        props: ['top', 'scrollY'],
        data() {
            return {
                myStyle: {},
                originalTop: 0
            }
        },
        mounted() {
            this.originalTop = this.$el.offsetTop;
            this.originalHeight = this.$el.getBoundingClientRect().height;
            this.fixedHeight = 70;

        },
        watch: {
            scrollY(newValue) {
                var objHeight = this.originalHeight - (this.scrollY - this.originalTop);
                objHeight = objHeight < this.fixedHeight ? this.fixedHeight : objHeight

                const fixedSize = this.originalHeight - this.fixedHeight;

                if (this.originalTop < this.scrollY) {

                    this.$set(this.myStyle, 'position', 'fixed');
                    this.$set(this.myStyle, 'top', '0');

                    if(this.scrollY > this.originalTop + fixedSize){
                        this.$set(this.myStyle, 'height', `${this.originalHeight-fixedSize}px`);
                        this.$set(this.myStyle, 'z-index', 2);
                    } else {
                        this.$set(this.myStyle, 'height');
                        this.$set(this.myStyle, 'z-index');
                    }

                    var overPer = (this.scrollY - this.originalTop)/fixedSize;

                    console.log(overPer)

                } else {
                    this.$set(this.myStyle, 'position');
                    this.$set(this.myStyle, 'top');
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .bg-image {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: 50% 0%;
        /*background-image: url("images/noimg.png");*/

    }

</style>