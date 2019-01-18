<template>
    <div class="frame-wrapper">
        <div>logo</div>
        <div>menu</div>

    </div>
</template>

<script>
    export default {
        name: "comp-frame",

        props: {
            contentsData: {
                type: Array,
                default: function() {return {};}
            }
        }
    }


</script>


<style scope lang="scss">
    .frame-wrapper {
        position: absolute;
        color: #fff;
        z-index: 1;
    }
</style>


<!--<style lang="scss" src="../css/style.scss">-->
<!--</style>-->
