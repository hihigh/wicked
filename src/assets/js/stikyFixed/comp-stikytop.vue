<template>
    <div id="wrapper">
        <div class="spacer"></div>
        <div class="a-box"></div>
        <sticky-top top="20" :scroll-y="scrollY"></sticky-top>
        <div class="a-box"></div>
    </div>
</template>

<script>
    export default {
        name: "comp-stikytop",

        data() {
            return {
                scrollY: 0
            };
        },

        mounted() {
            window.addEventListener('scroll', (event) => {
                this.scrollY = Math.round(window.scrollY);
            });
        },


        components: {
            stickyTop: {
                template: '<div class="a-box" :style="myStyle"></div>',
                props: ['top', 'scrollY'],
                data() {
                    return {
                        myStyle: {},
                        originalTop: 0
                    }
                },
                mounted() {
                    this.originalTop = this.$el.getBoundingClientRect().top;
                },
                watch: {
                    scrollY(newValue) {
                        console.log(newValue)
                        const rect = this.$el.getBoundingClientRect();
                        const newTop = this.scrollY + +this.top - this.originalTop;

                        if (newTop > 0) {
                            this.$set(this.myStyle, 'top', `${newTop}px`);
                        } else {
                            this.$delete(this.myStyle, 'top');
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped>
    #wrapper {
        height: 1200px;
    }

    .spacer {
        height: 80px;
    }

    .a-box {
        display: inline-block;
        height: 5rem;
        width: 5rem;
        border: 2px solid blue;
        position: relative;
    }

</style>