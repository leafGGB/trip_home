<template>
    <div class="tab-bar">
        <van-tabbar v-model="currentIndex" active-color="#ff9854">
            <template v-for="(item, index) in tabbarData">
                <van-tabbar-item :to="item.path" icon="home-o">
                    <span>{{ item.text }}</span>
                </van-tabbar-item>
            </template>
        </van-tabbar>
    </div>
</template>

<script setup>

import tabbarData from '@/assets/data/tabbar.js'
import { getAssetUAL } from '@/utils/load_assets.js'
import { ref } from 'vue';

const currentIndex = ref(0)

</script>

<style lang="less" scoped>
.tab-bar {
    // 修改样式方法一
    // 局部定义一个变量：只针对 .tab-bar 子元素生效
    // --van-tabbar-item-icon-size: 30px !important;

    // 修改样式方法二
    // 找到类，对类中的CSS属性重写
    // 穿透到子组件里面，找到子组件的类，使子组件样式生效
    :deep(.van-tabbar-item__icon) {
        font-size: 50px;
    }

    img {
        height: 28px;
    }
}
</style>