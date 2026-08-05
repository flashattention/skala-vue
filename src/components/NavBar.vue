<script setup>
import BaseDashboardCard from './exercise/BaseDashboardCard.vue'
import UnitToggle from './exercise/UnitToggle.vue'
</script>

<template>
  <BaseDashboardCard class="nav"
    ><div>
      <RouterLink to="/">Home</RouterLink>
    </div>
    <div>
      <RouterLink to="/about">About</RouterLink>
    </div>
    <div>
      <RouterLink to="/weather/0">Detail</RouterLink>
    </div>
    <UnitToggle />
  </BaseDashboardCard>
</template>

<style scoped>
.nav {
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  div {
    font-size: 24px;
    margin-left: 30px;
  }
}
</style>
