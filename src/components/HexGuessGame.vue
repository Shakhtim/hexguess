<template>
  <div class="game-container">
    <!-- Main Menu -->
    <div class="main-menu pixel-border" v-if="gameState === 'menu' && menuScreen === 'main'">
      <h1 class="game-title glitch-text">COLOR<span class="accent">GUESS</span></h1>

      <!-- Language switcher in menu -->
      <div class="language-switcher-menu">
        <button
          class="lang-btn-menu"
          :class="{ active: currentLanguage === 'ru' }"
          @click="switchLanguage('ru')"
        >
          RU
        </button>
        <button
          class="lang-btn-menu"
          :class="{ active: currentLanguage === 'en' }"
          @click="switchLanguage('en')"
        >
          EN
        </button>
      </div>

      <div class="menu-buttons">
        <button class="pixel-button menu-btn" @click="goToModeSelect">{{ t('startGame', currentLanguage) }}</button>
        <button class="pixel-button menu-btn secondary" @click="showRules">{{ t('rules', currentLanguage) }}</button>
        <button class="pixel-button menu-btn secondary" @click="showPrivacy">{{ t('privacy', currentLanguage) }}</button>
      </div>
    </div>

    <!-- Rules Screen -->
    <div class="rules-screen pixel-border" v-if="gameState === 'menu' && menuScreen === 'rules'">
      <h2 class="screen-title">{{ t('rulesTitle', currentLanguage) }}</h2>

      <div class="rules-content">
        <div class="rule-section">
          <h3>{{ t('howToPlay', currentLanguage) }}</h3>
          <p>{{ t('howToPlayText', currentLanguage) }}</p>
        </div>

        <div class="rule-section">
          <h3>{{ t('accuracyCalc', currentLanguage) }}</h3>
          <p>{{ t('accuracyText', currentLanguage) }}</p>
          <p class="formula">d = √((r₂-r₁)² + (g₂-g₁)² + (b₂-b₁)²)</p>
          <p>{{ t('accuracyFormula', currentLanguage) }}</p>
        </div>

        <div class="rule-section">
          <h3>{{ t('gameModes', currentLanguage) }}</h3>

          <div class="mode-detail">
            <strong class="mode-detail-name">{{ t('modeDetails.easy.name', currentLanguage) }}</strong>
            <p>{{ t('modeDetails.easy.desc', currentLanguage) }}</p>
            <p class="mode-meta">{{ t('modeDetails.easy.meta', currentLanguage) }}</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">{{ t('modeDetails.normal.name', currentLanguage) }}</strong>
            <p>{{ t('modeDetails.normal.desc', currentLanguage) }}</p>
            <p class="mode-meta">{{ t('modeDetails.normal.meta', currentLanguage) }}</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">{{ t('modeDetails.hard.name', currentLanguage) }}</strong>
            <p>{{ t('modeDetails.hard.desc', currentLanguage) }}</p>
            <p class="mode-meta">{{ t('modeDetails.hard.meta', currentLanguage) }}</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">{{ t('modeDetails.daily.name', currentLanguage) }}</strong>
            <p>{{ t('modeDetails.daily.desc', currentLanguage) }}</p>
            <p class="mode-meta">{{ t('modeDetails.daily.meta', currentLanguage) }}</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">{{ t('modeDetails.blitz.name', currentLanguage) }}</strong>
            <p>{{ t('modeDetails.blitz.desc', currentLanguage) }}</p>
            <p class="mode-meta">{{ t('modeDetails.blitz.meta', currentLanguage) }}</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">{{ t('modeDetails.gradient.name', currentLanguage) }}</strong>
            <p>{{ t('modeDetails.gradient.desc', currentLanguage) }}</p>
            <p class="mode-meta">{{ t('modeDetails.gradient.meta', currentLanguage) }}</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">{{ t('modeDetails.blind.name', currentLanguage) }}</strong>
            <p>{{ t('modeDetails.blind.desc', currentLanguage) }}</p>
            <p class="mode-meta">{{ t('modeDetails.blind.meta', currentLanguage) }}</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">{{ t('modeDetails.illusion.name', currentLanguage) }}</strong>
            <p>{{ t('modeDetails.illusion.desc', currentLanguage) }}</p>
            <p class="mode-meta">{{ t('modeDetails.illusion.meta', currentLanguage) }}</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">{{ t('modeDetails.lynx.name', currentLanguage) }}</strong>
            <p>{{ t('modeDetails.lynx.desc', currentLanguage) }}</p>
            <p class="mode-meta">{{ t('modeDetails.lynx.meta', currentLanguage) }}</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">{{ t('modeDetails.complement.name', currentLanguage) }}</strong>
            <p>{{ t('modeDetails.complement.desc', currentLanguage) }}</p>
            <p class="mode-meta">{{ t('modeDetails.complement.meta', currentLanguage) }}</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">{{ t('modeDetails.streak.name', currentLanguage) }}</strong>
            <p>{{ t('modeDetails.streak.desc', currentLanguage) }}</p>
            <p class="mode-meta">{{ t('modeDetails.streak.meta', currentLanguage) }}</p>
          </div>
        </div>
      </div>

      <button class="pixel-button" @click="backToMainMenu">{{ t('backToMenu', currentLanguage) }}</button>
    </div>

    <!-- Privacy Policy Screen -->
    <div class="privacy-screen pixel-border" v-if="gameState === 'menu' && menuScreen === 'privacy'">
      <h2 class="screen-title">{{ t('privacyTitle', currentLanguage) }}</h2>

      <div class="privacy-content">
        <p>{{ t('privacyText', currentLanguage) }}</p>
      </div>

      <button class="pixel-button" @click="backToMainMenu">{{ t('backToMenu', currentLanguage) }}</button>
    </div>

    <!-- Mode selector -->
    <div class="mode-selector pixel-border" v-if="gameState === 'modeSelect'">
      <h1 class="game-title glitch-text clickable" @click="backToMenu">COLOR<span class="accent">GUESS</span></h1>
      <h2 class="mode-title">{{ t('selectMode', currentLanguage) }}</h2>

      <div class="modes">
        <button class="mode-button pixel-border easy" @click="selectMode('easy')">
          <div class="mode-name">{{ t('modes.easy', currentLanguage) }}</div>
          <div class="mode-desc">{{ t('modeDescriptions.easy', currentLanguage) }}</div>
        </button>

        <button class="mode-button pixel-border normal" @click="selectMode('normal')">
          <div class="mode-name">{{ t('modes.normal', currentLanguage) }}</div>
          <div class="mode-desc">{{ t('modeDescriptions.normal', currentLanguage) }}</div>
        </button>

        <button class="mode-button pixel-border hard" @click="selectMode('hard')">
          <div class="mode-name">{{ t('modes.hard', currentLanguage) }}</div>
          <div class="mode-desc">{{ t('modeDescriptions.hard', currentLanguage) }}</div>
        </button>

        <button class="mode-button pixel-border daily" @click="selectMode('daily')">
          <div class="mode-name">{{ t('modes.daily', currentLanguage) }}</div>
          <div class="mode-desc">{{ t('modeDescriptions.daily', currentLanguage) }}</div>
        </button>

        <button class="mode-button pixel-border blitz" @click="selectMode('blitz')">
          <div class="mode-name">{{ t('modes.blitz', currentLanguage) }}</div>
          <div class="mode-desc">{{ t('modeDescriptions.blitz', currentLanguage) }}</div>
        </button>

        <button class="mode-button pixel-border gradient" @click="selectMode('gradient')">
          <div class="mode-name">{{ t('modes.gradient', currentLanguage) }}</div>
          <div class="mode-desc">{{ t('modeDescriptions.gradient', currentLanguage) }}</div>
        </button>

        <button class="mode-button pixel-border blind" @click="selectMode('blind')">
          <div class="mode-name">{{ t('modes.blind', currentLanguage) }}</div>
          <div class="mode-desc">{{ t('modeDescriptions.blind', currentLanguage) }}</div>
        </button>

        <button class="mode-button pixel-border illusion" @click="selectMode('illusion')">
          <div class="mode-name">{{ t('modes.illusion', currentLanguage) }}</div>
          <div class="mode-desc">{{ t('modeDescriptions.illusion', currentLanguage) }}</div>
        </button>

        <button class="mode-button pixel-border lynx" @click="selectMode('lynx')">
          <div class="mode-name">{{ t('modes.lynx', currentLanguage) }}</div>
          <div class="mode-desc">{{ t('modeDescriptions.lynx', currentLanguage) }}</div>
        </button>

        <button class="mode-button pixel-border complementary" @click="selectMode('complementary')">
          <div class="mode-name">{{ t('modes.complement', currentLanguage) }}</div>
          <div class="mode-desc">{{ t('modeDescriptions.complement', currentLanguage) }}</div>
        </button>

        <button class="mode-button pixel-border streak" @click="selectMode('streak')">
          <div class="mode-name">{{ t('modes.streak', currentLanguage) }}</div>
          <div class="mode-desc">{{ t('modeDescriptions.streak', currentLanguage) }}</div>
        </button>
      </div>
    </div>

    <!-- Game screen -->
    <div v-if="gameState === 'playing' || gameState === 'result' || gameState === 'finished'" class="game-screen">
      <!-- Header -->
      <header class="game-header">
        <div class="title-row">
          <h1 class="game-title clickable" @click="backToMenu">COLOR<span class="accent">GUESS</span></h1>
          <button class="mode-badge pixel-border" @click="backToModeSelect" :class="gameMode">
            {{ modeName }}
          </button>
        </div>
        <div class="stats">
          <div class="stat-item" v-if="gameMode !== 'blitz'">
            <span class="stat-label">{{ t('round', currentLanguage) }}</span>
            <span class="stat-value">{{ currentRound }}/{{ maxRounds }}</span>
          </div>
          <div class="stat-item" v-if="gameMode === 'blitz'">
            <span class="stat-label">{{ t('timeLeft', currentLanguage) }}</span>
            <span class="stat-value" :class="{ 'time-warning': timeLeft <= 10 }">{{ timeLeft }}с</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">{{ t('score', currentLanguage) }}</span>
            <span class="stat-value">{{ totalScore }}</span>
          </div>
        </div>
      </header>

      <!-- Main game area -->
      <div class="game-board" v-if="gameState !== 'finished'">
        <div class="game-layout">
          <!-- Target color -->
          <div class="target-section">
            <h3 class="section-label" v-if="gameMode === 'gradient'">{{ t('findMiddleColor', currentLanguage) }}</h3>
            <h3 class="section-label" v-else-if="gameMode === 'complementary'">{{ t('findOpposite', currentLanguage) }}</h3>
            <h3 class="section-label" v-else>{{ t('targetColor', currentLanguage) }}</h3>

            <!-- Regular modes -->
            <div v-if="gameMode !== 'gradient' && gameMode !== 'illusion' && gameMode !== 'complementary'" class="color-preview pixel-border" :style="{ backgroundColor: targetColor }"></div>

            <!-- Gradient mode -->
            <div v-if="gameMode === 'gradient'" class="gradient-preview">
              <div class="gradient-color pixel-border" :style="{ backgroundColor: gradientColor1 }"></div>
              <div class="gradient-arrow">→</div>
              <div class="gradient-color pixel-border" :style="{ backgroundColor: gradientColor2 }"></div>
            </div>

            <!-- Illusion mode -->
            <div v-if="gameMode === 'illusion'" class="illusion-preview pixel-border" :style="{ backgroundColor: illusionBackground }">
              <div class="illusion-color" :style="{ backgroundColor: targetColor }"></div>
            </div>

            <!-- Complementary mode -->
            <div v-if="gameMode === 'complementary'" class="complementary-preview">
              <div class="complementary-ref pixel-border" :style="{ backgroundColor: complementaryRef }"></div>
              <div class="complementary-arrow">↔</div>
              <div class="complementary-target pixel-border" :style="{ backgroundColor: gameState === 'result' ? targetColor : '#000000' }"></div>
            </div>

            <div class="hex-code" v-if="gameState === 'result'">{{ targetColor.toUpperCase() }}</div>
            <div class="blind-hint" v-if="gameMode === 'blind' && gameState === 'playing'">
              {{ t('hiddenChannel', currentLanguage) }}: <span class="blind-channel">{{ blindChannel.toUpperCase() }}</span>
            </div>
            <div class="lynx-info" v-if="gameMode === 'lynx' && gameState === 'playing'">
              {{ t('attemptsLeft', currentLanguage) }}: <span class="lynx-attempts">{{ lynxAttemptsLeft }}/3</span>
            </div>
            <div class="streak-info" v-if="gameMode === 'streak' && gameState === 'playing'">
              {{ t('tolerance', currentLanguage) }}: <span class="streak-tolerance">≥{{ streakTolerance }}%</span>
            </div>
          </div>

          <!-- Guess color -->
          <div class="guess-section">
            <h3 class="section-label">{{ t('yourGuess', currentLanguage) }}</h3>
            <div class="color-preview pixel-border" :style="{ backgroundColor: guessColor }"></div>
            <div class="hex-code">{{ guessColor.toUpperCase() }}</div>

            <!-- Color picker -->
            <div class="picker-tabs" v-if="gameState === 'playing'">
              <button
                class="tab-btn"
                :class="{ active: pickerMode === 'rgb' }"
                @click="pickerMode = 'rgb'"
              >
                {{ t('rgbTab', currentLanguage) }}
              </button>
              <button
                class="tab-btn"
                :class="{ active: pickerMode === 'picker' }"
                @click="pickerMode = 'picker'"
              >
                {{ t('paletteTab', currentLanguage) }}
              </button>
            </div>

            <!-- RGB Sliders -->
            <div class="sliders" v-if="gameState === 'playing' && pickerMode === 'rgb'">
              <div class="slider-group">
                <label class="slider-label">
                  <span class="color-name red">R</span>
                  <span class="color-value">{{ guessRGB.r }}</span>
                </label>
                <input type="range" min="0" max="255" v-model.number="guessRGB.r" class="slider red-slider" />
              </div>

              <div class="slider-group">
                <label class="slider-label">
                  <span class="color-name green">G</span>
                  <span class="color-value">{{ guessRGB.g }}</span>
                </label>
                <input type="range" min="0" max="255" v-model.number="guessRGB.g" class="slider green-slider" />
              </div>

              <div class="slider-group">
                <label class="slider-label">
                  <span class="color-name blue">B</span>
                  <span class="color-value">{{ guessRGB.b }}</span>
                </label>
                <input type="range" min="0" max="255" v-model.number="guessRGB.b" class="slider blue-slider" />
              </div>
            </div>

            <!-- Color Picker Canvas -->
            <div class="picker-container" v-if="gameState === 'playing' && pickerMode === 'picker'">
              <ColorPicker v-model="guessRGB" />
            </div>

            <!-- Lynx mode hints -->
            <div class="lynx-hints pixel-border" v-if="gameMode === 'lynx' && lynxHints.length > 0 && gameState === 'playing'">
              <div class="hint-title">{{ t('hintsTitle', currentLanguage) }}</div>
              <div class="hint-item" v-for="(hint, index) in lynxHints" :key="index">
                {{ index + 1 }}. {{ translateHint(hint) }}
              </div>
            </div>

            <!-- Result display -->
            <div class="result-info pixel-border" v-if="gameState === 'result'">
              <div class="result-row">
                <span class="label">{{ t('accuracy', currentLanguage) }}:</span>
                <span class="value accuracy" :class="accuracyClass">{{ lastAccuracy }}%</span>
              </div>
              <div class="result-row">
                <span class="label">{{ t('score', currentLanguage) }}:</span>
                <span class="value points">+{{ lastScore }}</span>
              </div>
              <div class="result-msg" :class="accuracyClass">{{ resultMessage }}</div>
            </div>

            <!-- Action button -->
            <button
              class="pixel-button action-btn"
              v-if="gameState === 'playing'"
              @click="submitGuess"
              :disabled="isSubmitting || (gameMode === 'lynx' && lynxAttemptsLeft <= 0)"
            >
              {{ t('submit', currentLanguage) }}
            </button>
            <button
              class="pixel-button action-btn"
              v-if="gameState === 'result' && currentRound < maxRounds"
              @click="nextRound"
            >
              {{ t('next', currentLanguage) }}
            </button>
            <button
              class="pixel-button action-btn"
              v-if="gameState === 'result' && currentRound >= maxRounds"
              @click="finishGame"
            >
              {{ t('results', currentLanguage) }}
            </button>
          </div>
        </div>
      </div>

      <!-- Final score -->
      <div class="final-score pixel-border" v-if="gameState === 'finished'">
        <h2 class="final-title glitch-text">{{ t('gameOver', currentLanguage) }}</h2>
        <div class="final-stats">
          <div class="final-stat">
            <span class="final-label">{{ t('finalScore', currentLanguage) }}</span>
            <span class="final-value">{{ totalScore }}</span>
          </div>
          <div class="final-stat">
            <span class="final-label">{{ t('avgAccuracy', currentLanguage) }}</span>
            <span class="final-value">{{ averageAccuracy }}%</span>
          </div>
        </div>
        <div class="final-buttons">
          <button class="pixel-button" @click="backToModeSelect">{{ t('playAgain', currentLanguage) }}</button>
          <button class="pixel-button secondary" @click="backToMenu">{{ t('backToMenu', currentLanguage) }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import chroma from 'chroma-js'
import ColorPicker from './ColorPicker.vue'
import { showFullscreenAd, savePlayerData, loadPlayerData, isRunningInYandexGames } from '../yandexGames'
import { t, getLanguage, setLanguage } from '../i18n'

// Game state
const menuScreen = ref('main') // 'main', 'rules', 'privacy'
const gameState = ref('menu') // 'menu', 'modeSelect', 'playing', 'result', 'finished'
const gameMode = ref('normal') // 'easy', 'normal', 'hard', 'daily', 'blitz', 'gradient', 'blind', 'illusion', 'lynx', 'complementary', 'streak'
const currentRound = ref(1)
const maxRounds = ref(5)
const totalScore = ref(0)
const pickerMode = ref('rgb') // 'rgb' or 'picker'
const isSubmitting = ref(false) // Prevent multiple simultaneous submissions
const currentLanguage = ref(getLanguage()) // Current UI language

// Listen for Yandex language auto-detection
onMounted(() => {
  window.addEventListener('yandex-language-detected', () => {
    currentLanguage.value = getLanguage()
  })
})

// Blitz mode
const timeLeft = ref(60)
const timerInterval = ref(null)

// Gradient mode
const gradientColor1 = ref('#000000')
const gradientColor2 = ref('#ffffff')

// Blind mode
const blindChannel = ref('r') // 'r', 'g', or 'b'

// Illusion mode
const illusionBackground = ref('#ffffff')

// Lynx Eye mode
const lynxAttemptsLeft = ref(3)
const lynxHints = ref([])

// Complementary mode (stores the reference color)
const complementaryRef = ref('#000000')

// Streak mode
const streakTolerance = ref(10) // Starting tolerance percentage

// Colors
const targetColor = ref('#000000')
const guessRGB = ref({ r: 128, g: 128, b: 128 })

// Results
const lastDistance = ref(0)
const lastAccuracy = ref(0)
const lastScore = ref(0)
const scoreHistory = ref([])

// Computed
const guessColor = computed(() => {
  return chroma(guessRGB.value.r, guessRGB.value.g, guessRGB.value.b).hex()
})

const modeName = computed(() => {
  const modeKey = gameMode.value === 'complementary' ? 'complement' : gameMode.value
  return t(`modes.${modeKey}`, currentLanguage.value)
})

const averageAccuracy = computed(() => {
  if (scoreHistory.value.length === 0) return 0
  const sum = scoreHistory.value.reduce((acc, score) => acc + score.accuracy, 0)
  return Math.round(sum / scoreHistory.value.length)
})

const accuracyClass = computed(() => {
  if (lastAccuracy.value >= 90) return 'perfect'
  if (lastAccuracy.value >= 75) return 'great'
  if (lastAccuracy.value >= 50) return 'good'
  return 'poor'
})

const resultMessage = computed(() => {
  if (lastAccuracy.value >= 95) return '🎯 ИДЕАЛЬНО!'
  if (lastAccuracy.value >= 90) return '⭐ ОТЛИЧНО!'
  if (lastAccuracy.value >= 75) return '✨ ХОРОШО!'
  if (lastAccuracy.value >= 50) return '👍 НЕПЛОХО!'
  if (lastAccuracy.value >= 25) return '🤔 ЕЩЕ РАЗ!'
  return '😅 ПОПЫТКА ЗАСЧИТАНА!'
})

// Functions
function generateRandomColor() {
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  return chroma(r, g, b).hex()
}

function generateDailyColor() {
  // Generate color based on current date (consistent for everyone on same day)
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()

  // Simple seeded random function
  const seededRandom = (seed) => {
    const x = Math.sin(seed) * 10000
    return x - Math.floor(x)
  }

  const r = Math.floor(seededRandom(seed) * 256)
  const g = Math.floor(seededRandom(seed + 1) * 256)
  const b = Math.floor(seededRandom(seed + 2) * 256)

  return chroma(r, g, b).hex()
}

function generateHardColor() {
  // Generate colors with similar variations for hard mode
  const base = Math.random() * 256
  const r = Math.floor(base + (Math.random() - 0.5) * 50)
  const g = Math.floor(base + (Math.random() - 0.5) * 50)
  const b = Math.floor(base + (Math.random() - 0.5) * 50)

  return chroma(
    Math.max(0, Math.min(255, r)),
    Math.max(0, Math.min(255, g)),
    Math.max(0, Math.min(255, b))
  ).hex()
}

function calculateColorDistance(color1, color2, mode) {
  const rgb1 = chroma(color1).rgb()
  const rgb2 = chroma(color2).rgb()

  if (mode === 'easy') {
    // For easy mode, only compare Hue (ignore saturation and brightness differences)
    const hsl1 = chroma(color1).hsl()
    const hsl2 = chroma(color2).hsl()

    // Hue distance (0-360 degrees, circular)
    let hueDiff = Math.abs(hsl1[0] - hsl2[0])
    if (hueDiff > 180) hueDiff = 360 - hueDiff

    // Normalize to 0-441 range to match RGB distance scale
    return (hueDiff / 180) * 441
  } else {
    // Normal and hard modes use RGB Euclidean distance
    const distance = Math.sqrt(
      Math.pow(rgb2[0] - rgb1[0], 2) +
      Math.pow(rgb2[1] - rgb1[1], 2) +
      Math.pow(rgb2[2] - rgb1[2], 2)
    )
    return distance
  }
}

function calculateAccuracy(distance) {
  const maxDistance = 441.67
  const accuracy = Math.max(0, 100 - (distance / maxDistance * 100))
  return Math.round(accuracy)
}

function calculateScore(accuracy, mode) {
  let baseScore = Math.round(accuracy * 10)

  // Multiplier based on difficulty
  if (mode === 'hard') {
    baseScore = Math.round(baseScore * 1.5) // 50% bonus for hard mode
  } else if (mode === 'daily') {
    baseScore = Math.round(baseScore * 1.3) // 30% bonus for daily challenge
  }

  return baseScore
}

function selectMode(mode) {
  gameMode.value = mode
  currentRound.value = 1
  totalScore.value = 0
  scoreHistory.value = []
  isSubmitting.value = false // Reset submission lock

  // Blitz mode setup
  if (mode === 'blitz') {
    timeLeft.value = 60
    maxRounds.value = 999 // Unlimited rounds
    startBlitzTimer()
  } else if (mode === 'streak') {
    maxRounds.value = 999 // Unlimited until fail
  } else {
    maxRounds.value = 5
    if (timerInterval.value) {
      clearInterval(timerInterval.value)
      timerInterval.value = null
    }
  }

  // Generate initial color based on mode
  if (mode === 'gradient') {
    generateGradientColors()
  } else if (mode === 'blind') {
    generateBlindMode()
  } else if (mode === 'illusion') {
    generateIllusionMode()
  } else if (mode === 'lynx') {
    generateLynxMode()
  } else if (mode === 'complementary') {
    generateComplementaryMode()
  } else if (mode === 'streak') {
    generateStreakMode()
  } else if (mode === 'daily') {
    targetColor.value = generateDailyColor()
  } else if (mode === 'hard') {
    targetColor.value = generateHardColor()
  } else {
    targetColor.value = generateRandomColor()
  }

  guessRGB.value = { r: 128, g: 128, b: 128 }
  gameState.value = 'playing'
}

function startBlitzTimer() {
  if (timerInterval.value) clearInterval(timerInterval.value)

  timerInterval.value = setInterval(() => {
    timeLeft.value--
    if (timeLeft.value <= 0) {
      clearInterval(timerInterval.value)
      timerInterval.value = null
      gameState.value = 'finished'
    }
  }, 1000)
}

function generateGradientColors() {
  gradientColor1.value = generateRandomColor()
  gradientColor2.value = generateRandomColor()

  // Calculate middle color
  const rgb1 = chroma(gradientColor1.value).rgb()
  const rgb2 = chroma(gradientColor2.value).rgb()

  const midR = Math.round((rgb1[0] + rgb2[0]) / 2)
  const midG = Math.round((rgb1[1] + rgb2[1]) / 2)
  const midB = Math.round((rgb1[2] + rgb2[2]) / 2)

  targetColor.value = chroma(midR, midG, midB).hex()
}

function generateBlindMode() {
  targetColor.value = generateRandomColor()

  // Pick random channel to hide
  const channels = ['r', 'g', 'b']
  blindChannel.value = channels[Math.floor(Math.random() * 3)]

  // Set the guessed RGB to match the target except for blind channel
  const targetRgb = chroma(targetColor.value).rgb()
  guessRGB.value = {
    r: blindChannel.value === 'r' ? 128 : targetRgb[0],
    g: blindChannel.value === 'g' ? 128 : targetRgb[1],
    b: blindChannel.value === 'b' ? 128 : targetRgb[2]
  }
}

function generateIllusionMode() {
  // Generate target color
  targetColor.value = generateRandomColor()

  // Create a random background that creates optical illusion
  const bgR = Math.floor(Math.random() * 256)
  const bgG = Math.floor(Math.random() * 256)
  const bgB = Math.floor(Math.random() * 256)
  illusionBackground.value = chroma(bgR, bgG, bgB).hex()
}

function generateComplementaryMode() {
  // Generate a reference color
  complementaryRef.value = generateRandomColor()

  // Calculate complementary color (opposite on color wheel)
  const hsl = chroma(complementaryRef.value).hsl()
  const compHue = (hsl[0] + 180) % 360
  targetColor.value = chroma.hsl(compHue, hsl[1], hsl[2]).hex()
}

function generateLynxMode() {
  targetColor.value = generateRandomColor()
  lynxAttemptsLeft.value = 3
  lynxHints.value = []
}

function generateStreakMode() {
  targetColor.value = generateRandomColor()
  // Tolerance starts at 50% and increases by 5% every 3 rounds (max 95%)
  const roundsCompleted = scoreHistory.value.length
  streakTolerance.value = Math.min(95, 50 + Math.floor(roundsCompleted / 3) * 5)
}

function submitGuess() {
  // Prevent multiple simultaneous submissions
  if (isSubmitting.value) {
    return
  }

  const distance = calculateColorDistance(targetColor.value, guessColor.value, gameMode.value)
  const accuracy = calculateAccuracy(distance)

  // Lynx mode: check attempts and give hints
  if (gameMode.value === 'lynx') {
    // Check if we have attempts left BEFORE any action
    if (lynxAttemptsLeft.value <= 0) {
      // No attempts left - ignore additional clicks
      return
    }

    // Check if we're in result state (shouldn't happen but extra safety)
    if (gameState.value === 'result') {
      return
    }

    // Lock to prevent multiple clicks
    isSubmitting.value = true

    if (accuracy >= 90) {
      // Success! Give full score
      const score = calculateScore(accuracy, gameMode.value)
      lastDistance.value = distance
      lastAccuracy.value = accuracy
      lastScore.value = score
      totalScore.value += score

      scoreHistory.value.push({
        round: currentRound.value,
        distance,
        accuracy,
        score,
        target: targetColor.value,
        guess: guessColor.value
      })

      lynxAttemptsLeft.value = 0 // Set to 0 to prevent further clicks
      gameState.value = 'result'
      isSubmitting.value = false
    } else {
      // Decrement attempts FIRST
      lynxAttemptsLeft.value--

      if (lynxAttemptsLeft.value > 0) {
        // Still have attempts - give hint
        const targetRgb = chroma(targetColor.value).rgb()
        const guessRgb = chroma(guessColor.value).rgb()
        const hslTarget = chroma(targetColor.value).hsl()
        const hslGuess = chroma(guessColor.value).hsl()

        let hint = ''
        if (hslGuess[2] < hslTarget[2] - 0.1) {
          hint = 'tooDark'
        } else if (hslGuess[2] > hslTarget[2] + 0.1) {
          hint = 'tooBright'
        } else if (guessRgb[1] < targetRgb[1] - 20) {
          hint = 'moreGreen'
        } else if (guessRgb[1] > targetRgb[1] + 20) {
          hint = 'lessGreen'
        } else if (guessRgb[0] < targetRgb[0] - 20) {
          hint = 'moreRed'
        } else if (guessRgb[0] > targetRgb[0] + 20) {
          hint = 'lessRed'
        } else if (guessRgb[2] < targetRgb[2] - 20) {
          hint = 'moreBlue'
        } else if (guessRgb[2] > targetRgb[2] + 20) {
          hint = 'lessBlue'
        } else {
          hint = 'moreBlue' // Close enough hint
        }

        lynxHints.value.push(hint)
        isSubmitting.value = false
      } else {
        // Last attempt used and failed - give reduced score (30%)
        const reducedScore = Math.round(calculateScore(accuracy, gameMode.value) * 0.3)
        lastDistance.value = distance
        lastAccuracy.value = accuracy
        lastScore.value = reducedScore
        totalScore.value += reducedScore

        scoreHistory.value.push({
          round: currentRound.value,
          distance,
          accuracy,
          score: reducedScore,
          target: targetColor.value,
          guess: guessColor.value
        })

        gameState.value = 'result'
        isSubmitting.value = false
      }
    }
    return
  }

  // Streak mode: check if accuracy meets tolerance requirement
  if (gameMode.value === 'streak') {
    const score = calculateScore(accuracy, gameMode.value)
    lastDistance.value = distance
    lastAccuracy.value = accuracy
    lastScore.value = score
    totalScore.value += score

    scoreHistory.value.push({
      round: currentRound.value,
      distance,
      accuracy,
      score,
      target: targetColor.value,
      guess: guessColor.value
    })

    if (accuracy < streakTolerance.value) {
      // Failed to meet tolerance - game over
      gameState.value = 'finished'
      return
    }

    // Success - continue to next round in blitz-style
    currentRound.value++
    generateNextColor()
    guessRGB.value = { r: 128, g: 128, b: 128 }
    return
  }

  const score = calculateScore(accuracy, gameMode.value)
  lastDistance.value = distance
  lastAccuracy.value = accuracy
  lastScore.value = score
  totalScore.value += score

  scoreHistory.value.push({
    round: currentRound.value,
    distance,
    accuracy,
    score,
    target: targetColor.value,
    guess: guessColor.value
  })

  // Blitz mode: add bonus time based on accuracy
  if (gameMode.value === 'blitz') {
    const bonusTime = Math.floor(accuracy / 20) // Up to 5 seconds bonus for perfect guess
    timeLeft.value += bonusTime

    // In blitz mode, go straight to next round without showing result
    currentRound.value++
    generateNextColor()
    guessRGB.value = { r: 128, g: 128, b: 128 }
    return
  }

  gameState.value = 'result'
}

function generateNextColor() {
  if (gameMode.value === 'gradient') {
    generateGradientColors()
  } else if (gameMode.value === 'blind') {
    generateBlindMode()
  } else if (gameMode.value === 'illusion') {
    generateIllusionMode()
  } else if (gameMode.value === 'lynx') {
    generateLynxMode()
  } else if (gameMode.value === 'complementary') {
    generateComplementaryMode()
  } else if (gameMode.value === 'streak') {
    generateStreakMode()
  } else if (gameMode.value === 'daily') {
    targetColor.value = generateDailyColor()
  } else if (gameMode.value === 'hard') {
    targetColor.value = generateHardColor()
  } else {
    targetColor.value = generateRandomColor()
  }
}

async function nextRound() {
  currentRound.value++

  if (currentRound.value > maxRounds.value) {
    gameState.value = 'finished'
    return
  }

  // Show ad every 3 rounds in Yandex.Games
  if (isRunningInYandexGames() && currentRound.value % 3 === 0) {
    await showFullscreenAd()
  }

  generateNextColor()
  guessRGB.value = { r: 128, g: 128, b: 128 }
  gameState.value = 'playing'
  isSubmitting.value = false // Reset submission lock
}

async function finishGame() {
  gameState.value = 'finished'

  // Save player score in Yandex.Games
  if (isRunningInYandexGames()) {
    const savedData = await loadPlayerData() || {}
    const modeKey = `highScore_${gameMode.value}`

    // Update high score if current score is better
    if (!savedData[modeKey] || totalScore.value > savedData[modeKey]) {
      savedData[modeKey] = totalScore.value
      await savePlayerData(savedData)
    }
  }
}

function backToModeSelect() {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
  gameState.value = 'modeSelect'
  currentRound.value = 1
  totalScore.value = 0
  scoreHistory.value = []
}

function goToModeSelect() {
  gameState.value = 'modeSelect'
  menuScreen.value = 'main'
}

function showRules() {
  menuScreen.value = 'rules'
}

function showPrivacy() {
  menuScreen.value = 'privacy'
}

function backToMainMenu() {
  menuScreen.value = 'main'
}

function switchLanguage(lang) {
  currentLanguage.value = lang
  setLanguage(lang)
}

function translateHint(hintKey) {
  return t(`hints.${hintKey}`, currentLanguage.value)
}

function backToMenu() {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
    timerInterval.value = null
  }
  gameState.value = 'menu'
  menuScreen.value = 'main'
  currentRound.value = 1
  totalScore.value = 0
  scoreHistory.value = []
}

// Cleanup timer on unmount
onUnmounted(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value)
  }
})
</script>

<style scoped>
.game-container {
  max-width: 1000px;
  margin: 0 auto;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
}

/* Language Switcher */
.language-switcher-menu {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 30px;
}

.lang-btn-menu {
  background: var(--bg-dark);
  color: var(--text-secondary);
  border: 2px solid var(--text-secondary);
  padding: 10px 20px;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
  min-width: 60px;
}

.lang-btn-menu:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  transform: translateY(-2px);
}

.lang-btn-menu.active {
  background: var(--accent-primary);
  color: var(--bg-dark);
  border-color: var(--accent-primary);
}

@media (max-width: 768px) {
  .language-switcher-menu {
    margin-bottom: 20px;
  }

  .lang-btn-menu {
    padding: 8px 16px;
    font-size: 11px;
    min-width: 50px;
  }
}

/* Main Menu */
.main-menu {
  background: var(--bg-card);
  padding: 60px 40px;
  text-align: center;
  width: 100%;
  max-width: 500px;
}

.menu-subtitle {
  font-size: 11px;
  color: var(--text-secondary);
  margin-top: -5px;
  margin-bottom: 40px;
  letter-spacing: 1px;
}

.menu-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.menu-btn {
  width: 100%;
  padding: 18px;
  font-size: 14px;
}

.menu-btn.secondary {
  background: var(--bg-dark);
  border-color: var(--text-secondary);
}

.menu-btn.secondary:hover {
  border-color: var(--accent-primary);
}

/* Rules & Privacy Screens */
.rules-screen,
.privacy-screen {
  background: var(--bg-card);
  padding: 30px;
  width: 100%;
  max-width: 700px;
  max-height: 90vh;
  overflow-y: auto;
}

.screen-title {
  font-size: 20px;
  color: var(--accent-primary);
  text-align: center;
  margin-bottom: 25px;
  letter-spacing: 2px;
}

.rules-content,
.privacy-content {
  text-align: left;
  margin-bottom: 25px;
}

.rule-section,
.privacy-section {
  margin-bottom: 25px;
  padding-bottom: 20px;
  border-bottom: 2px solid var(--border-pixel);
}

.rule-section:last-child,
.privacy-section:last-child {
  border-bottom: none;
}

.rule-section h3,
.privacy-section h3 {
  font-size: 12px;
  color: var(--accent-primary);
  margin-bottom: 10px;
  letter-spacing: 1px;
}

.rule-section p,
.privacy-section p {
  font-size: 10px;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.rule-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.rule-section li {
  font-size: 10px;
  line-height: 1.8;
  color: var(--text-secondary);
  padding-left: 15px;
  position: relative;
}

.rule-section li::before {
  content: "▸";
  position: absolute;
  left: 0;
  color: var(--accent-primary);
}

.mode-detail {
  margin-bottom: 20px;
  padding: 15px;
  background: var(--bg-dark);
  border-left: 3px solid var(--accent-primary);
}

.mode-detail:last-child {
  margin-bottom: 0;
}

.mode-detail-name {
  display: block;
  font-size: 11px;
  color: var(--accent-primary);
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.mode-detail p {
  font-size: 10px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.mode-detail p:last-child {
  margin-bottom: 0;
}

.mode-meta {
  font-size: 9px !important;
  color: var(--text-secondary);
  opacity: 0.7;
  margin-top: 8px !important;
}

.formula {
  background: var(--bg-dark);
  padding: 10px;
  border-left: 3px solid var(--accent-primary);
  font-family: monospace;
  font-size: 11px;
  color: var(--text-primary);
}

/* Custom scrollbar */
.rules-screen::-webkit-scrollbar,
.privacy-screen::-webkit-scrollbar {
  width: 12px;
}

.rules-screen::-webkit-scrollbar-track,
.privacy-screen::-webkit-scrollbar-track {
  background: var(--bg-dark);
  border: 2px solid var(--border-pixel);
}

.rules-screen::-webkit-scrollbar-thumb,
.privacy-screen::-webkit-scrollbar-thumb {
  background: var(--accent-primary);
  border: 2px solid var(--bg-dark);
}

.rules-screen::-webkit-scrollbar-thumb:hover,
.privacy-screen::-webkit-scrollbar-thumb:hover {
  background: var(--accent-secondary);
}

/* Firefox scrollbar */
.rules-screen,
.privacy-screen {
  scrollbar-width: thin;
  scrollbar-color: var(--accent-primary) var(--bg-dark);
}

/* Mode Selector */
.mode-selector {
  background: var(--bg-card);
  padding: 30px 20px;
  text-align: center;
  width: 100%;
  max-width: 600px;
}

.game-title {
  font-size: 40px;
  margin-bottom: 8px;
  letter-spacing: 3px;
  text-shadow:
    3px 3px 0 var(--accent-secondary),
    6px 6px 0 var(--bg-dark);
}

.game-title.clickable {
  cursor: pointer;
  transition: transform 0.2s, opacity 0.2s;
}

.game-title.clickable:hover {
  transform: scale(1.05);
  opacity: 0.9;
}

.game-title.clickable:active {
  transform: scale(0.98);
}

.game-title .accent {
  color: var(--accent-primary);
}

.mode-title {
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 20px;
  letter-spacing: 2px;
}

.modes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.mode-button {
  background: var(--bg-dark);
  padding: 16px 12px;
  cursor: pointer;
  border: 3px solid var(--border-pixel);
  transition: all 0.2s;
  font-family: var(--pixel-font);
}

.mode-button:hover {
  transform: translateY(-3px);
  border-color: var(--accent-primary);
  box-shadow: 0 5px 20px var(--shadow-glow);
}

.mode-button.easy { border-color: #51cf66; }
.mode-button.normal { border-color: #4dabf7; }
.mode-button.hard { border-color: #ff6b6b; }
.mode-button.daily { border-color: #ffd93d; }
.mode-button.blitz { border-color: #ff6b9d; }
.mode-button.gradient { border-color: #c060ff; }
.mode-button.blind { border-color: #ffa94d; }
.mode-button.illusion { border-color: #da77f2; }
.mode-button.lynx { border-color: #74c0fc; }
.mode-button.complementary { border-color: #ffa8a8; }
.mode-button.streak { border-color: #8ce99a; }

.mode-name {
  font-size: 16px;
  margin-bottom: 6px;
  color: var(--text-primary);
}

.mode-desc {
  font-size: 9px;
  color: var(--text-secondary);
}

/* Game Screen */
.game-screen {
  width: 100%;
  max-width: 900px;
}

.game-header {
  margin-bottom: 15px;
}

.title-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 10px;
}

.game-header .game-title {
  font-size: 28px;
  margin: 0;
}

.mode-badge {
  background: var(--bg-card);
  padding: 8px 16px;
  font-size: 10px;
  border: 2px solid;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-badge:hover {
  transform: scale(1.05);
}

.mode-badge.easy { border-color: #51cf66; color: #51cf66; }
.mode-badge.normal { border-color: #4dabf7; color: #4dabf7; }
.mode-badge.hard { border-color: #ff6b6b; color: #ff6b6b; }
.mode-badge.daily { border-color: #ffd93d; color: #ffd93d; }
.mode-badge.blitz { border-color: #ff6b9d; color: #ff6b9d; }
.mode-badge.gradient { border-color: #c060ff; color: #c060ff; }
.mode-badge.blind { border-color: #ffa94d; color: #ffa94d; }
.mode-badge.illusion { border-color: #da77f2; color: #da77f2; }
.mode-badge.lynx { border-color: #74c0fc; color: #74c0fc; }
.mode-badge.complementary { border-color: #ffa8a8; color: #ffa8a8; }
.mode-badge.streak { border-color: #8ce99a; color: #8ce99a; }

.stats {
  display: flex;
  gap: 15px;
  justify-content: center;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.stat-label {
  font-size: 9px;
  color: var(--text-secondary);
}

.stat-value {
  font-size: 18px;
  color: var(--accent-primary);
}

.stat-value.time-warning {
  color: #ff6b6b;
  animation: pulse 0.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
  }
}

/* Game Board */
.game-board {
  background: var(--bg-card);
  border: 4px solid var(--border-pixel);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.game-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  padding: 20px;
}

.target-section,
.guess-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-label {
  font-size: 11px;
  color: var(--text-secondary);
  text-align: center;
  letter-spacing: 1.5px;
  margin: 0;
}

.color-preview {
  width: 100%;
  height: 160px;
  transition: all 0.3s ease;
}

.hex-code {
  text-align: center;
  font-size: 14px;
  color: var(--accent-primary);
  letter-spacing: 2px;
}

/* Gradient mode */
.gradient-preview {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
}

.gradient-color {
  flex: 1;
  height: 180px;
}

.gradient-arrow {
  font-size: 32px;
  color: var(--accent-primary);
  font-weight: bold;
}

/* Blind mode */
.blind-hint {
  text-align: center;
  font-size: 11px;
  color: var(--text-secondary);
  margin-top: 3px;
}

.blind-channel {
  color: var(--accent-primary);
  font-weight: bold;
  font-size: 13px;
}

/* Illusion mode */
.illusion-preview {
  width: 100%;
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.illusion-color {
  width: 70%;
  height: 70%;
  border: 3px solid var(--text-primary);
}

/* Complementary mode */
.complementary-preview {
  display: flex;
  align-items: center;
  gap: 15px;
  width: 100%;
}

.complementary-ref {
  flex: 1;
  height: 180px;
}

.complementary-target {
  flex: 1;
  height: 180px;
}

.complementary-arrow {
  font-size: 24px;
  color: var(--accent-primary);
  font-weight: bold;
}

/* Lynx mode */
.lynx-info {
  text-align: center;
  font-size: 11px;
  color: var(--text-secondary);
  margin-top: 3px;
}

.lynx-attempts {
  color: #74c0fc;
  font-weight: bold;
  font-size: 13px;
}

.lynx-hints {
  background: var(--bg-dark);
  padding: 8px;
  margin-top: 6px;
}

.hint-title {
  font-size: 9px;
  color: var(--text-secondary);
  margin-bottom: 5px;
  text-align: center;
}

.hint-item {
  font-size: 9px;
  color: #74c0fc;
  padding: 3px 0;
  border-bottom: 1px solid var(--border-pixel);
}

.hint-item:last-child {
  border-bottom: none;
}

/* Streak mode */
.streak-info {
  text-align: center;
  font-size: 11px;
  color: var(--text-secondary);
  margin-top: 3px;
}

.streak-tolerance {
  color: #8ce99a;
  font-weight: bold;
  font-size: 13px;
}

/* Picker tabs */
.picker-tabs {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.tab-btn {
  flex: 1;
  padding: 8px;
  background: var(--bg-dark);
  border: 2px solid var(--border-pixel);
  color: var(--text-secondary);
  font-family: var(--pixel-font);
  font-size: 10px;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn.active {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  background: rgba(255, 107, 157, 0.1);
}

/* Sliders */
.sliders {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 10px;
}

.slider-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.slider-label {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.color-name {
  font-weight: bold;
}

.color-name.red { color: #ff6b6b; }
.color-name.green { color: #51cf66; }
.color-name.blue { color: #4dabf7; }

.color-value {
  color: var(--accent-primary);
}

.slider {
  width: 100%;
  height: 8px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--border-pixel);
  outline: none;
  border: 2px solid var(--text-primary);
  cursor: pointer;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: var(--accent-primary);
  border: 2px solid var(--text-primary);
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: var(--accent-primary);
  border: 2px solid var(--text-primary);
  cursor: pointer;
}

.red-slider::-webkit-slider-thumb { background: #ff6b6b; }
.green-slider::-webkit-slider-thumb { background: #51cf66; }
.blue-slider::-webkit-slider-thumb { background: #4dabf7; }

.red-slider::-moz-range-thumb { background: #ff6b6b; }
.green-slider::-moz-range-thumb { background: #51cf66; }
.blue-slider::-moz-range-thumb { background: #4dabf7; }

/* Color Picker Canvas */
.picker-container {
  margin-top: 10px;
}

/* Result Info */
.result-info {
  background: var(--bg-dark);
  padding: 15px;
  margin-top: 10px;
}

.result-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  font-size: 11px;
  border-bottom: 2px solid var(--border-pixel);
}

.result-row:last-of-type {
  border-bottom: none;
}

.result-row .label {
  color: var(--text-secondary);
}

.result-row .value {
  color: var(--text-primary);
  font-weight: bold;
}

.result-row .value.accuracy.perfect { color: #4dff88; }
.result-row .value.accuracy.great { color: #51cf66; }
.result-row .value.accuracy.good { color: #ffd93d; }
.result-row .value.accuracy.poor { color: #ff6b6b; }

.result-row .value.points {
  color: var(--accent-success);
  font-size: 16px;
}

.result-msg {
  text-align: center;
  font-size: 12px;
  margin-top: 10px;
  padding: 10px;
  border: 2px solid;
}

.result-msg.perfect { border-color: #4dff88; color: #4dff88; background: rgba(77, 255, 136, 0.1); }
.result-msg.great { border-color: #51cf66; color: #51cf66; background: rgba(81, 207, 102, 0.1); }
.result-msg.good { border-color: #ffd93d; color: #ffd93d; background: rgba(255, 217, 61, 0.1); }
.result-msg.poor { border-color: #ff6b6b; color: #ff6b6b; background: rgba(255, 107, 107, 0.1); }

/* Action Button */
.action-btn {
  width: 100%;
  margin-top: 15px;
  font-size: 12px;
  padding: 12px;
}

/* Final Score */
.final-score {
  background: var(--bg-card);
  padding: 40px;
  text-align: center;
}

.final-title {
  font-size: 32px;
  margin-bottom: 20px;
  color: var(--accent-primary);
}

.final-stats {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin: 20px 0;
}

.final-stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.final-label {
  font-size: 10px;
  color: var(--text-secondary);
}

.final-value {
  font-size: 28px;
  color: var(--accent-success);
}

.final-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.final-buttons .pixel-button.secondary {
  background: var(--bg-dark);
  border-color: var(--text-secondary);
}

.final-buttons .pixel-button.secondary:hover {
  border-color: var(--accent-primary);
}

/* Responsive */
@media (max-width: 768px) {
  .game-container {
    padding: 5px;
  }

  .game-layout {
    grid-template-columns: 1fr;
    padding: 12px;
    gap: 15px;
  }

  .color-preview {
    height: 120px;
  }

  .gradient-color,
  .complementary-ref,
  .complementary-target {
    height: 120px;
  }

  .illusion-preview {
    height: 120px;
  }

  .modes {
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }

  .mode-button {
    padding: 12px 8px;
  }

  .mode-name {
    font-size: 14px;
  }

  .stat-value {
    font-size: 16px;
  }

  .final-stats {
    gap: 30px;
  }

  .final-value {
    font-size: 24px;
  }
}

@media (max-width: 600px) {
  .game-header {
    margin-bottom: 10px;
  }

  .game-header .game-title {
    font-size: 22px;
  }

  .title-row {
    justify-content: center;
  }

  .mode-badge {
    padding: 6px 12px;
    font-size: 9px;
  }

  .game-layout {
    padding: 12px;
    gap: 12px;
  }

  .stats {
    gap: 12px;
  }

  .stat-label {
    font-size: 8px;
  }

  .stat-value {
    font-size: 14px;
  }

  .section-label {
    font-size: 11px;
  }

  .hex-code {
    font-size: 12px;
  }

  .gradient-arrow {
    font-size: 24px;
  }

  .complementary-arrow {
    font-size: 20px;
  }

  .color-preview {
    height: 100px;
  }

  .gradient-color,
  .complementary-ref,
  .complementary-target {
    height: 100px;
  }

  .illusion-preview {
    height: 100px;
    padding: 15px;
  }

  .picker-tabs {
    gap: 8px;
  }

  .tab-btn {
    padding: 6px;
    font-size: 9px;
  }

  .sliders {
    gap: 10px;
  }

  .slider-label {
    font-size: 11px;
  }

  .result-info {
    padding: 12px;
  }

  .result-row {
    font-size: 10px;
  }

  .result-row .value.points {
    font-size: 14px;
  }

  .result-msg {
    font-size: 11px;
    padding: 8px;
  }

  .final-score {
    padding: 30px 20px;
  }

  .final-title {
    font-size: 24px;
  }

  .final-stats {
    flex-direction: column;
    gap: 20px;
  }

  .final-value {
    font-size: 28px;
  }
}

@media (max-width: 480px) {
  .game-container {
    padding: 5px;
    min-height: auto;
  }

  .game-header {
    margin-bottom: 8px;
  }

  .game-header .game-title {
    font-size: 20px;
  }

  .game-layout {
    padding: 10px;
    gap: 10px;
  }

  .stats {
    gap: 10px;
  }

  .stat-item {
    min-width: 70px;
  }

  .stat-label {
    font-size: 8px;
  }

  .stat-value {
    font-size: 13px;
  }

  .section-label {
    font-size: 10px;
    margin: 6px 0;
  }

  .sliders {
    gap: 7px;
  }

  .slider-group {
    gap: 4px;
  }

  .slider-label {
    font-size: 9px;
  }

  .slider-value {
    font-size: 10px;
  }

  .picker-tabs {
    gap: 6px;
    margin-top: 8px;
  }

  .picker-tab {
    padding: 8px 10px;
    font-size: 10px;
  }

  .mode-selector {
    padding: 15px 10px;
  }

  .mode-selector .game-title {
    font-size: 22px;
    margin-bottom: 5px;
  }

  .mode-title {
    font-size: 12px;
    margin-bottom: 12px;
  }

  .mode-button {
    padding: 10px 6px;
  }

  .mode-name {
    font-size: 13px;
    margin-bottom: 4px;
  }

  .mode-desc {
    font-size: 8px;
  }

  .main-menu {
    padding: 30px 15px;
  }

  .main-menu .game-title {
    font-size: 24px;
  }

  .menu-subtitle {
    font-size: 8px;
    margin-bottom: 30px;
  }

  .menu-btn {
    padding: 14px;
    font-size: 12px;
  }

  .rules-screen,
  .privacy-screen {
    padding: 15px;
    max-height: 85vh;
  }

  .screen-title {
    font-size: 14px;
    margin-bottom: 20px;
  }

  .rule-section h3,
  .privacy-section h3 {
    font-size: 11px;
  }

  .rule-section p,
  .privacy-section p {
    font-size: 9px;
  }

  .rule-section li {
    font-size: 9px;
  }

  .mode-detail {
    padding: 12px;
  }

  .mode-detail-name {
    font-size: 10px;
  }

  .mode-detail p {
    font-size: 9px;
  }

  .mode-meta {
    font-size: 8px !important;
  }

  .formula {
    font-size: 10px;
    padding: 8px;
  }

  .color-preview {
    height: 90px;
  }

  .gradient-preview,
  .complementary-preview {
    gap: 10px;
  }

  .gradient-color,
  .complementary-ref,
  .complementary-target {
    height: 90px;
  }

  .gradient-arrow {
    font-size: 20px;
  }

  .complementary-arrow {
    font-size: 18px;
  }

  .illusion-preview {
    height: 90px;
    padding: 12px;
  }

  .blind-hint,
  .lynx-info,
  .streak-info {
    font-size: 9px;
    margin-top: 2px;
  }

  .blind-channel,
  .lynx-attempts,
  .streak-tolerance {
    font-size: 11px;
  }

  .lynx-hints {
    padding: 6px;
    margin-top: 4px;
  }

  .hint-title {
    font-size: 8px;
    margin-bottom: 4px;
  }

  .hint-item {
    font-size: 8px;
    padding: 2px 0;
  }

  .picker-container {
    margin-top: 8px;
  }

  .action-btn {
    padding: 10px;
    font-size: 11px;
    margin-top: 10px;
  }

  .final-score {
    padding: 25px 15px;
  }

  .final-title {
    font-size: 20px;
    margin-bottom: 15px;
  }

  .final-label {
    font-size: 9px;
  }

  .final-value {
    font-size: 24px;
  }

  .final-buttons {
    gap: 12px;
    margin-top: 15px;
  }

  .final-buttons .pixel-button {
    font-size: 12px;
    padding: 12px;
  }
}

@media (max-width: 360px) {
  .main-menu .game-title,
  .mode-selector .game-title {
    font-size: 18px;
    margin-bottom: 3px;
  }

  .game-header {
    margin-bottom: 6px;
  }

  .game-header .game-title {
    font-size: 16px;
  }

  .game-layout {
    padding: 8px;
    gap: 8px;
  }

  .menu-subtitle {
    font-size: 7px;
    letter-spacing: 0.5px;
  }

  .mode-selector {
    padding: 10px 8px;
  }

  .mode-title {
    font-size: 11px;
    margin-bottom: 10px;
  }

  .modes {
    gap: 8px;
  }

  .mode-button {
    padding: 8px 5px;
  }

  .mode-name {
    font-size: 11px;
    margin-bottom: 3px;
  }

  .mode-desc {
    font-size: 7px;
  }

  .stats {
    gap: 8px;
    flex-wrap: wrap;
  }

  .stat-item {
    min-width: 80px;
  }

  .section-label {
    font-size: 9px;
    letter-spacing: 1px;
    margin: 5px 0;
  }

  .hex-code {
    font-size: 10px;
  }

  .sliders {
    gap: 6px;
  }

  .slider-group {
    gap: 3px;
  }

  .slider-label {
    font-size: 8px;
  }

  .slider-value {
    font-size: 9px;
  }

  .picker-tabs {
    gap: 5px;
    margin-top: 6px;
  }

  .picker-tab {
    padding: 7px 8px;
    font-size: 9px;
  }

  .picker-container {
    margin-top: 6px;
  }

  .action-btn {
    margin-top: 8px;
    padding: 9px;
    font-size: 10px;
  }

  .result-info {
    padding: 10px;
    margin-top: 6px;
  }

  .gradient-preview,
  .complementary-preview {
    gap: 8px;
  }

  .gradient-arrow,
  .complementary-arrow {
    font-size: 16px;
  }

  .color-preview {
    height: 80px;
  }

  .gradient-color,
  .complementary-ref,
  .complementary-target {
    height: 80px;
  }

  .illusion-preview {
    height: 80px;
  }
}

@media (max-height: 800px) and (min-width: 769px) {
  .color-preview {
    height: 160px;
  }

  .gradient-color,
  .complementary-ref,
  .complementary-target {
    height: 160px;
  }

  .illusion-preview {
    height: 160px;
  }

  .game-layout {
    padding: 18px;
  }

  .sliders {
    gap: 10px;
  }
}

@media (max-height: 750px) {
  .game-container {
    padding: 8px;
  }

  .game-header {
    margin-bottom: 8px;
  }

  .game-header .game-title {
    font-size: 20px;
    margin-bottom: 5px;
  }

  .stats {
    gap: 10px;
  }

  .stat-item {
    min-width: 70px;
  }

  .stat-label {
    font-size: 9px;
  }

  .stat-value {
    font-size: 14px;
  }

  .section-label {
    font-size: 9px;
    margin: 3px 0;
  }

  .color-preview {
    height: 100px;
  }

  .gradient-color,
  .complementary-ref,
  .complementary-target {
    height: 100px;
  }

  .illusion-preview {
    height: 100px;
  }

  .game-layout {
    padding: 8px;
    gap: 8px;
  }

  .sliders {
    gap: 6px;
  }

  .slider-group {
    gap: 3px;
  }

  .slider-label {
    font-size: 9px;
  }

  .slider-value {
    font-size: 10px;
  }

  .picker-tabs {
    gap: 5px;
    margin-top: 4px;
  }

  .picker-tab {
    padding: 6px 8px;
    font-size: 9px;
  }

  .picker-container {
    margin-top: 4px;
  }

  .blind-hint,
  .lynx-info,
  .streak-info {
    font-size: 9px;
    margin-top: 2px;
  }

  .blind-channel,
  .lynx-attempts,
  .streak-tolerance {
    font-size: 11px;
  }

  .lynx-hints {
    padding: 6px;
    margin-top: 4px;
  }

  .hint-title {
    font-size: 8px;
    margin-bottom: 4px;
  }

  .hint-item {
    font-size: 8px;
    padding: 2px 0;
  }

  .action-btn {
    margin-top: 5px;
    padding: 8px;
    font-size: 10px;
  }

  .result-info {
    padding: 8px;
    margin-top: 4px;
  }
}

@media (max-height: 700px) {
  .game-container {
    padding: 5px;
  }

  .game-header {
    margin-bottom: 8px;
  }

  .color-preview {
    height: 100px;
  }

  .gradient-color,
  .complementary-ref,
  .complementary-target {
    height: 100px;
  }

  .illusion-preview {
    height: 100px;
  }

  .game-layout {
    padding: 10px;
    gap: 8px;
  }

  .sliders {
    gap: 6px;
  }

  .main-menu {
    padding: 40px 30px;
  }

  .menu-subtitle {
    margin-bottom: 30px;
  }

  .rules-screen,
  .privacy-screen {
    max-height: 80vh;
  }
}

@media (max-height: 600px) {
  .color-preview {
    height: 80px;
  }

  .gradient-color,
  .complementary-ref,
  .complementary-target {
    height: 80px;
  }

  .illusion-preview {
    height: 80px;
    padding: 10px;
  }

  .game-layout {
    padding: 10px;
  }

  .section-label {
    font-size: 10px;
  }

  .sliders {
    gap: 6px;
  }

  .slider-group {
    gap: 3px;
  }
}
</style>
