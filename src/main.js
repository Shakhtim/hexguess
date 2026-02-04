import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { initYandexSDK, gameReady, getYandexLanguage } from './yandexGames'

// Create and mount app
const app = createApp(App)
app.mount('#app')

// Initialize Yandex.Games SDK
initYandexSDK().then(() => {
  // Auto-detect language from Yandex SDK
  const yandexLang = getYandexLanguage()
  if (yandexLang && !localStorage.getItem('hexguess_language')) {
    localStorage.setItem('hexguess_yandex_lang', yandexLang)
    // Trigger re-render by dispatching a storage event
    window.dispatchEvent(new Event('yandex-language-detected'))
  }

  // Notify SDK that game is loaded and ready
  // We'll call gameReady() after a short delay to ensure everything is mounted
  setTimeout(() => {
    gameReady()
  }, 1000)
})
