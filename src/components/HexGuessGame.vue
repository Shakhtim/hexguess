<template>
  <div class="game-container">
    <!-- Main Menu -->
    <div class="main-menu pixel-border" v-if="gameState === 'menu' && menuScreen === 'main'">
      <h1 class="game-title glitch-text">HEX<span class="accent">GUESS</span></h1>
      <p class="menu-subtitle">ИГРА НА ЦВЕТОВОСПРИЯТИЕ</p>

      <div class="menu-buttons">
        <button class="pixel-button menu-btn" @click="goToModeSelect">НАЧАТЬ ИГРУ</button>
        <button class="pixel-button menu-btn secondary" @click="showRules">ПРАВИЛА</button>
        <button class="pixel-button menu-btn secondary" @click="showPrivacy">ПОЛИТИКА ДАННЫХ</button>
      </div>
    </div>

    <!-- Rules Screen -->
    <div class="rules-screen pixel-border" v-if="gameState === 'menu' && menuScreen === 'rules'">
      <h2 class="screen-title">ПРАВИЛА ИГРЫ</h2>

      <div class="rules-content">
        <div class="rule-section">
          <h3>🎯 КАК ИГРАТЬ</h3>
          <p>Тебе показывается цвет. Используй RGB-слайдеры или палитру, чтобы воссоздать его. Нажми "ОТПРАВИТЬ" когда готов!</p>
        </div>

        <div class="rule-section">
          <h3>📐 КАК СЧИТАЕТСЯ ТОЧНОСТЬ</h3>
          <p>Игра использует евклидово расстояние в RGB пространстве:</p>
          <p class="formula">d = √((r₂-r₁)² + (g₂-g₁)² + (b₂-b₁)²)</p>
          <p>Точность = 100 - (дистанция / 441.67 × 100)</p>
        </div>

        <div class="rule-section">
          <h3>🎮 РЕЖИМЫ ИГРЫ</h3>

          <div class="mode-detail">
            <strong class="mode-detail-name">ЛЕГКО</strong>
            <p>Упрощенный режим для новичков. Игра сравнивает только оттенок (Hue) цвета, игнорируя насыщенность и яркость. Идеально для знакомства с цветовым кругом!</p>
            <p class="mode-meta">5 раундов • Базовые очки</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">НОРМАЛЬНО</strong>
            <p>Стандартная игра на 5 раундов. Нужно угадать все три компонента RGB цвета. Случайные цвета с полным спектром сложности.</p>
            <p class="mode-meta">5 раундов • Стандартные очки</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">СЛОЖНО</strong>
            <p>Экстремальная сложность! Генерируются похожие цвета с небольшими вариациями. Требуется безупречное цветовосприятие.</p>
            <p class="mode-meta">5 раундов • Очки ×1.5 бонус</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">ДЕЙЛИ</strong>
            <p>Один цвет в день для всех игроков! Цвет генерируется на основе текущей даты. Сравни свои результаты с друзьями!</p>
            <p class="mode-meta">5 раундов • Очки ×1.3 бонус</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">БЛИЦ</strong>
            <p>Гонка на время! У тебя 60 секунд. Каждое правильное угадывание добавляет бонусное время (до 5 секунд за идеальное попадание). Сколько успеешь?</p>
            <p class="mode-meta">60 секунд • Бесконечные раунды</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">ГРАДИЕНТ</strong>
            <p>Показываются два цвета. Твоя задача — найти точный средний цвет между ними. Цвета усредняются по каждому RGB каналу.</p>
            <p class="mode-meta">5 раундов • Стандартные очки</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">СЛЕПАЯ ЗОНА</strong>
            <p>Один из RGB каналов скрыт! Два канала показываются, а третий нужно угадать самостоятельно. Случайный выбор скрытого канала в каждом раунде.</p>
            <p class="mode-meta">5 раундов • Стандартные очки</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">ИЛЛЮЗИЯ</strong>
            <p>Цвет показывается на цветном фоне. Оптические иллюзии искажают восприятие! Сможешь угадать реальный цвет, игнорируя влияние фона?</p>
            <p class="mode-meta">5 раундов • Стандартные очки</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">ГЛАЗ РЫСИ</strong>
            <p>У тебя 3 попытки на каждый цвет. После каждой неудачной попытки получаешь подсказку (слишком темно, нужно больше зеленого и т.д.). При провале — только 30% очков.</p>
            <p class="mode-meta">5 раундов • 3 попытки на раунд</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">КОМПЛЕМЕНТЫ</strong>
            <p>Показывается референсный цвет. Найди его противоположность на цветовом круге (Hue + 180°). Насыщенность и яркость сохраняются.</p>
            <p class="mode-meta">5 раундов • Стандартные очки</p>
          </div>

          <div class="mode-detail">
            <strong class="mode-detail-name">МАРАФОН</strong>
            <p>Режим выживания! Начинаешь с требованием 50% точности. Каждые 3 раунда требование увеличивается на 5% (макс. 95%). Одна ошибка — конец игры!</p>
            <p class="mode-meta">До первой ошибки • Растущая сложность</p>
          </div>
        </div>

        <div class="rule-section">
          <h3>🎯 СИСТЕМА ОЧКОВ</h3>
          <ul>
            <li>95%+ → 🎯 ИДЕАЛЬНО! (~950-1000 очков)</li>
            <li>90%+ → ⭐ ОТЛИЧНО! (~900 очков)</li>
            <li>75%+ → ✨ ХОРОШО! (~750 очков)</li>
            <li>50%+ → 👍 НЕПЛОХО! (~500 очков)</li>
            <li>25%+ → 🤔 ЕЩЕ РАЗ! (~250 очков)</li>
          </ul>
        </div>
      </div>

      <button class="pixel-button" @click="backToMainMenu">НАЗАД</button>
    </div>

    <!-- Privacy Policy Screen -->
    <div class="privacy-screen pixel-border" v-if="gameState === 'menu' && menuScreen === 'privacy'">
      <h2 class="screen-title">ПОЛИТИКА ДАННЫХ</h2>

      <div class="privacy-content">
        <div class="privacy-section">
          <h3>📊 КАКИЕ ДАННЫЕ МЫ СОБИРАЕМ</h3>
          <p>Эта игра <strong>НЕ собирает и НЕ хранит</strong> никакие персональные данные.</p>
        </div>

        <div class="privacy-section">
          <h3>💾 ЛОКАЛЬНОЕ ХРАНЕНИЕ</h3>
          <p>Все данные игры (результаты, статистика) хранятся <strong>только в твоем браузере</strong> локально. Мы не отправляем эти данные на сервер.</p>
        </div>

        <div class="privacy-section">
          <h3>🔒 БЕЗОПАСНОСТЬ</h3>
          <p>Игра работает полностью на стороне клиента (в браузере). Никакие данные не передаются третьим лицам.</p>
        </div>

        <div class="privacy-section">
          <h3>🍪 COOKIES</h3>
          <p>Мы не используем cookies для отслеживания. Игра использует только localStorage браузера для сохранения игрового прогресса.</p>
        </div>

        <div class="privacy-section">
          <h3>📧 КОНТАКТЫ</h3>
          <p>Если у тебя есть вопросы о политике данных, можешь создать issue на GitHub.</p>
        </div>
      </div>

      <button class="pixel-button" @click="backToMainMenu">НАЗАД</button>
    </div>

    <!-- Mode selector -->
    <div class="mode-selector pixel-border" v-if="gameState === 'modeSelect'">
      <h1 class="game-title glitch-text clickable" @click="backToMenu">HEX<span class="accent">GUESS</span></h1>
      <h2 class="mode-title">ВЫБЕРИ РЕЖИМ</h2>

      <div class="modes">
        <button class="mode-button pixel-border easy" @click="selectMode('easy')">
          <div class="mode-name">ЛЕГКО</div>
          <div class="mode-desc">Только оттенок</div>
        </button>

        <button class="mode-button pixel-border normal" @click="selectMode('normal')">
          <div class="mode-name">НОРМАЛЬНО</div>
          <div class="mode-desc">Угадай цвет</div>
        </button>

        <button class="mode-button pixel-border hard" @click="selectMode('hard')">
          <div class="mode-name">СЛОЖНО</div>
          <div class="mode-desc">Точная игра</div>
        </button>

        <button class="mode-button pixel-border daily" @click="selectMode('daily')">
          <div class="mode-name">ДЕЙЛИ</div>
          <div class="mode-desc">Цвет дня</div>
        </button>

        <button class="mode-button pixel-border blitz" @click="selectMode('blitz')">
          <div class="mode-name">БЛИЦ</div>
          <div class="mode-desc">60 секунд</div>
        </button>

        <button class="mode-button pixel-border gradient" @click="selectMode('gradient')">
          <div class="mode-name">ГРАДИЕНТ</div>
          <div class="mode-desc">Средний цвет</div>
        </button>

        <button class="mode-button pixel-border blind" @click="selectMode('blind')">
          <div class="mode-name">СЛЕПАЯ ЗОНА</div>
          <div class="mode-desc">Скрытый канал</div>
        </button>

        <button class="mode-button pixel-border illusion" @click="selectMode('illusion')">
          <div class="mode-name">ИЛЛЮЗИЯ</div>
          <div class="mode-desc">Обман зрения</div>
        </button>

        <button class="mode-button pixel-border lynx" @click="selectMode('lynx')">
          <div class="mode-name">ГЛАЗ РЫСИ</div>
          <div class="mode-desc">3 попытки</div>
        </button>

        <button class="mode-button pixel-border complementary" @click="selectMode('complementary')">
          <div class="mode-name">КОМПЛЕМЕНТЫ</div>
          <div class="mode-desc">Противоположность</div>
        </button>

        <button class="mode-button pixel-border streak" @click="selectMode('streak')">
          <div class="mode-name">МАРАФОН</div>
          <div class="mode-desc">До ошибки</div>
        </button>
      </div>
    </div>

    <!-- Game screen -->
    <div v-if="gameState === 'playing' || gameState === 'result' || gameState === 'finished'" class="game-screen">
      <!-- Header -->
      <header class="game-header">
        <div class="title-row">
          <h1 class="game-title clickable" @click="backToMenu">HEX<span class="accent">GUESS</span></h1>
          <button class="mode-badge pixel-border" @click="backToModeSelect" :class="gameMode">
            {{ modeName }}
          </button>
        </div>
        <div class="stats">
          <div class="stat-item" v-if="gameMode !== 'blitz'">
            <span class="stat-label">Раунд</span>
            <span class="stat-value">{{ currentRound }}/{{ maxRounds }}</span>
          </div>
          <div class="stat-item" v-if="gameMode === 'blitz'">
            <span class="stat-label">Время</span>
            <span class="stat-value" :class="{ 'time-warning': timeLeft <= 10 }">{{ timeLeft }}с</span>
          </div>
          <div class="stat-item">
            <span class="stat-label">Очки</span>
            <span class="stat-value">{{ totalScore }}</span>
          </div>
        </div>
      </header>

      <!-- Main game area -->
      <div class="game-board" v-if="gameState !== 'finished'">
        <div class="game-layout">
          <!-- Target color -->
          <div class="target-section">
            <h3 class="section-label" v-if="gameMode === 'gradient'">НАЙДИ СРЕДНИЙ ЦВЕТ</h3>
            <h3 class="section-label" v-else-if="gameMode === 'complementary'">НАЙДИ ПРОТИВОПОЛОЖНОСТЬ</h3>
            <h3 class="section-label" v-else>ЦЕЛЬ</h3>

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
              Скрытый канал: <span class="blind-channel">{{ blindChannel.toUpperCase() }}</span>
            </div>
            <div class="lynx-info" v-if="gameMode === 'lynx' && gameState === 'playing'">
              Попыток: <span class="lynx-attempts">{{ lynxAttemptsLeft }}/3</span>
            </div>
            <div class="streak-info" v-if="gameMode === 'streak' && gameState === 'playing'">
              Допуск: <span class="streak-tolerance">≥{{ streakTolerance }}%</span>
            </div>
          </div>

          <!-- Guess color -->
          <div class="guess-section">
            <h3 class="section-label">ТВОЙ ВЫБОР</h3>
            <div class="color-preview pixel-border" :style="{ backgroundColor: guessColor }"></div>
            <div class="hex-code">{{ guessColor.toUpperCase() }}</div>

            <!-- Color picker -->
            <div class="picker-tabs" v-if="gameState === 'playing'">
              <button
                class="tab-btn"
                :class="{ active: pickerMode === 'rgb' }"
                @click="pickerMode = 'rgb'"
              >
                RGB
              </button>
              <button
                class="tab-btn"
                :class="{ active: pickerMode === 'picker' }"
                @click="pickerMode = 'picker'"
              >
                ПАЛИТРА
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
              <div class="hint-title">ПОДСКАЗКИ:</div>
              <div class="hint-item" v-for="(hint, index) in lynxHints" :key="index">
                {{ index + 1 }}. {{ hint }}
              </div>
            </div>

            <!-- Result display -->
            <div class="result-info pixel-border" v-if="gameState === 'result'">
              <div class="result-row">
                <span class="label">ТОЧНОСТЬ:</span>
                <span class="value accuracy" :class="accuracyClass">{{ lastAccuracy }}%</span>
              </div>
              <div class="result-row">
                <span class="label">ОЧКИ:</span>
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
              ОТПРАВИТЬ
            </button>
            <button
              class="pixel-button action-btn"
              v-if="gameState === 'result' && currentRound < maxRounds"
              @click="nextRound"
            >
              СЛЕДУЮЩИЙ
            </button>
            <button
              class="pixel-button action-btn"
              v-if="gameState === 'result' && currentRound >= maxRounds"
              @click="finishGame"
            >
              РЕЗУЛЬТАТЫ
            </button>
          </div>
        </div>
      </div>

      <!-- Final score -->
      <div class="final-score pixel-border" v-if="gameState === 'finished'">
        <h2 class="final-title glitch-text">ИГРА ОКОНЧЕНА!</h2>
        <div class="final-stats">
          <div class="final-stat">
            <span class="final-label">ВСЕГО ОЧКОВ</span>
            <span class="final-value">{{ totalScore }}</span>
          </div>
          <div class="final-stat">
            <span class="final-label">СРЕДНЯЯ ТОЧНОСТЬ</span>
            <span class="final-value">{{ averageAccuracy }}%</span>
          </div>
        </div>
        <div class="final-buttons">
          <button class="pixel-button" @click="backToModeSelect">ИГРАТЬ СНОВА</button>
          <button class="pixel-button secondary" @click="backToMenu">В МЕНЮ</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onUnmounted } from 'vue'
import chroma from 'chroma-js'
import ColorPicker from './ColorPicker.vue'
import { showFullscreenAd, savePlayerData, loadPlayerData, isRunningInYandexGames } from '../yandexGames'

// Game state
const menuScreen = ref('main') // 'main', 'rules', 'privacy'
const gameState = ref('menu') // 'menu', 'modeSelect', 'playing', 'result', 'finished'
const gameMode = ref('normal') // 'easy', 'normal', 'hard', 'daily', 'blitz', 'gradient', 'blind', 'illusion', 'lynx', 'complementary', 'streak'
const currentRound = ref(1)
const maxRounds = ref(5)
const totalScore = ref(0)
const pickerMode = ref('rgb') // 'rgb' or 'picker'
const isSubmitting = ref(false) // Prevent multiple simultaneous submissions

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
  const names = {
    easy: 'ЛЕГКО',
    normal: 'НОРМАЛЬНО',
    hard: 'СЛОЖНО',
    daily: 'ДЕЙЛИ',
    blitz: 'БЛИЦ',
    gradient: 'ГРАДИЕНТ',
    blind: 'СЛЕПАЯ ЗОНА',
    illusion: 'ИЛЛЮЗИЯ',
    lynx: 'ГЛАЗ РЫСИ',
    complementary: 'КОМПЛЕМЕНТЫ',
    streak: 'МАРАФОН'
  }
  return names[gameMode.value]
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
          hint = 'Слишком темно'
        } else if (hslGuess[2] > hslTarget[2] + 0.1) {
          hint = 'Слишком светло'
        } else if (hslGuess[0] < 60 && hslTarget[0] > 60) {
          hint = 'Нужно больше холодных тонов'
        } else if (hslGuess[0] > 60 && hslTarget[0] < 60) {
          hint = 'Нужно больше теплых тонов'
        } else if (guessRgb[1] < targetRgb[1] - 20) {
          hint = 'Нужно больше зеленого'
        } else if (guessRgb[0] < targetRgb[0] - 20) {
          hint = 'Нужно больше красного'
        } else if (guessRgb[2] < targetRgb[2] - 20) {
          hint = 'Нужно больше синего'
        } else {
          hint = 'Совсем близко!'
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
  padding: 40px;
  text-align: center;
  width: 100%;
  max-width: 600px;
}

.game-title {
  font-size: 40px;
  margin-bottom: 10px;
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
  margin-bottom: 30px;
  letter-spacing: 2px;
}

.modes {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.mode-button {
  background: var(--bg-dark);
  padding: 20px;
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
  font-size: 18px;
  margin-bottom: 8px;
  color: var(--text-primary);
}

.mode-desc {
  font-size: 10px;
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
  font-size: 12px;
  color: var(--text-secondary);
  text-align: center;
  letter-spacing: 2px;
  margin: 0;
}

.color-preview {
  width: 100%;
  height: 180px;
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
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 5px;
}

.blind-channel {
  color: var(--accent-primary);
  font-weight: bold;
  font-size: 14px;
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
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 5px;
}

.lynx-attempts {
  color: #74c0fc;
  font-weight: bold;
  font-size: 14px;
}

.lynx-hints {
  background: var(--bg-dark);
  padding: 12px;
  margin-top: 10px;
}

.hint-title {
  font-size: 10px;
  color: var(--text-secondary);
  margin-bottom: 8px;
  text-align: center;
}

.hint-item {
  font-size: 10px;
  color: #74c0fc;
  padding: 4px 0;
  border-bottom: 1px solid var(--border-pixel);
}

.hint-item:last-child {
  border-bottom: none;
}

/* Streak mode */
.streak-info {
  text-align: center;
  font-size: 12px;
  color: var(--text-secondary);
  margin-top: 5px;
}

.streak-tolerance {
  color: #8ce99a;
  font-weight: bold;
  font-size: 14px;
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
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .mode-button {
    padding: 16px;
  }

  .mode-name {
    font-size: 16px;
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

  .game-header .game-title {
    font-size: 20px;
  }

  .mode-selector {
    padding: 20px 15px;
  }

  .mode-selector .game-title {
    font-size: 24px;
  }

  .mode-title {
    font-size: 14px;
    margin-bottom: 20px;
  }

  .mode-button {
    padding: 14px;
  }

  .mode-name {
    font-size: 14px;
    margin-bottom: 6px;
  }

  .mode-desc {
    font-size: 9px;
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

  .game-layout {
    padding: 10px;
    gap: 12px;
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
    font-size: 10px;
  }

  .blind-channel,
  .lynx-attempts,
  .streak-tolerance {
    font-size: 12px;
  }

  .lynx-hints {
    padding: 10px;
  }

  .hint-title {
    font-size: 9px;
  }

  .hint-item {
    font-size: 9px;
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
    font-size: 20px;
  }

  .game-header .game-title {
    font-size: 18px;
  }

  .menu-subtitle {
    font-size: 7px;
    letter-spacing: 0.5px;
  }

  .mode-title {
    font-size: 12px;
  }

  .mode-button {
    padding: 12px;
  }

  .mode-name {
    font-size: 12px;
  }

  .mode-desc {
    font-size: 8px;
  }

  .stats {
    gap: 8px;
    flex-wrap: wrap;
  }

  .stat-item {
    min-width: 80px;
  }

  .section-label {
    font-size: 10px;
    letter-spacing: 1px;
  }

  .hex-code {
    font-size: 11px;
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

@media (max-height: 700px) {
  .game-container {
    padding: 5px;
  }

  .game-header {
    margin-bottom: 10px;
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
    padding: 12px;
    gap: 10px;
  }

  .sliders {
    gap: 8px;
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
