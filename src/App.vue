<script setup>
import BaseDashboardCard from './components/exercise/BaseDashboardCard.vue'
import TheBackground from './components/TheBackground.vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '@/stores/weatherStore'
import { useBackgroundStore } from '@/stores/backgroundStore'
import UnitToggle from './components/exercise/UnitToggle.vue'

const weatherStore = useWeatherStore()
const backgroundStore = useBackgroundStore()
const { cityId, weather } = storeToRefs(backgroundStore)

onMounted(() => {
  weatherStore.fetchAllCityWeathers()
})
</script>

<template>
  <TheBackground :city-id="cityId" :weather="weather" />
  <div class="app">
    <h1>World Weather</h1>
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
  position: relative;
  z-index: 1;
  height: 80vh;
  width: 60vw;
  overflow-y: scroll;
  scrollbar-color: #888888 transparent;
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
