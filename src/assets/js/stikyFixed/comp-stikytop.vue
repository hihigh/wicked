<template>
    <div id="wrapper">

        <p>
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It
            was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
            more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>

        <div class="stiky-wrapper">
            <sticky-top top="100" :scroll-y="scrollY"></sticky-top>
        </div>


        <div class="etc-contents-wrapper">

            <div class="etc-contents-img" style='background-image: url("images/noimg_w.png")'></div>
            <p>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five
                centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It
                was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <p>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five
                centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It
                was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <p>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five
                centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It
                was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <p>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five
                centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It
                was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <p>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five
                centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It
                was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
            <p>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
                took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five
                centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It
                was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
                more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>

        </div>
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
                template: '<div class="stiky-box" :style="myStyle"></div>',
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

                    console.log(this.originalTop, this.originalHeight, this.$el.offsetTop)
                },
                watch: {
                    scrollY(newValue) {
                        console.log(newValue)
                        const rect = this.$el.getBoundingClientRect();
                        var objHeight = this.originalHeight - (this.scrollY - this.originalTop);
                        objHeight = objHeight < 70 ? 70 : objHeight
                        // objHeight < 100 ? 100 : objHeight

                        console.log(rect.height)

                        if (this.originalTop < this.scrollY) {

                            Velocity(
                                this.$el,
                                { height:objHeight+'px'},
                                { easing: 'easeInOutCubic', duration: 1}
                            );

                            this.$set(this.myStyle, 'position', 'fixed');
                            this.$set(this.myStyle, 'top', '0');
                            // this.$set(this.myStyle, 'height', `${objHeight}px`);
                        } else {
                            this.$set(this.myStyle, 'position');
                            this.$set(this.myStyle, 'top');
                        }
                    }
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    #wrapper {
        /*height: 1200px;*/
    }

    $stiky-height: 30vh;

    .stiky-wrapper {
        height: $stiky-height;

        .stiky-box {
            height: $stiky-height;

            display: inline-block;
            width: 100%;
            /*border: 1px solid blue;*/
            background-color: aquamarine;
            /*position: relative;*/
        }
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

    .mode-fixed {
        position: fixed;
    }


    .etc-contents-wrapper {
        /*padding: 2rem 2rem 2rem;
        transition: all 0.4s;

        .etc-contents-img {
            background-size: cover;
            background-position: 50% 50%;
            width: 100%;
            height: 200px;
        }

        p {
            margin: 20px 0;
        }

        img {
            width: 100%;
        }*/
    }

</style>