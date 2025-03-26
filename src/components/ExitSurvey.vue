<script setup lang="ts">
import { ref } from 'vue';
import type { ExperimentState } from '../types';
import { surveyQuestions } from '../data/survey';

const props = defineProps<{
  state: ExperimentState;
}>();

const emit = defineEmits<{
  (e: 'complete', answers: Record<string, any>): void;
}>();

const answers = ref<Record<string, any>>({});

const handleSubmit = () => {
  emit('complete', answers.value);
};
</script>

<template>
  <div class="exit-survey">
    <h2>Final Survey</h2>
    <p>Please answer these quick questions about your shopping experience:</p>

    <form @submit.prevent="handleSubmit">
      <div v-for="question in surveyQuestions" :key="question.id" class="question">
        <template v-if="!question.condition || question.condition(state)">
          <p>{{ question.text }}</p>
          
          <div v-if="question.type === 'likert'" class="likert-scale">
            <label v-for="n in 5" :key="n">
              <input
                type="radio"
                :name="question.id"
                :value="n"
                v-model="answers[question.id]"
                required
              >
              {{ n }}
            </label>
          </div>

          <div v-else-if="question.type === 'yesno'" class="yes-no">
            <label>
              <input
                type="radio"
                :name="question.id"
                value="yes"
                v-model="answers[question.id]"
                required
              >
              Yes
            </label>
            <label>
              <input
                type="radio"
                :name="question.id"
                value="no"
                v-model="answers[question.id]"
                required
              >
              No
            </label>
          </div>
        </template>
      </div>

      <button type="submit" class="submit-btn">Complete Survey</button>
    </form>
  </div>
</template>

<style scoped>
.exit-survey {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
}

.question {
  margin-bottom: 2rem;
}

.likert-scale {
  display: flex;
  justify-content: space-between;
  max-width: 300px;
  margin: 1rem 0;
}

.yes-no {
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 2rem;
}

label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
</style>
