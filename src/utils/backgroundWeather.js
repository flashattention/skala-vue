const setBg = (color) => {
  if (typeof document !== 'undefined') {
    document.body.style.backgroundColor = color
  }
}

const renderSun = () => {
  // Remove existing weather graphics if any
  const existingGraphic = document.getElementById('weather-graphic')
  if (existingGraphic) existingGraphic.remove()

  // Create wrapper
  const container = document.createElement('div')
  container.id = 'sun-graphic'

  // Insert Sun SVG with gradient & glowing rays
  container.innerHTML = `
    <svg viewBox="0 0 200 200" width="360" height="360">
      <defs>
        <!-- Radial Gradient for Glowing Body -->
        <radialGradient id="sun-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#FFF7AD" />
          <stop offset="40%" stop-color="#FFD200" />
          <stop offset="100%" stop-color="#FF9000" />
        </radialGradient>

        <!-- Soft Glow Filter -->
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Outer Rays -->
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

      <!-- Sun Body -->
      <circle cx="100" cy="100" r="55" fill="url(#sun-gradient)" filter="url(#glow)" />
    </svg>
  `

  // Position at top right
  Object.assign(container.style, {
    position: 'fixed',
    top: '-180px',
    right: '-180px',
    zIndex: '-1',
    pointerEvents: 'none',
    visibility: 'hidden',
  })

  document.body.appendChild(container)

  if (!document.getElementById('ground-graphic')) {
    const ground = document.createElement('div')
    ground.id = 'ground-graphic'
    ground.innerHTML = `
      <svg viewBox="0 0 1000 200" width="100vw" height="20vh" preserveAspectRatio="none">
        <defs>
          <linearGradient id="ground-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#7CB342" />
            <stop offset="100%" stop-color="#33691E" />
          </linearGradient>
        </defs>
        <path d="M -100 200 Q 500 20 1100 200 Z" fill="url(#ground-grad)" />
      </svg>
    `
    Object.assign(ground.style, {
      position: 'fixed',
      bottom: '0',
      left: '0',
      width: '100vw',
      height: '20vh',
      zIndex: '-1',
      pointerEvents: 'none',
      overflow: 'hidden',
    })
    document.body.appendChild(ground)
  }
}

const renderRain = () => {
  const existingGraphic = document.getElementById('weather-graphic')
  if (existingGraphic) existingGraphic.remove()

  const container = document.createElement('div')
  container.id = 'rain-graphic'

  const dropCount = 120
  let dropsHTML = ''

  for (let i = 0; i < dropCount; i++) {
    const x = Math.floor(Math.random() * (window.innerWidth + 300))
    const y = Math.floor(Math.random() * (window.innerHeight + 300)) - 300
    const delayClass = `rd-${(i % 6) + 1}`
    dropsHTML += `<line class="raindrop ${delayClass}" x1="${x}" y1="${y}" x2="${x - 3}" y2="${y + 8}" />`
  }

  container.innerHTML = `
    <svg viewBox="0 0 1000 1000" width="100vw" height="100vh" preserveAspectRatio="none">
      <defs>
        <linearGradient id="drop-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#81D4FA" stop-opacity="0.8" />
          <stop offset="100%" stop-color="#0288D1" stop-opacity="0.3" />
        </linearGradient>
      </defs>

      <!-- Smaller, thinner raindrops -->
      <g stroke="url(#drop-grad)" stroke-width="5" stroke-linecap="round">
        ${dropsHTML}
      </g>
    </svg>
  `

  // Position container full screen
  Object.assign(container.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '999',
    pointerEvents: 'none',
    overflow: 'hidden',
    visibility: 'hidden',
  })

  document.body.appendChild(container)
}

const renderCloud = () => {
  if (document.getElementById('cloud-graphic')) return

  const container = document.createElement('div')
  container.id = 'cloud-graphic'

  // 10 fixed, well-balanced positions (% of screen width & height)
  const cloudConfigs = [
    { xPct: -0.05, yPct: 0.05, scale: 1.8, opacity: 0.85 }, // Top Left edge
    { xPct: 0.18, yPct: 0.22, scale: 1.3, opacity: 0.75 }, // Upper Left
    { xPct: 0.38, yPct: 0.08, scale: 2.0, opacity: 0.9 }, // Top Center
    { xPct: 0.6, yPct: 0.25, scale: 1.4, opacity: 0.8 }, // Upper Mid-Right
    { xPct: 0.82, yPct: 0.06, scale: 1.9, opacity: 0.85 }, // Top Right edge
    { xPct: 0.05, yPct: 0.45, scale: 1.5, opacity: 0.8 }, // Mid-Left
    { xPct: 0.28, yPct: 0.52, scale: 1.2, opacity: 0.7 }, // Mid-Center
    { xPct: 0.52, yPct: 0.48, scale: 1.7, opacity: 0.85 }, // Mid-Right
    { xPct: 0.75, yPct: 0.4, scale: 1.3, opacity: 0.75 }, // Right Center
    { xPct: 0.9, yPct: 0.58, scale: 1.6, opacity: 0.8 }, // Far Right Lower
  ]

  let cloudsHTML = ''

  cloudConfigs.forEach((config, i) => {
    // Calculate exact pixel values based on current window size
    const x = Math.floor(window.innerWidth * config.xPct)
    const y = Math.floor(window.innerHeight * config.yPct)
    const delayClass = `c-delay-${(i % 4) + 1}`

    cloudsHTML += `
  <g transform="translate(${x}, ${y}) scale(${config.scale})" opacity="${config.opacity}">
    <g class="cloud-item ${delayClass}">
      <path d="M 40 100
               A 28 28 0 0 1 65 55
               A 38 38 0 0 1 135 50
               A 30 30 0 0 1 165 90
               A 22 22 0 0 1 155 115
               A 15 15 0 0 1 140 120
               L 45 120
               A 20 20 0 0 1 40 100 Z"
            fill="url(#cloud-grad)"
            filter="url(#cloud-shadow)" />
    </g>
  </g>
`
  })

  container.innerHTML = `
    <svg viewBox="0 0 1000 1000" width="100vw" height="100vh" preserveAspectRatio="none">
      <defs>
        <!-- Soft Grey Cloud Gradient -->
        <linearGradient id="cloud-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="70%" stop-color="#ECEFF1" />
          <stop offset="100%" stop-color="#CFD8DC" />
        </linearGradient>

        <!-- Soft Shadow Filter -->
        <filter id="cloud-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="5" flood-color="#000000" flood-opacity="0.12" />
        </filter>
      </defs>

      ${cloudsHTML}
    </svg>
  `

  // Position container full screen
  Object.assign(container.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100vw',
    height: '100vh',
    zIndex: '-1',
    pointerEvents: 'none',
    overflow: 'hidden',
    visibility: 'hidden',
  })

  document.body.appendChild(container)
}

const initialize = () => {
  renderSun()
  renderRain()
  renderCloud()
}

const setVisibility = (id, visibility) => {
  if (document.getElementById(id)) {
    const container = document.getElementById(id)
    container.style.visibility = visibility
  }
}

const showGrahpics = (ids) => {
  ;['sun-graphic', 'rain-graphic', 'cloud-graphic'].map((id) => {
    if (ids.indexOf(id) == -1) {
      setVisibility(id, 'hidden')
    } else {
      setVisibility(id, 'visible')
    }
  })
}

const sunny = () => {
  showGrahpics(['sun-graphic'])
  setBg('skyblue')
}
const rainy = () => {
  showGrahpics(['rain-graphic', 'cloud-graphic'])
  setBg('grey')
}
const cloudy = () => {
  showGrahpics(['cloud-graphic'])
  setBg('lightgrey')
}

export default {
  initialize,
  sunny,
  rainy,
  cloudy,
}
