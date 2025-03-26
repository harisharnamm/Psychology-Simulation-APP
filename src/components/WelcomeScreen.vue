<script setup lang="ts">
const emit = defineEmits(['continue']);
</script>

<template>
  <div class="welcome">
    <h1>Welcome to our online shopping experiment!</h1>
    <p>Your choices will shape the shopping experience. Answer honestly and shop as you normally would.</p>
    <div class="disclaimer">
      <p>This is a simulation for research purposes. No actual purchases will be made.</p>
    </div>
    <button @click="emit('continue')" class="continue-btn">Start Experiment</button>
  </div>
</template>

<style scoped>
.welcome {
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.disclaimer {
  margin: 2rem 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 8px;
}

.continue-btn {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
