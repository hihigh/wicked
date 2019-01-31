<template>
    <div class="about-lab">
        <h1 class="logo">
            <span class="blind">df lab</span>
            <img src="images/df_lab_logo_fit_b.svg" alt="DF Logo" class="img-logo">
        </h1>
        <p class="dec-lab">
            <span style="visibility: visible;">Creative freedom, a sense of responsibility and passionate</span>
        </p>
    </div>
</template>

<script>
    export default {
        name: "comp-content_about_w"
    }
</script>

<style scoped lang="scss">
    .about-lab {
        padding: 2rem 2rem 2rem;
        box-sizing: border-box;
        height: 200px;

        .logo {
            margin: 2rem 0;

            .img-logo {
                width: 104px;
            }
        }
    }
</style>