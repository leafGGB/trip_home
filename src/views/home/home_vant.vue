<template>
    <div class="home">
        <h2>home</h2>
        <van-button type="primary">主要按钮</van-button>
        <van-button type="success">成功按钮</van-button>
        <van-button type="default">默认按钮</van-button>
        <van-button type="warning">警告按钮</van-button>
        <van-button type="danger">危险按钮</van-button>

        <van-rate v-model="rateValue" :size="30" color="#ffd21e" icon="star" readonly allow-half />
    </div>
</template>
<script setup>
import { ref } from 'vue';



const rateValue = ref(3.4)

</script>

<style lang="less" scoped>

</style>