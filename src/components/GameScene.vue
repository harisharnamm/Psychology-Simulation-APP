<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  scene: {
    title: string;
    description: string;
    gifUrl?: string;
    choices: { id: string; text: string }[];
  };
  onChoice: (choiceId: string) => void;
}>();
</script>

<template>
  <div class="scene">
    <h2>{{ scene.title }}</h2>
    <p class="description">{{ scene.description }}</p>
    
    <div class="gif-space">
      <!-- GIF will be placed here -->
      <img v-if="scene.gifUrl" :src="scene.gifUrl" alt="Scene visualization" class="scene-gif">
      <div v-else class="gif-placeholder">
        <!-- Placeholder when no GIF is present -->
      </div>
    </div>

    <div class="choices">
      <button
        v-for="choice in scene.choices"
        :key="choice.id"
        @click="onChoice(choice.id)"
        class="choice-btn"
      >
        {{ choice.text }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.scene {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.description {
  font-size: 1.2rem;
  margin: 20px 0;
  line-height: 1.6;
}

.gif-space {
  width: 100%;
  height: 300px;
  margin: 20px 0;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scene-gif {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.gif-placeholder {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.1);
}

.choices {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.choice-btn {
  width: 100%;
  padding: 15px;
  font-size: 1.1rem;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, background-color 0.2s;
}

.choice-btn:hover {
  background-color: #34495e;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .scene {
    padding: 15px;
  }
  
  .description {
    font-size: 1rem;
  }
  
  .gif-space {
    height: 200px;
  }
  
  .choice-btn {
    padding: 12px;
    font-size: 1rem;
  }
}
</style>
