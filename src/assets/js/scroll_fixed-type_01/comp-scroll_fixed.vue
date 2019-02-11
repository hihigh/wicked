<template>
    <div class="stiky-wrapper" @click.stop.prevent="onClickFixed">
        <div class="stiky-box" :style="myStyle">
            <p class="title">Snow</p>
            <div class="bg-image" style='background-image: url("images/thumbnail-1200_28.jpg")'></div>
        </div>
    </div>

</template>

<script>
    import mixin from "../common/common_mixin.vue";

    export default {
        name: "comp-scroll-fixed",
        mixins: [mixin],
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

            // console.log(this.originalTop, this.originalHeight)

        },
        watch: {
            scrollY(newValue) {
                var objHeight = this.originalHeight - (this.scrollY - this.originalTop);
                objHeight = objHeight < this.fixedHeight ? this.fixedHeight : objHeight

                const fixedSize = this.originalHeight - this.fixedHeight;

                if (this.originalTop < this.scrollY) {

                    this.$el.classList.add("fixed-position")

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

                    console.log(this.originalTop , this.scrollY, this.originalTop + fixedSize)

                } else {

                    this.$el.classList.remove("fixed-position")

                    this.$set(this.myStyle, 'position');
                    this.$set(this.myStyle, 'top');
                }
            }
        },

        methods: {
            onClickFixed() {
                const tg = this.originalTop + (this.originalHeight - this.fixedHeight);
                this.mx_scrollTo(tg, 500)
            }
        }
    }
</script>

<style scoped lang="scss">

    $stiky-height: 50vh;


    .stiky-wrapper {
        height: $stiky-height;

        .stiky-box {
            height: $stiky-height;
            width: 100%;

            .title {
                position: absolute;
                color: white;
                font-size: 2rem;
                font-weight: lighter;
                margin: 2.6rem;
                transition:margin 0.3s
            }

            .bg-image {
                width: 100%;
                height: 100%;
                background-size: 50rem;
                background-position: 50% 0%;

            }
        }

        &.fixed-position {
            .title {
                margin: 1.4rem 2rem;
            }
        }
    }



</style>