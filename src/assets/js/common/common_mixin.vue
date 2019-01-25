<script>
    import Vue from 'vue';

    export default {
        created: function () {
            //console.log('mixin hook called')
        },

        methods: {

            mx_scrollTo: function(to, duration) {
                const
                    element = document.scrollingElement || document.documentElement,
                    start = element.scrollTop,
                    change = to - start,
                    startDate = +new Date(),

                    // t = current time,  b = start value, c = change in value, d = duration
                    easeInOutQuad = function(t, b, c, d) {
                        t /= d/2;
                        if (t < 1) return c/2*t*t + b;
                        t--;
                        return -c/2 * (t*(t-2) - 1) + b;
                    },
                    animateScroll = function() {
                        const currentDate = +new Date();
                        const currentTime = currentDate - startDate;
                        element.scrollTop = parseInt(easeInOutQuad(currentTime, start, change, duration));
                        if(currentTime < duration) {
                            requestAnimationFrame(animateScroll);
                        }
                        else {
                            element.scrollTop = to;
                        }
                    };
                animateScroll();
            },
        }
    }
</script>


<!--
    import mixin from "./common/common_mixin.vue"
    mixins: [mixin]
-->
