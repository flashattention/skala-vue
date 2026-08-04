import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useConfigStore = defineStore('config', () => {
  const unit = ref('celsius')

  const unitSymbol = computed(() => {
    if (unit.value == 'celsius') {
      return '℃'
    } else {
      return '℉'
    }
  })

  function toggleUnit() {
    if (unit.value == 'celsius') {
      unit.value = 'fahrenheit'
    } else {
      unit.value = 'celsius'
    }
  }

  return {
    unit,
    unitSymbol,
    toggleUnit,
  }
})
