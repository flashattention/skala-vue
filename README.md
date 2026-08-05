# skala-vue

A Vue 3 + Vite weather dashboard that fetches city weather data from OpenWeather and displays search, selection, and detail views.

## Features

- Vue 3 + Vite application
- Pinia state management for weather data and background state
- Vue Router for home, weather detail, and about pages
- Fetches weather for predefined cities using OpenWeather API
- Search filter and city selection with dynamic background styling
- Loading/error handling for API requests

## Project structure highlights

- `src/main.js` — app bootstrap
- `src/App.vue` — root layout and global loading state
- `src/router/index.js` — route definitions
- `src/stores/weatherStore.js` — weather API calls and data storage
- `src/stores/backgroundStore.js` — selected city background control
- `src/views/WeatherHomeView.vue` — search and city card dashboard
- `src/views/WeatherDetailView.vue` — detailed weather view per city
- `src/assets/cities.json` — predefined city metadata for API queries

## Environment variables

This project expects an OpenWeather API key in Vite env variables.

Create a `.env` file at the project root with:

```env
VITE_OPEN_WEATHER_API=your_api_key_here
```

## Quick start

```sh
npm install
npm run dev
```

Open the local URL shown in the terminal.

## Build & preview

```sh
npm run build
npm run preview
```

## Scripts

- `npm run dev` — start the Vite development server
- `npm run build` — build production assets
- `npm run preview` — locally preview the built app
- `npm run lint` — run lint scripts (`lint:oxlint` and `lint:eslint`)
- `npm run format` — format source files with Prettier

## Dependencies

- `vue`
- `pinia`
- `vue-router`
- `axios`
- `vue3-spinners`
- `dotenv`

## Development dependencies

- `vite`
- `eslint`
- `@eslint/js`
- `eslint-plugin-vue`
- `prettier`
- `oxlint`
- `npm-run-all2`
- `vite-plugin-vue-devtools`
- `vue-eslint-parser`

## Notes

- The weather data is loaded from OpenWeather by latitude/longitude values in `src/assets/cities.json`.
- Select a city card to update the background and open the detail page.
- If the API request fails, the app shows an error message.
