<script setup>
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
</script>

<template>
  <BaseDashboardCard
    >[404 Error]<br />Page not found
    <RouterLink to="/">Go back to the main dashboard</RouterLink></BaseDashboardCard
  >
</template>

<style scoped>
.base-dashboard {
  font-size: 24px;
  text-align: center;
}
</style>
