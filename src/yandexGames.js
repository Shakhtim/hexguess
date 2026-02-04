// Yandex Games SDK integration
let ysdk = null
let isYandexGames = false

// Initialize SDK
export async function initYandexSDK() {
  if (typeof YaGames === 'undefined') {
    console.log('YaGames SDK not available - running outside Yandex.Games')
    return null
  }

  try {
    ysdk = await YaGames.init()
    isYandexGames = true
    console.log('Yandex.Games SDK initialized')
    return ysdk
  } catch (error) {
    console.error('Failed to initialize Yandex.Games SDK:', error)
    return null
  }
}

// Get language from Yandex SDK
export function getYandexLanguage() {
  if (ysdk && ysdk.environment) {
    const lang = ysdk.environment.i18n.lang
    // Map Yandex language codes to our supported languages
    if (lang === 'ru') return 'ru'
    if (lang === 'en') return 'en'
    if (lang === 'tr') return 'en' // Turkish -> English fallback
    return 'en' // Default to English for other languages
  }
  return null
}

// Notify that game is ready to play
export function gameReady() {
  if (ysdk?.features?.LoadingAPI) {
    ysdk.features.LoadingAPI.ready()
    console.log('Game ready notification sent to Yandex.Games')
  }
}

// Show fullscreen ad (межэкранная реклама)
export async function showFullscreenAd() {
  if (!ysdk?.adv) {
    console.log('Yandex.Games ads not available')
    return { shown: false }
  }

  return new Promise((resolve) => {
    ysdk.adv.showFullscreenAdv({
      callbacks: {
        onClose: (wasShown) => {
          console.log('Fullscreen ad closed, was shown:', wasShown)
          resolve({ shown: wasShown, closed: true })
        },
        onError: (error) => {
          console.error('Error showing fullscreen ad:', error)
          resolve({ shown: false, error })
        }
      }
    })
  })
}

// Show rewarded ad (реклама за вознаграждение)
export async function showRewardedAd() {
  if (!ysdk?.adv) {
    console.log('Yandex.Games ads not available')
    return { rewarded: false }
  }

  return new Promise((resolve) => {
    ysdk.adv.showRewardedVideo({
      callbacks: {
        onRewarded: () => {
          console.log('Rewarded ad completed')
          resolve({ rewarded: true })
        },
        onClose: () => {
          console.log('Rewarded ad closed without reward')
          resolve({ rewarded: false, closed: true })
        },
        onError: (error) => {
          console.error('Error showing rewarded ad:', error)
          resolve({ rewarded: false, error })
        }
      }
    })
  })
}

// Get player data
export async function getPlayer() {
  if (!ysdk) {
    return null
  }

  try {
    const player = await ysdk.getPlayer({ signed: true })
    return player
  } catch (error) {
    console.error('Error getting player:', error)
    return null
  }
}

// Save player data
export async function savePlayerData(data) {
  if (!ysdk) {
    console.log('Cannot save - SDK not initialized')
    return false
  }

  try {
    const player = await getPlayer()
    if (player) {
      await player.setData(data, true)
      console.log('Player data saved')
      return true
    }
  } catch (error) {
    console.error('Error saving player data:', error)
  }
  return false
}

// Load player data
export async function loadPlayerData() {
  if (!ysdk) {
    console.log('Cannot load - SDK not initialized')
    return null
  }

  try {
    const player = await getPlayer()
    if (player) {
      const data = await player.getData()
      console.log('Player data loaded')
      return data
    }
  } catch (error) {
    console.error('Error loading player data:', error)
  }
  return null
}

// Submit score to leaderboard
export async function submitScore(leaderboardName, score) {
  if (!ysdk?.getLeaderboards) {
    console.log('Leaderboards not available')
    return false
  }

  try {
    const lb = await ysdk.getLeaderboards()
    await lb.setLeaderboardScore(leaderboardName, score)
    console.log('Score submitted to leaderboard:', leaderboardName, score)
    return true
  } catch (error) {
    console.error('Error submitting score:', error)
    return false
  }
}

// Get leaderboard entries
export async function getLeaderboard(leaderboardName, options = {}) {
  if (!ysdk?.getLeaderboards) {
    console.log('Leaderboards not available')
    return null
  }

  try {
    const lb = await ysdk.getLeaderboards()
    const entries = await lb.getLeaderboardEntries(leaderboardName, options)
    return entries
  } catch (error) {
    console.error('Error getting leaderboard:', error)
    return null
  }
}

// Check if running in Yandex.Games
export function isRunningInYandexGames() {
  return isYandexGames
}

// Get SDK instance
export function getSDK() {
  return ysdk
}
