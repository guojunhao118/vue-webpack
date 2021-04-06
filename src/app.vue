<template>
    <div class="main">
        name : {{ text }}
        <img :src="avatorImg" alt="" class="img">
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: 'vue start',
            avatorImg: require('@/assets/image/avator.jpeg')
        }
    }
}
</script>

<style lang='scss'>
    .main {
        background: green;
        .img {
            width: 100px;
            height: 100px;
        }
    }
</style>