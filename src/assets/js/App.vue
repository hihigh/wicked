
<template>
    <div class="wrapper">
        <ul class="list-wrapper">
            <comp-content v-for="list in lists" :key="list.description" :list="list"></comp-content>
        </ul>
    </div>

</template>

<script>
    import data from '../data.json';
    import compContent from './comp-content';

    export default {
        name: "app",

        data() {
            return {
                lists: []
            }
        },
        created() {
            this.lists = data;
        },
        components: {
            compContent
        }
    }
</script>


<style lang="scss" src="../css/style.scss"></style>
