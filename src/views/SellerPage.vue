<template>
  <div class="page">
    <!-- 商家销量排行 -->
    <Seller></Seller>
  </div>
</template>
<script setup>
import { ref, reactive, toRef, toRefs } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import Seller from '@/components/Seller.vue'
const router = useRouter()
const route = useRoute()
</script>
<style lang='scss' scoped>

</style>