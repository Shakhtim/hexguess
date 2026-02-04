// Localization for ColorGuess
export const translations = {
  ru: {
    // Main menu
    title: 'COLORGUESS',
    startGame: 'НАЧАТЬ ИГРУ',
    rules: 'ПРАВИЛА',
    privacy: 'ПОЛИТИКА ДАННЫХ',

    // Mode selection
    selectMode: 'ВЫБЕРИ РЕЖИМ',
    backToMenu: 'НАЗАД',

    // Game modes
    modes: {
      easy: 'ЛЕГКО',
      normal: 'НОРМАЛЬНО',
      hard: 'СЛОЖНО',
      daily: 'ДЕЙЛИ',
      blitz: 'БЛИЦ',
      gradient: 'ГРАДИЕНТ',
      blind: 'СЛЕПАЯ ЗОНА',
      illusion: 'ИЛЛЮЗИЯ',
      lynx: 'ГЛАЗ РЫСИ',
      complement: 'КОМПЛЕМЕНТЫ',
      streak: 'МАРАФОН'
    },

    modeDescriptions: {
      easy: 'Упрощенный режим. Только оттенок.',
      normal: 'Стандартная игра. 5 раундов.',
      hard: 'Экстремальная сложность!',
      daily: 'Один цвет в день для всех!',
      blitz: 'Гонка на время! 60 секунд.',
      gradient: 'Найди средний цвет между двумя.',
      blind: 'Один RGB канал скрыт!',
      illusion: 'Цвет на цветном фоне.',
      lynx: '3 попытки с подсказками.',
      complement: 'Найди противоположность!',
      streak: 'Режим выживания!'
    },

    // Game UI
    round: 'РАУНД',
    score: 'СЧЕТ',
    timeLeft: 'ВРЕМЯ',
    targetColor: 'ЦЕЛЬ',
    yourGuess: 'ТВОЯ ПОПЫТКА',
    accuracy: 'ТОЧНОСТЬ',
    attemptsLeft: 'Попыток',
    submit: 'ОТПРАВИТЬ',
    next: 'СЛЕДУЮЩИЙ',
    results: 'РЕЗУЛЬТАТЫ',
    findMiddleColor: 'НАЙДИ СРЕДНИЙ ЦВЕТ',
    findOpposite: 'НАЙДИ ПРОТИВОПОЛОЖНОСТЬ',
    hiddenChannel: 'Скрытый канал',
    tolerance: 'Допуск',

    // Color picker
    redChannel: 'Красный',
    greenChannel: 'Зеленый',
    blueChannel: 'Синий',
    hueChannel: 'Оттенок',
    satChannel: 'Насыщенность',
    lightChannel: 'Яркость',
    rgbTab: 'RGB',
    paletteTab: 'ПАЛИТРА',

    // Results screen
    gameOver: 'ИГРА ОКОНЧЕНА',
    finalScore: 'ФИНАЛЬНЫЙ СЧЕТ',
    roundResults: 'РЕЗУЛЬТАТЫ РАУНДОВ',
    avgAccuracy: 'Средняя точность',
    playAgain: 'ИГРАТЬ СНОВА',
    changeMode: 'СМЕНИТЬ РЕЖИМ',
    backToMenu: 'В МЕНЮ',

    // Lynx mode hints
    hintsTitle: 'ПОДСКАЗКИ:',
    hints: {
      tooDark: 'Слишком темно',
      tooBright: 'Слишком светло',
      moreRed: 'Нужно больше красного',
      lessRed: 'Нужно меньше красного',
      moreGreen: 'Нужно больше зеленого',
      lessGreen: 'Нужно меньше зеленого',
      moreBlue: 'Нужно больше синего',
      lessBlue: 'Нужно меньше синего'
    },

    // Rules screen
    rulesTitle: 'ПРАВИЛА ИГРЫ',
    howToPlay: '🎯 КАК ИГРАТЬ',
    howToPlayText: 'Тебе показывается цвет. Используй RGB-слайдеры или палитру, чтобы воссоздать его. Нажми "ОТПРАВИТЬ" когда готов!',
    accuracyCalc: '📐 КАК СЧИТАЕТСЯ ТОЧНОСТЬ',
    accuracyText: 'Игра использует евклидово расстояние в RGB пространстве:',
    accuracyFormula: 'Точность = 100 - (дистанция / 441.67 × 100)',
    gameModes: '🎮 РЕЖИМЫ ИГРЫ',

    modeDetails: {
      easy: {
        name: 'ЛЕГКО',
        desc: 'Упрощенный режим для новичков. Игра сравнивает только оттенок (Hue) цвета, игнорируя насыщенность и яркость. Идеально для знакомства с цветовым кругом!',
        meta: '5 раундов • Базовые очки'
      },
      normal: {
        name: 'НОРМАЛЬНО',
        desc: 'Стандартная игра на 5 раундов. Нужно угадать все три компонента RGB цвета. Случайные цвета с полным спектром сложности.',
        meta: '5 раундов • Стандартные очки'
      },
      hard: {
        name: 'СЛОЖНО',
        desc: 'Экстремальная сложность! Генерируются похожие цвета с небольшими вариациями. Требуется безупречное цветовосприятие.',
        meta: '5 раундов • Очки ×1.5 бонус'
      },
      daily: {
        name: 'ДЕЙЛИ',
        desc: 'Один цвет в день для всех игроков! Цвет генерируется на основе текущей даты. Сравни свои результаты с друзьями!',
        meta: '5 раундов • Очки ×1.3 бонус'
      },
      blitz: {
        name: 'БЛИЦ',
        desc: 'Гонка на время! У тебя 60 секунд. Каждое правильное угадывание добавляет бонусное время (до 5 секунд за идеальное попадание). Сколько успеешь?',
        meta: '60 секунд • Бесконечные раунды'
      },
      gradient: {
        name: 'ГРАДИЕНТ',
        desc: 'Показываются два цвета. Твоя задача — найти точный средний цвет между ними. Цвета усредняются по каждому RGB каналу.',
        meta: '5 раундов • Стандартные очки'
      },
      blind: {
        name: 'СЛЕПАЯ ЗОНА',
        desc: 'Один из RGB каналов скрыт! Два канала показываются, а третий нужно угадать самостоятельно. Случайный выбор скрытого канала в каждом раунде.',
        meta: '5 раундов • Стандартные очки'
      },
      illusion: {
        name: 'ИЛЛЮЗИЯ',
        desc: 'Цвет показывается на цветном фоне. Оптические иллюзии искажают восприятие! Сможешь угадать реальный цвет, игнорируя влияние фона?',
        meta: '5 раундов • Стандартные очки'
      },
      lynx: {
        name: 'ГЛАЗ РЫСИ',
        desc: 'У тебя 3 попытки на каждый цвет. После каждой неудачной попытки получаешь подсказку (слишком темно, нужно больше зеленого и т.д.). При провале — только 30% очков.',
        meta: '5 раундов • 3 попытки на раунд'
      },
      complement: {
        name: 'КОМПЛЕМЕНТЫ',
        desc: 'Показывается референсный цвет. Найди его противоположность на цветовом круге (Hue + 180°). Насыщенность и яркость сохраняются.',
        meta: '5 раундов • Стандартные очки'
      },
      streak: {
        name: 'МАРАФОН',
        desc: 'Режим выживания! Начинаешь с требованием 50% точности. Каждые 3 раунда требование увеличивается на 5% (макс. 95%). Одна ошибка — конец игры!',
        meta: 'До первой ошибки • Растущая сложность'
      }
    },

    // Privacy screen
    privacyTitle: 'ПОЛИТИКА ДАННЫХ',
    privacyText: 'ColorGuess не собирает персональные данные. Мы используем локальное хранилище браузера для сохранения настроек и рекордов только на вашем устройстве. Никакая информация не передается на серверы.'
  },

  en: {
    // Main menu
    title: 'COLORGUESS',
    startGame: 'START GAME',
    rules: 'RULES',
    privacy: 'PRIVACY POLICY',

    // Mode selection
    selectMode: 'SELECT MODE',
    backToMenu: 'BACK',

    // Game modes
    modes: {
      easy: 'EASY',
      normal: 'NORMAL',
      hard: 'HARD',
      daily: 'DAILY',
      blitz: 'BLITZ',
      gradient: 'GRADIENT',
      blind: 'BLIND SPOT',
      illusion: 'ILLUSION',
      lynx: 'LYNX EYE',
      complement: 'COMPLEMENTS',
      streak: 'MARATHON'
    },

    modeDescriptions: {
      easy: 'Simplified mode. Hue only.',
      normal: 'Standard game. 5 rounds.',
      hard: 'Extreme difficulty!',
      daily: 'One color per day for everyone!',
      blitz: 'Race against time! 60 seconds.',
      gradient: 'Find the middle color between two.',
      blind: 'One RGB channel is hidden!',
      illusion: 'Color on colored background.',
      lynx: '3 attempts with hints.',
      complement: 'Find the opposite!',
      streak: 'Survival mode!'
    },

    // Game UI
    round: 'ROUND',
    score: 'SCORE',
    timeLeft: 'TIME',
    targetColor: 'TARGET',
    yourGuess: 'YOUR GUESS',
    accuracy: 'ACCURACY',
    attemptsLeft: 'Attempts',
    submit: 'SUBMIT',
    next: 'NEXT',
    results: 'RESULTS',
    findMiddleColor: 'FIND MIDDLE COLOR',
    findOpposite: 'FIND OPPOSITE',
    hiddenChannel: 'Hidden channel',
    tolerance: 'Tolerance',

    // Color picker
    redChannel: 'Red',
    greenChannel: 'Green',
    blueChannel: 'Blue',
    hueChannel: 'Hue',
    satChannel: 'Saturation',
    lightChannel: 'Lightness',
    rgbTab: 'RGB',
    paletteTab: 'PALETTE',

    // Results screen
    gameOver: 'GAME OVER',
    finalScore: 'FINAL SCORE',
    roundResults: 'ROUND RESULTS',
    avgAccuracy: 'Average accuracy',
    playAgain: 'PLAY AGAIN',
    changeMode: 'CHANGE MODE',
    backToMenu: 'MENU',

    // Lynx mode hints
    hintsTitle: 'HINTS:',
    hints: {
      tooDark: 'Too dark',
      tooBright: 'Too bright',
      moreRed: 'Need more red',
      lessRed: 'Need less red',
      moreGreen: 'Need more green',
      lessGreen: 'Need less green',
      moreBlue: 'Need more blue',
      lessBlue: 'Need less blue'
    },

    // Rules screen
    rulesTitle: 'GAME RULES',
    howToPlay: '🎯 HOW TO PLAY',
    howToPlayText: 'You are shown a color. Use RGB sliders or color palette to recreate it. Press "SUBMIT" when ready!',
    accuracyCalc: '📐 ACCURACY CALCULATION',
    accuracyText: 'The game uses Euclidean distance in RGB space:',
    accuracyFormula: 'Accuracy = 100 - (distance / 441.67 × 100)',
    gameModes: '🎮 GAME MODES',

    modeDetails: {
      easy: {
        name: 'EASY',
        desc: 'Simplified mode for beginners. The game only compares Hue, ignoring saturation and lightness. Perfect for learning the color wheel!',
        meta: '5 rounds • Base points'
      },
      normal: {
        name: 'NORMAL',
        desc: 'Standard 5-round game. You need to guess all three RGB components. Random colors with full spectrum difficulty.',
        meta: '5 rounds • Standard points'
      },
      hard: {
        name: 'HARD',
        desc: 'Extreme difficulty! Similar colors with small variations are generated. Requires perfect color perception.',
        meta: '5 rounds • Points ×1.5 bonus'
      },
      daily: {
        name: 'DAILY',
        desc: 'One color per day for all players! Color is generated based on current date. Compare your results with friends!',
        meta: '5 rounds • Points ×1.3 bonus'
      },
      blitz: {
        name: 'BLITZ',
        desc: 'Race against time! You have 60 seconds. Each correct guess adds bonus time (up to 5 seconds for perfect match). How many can you do?',
        meta: '60 seconds • Infinite rounds'
      },
      gradient: {
        name: 'GRADIENT',
        desc: 'Two colors are shown. Your task is to find the exact middle color between them. Colors are averaged by each RGB channel.',
        meta: '5 rounds • Standard points'
      },
      blind: {
        name: 'BLIND SPOT',
        desc: 'One of the RGB channels is hidden! Two channels are shown, and you need to guess the third one. Random hidden channel each round.',
        meta: '5 rounds • Standard points'
      },
      illusion: {
        name: 'ILLUSION',
        desc: 'Color is shown on a colored background. Optical illusions distort perception! Can you guess the real color, ignoring the background influence?',
        meta: '5 rounds • Standard points'
      },
      lynx: {
        name: 'LYNX EYE',
        desc: 'You have 3 attempts for each color. After each failed attempt, you get a hint (too dark, need more green, etc.). On failure - only 30% points.',
        meta: '5 rounds • 3 attempts per round'
      },
      complement: {
        name: 'COMPLEMENTS',
        desc: 'A reference color is shown. Find its opposite on the color wheel (Hue + 180°). Saturation and lightness are preserved.',
        meta: '5 rounds • Standard points'
      },
      streak: {
        name: 'MARATHON',
        desc: 'Survival mode! Start with 50% accuracy requirement. Every 3 rounds, requirement increases by 5% (max 95%). One mistake - game over!',
        meta: 'Until first mistake • Increasing difficulty'
      }
    },

    // Privacy screen
    privacyTitle: 'PRIVACY POLICY',
    privacyText: 'ColorGuess does not collect personal data. We use browser localStorage to save settings and records only on your device. No information is transmitted to servers.'
  }
}

// Get saved language or default to Russian
export function getLanguage() {
  // First check if there's a saved preference
  const saved = localStorage.getItem('hexguess_language')
  if (saved) return saved

  // If not saved, try to get from Yandex SDK (will be set in main.js)
  const yandexLang = localStorage.getItem('hexguess_yandex_lang')
  if (yandexLang) return yandexLang

  // Default to Russian
  return 'ru'
}

// Save language preference
export function setLanguage(lang) {
  localStorage.setItem('hexguess_language', lang)
}

// Get translation
export function t(key, lang = 'ru') {
  const keys = key.split('.')
  let value = translations[lang]

  for (const k of keys) {
    if (value && typeof value === 'object') {
      value = value[k]
    } else {
      return key // Return key if translation not found
    }
  }

  return value || key
}
