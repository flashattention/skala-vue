import { defineStore } from 'pinia'
import { ref } from 'vue'
import data from '../assets/cities.json'

const conditionToWeather = {
  Clear: 'sunny',
  Rain: 'rainy',
  Clouds: 'cloudy',
}

export const useBackgroundStore = defineStore('background', () => {
  const cityId = ref(data[Math.floor(Math.random() * 20)].id)
  const weather = ref(['sunny', 'cloudy', 'rainy'][Math.floor(Math.random() * 3)])

  function setCityId(id) {
    if (id) cityId.value = id
  }

  function setWeatherFromCondition(condition) {
    weather.value = conditionToWeather[condition] ?? 'cloudy'
  }

  function setWeather(type) {
    weather.value = type
  }

  return {
    cityId,
    weather,
    setCityId,
    setWeatherFromCondition,
    setWeather,
  }
})
