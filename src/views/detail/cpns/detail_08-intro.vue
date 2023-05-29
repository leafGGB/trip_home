<template>
  <div class="intro">
    <div class="title">{{ priceIntro.title }}</div>
    <div class="content">{{ priceIntro.introduction }}</div>
  </div>
</template>

<script setup name="home">
defineProps({
  priceIntro: {
    type: Object,
    default: () => ({})
  }
})

</script>

<style lang="less" scoped>
.intro {
  padding: 16px 12px;
  border-top: 5px solid #f2f3f4;
  .title {
    font-size: 14px;
    font-weight: 700;
    margin: 10px 0;
  }
  .content {
    font-size: 12px;
    line-height: 1.5;
    color: #666;
  }
}
</style>