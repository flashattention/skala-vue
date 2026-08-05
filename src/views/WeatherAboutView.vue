<script setup>
import BaseDashboardCard from '@/components/exercise/BaseDashboardCard.vue'
</script>

<template>
  <BaseDashboardCard>
    <div class="wrapper">
      A web application for checking out world weathers.
      <br />
      <br />
      Made by
      <a href="https://github.com/flashattention" target="_blank">flashattention@github.com</a>.
    </div>

    <div class="wrapper">
      <RouterLink to="/">Go back to the main dashboard</RouterLink>
    </div>
  </BaseDashboardCard>
</template>

<style scoped>
.wrapper {
  margin: 20px;
  text-align: center;
  font-size: 24px;
}
</style>
