<script setup>
import BaseDashboardCard from './components/exercise/BaseDashboardCard.vue'
import TheBackground from './components/TheBackground.vue'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useWeatherStore } from '@/stores/weatherStore'
import { useBackgroundStore } from '@/stores/backgroundStore'
import NavBar from './components/NavBar.vue'
import { VueSpinnerIos } from 'vue3-spinners'

const weatherStore = useWeatherStore()
const backgroundStore = useBackgroundStore()
const { cityId, weather } = storeToRefs(backgroundStore)

onMounted(() => {
  weatherStore.fetchAllCityWeathers()
})
</script>

<template>
  <TheBackground :city-id="cityId" :weather="weather" />
  <h1 class="title">World Weather</h1>
  <div class="app">
    <NavBar />
    <BaseDashboardCard class="loading" v-if="weatherStore.loading">
      <h1>Fetching Data From OpenWeather API...</h1>
      <VueSpinnerIos size="100" />
    </BaseDashboardCard>
    <BaseDashboardCard v-else-if="weatherStore.error"
      >OpenWeather API Error: {{ weatherStore.error }}</BaseDashboardCard
    >
    <RouterView v-else />
  </div>
</template>

<style scoped>
.title {
  text-align: center;
  font-size: 50px;
}
.app {
  position: relative;
  z-index: 1;
  height: 80vh;
  width: 80vw;
  max-width: 800px;
  overflow-y: scroll;
  scrollbar-color: #888888 transparent;
  scrollbar-gutter: stable;
  h1 {
    text-align: center;
  }
  .loading {
    align-items: center;
  }
}
</style>
