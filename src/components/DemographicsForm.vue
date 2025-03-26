<script setup lang="ts">
import { ref } from 'vue';
import type { DemographicData } from '../types';

const emit = defineEmits(['submit']);

const formData = ref<DemographicData>({
  age: '',
  gender: '',
  shoppingFrequency: '',
  preferredCategories: []
});

const submitForm = () => {
  emit('submit', formData.value);
};
</script>

<template>
  <form @submit.prevent="submitForm" class="demographics-form">
    <h2>Tell us about yourself</h2>
    
    <div class="form-group">
      <label for="age">Age Group</label>
      <select v-model="formData.age" id="age" required>
        <option value="18-24">18-24</option>
        <option value="25-34">25-34</option>
        <option value="35-44">35-44</option>
        <option value="45+">45+</option>
      </select>
    </div>

    <div class="form-group">
      <label for="gender">Gender</label>
      <select v-model="formData.gender" id="gender" required>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
        <option value="prefer-not">Prefer not to say</option>
      </select>
    </div>

    <div class="form-group">
      <label for="frequency">How often do you shop online?</label>
      <select v-model="formData.shoppingFrequency" id="frequency" required>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="rarely">Rarely</option>
      </select>
    </div>

    <button type="submit" class="submit-btn">Continue to Shop</button>
  </form>
</template>

<style scoped>
.demographics-form {
  max-width: 500px;
  margin: 0 auto;
  padding: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
}

select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submit-btn {
  width: 100%;
  padding: 1rem;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
