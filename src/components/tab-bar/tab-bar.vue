<template>
    <div class="tab-bar">
        <van-tabbar v-model="currentIndex" active-color="#ff9854" route>
            <template v-for="(item, index) in tabbarData">
                <van-tabbar-item :to="item.path">
                    <span>{{ item.text }}</span>
                    <template #icon>
                        <img v-if="currentIndex !== index" :src="getAssetUAL(item.image)" alt="">
                        <img v-else :src="getAssetUAL(item.imageActive)" alt="">
                    </template>
                </van-tabbar-item>
            </template>
        </van-tabbar>
    </div>
</template>

<script setup>

import tabbarData from '@/assets/data/tabbar.js'
import { getAssetUAL } from '@/utils/load_assets.js'
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

// 监听路由改变时，找到对应的索引，设置currentIndex
const route = useRoute()
const currentIndex = ref(0)
watch(route, (newRoute) => {
    const index = tabbarData.findIndex(item => item.path === newRoute.path)
    if (index === -1) return
    currentIndex.value = index
})

</script>

<style lang="less" scoped>
.tab-bar {
    // height: calc(100vh - 98px);
    // overflow-y: auto;

    img {
        height: 26px;
    }
}
</style>