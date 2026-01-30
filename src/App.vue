<template>
  <div class="app-container">
    <!-- Retro scanline effects -->
    <div class="scanlines"></div>
    <div class="scanline-animation"></div>

    <HexGuessGame />
  </div>
</template>

<script setup>
import HexGuessGame from './components/HexGuessGame.vue'
</script>

<style scoped>
.app-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  position: relative;
}

@media (max-width: 768px) {
  .app-container {
    padding: 10px;
  }
}

@media (max-width: 480px) {
  .app-container {
    padding: 5px;
    align-items: flex-start;
    padding-top: 10px;
  }
}

@media (max-width: 360px) {
  .app-container {
    padding: 3px;
  }
}

@media (max-height: 700px) {
  .app-container {
    align-items: flex-start;
    padding-top: 10px;
  }
}

@media (max-height: 600px) {
  .app-container {
    padding: 5px;
    min-height: auto;
  }
}
</style>
