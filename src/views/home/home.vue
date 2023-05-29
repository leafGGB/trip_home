<template>
    <div class="home" ref="homeRef">
        <home-nav-bar />
        <div class="banner">
            <img src="@/assets/img/home/banner.webp" alt="">
        </div>
        <home-search-box />
        <home-categories />
        <div class="search-bar" v-if="isShowSearchBar">
            <search-bar :start-date="'02.11'" :end-date="'99.99'"/>
        </div>
        <home-content />
        <!-- <button @click="moreBtnClick">加载更多</button> -->
    </div>
</template>

<script>
    export default { name: "home" }
</script>

<script setup>

import { ref, watch, computed, onActivated } from 'vue'
import HomeNavBar from './cpns/home-nav-bar.vue'
import useHomeStore from '@/stores/modules/home'
import HomeSearchBox from './cpns/home-search-box.vue'
import HomeCategories from './cpns/home-categories.vue'
import HomeContent from './cpns/home-content.vue'
import useScroll from '@/hooks/useScroll'
import SearchBar from '@/components/search-bar/search-bar.vue'

// import hyRequest from '@/services/request/index'
// 发送网络请求
const homeStore = useHomeStore()
homeStore.fetchHotSuggestData()
homeStore.fetchCategoriesData()
homeStore.fetchHouselistData()

// 模拟加载更多
// const moreBtnClick = () => {
//     homeStore.fetchHouselistData()
// }

// 监听window窗口的滚动

// 方法一：传入一个函数
// useScroll(() => {
//     homeStore.fetchHouselistData()
// })

// 方法二
const homeRef = ref()
const { isReachBottom, scrollTop } = useScroll(homeRef)
watch(isReachBottom, (newValue) => {
    if(newValue) {
        homeStore.fetchHouselistData().then(() => {
            isReachBottom.value = false
        })
    }
})

// 搜索框显示的控制
// const isShowSearchBar = ref(false)
// watch(scrollTop, (newTop) => {
//     isShowSearchBar.value = newTop > 100
// })
// ------另一种方式，使用计算属性
const isShowSearchBar = computed(() => {
    return scrollTop.value >= 360
})

onActivated(() => {
    homeRef.value?.scrollTo({
        top: scrollTop.value
    })
})

</script>

<style lang="less" scoped>
.home {
    height: 100vh;
    overflow-y: auto;
    box-sizing: border-box;
    padding-bottom: 60px;
}

.banner {
    img {
        width: 100%;
    }
}

.search-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    padding: 16px 16px 10px;
    background-color: #fff;
}
</style>