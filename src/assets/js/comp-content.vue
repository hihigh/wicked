<template>
    <li class="list-content">
        <div class="inner-wrapper" >
            <h3>{{data.title}}</h3>
            <p>{{data.description}}</p>
            <button>view detail></button>
            <!--<img src="../images/thumbnail-1200.jpg">-->
        </div>
    </li>
</template>

<script>
    export default {
        name: "Content",

        props: {
            data: {
                type: Object,
                default: function() {return {};}
            }
        }
    }
</script>

<style scoped>

    .list-content {
        color: white;
        width: 100%;
        height: 50vh;
        background-image: url("../images/thumbnail-1200.jpg");
        background-size: cover;

        padding: 5%;
        box-sizing: border-box;
    }

    .inner-wrapper {
        width: 100%;
        display: block;
        position: relative;

    }

    .inner-wrapper img {
        width: 100%;

    }



    h3 {
        margin-bottom: 30px;

    }

    li {

    }

    button {
        position: absolute;
        width: 30vw;
        height: 5vh;
        top: 38vh;
        font-size: 0.7rem;
        bottom: 0;
        text-align: left;
        color: white;
    }


</style>