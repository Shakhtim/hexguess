import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { initYandexSDK, gameReady } from './yandexGames'

// Create and mount app
const app = createApp(App)
app.mount('#app')

// Initialize Yandex.Games SDK
initYandexSDK().then(() => {
  // Notify SDK that game is loaded and ready
  // We'll call gameReady() after a short delay to ensure everything is mounted
  setTimeout(() => {
    gameReady()
  }, 1000)
})
