import { defineStore } from 'pinia'
import cities from '@/assets/cities.json'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    cityWeathers: [],
    loading: false,
    error: null,
  }),

  actions: {
    async fetchAllCityWeathers() {
      this.loading = true
      this.error = null
      const API_KEY = import.meta.env.VITE_OPEN_WEATHER_API

      try {
        const promises = cities.map(async (city) => {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.long}&appid=${API_KEY}&units=metric`,
          )
          if (!res.ok) throw new Error(`Failed to fetch weather for ${city.name}`)

          const weatherData = await res.json()
          return {
            id: city.id,
            name: city.name,
            country: city.country,
            lat: city.lat,
            long: city.long,
            timezone: city.timezone,
            temp: weatherData.main.temp,
            humidity: weatherData.main.humidity,
            condition: weatherData.weather[0].main,
            icon: weatherData.weather[0].icon,
          }
        })

        this.cityWeathers = await Promise.all(promises)
      } catch (err) {
        this.error = err.message
        console.error('Weather fetch error:', err)
      } finally {
        this.loading = false
      }
    },
  },
})
