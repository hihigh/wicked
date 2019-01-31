<template>
    <div class="etc-contents-wrapper">

        <div class="etc-contents-img" style='background-image: url("images/noimg_w.png")'></div>
        <p>
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
            took a galley of type and scrambled it to make a type specimen book.<br>It has survived not only five
            centuries, but also the leap into electronic typesetting, remaining essentially unchanged. <br><br>It
            was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and
            more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </p>

    </div>
</template>

<script>
    export default {
        name: "comp-content_detail_w"
    }
</script>

<style scoped lang="scss">
    .etc-contents-wrapper {
        padding: 2rem 2rem 2rem;
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
        }
    }
</style>