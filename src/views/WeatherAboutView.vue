<script setup>
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
</script>

<template>
  <BaseDashboardCard>
    <div class="wrapper">세계의 날씨 정보를 확인할 수 있는 애플리케이션입니다.</div>

    <div class="wrapper">
      <RouterLink to="/">메인 대시보드로 돌아가기</RouterLink>
    </div>
  </BaseDashboardCard>
</template>

<style scoped>
.wrapper {
  margin: 20px;
  text-align: center;
}
</style>
