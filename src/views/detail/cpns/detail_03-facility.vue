<template>
    <div class="facility">
        <detal-section title="房屋设施" more-text="查看全部设施">
            <div class="facility-inner">
                <template v-for="(item, index) in houseFacility.houseFacilitys">
                    <div class="item" v-if="houseFacility.facilitySort.includes(index)">
                        <div class="head">
                            <img :src="item.icon" alt="">
                            <div class="text">{{ item.groupName }}</div>
                        </div>
                        <div class="list">
                            <template v-for="(item, indey) in item.facilitys.slice(0, 4)">
                                <div class="iten">
                                    <i class="icon_check icon"></i>
                                    <span class="text">{{ item.name }}</span>
                                </div>
                            </template>
                        </div>
                    </div>
                </template>
            </div>
        </detal-section>
    </div>
</template>

<script setup>
import DetalSection from '@/components/detal-section/detal-section.vue';

defineProps({
    houseFacility: {
        type: Object,
        default: () => ({})
    }
})
</script>

<style lang="less" scoped>
.facility-inner {
    padding: 5px 0;
    font-size: 12px;
    border-radius: 6px;
    background-color: #f7f9fb;

    .item {
        display: flex;
        margin: 25px 0;

        .head {
            width: 90px;
            text-align: center;

            img {
                width: 20px;
                height: 20px;
            }

            .text {
                padding-top: 5px;
                color: #000;
            }
        }

        .list {
            display: flex;
            flex: 1;
            flex-wrap: wrap;
            align-items: center;

            .iten {
                display: flex;
                align-items: center;
                box-sizing: border-box;
                width: 50%;
                margin: 4px 0;

                .icon {
                    margin: 0 6px;
                }

                .text {
                    color: #333;
                }
            }
        }
    }
}
</style>