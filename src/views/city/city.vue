<template>
    <div class="city top-page">
        <div class="top">
            <!-- 1. 搜索框 -->
            <van-search v-model="searchValue" shape="round" placeholder="城市/区域/位置" show-action @cancel="cancelClick" />

            <!-- 2. tab的切换 -->
            <van-tabs v-model:active="tabActive" color="#ff9854" line-height="3">
                <template v-for="(value, key, index) in allCities">
                    <van-tab :title="value.title" :name="key"></van-tab>
                </template>
            </van-tabs>
        </div>
        <div class="content">
            <!-- <city-group :group-data="currentGroup"/> -->
            <template v-for="(value, key, index) in allCities">
                <!-- <h2 v-show="tabActive === key">{{ value.title }}</h2> -->
                <city-group v-show="tabActive === key" :group-data="value"/>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia';
import useCityStore from '@/stores/modules/city';
import { useRouter } from 'vue-router';
// import { getCityAll } from '@/services/index'

import CityGroup from './cpns/city-group.vue'

const router = useRouter()

// 搜索框功能
const searchValue = ref("")
const cancelClick = () => {
    router.back()
}

// tab的切换
const tabActive = ref()

/* 
    在这里发送网络请求有两个缺点
        1. 如果网络请求太多，那么页面中就包含大量的的对于网络请求和数据的处理逻辑
        2. 如果页面封装了很多的子组件，子组件需要这些数据，我们还必须一步步将数据传递过去（props）
*/
// 网络请求：请求城市的数据
// const allCity = ref({})
// getCityAll().then(res => {
//     allCity.value = res.data
// })

// 从Store中获取数据
const cityStore = useCityStore()
cityStore.fetchAllCitiesData()
const { allCities } = storeToRefs(cityStore)

// 目的：获取选中标签的数据
// 1. 获取正确的key，将tabs中绑定的tabAction正确绑定
// 2. 根据key 从allCities获取数据，默认直接获取的不是响应式的，所以必须包裹computed
const currentGroup = computed(() => allCities.value[tabActive.value])


</script>

<style lang="less" scoped>
.city {
    // --van-tabs-line-height: 30px;

    // top固定定位方式
    // .top {
    //     position: fixed;
    //     top: 0;
    //     left: 0;
    //     right: 0;
    // }

    // .content {
    //     margin-top: 98px;
    // }

    // 方式二：布局滚动
    .content {
        height: calc(100vh - 98px);
        overflow-y: auto;
    }

    .top {
        position: relative;
        z-index: 9;
    }
}
</style>