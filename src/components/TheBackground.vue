<template>
  <div class="fixed-background" :style="{ backgroundColor: currentBgColor }">
    <div class="weather-layer">
      <transition name="fade">
        <div v-if="weather === 'sunny'" class="weather-graphic sun">
          <svg viewBox="0 0 200 200" width="360" height="360">
            <defs>
              <radialGradient id="sun-gradient" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#FFF7AD" />
                <stop offset="40%" stop-color="#FFD200" />
                <stop offset="100%" stop-color="#FF9000" />
              </radialGradient>
              <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <g stroke="#FFB000" stroke-width="4" stroke-linecap="round" opacity="0.85">
              <line x1="100" y1="15" x2="100" y2="30" />
              <line x1="100" y1="170" x2="100" y2="185" />
              <line x1="15" y1="100" x2="30" y2="100" />
              <line x1="170" y1="100" x2="185" y2="100" />
              <line x1="40" y1="40" x2="51" y2="51" />
              <line x1="149" y1="149" x2="160" y2="160" />
              <line x1="40" y1="160" x2="51" y2="149" />
              <line x1="149" y1="51" x2="160" y2="40" />
            </g>
            <circle cx="100" cy="100" r="55" fill="url(#sun-gradient)" filter="url(#glow)" />
          </svg>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="weather === 'cloudy' || weather === 'rainy'" class="weather-graphic cloud">
          <svg viewBox="0 0 1000 1000" width="100vw" height="100vh" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#FFFFFF" />
                <stop offset="70%" stop-color="#ECEFF1" />
                <stop offset="100%" stop-color="#CFD8DC" />
              </linearGradient>
              <filter id="cloud-shadow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow
                  dx="0"
                  dy="6"
                  stdDeviation="5"
                  flood-color="#000000"
                  flood-opacity="0.12"
                />
              </filter>
            </defs>
            <g
              v-for="(conf, i) in cloudConfigs"
              :key="i"
              :transform="`translate(${windowWidth * conf.xPct}, ${windowHeight * conf.yPct}) scale(${conf.scale})`"
              :opacity="conf.opacity"
            >
              <g :class="['cloud-item', `c-delay-${(i % 4) + 1}`]">
                <path :d="CLOUD_PATH" fill="url(#cloud-grad)" filter="url(#cloud-shadow)" />
              </g>
            </g>
          </svg>
        </div>
      </transition>

      <transition name="fade">
        <div v-if="weather === 'rainy'" class="weather-graphic rain">
          <svg viewBox="0 0 1000 1000" width="100vw" height="100vh" preserveAspectRatio="none">
            <defs>
              <linearGradient id="drop-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#81D4FA" stop-opacity="0.8" />
                <stop offset="100%" stop-color="#0288D1" stop-opacity="0.3" />
              </linearGradient>
            </defs>
            <g stroke="url(#drop-grad)" stroke-width="5" stroke-linecap="round">
              <line
                v-for="(drop, i) in raindrops"
                :key="i"
                :class="['raindrop', `rd-${(i % 6) + 1}`]"
                :x1="drop.x"
                :y1="drop.y"
                :x2="drop.x - 3"
                :y2="drop.y + 8"
              />
            </g>
          </svg>
        </div>
      </transition>
    </div>

    <div class="landmark-layer">
      <img
        v-if="currentLandmarkUrl && currentLandmarkConfig"
        :src="currentLandmarkUrl"
        class="landmark-svg"
        :style="currentLandmarkStyle"
        alt=""
      />
    </div>

    <div class="weather-graphic ground">
      <svg viewBox="0 0 1000 200" width="100%" height="100%" preserveAspectRatio="xMidYBottom meet">
        <defs>
          <linearGradient id="ground-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#7CB342" />
            <stop offset="100%" stop-color="#33691E" />
          </linearGradient>
          <g id="calf-shape">
            <rect x="8" y="22" width="3" height="12" fill="#5D4037" rx="1" />
            <rect x="15" y="22" width="3" height="12" fill="#3E2723" rx="1" />
            <rect x="28" y="22" width="3" height="12" fill="#5D4037" rx="1" />
            <rect x="35" y="22" width="3" height="12" fill="#3E2723" rx="1" />
            <ellipse cx="24" cy="18" rx="16" ry="10" fill="#FFFFFF" />
            <circle cx="18" cy="15" r="4" fill="#3E2723" />
            <circle cx="28" cy="20" r="3" fill="#3E2723" />
            <circle cx="36" cy="10" r="7" fill="#FFFFFF" />
            <ellipse cx="38" cy="12" rx="3" ry="2" fill="#FFCDD2" />
            <path d="M 32 5 Q 30 2 34 4" stroke="#5D4037" stroke-width="2" fill="none" />
            <path d="M 8 16 Q 4 20 6 25" stroke="#5D4037" stroke-width="1.5" fill="none" />
          </g>
        </defs>
        <path d="M -100 200 Q 500 20 1100 200 Z" fill="url(#ground-grad)" />
        <g class="calf calf-1">
          <use href="#calf-shape" class="calf-body" x="0" y="127" transform="scale(1.2)" />
        </g>
        <g class="calf calf-2">
          <use href="#calf-shape" class="calf-body" x="0" y="127" transform="scale(0.9)" />
        </g>
        <g class="calf calf-3">
          <use href="#calf-shape" class="calf-body" x="0" y="145" transform="scale(0.7)" />
        </g>
        <g class="calf calf-4">
          <use href="#calf-shape" class="calf-body" x="0" y="122" transform="scale(1.2)" />
        </g>
        <g class="calf calf-5">
          <use href="#calf-shape" class="calf-body" x="0" y="130" transform="scale(0.9)" />
        </g>
        <g class="calf calf-6">
          <use href="#calf-shape" class="calf-body" x="0" y="150" transform="scale(0.7)" />
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import {
  cityLandmarkMap,
  landmarkPlacementConfigs,
  cloudConfigs,
  CLOUD_PATH,
} from '@/config/landmarkConfig'

const props = defineProps({
  cityId: { type: String, default: 'city_01' },
  weather: { type: String, default: 'sunny' },
})

const bgColors = {
  sunny: 'skyblue',
  cloudy: 'lightgrey',
  rainy: 'grey',
}

const landmarkModules = import.meta.glob('@/assets/landmarks/*.svg', {
  query: '?url',
  import: 'default',
})

const windowWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1024)
const windowHeight = ref(typeof window !== 'undefined' ? window.innerHeight : 768)
const currentLandmarkUrl = ref(null)
const raindrops = ref([])

const currentBgColor = computed(() => bgColors[props.weather] || bgColors.sunny)
const currentLandmarkConfig = computed(() => landmarkPlacementConfigs[props.cityId])

const currentLandmarkStyle = computed(() => {
  if (!currentLandmarkConfig.value) return {}
  return {
    position: 'absolute',
    ...currentLandmarkConfig.value,
    zIndex: 10,
  }
})

function generateRaindrops() {
  const drops = []
  const dropCount = 120
  for (let i = 0; i < dropCount; i++) {
    drops.push({
      x: Math.floor(Math.random() * (windowWidth.value + 300)),
      y: Math.floor(Math.random() * (windowHeight.value + 300)) - 500,
    })
  }
  raindrops.value = drops
}

async function loadLandmark(newCityId) {
  if (!newCityId) {
    currentLandmarkUrl.value = null
    return
  }

  const landmarkName = cityLandmarkMap[newCityId]
  if (!landmarkName) {
    currentLandmarkUrl.value = null
    return
  }

  const modulePath = Object.keys(landmarkModules).find((path) =>
    path.endsWith(`/assets/landmarks/${landmarkName}.svg`),
  )
  const loader = modulePath ? landmarkModules[modulePath] : null

  if (!loader) {
    console.error(`Landmark SVG not found for ${newCityId} (${landmarkName})`)
    currentLandmarkUrl.value = null
    return
  }

  currentLandmarkUrl.value = await loader()
}

watch(
  () => props.cityId,
  (newId) => loadLandmark(newId),
  { immediate: true },
)

watch(
  () => props.weather,
  (newWeather) => {
    if (newWeather === 'rainy') generateRaindrops()
  },
  { immediate: true },
)

const handleResize = () => {
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
  if (props.weather === 'rainy') generateRaindrops()
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', handleResize)
  }
})
</script>

<style scoped>
.fixed-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
  overflow: hidden;
  transition: background-color 0.5s ease;
}

.weather-graphic {
  position: absolute;
  pointer-events: none;
}

.sun {
  top: -180px;
  right: -180px;
  z-index: 1;
  animation: spin 20s linear infinite;
  transform-origin: center;
}

.rain {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
}

.cloud {
  z-index: 1;
}

.rain {
  z-index: -10000;
}

.landmark-layer {
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
}

.landmark-svg {
  height: auto;
}

.ground {
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 20vw;
  max-height: 40vh;
  z-index: 2;
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fall {
  0% {
    transform: translateY(-50px);
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  100% {
    transform: translateY(105vh);
    opacity: 0.2;
  }
}

:deep(.raindrop) {
  animation: fall 1s linear infinite;
}

:deep(.rd-1) {
  animation-delay: 0s;
}
:deep(.rd-2) {
  animation-delay: 0.2s;
}
:deep(.rd-3) {
  animation-delay: 0.4s;
}
:deep(.rd-4) {
  animation-delay: 0.6s;
}
:deep(.rd-5) {
  animation-delay: 0.8s;
}
:deep(.rd-6) {
  animation-delay: 1s;
}

@keyframes float-cloud {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(15px, -10px);
  }
  100% {
    transform: translate(0, 0);
  }
}

:deep(.cloud-item) {
  animation: float-cloud ease-in-out infinite;
}

:deep(.c-delay-1) {
  animation-duration: 6s;
  animation-delay: 0s;
}
:deep(.c-delay-2) {
  animation-duration: 8s;
  animation-delay: 1s;
}
:deep(.c-delay-3) {
  animation-duration: 7s;
  animation-delay: 2s;
}
:deep(.c-delay-4) {
  animation-duration: 9s;
  animation-delay: 0.5s;
}

@keyframes walk-right {
  0% {
    transform: translateX(-100px);
  }
  100% {
    transform: translateX(1100px);
  }
}

@keyframes walk-left {
  0% {
    transform: translateX(1100px) scaleX(-1);
  }
  100% {
    transform: translateX(-100px) scaleX(-1);
  }
}

@keyframes calf-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

:deep(.calf) {
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-fill-mode: both;
}

:deep(.calf-body) {
  animation: calf-bounce 0.6s ease-in-out infinite;
}

:deep(.calf-1) {
  animation-name: walk-right;
  animation-duration: 18s;
  animation-delay: 0s;
}
:deep(.calf-2) {
  animation-name: walk-left;
  animation-duration: 22s;
  animation-delay: 4s;
}
:deep(.calf-3) {
  animation-name: walk-right;
  animation-duration: 25s;
  animation-delay: 10s;
}
:deep(.calf-4) {
  animation-name: walk-left;
  animation-duration: 18s;
  animation-delay: 8s;
}
:deep(.calf-5) {
  animation-name: walk-right;
  animation-duration: 22s;
  animation-delay: 6s;
}
:deep(.calf-6) {
  animation-name: walk-left;
  animation-duration: 25s;
  animation-delay: 12s;
}
</style>
