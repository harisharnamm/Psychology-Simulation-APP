<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  gameState: {
    anxiety: number;
    confidence: number;
    stress: number;
  };
}>();
</script>

<template>
  <div class="status-bar">
    <div class="stat">
      <span>Anxiety:</span>
      <div class="progress-bar">
        <div :style="{ width: `${gameState.anxiety}%` }" class="progress anxiety"></div>
      </div>
    </div>
    <div class="stat">
      <span>Confidence:</span>
      <div class="progress-bar">
        <div :style="{ width: `${gameState.confidence}%` }" class="progress confidence"></div>
      </div>
    </div>
    <div class="stat">
      <span>Stress:</span>
      <div class="progress-bar">
        <div :style="{ width: `${gameState.stress}%` }" class="progress stress"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.status-bar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin-bottom: 20px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 10px;
}

.progress-bar {
  flex: 1;
  height: 20px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
}

.progress {
  height: 100%;
  transition: width 0.3s ease;
}

.anxiety { background: #e74c3c; }
.confidence { background: #2ecc71; }
.stress { background: #f1c40f; }

@media (max-width: 768px) {
  .progress-bar {
    height: 15px;
  }
}
</style>
