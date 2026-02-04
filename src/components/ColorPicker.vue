<template>
  <div class="color-picker">
    <!-- Main color canvas (Saturation/Brightness) -->
    <div class="canvas-wrapper pixel-border">
      <canvas
        ref="colorCanvas"
        class="color-canvas"
        width="280"
        height="180"
        @mousedown="startColorPick"
        @mousemove="pickColor"
        @mouseup="stopColorPick"
        @mouseleave="stopColorPick"
        @touchstart="startColorPickTouch"
        @touchmove="pickColorTouch"
        @touchend="stopColorPick"
      ></canvas>
      <!-- Color indicator on canvas -->
      <div
        v-if="pickerActive || hasInteracted"
        class="color-indicator"
        :style="indicatorStyle"
      ></div>
    </div>

    <!-- Hue slider -->
    <div class="hue-slider-container">
      <label class="slider-label">{{ t('hueChannel', currentLanguage).toUpperCase() }}</label>
      <input
        type="range"
        min="0"
        max="360"
        v-model.number="hue"
        @input="updateColor"
        class="hue-slider"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import chroma from 'chroma-js'
import { t, getLanguage } from '../i18n'

const currentLanguage = ref(getLanguage())

// Listen for language changes
if (typeof window !== 'undefined') {
  window.addEventListener('yandex-language-detected', () => {
    currentLanguage.value = getLanguage()
  })
}

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:modelValue'])

const colorCanvas = ref(null)
const hue = ref(0)
const saturation = ref(100)
const brightness = ref(50)
const pickerActive = ref(false)
const hasInteracted = ref(false)
const indicatorX = ref(280) // Start at top right (full saturation, full brightness)
const indicatorY = ref(0)

const indicatorStyle = computed(() => ({
  left: `${indicatorX.value}px`,
  top: `${indicatorY.value}px`
}))

// Draw the color canvas based on current hue (optimized)
function drawColorCanvas() {
  if (!colorCanvas.value) return

  const canvas = colorCanvas.value
  const ctx = canvas.getContext('2d')
  const width = canvas.width
  const height = canvas.height

  // Fill with the base hue color at full saturation and brightness
  const baseColor = chroma.hsl(hue.value, 1, 0.5).hex()
  ctx.fillStyle = baseColor
  ctx.fillRect(0, 0, width, height)

  // Add white gradient from left to right (desaturation)
  const whiteGradient = ctx.createLinearGradient(0, 0, width, 0)
  whiteGradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  whiteGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
  ctx.fillStyle = whiteGradient
  ctx.fillRect(0, 0, width, height)

  // Add black gradient from top to bottom (darkness)
  const blackGradient = ctx.createLinearGradient(0, 0, 0, height)
  blackGradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
  blackGradient.addColorStop(1, 'rgba(0, 0, 0, 1)')
  ctx.fillStyle = blackGradient
  ctx.fillRect(0, 0, width, height)
}

function updateColor(skipRedraw = false) {
  if (!skipRedraw) {
    drawColorCanvas()
  }

  // Convert HSL to RGB
  const color = chroma.hsl(hue.value, saturation.value / 100, brightness.value / 100)
  const rgb = color.rgb()

  emit('update:modelValue', {
    r: Math.round(rgb[0]),
    g: Math.round(rgb[1]),
    b: Math.round(rgb[2])
  })
}

function startColorPick(e) {
  pickerActive.value = true
  hasInteracted.value = true
  pickColorFromEvent(e)
}

function startColorPickTouch(e) {
  e.preventDefault()
  pickerActive.value = true
  hasInteracted.value = true
  pickColorFromEvent(e.touches[0])
}

function pickColor(e) {
  if (pickerActive.value) {
    pickColorFromEvent(e)
  }
}

function pickColorTouch(e) {
  e.preventDefault()
  if (pickerActive.value) {
    pickColorFromEvent(e.touches[0])
  }
}

function pickColorFromEvent(e) {
  if (!colorCanvas.value) return

  const rect = colorCanvas.value.getBoundingClientRect()

  // Get mouse position relative to canvas display size
  const displayX = Math.max(0, Math.min(e.clientX - rect.left, rect.width))
  const displayY = Math.max(0, Math.min(e.clientY - rect.top, rect.height))

  // Calculate percentage position (0-100%)
  const percentX = (displayX / rect.width) * 100
  const percentY = (displayY / rect.height) * 100

  // Update indicator position (relative to actual canvas dimensions)
  indicatorX.value = displayX
  indicatorY.value = displayY

  // Calculate saturation and brightness from percentage
  saturation.value = percentX
  brightness.value = 100 - percentY

  // Skip canvas redraw during dragging for better performance
  updateColor(true)
}

function stopColorPick() {
  pickerActive.value = false
}

// Watch for external RGB changes and update picker
watch(() => props.modelValue, (newRgb) => {
  try {
    const color = chroma(newRgb.r, newRgb.g, newRgb.b)
    const hsl = color.hsl()

    if (!isNaN(hsl[0])) {
      hue.value = Math.round(hsl[0])
      saturation.value = Math.round(hsl[1] * 100)
      brightness.value = Math.round(hsl[2] * 100)

      // Update indicator position based on displayed size
      if (colorCanvas.value) {
        const rect = colorCanvas.value.getBoundingClientRect()
        indicatorX.value = (saturation.value / 100) * rect.width
        indicatorY.value = ((100 - brightness.value) / 100) * rect.height
      }

      drawColorCanvas()
    }
  } catch (e) {
    // Invalid color, ignore
  }
}, { deep: true })

// Initialize canvas on mount
onMounted(() => {
  // Initialize from current RGB value
  try {
    const color = chroma(props.modelValue.r, props.modelValue.g, props.modelValue.b)
    const hsl = color.hsl()

    if (!isNaN(hsl[0])) {
      hue.value = Math.round(hsl[0])
      saturation.value = Math.round(hsl[1] * 100)
      brightness.value = Math.round(hsl[2] * 100)

      // Set initial indicator position based on displayed size
      if (colorCanvas.value) {
        const rect = colorCanvas.value.getBoundingClientRect()
        indicatorX.value = (saturation.value / 100) * rect.width
        indicatorY.value = ((100 - brightness.value) / 100) * rect.height
      }
    }
  } catch (e) {
    // Use default values
  }

  drawColorCanvas()
})
</script>

<style scoped>
.color-picker {
  position: relative;
  width: 100%;
}

.canvas-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.color-canvas {
  width: 100%;
  height: 150px;
  cursor: crosshair;
  touch-action: none;
  display: block;
}

.color-indicator {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 3px solid white;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  box-shadow:
    0 0 0 1px rgba(0, 0, 0, 0.5),
    0 0 10px rgba(255, 255, 255, 0.5);
  z-index: 10;
  top: 0;
  left: 0;
  margin-top: 0;
  margin-left: 0;
}

.hue-slider-container {
  margin-top: 8px;
}

.slider-label {
  display: block;
  font-size: 10px;
  color: var(--text-secondary);
  margin-bottom: 8px;
  text-align: center;
  letter-spacing: 2px;
}

.hue-slider {
  width: 100%;
  height: 12px;
  -webkit-appearance: none;
  appearance: none;
  outline: none;
  border: 2px solid var(--text-primary);
  cursor: pointer;
  background: linear-gradient(
    to right,
    #ff0000 0%,
    #ffff00 17%,
    #00ff00 33%,
    #00ffff 50%,
    #0000ff 67%,
    #ff00ff 83%,
    #ff0000 100%
  );
}

.hue-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 20px;
  height: 20px;
  background: white;
  border: 3px solid var(--text-primary);
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.hue-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  background: white;
  border: 3px solid var(--text-primary);
  cursor: pointer;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

/* Mobile adaptations */
@media (max-width: 600px) {
  .color-canvas {
    height: 120px;
  }

  .color-indicator {
    width: 14px;
    height: 14px;
    border: 2px solid white;
  }

  .hue-slider-container {
    margin-top: 10px;
  }

  .slider-label {
    font-size: 9px;
    margin-bottom: 6px;
  }

  .hue-slider {
    height: 10px;
  }

  .hue-slider::-webkit-slider-thumb {
    width: 18px;
    height: 18px;
  }

  .hue-slider::-moz-range-thumb {
    width: 18px;
    height: 18px;
  }
}

@media (max-width: 480px) {
  .color-canvas {
    height: 110px;
  }

  .color-indicator {
    width: 12px;
    height: 12px;
    border: 2px solid white;
  }

  .slider-label {
    font-size: 8px;
    margin-bottom: 5px;
    letter-spacing: 1.5px;
  }

  .hue-slider {
    height: 10px;
  }

  .hue-slider::-webkit-slider-thumb {
    width: 16px;
    height: 16px;
    border: 2px solid var(--text-primary);
  }

  .hue-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    border: 2px solid var(--text-primary);
  }
}

@media (max-width: 360px) {
  .color-canvas {
    height: 90px;
  }

  .color-indicator {
    width: 10px;
    height: 10px;
  }

  .slider-label {
    font-size: 7px;
    letter-spacing: 1px;
  }
}

@media (max-height: 750px) {
  .color-canvas {
    height: 100px;
  }

  .hue-slider-container {
    margin-top: 6px;
  }

  .slider-label {
    font-size: 8px;
    margin-bottom: 5px;
  }
}

@media (max-height: 700px) {
  .color-canvas {
    height: 90px;
  }

  .hue-slider-container {
    margin-top: 6px;
  }
}

@media (max-height: 600px) {
  .color-canvas {
    height: 80px;
  }

  .color-indicator {
    width: 10px;
    height: 10px;
    border: 2px solid white;
  }

  .hue-slider-container {
    margin-top: 5px;
  }

  .slider-label {
    margin-bottom: 3px;
    font-size: 7px;
  }
}
</style>
