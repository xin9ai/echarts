<template>
  <div class="page">
    <Trend></Trend>
    </div>
</template>
<script setup>
import { useRouter, useRoute } from 'vue-router'
import Trend from '@/components/Trend.vue'
const router = useRouter()
const route = useRoute()
</script>
<style lang='scss' scoped>
</style>