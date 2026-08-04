<script setup>
import BaseDashboardCard from './components/exercise/BaseDashboardCard.vue'
import { onMounted } from 'vue'
import { useWeatherStore } from '@/stores/weatherStore'
import UnitToggle from './components/exercise/UnitToggle.vue'

const weatherStore = useWeatherStore()

onMounted(() => {
  weatherStore.fetchAllCityWeathers()
})
</script>

<template>
  <div class="app">
    <h1>Weather App</h1>
    <BaseDashboardCard
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
    <BaseDashboardCard v-if="weatherStore.loading">
      Fetching OpenWeather API Data...
    </BaseDashboardCard>
    <BaseDashboardCard v-else-if="weatherStore.error"
      >OpenWeather API Error: {{ weatherStore.error }}</BaseDashboardCard
    >
    <RouterView v-else />
  </div>
</template>

<style scoped>
.app {
  height: 90vh;
  h1 {
    text-align: center;
  }
  .base-dashboard {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    div {
      font-size: 20px;
      margin-left: 30px;
    }
  }
}
</style>
