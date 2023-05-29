import { onMounted, onUnmounted, ref } from 'vue';
import { throttle } from 'underscore'

// 第一种方法，传入一个回调函数
// export default function useScroll(reachBottomCB) {
//     const scrollListenerHandler = () => {
//         const clientHeight = document.documentElement.clientHeight;
//         const scrollTop = document.documentElement.scrollTop;
//         const scrollHeight = document.documentElement.scrollHeight;
//         if (clientHeight + scrollTop >= (scrollHeight - 1)) {
//             if(reachBottomCB) reachBottomCB()
//         }
//     }
//     onMounted(() => {
//         window.addEventListener("scroll", scrollListenerHandler)
//     })

//     // 离开该页面时移除监听
//     onUnmounted(() => {
//         window.removeEventListener("scroll", scrollListenerHandler)
//     })
// }


// 第二种方法
export default function useScroll(elRef) {
    let el = window

    const isReachBottom = ref(false)
    const clientHeight = ref(0)
    const scrollTop = ref(0)
    const scrollHeight = ref(0)

    // 节流
    const scrollListenerHandler = throttle(() => {
        if(el === window) {
            clientHeight.value = document.documentElement.clientHeight;
            scrollTop.value = document.documentElement.scrollTop;
            scrollHeight.value = document.documentElement.scrollHeight;
        } else {
            clientHeight.value = el.clientHeight;
            scrollTop.value = el.scrollTop;
            scrollHeight.value = el.scrollHeight;

        }
        if (clientHeight.value + scrollTop.value >= (scrollHeight.value - 1)) {
            // console.log("到底部了");
            isReachBottom.value = true
        }
    }, 100)

    onMounted(() => {
        if (elRef) {
            el = elRef.value
        }
        el.addEventListener("scroll", scrollListenerHandler)
    })

    // 离开该页面时移除监听
    onUnmounted(() => {
        el.removeEventListener("scroll", scrollListenerHandler)
    })

    return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}