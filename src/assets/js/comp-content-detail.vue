<template>
    <div class="content-detail-wrapper">
        <div class="content-detail" @click.stop.prevent="onClick_gotoList">
            <p>{{data.description}}</p>
            <img src="../images/thumbnail-1200_21.jpg" ></img>
            <p>{{data.description}}</p>
            <p>{{data.description}}</p>
            <!--<img :src=bgimg @click.stop.prevent="onClick_gotoList"></img>-->
            <p>{{data.description}}</p>
            <p>{{data.description}}</p>
            <p>{{data.description}}</p>
            <p>{{data.description}}</p>
            <p>{{data.description}}</p>
            <p>{{data.description}}</p>
            <img :src=bgimg ></img>
            <p>{{data.description}}</p>
            <p>{{data.description}}</p>
            <p>{{data.description}}</p>
            <p>{{data.description}}</p>
        </div>

    </div>
</template>

<script>
    import { EventBus } from './EventBus';

    export default {
        name: "comp-content-detail",

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
            }
        }
    }
</script>

<style scoped  lang="scss">



</style>