<template>
    <div class="list-contents-wrapper">
        <comp-content v-for="content in contentsData" :key="content.description" :data="content"></comp-content>
    </div>
</template>

<script>
    import comp_content from './comp-content';

    export default {
        name: "comp-list-contents",

        components: {
            'comp-content': comp_content
        },

        props: {
            contentsData: {
                type: Array,
                default: function() {return {};}
            }
        }
    }
</script>

<style scoped>

</style>