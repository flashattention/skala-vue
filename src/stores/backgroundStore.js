import { defineStore } from 'pinia'
import { ref } from 'vue'

const conditionToWeather = {
  Clear: 'sunny',
  Rain: 'rainy',
  Clouds: 'cloudy',
}

export const useBackgroundStore = defineStore('background', () => {
  const cityId = ref('city_01')
  const weather = ref('sunny')

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
