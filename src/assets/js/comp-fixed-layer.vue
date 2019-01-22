<template>
    <div class="wrap_body_frame">

        <div class="wrap_view_article_body">
            <div class="wrap_cover" style="opacity: 1;">
                <div class="cover_item">
                    <div class="cover_image" :style="{ 'background-image': 'url(./images/image.png)' }"></div>
                </div>
            </div>
            <div class=" wrap_body">
                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>

            </div>
        </div>

    </div>
</template>

<script>
    import comp_content_detail from './comp-content-detail';

    export default {
        name: "comp-fixed-layer",

        components: {
            'comp-content-detail': comp_content_detail
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
        }
    }


</script>


<style scope lang="scss">
.wrap_body_frame {
    margin-top: 375px;
}
    .wrap_cover {
        position: fixed;
        width: 100%;
        top: 0;
        z-index: -1;
    }

    .cover_item{
        height: 375px;
        position: relative;
        max-height: none!important;
    }

    .cover_image {
        background-size: cover;
        background-position: 50% 50%;
        height: 100%;
    }

    .wrap_body{
        height: 1200px;
    }

</style>


<!--<style lang="scss" src="../css/style.scss">-->
<!--</style>-->
