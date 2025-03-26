<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import WelcomeScreen from './components/WelcomeScreen.vue';
import DemographicsForm from './components/DemographicsForm.vue';
import ProductCard from './components/ProductCard.vue';
import CheckoutProcess from './components/CheckoutProcess.vue';
import ExitSurvey from './components/ExitSurvey.vue';
import AnalyticsDashboard from './components/AnalyticsDashboard.vue';
import { products } from './data/products';
import type { ExperimentState, DemographicData, Product, InteractionEvent } from './types';

// Initialize experiment state
const state = reactive<ExperimentState>({
  currentStep: 'welcome',
  demographics: null,
  cart: [],
  viewedProducts: new Set<string>(),
  interactionLog: [],
  startTime: Date.now()
});

// Navigate between experiment steps
const setStep = (step: ExperimentState['currentStep']) => {
  state.currentStep = step;
};

// Handle demographic form submission
const handleDemographicsSubmit = (data: DemographicData) => {
  state.demographics = data;
  setStep('shopping');
  
  // Log this interaction
  logInteraction({
    type: 'demographics_submitted',
    timestamp: Date.now(),
    details: { data }
  });
};

// Add a product to the cart
const addToCart = (product: Product) => {
  state.cart.push(product);
  
  logInteraction({
    type: 'product_added_to_cart',
    timestamp: Date.now(),
    details: { productId: product.id }
  });
};

// Handle checkout completion
const handleCheckoutComplete = (checkoutData: any) => {
  logInteraction({
    type: 'checkout_complete',
    timestamp: Date.now(),
    details: checkoutData
  });
  
  setStep('survey');
};

// Handle survey completion
const handleSurveyComplete = (answers: Record<string, any>) => {
  logInteraction({
    type: 'survey_complete',
    timestamp: Date.now(),
    details: { answers }
  });
  
  // Here you would typically send the data to a server
  console.log('Experiment complete', {
    demographics: state.demographics,
    interactions: state.interactionLog,
    surveyAnswers: answers
  });
};

// Log an interaction event
const logInteraction = (event: InteractionEvent) => {
  state.interactionLog.push(event);
};

// Handle tracking interactions from components
const handleTrackInteraction = (type: string, details: any) => {
  logInteraction({
    type,
    timestamp: Date.now(),
    details
  });
};
</script>

<template>
  <div class="app">
    <header>
      <h1>Psychology Shopping Experiment</h1>
    </header>
    
    <main>
      <WelcomeScreen 
        v-if="state.currentStep === 'welcome'" 
        @continue="setStep('demographics')" 
      />
      
      <DemographicsForm 
        v-if="state.currentStep === 'demographics'" 
        @submit="handleDemographicsSubmit" 
      />
      
      <div v-if="state.currentStep === 'shopping'" class="shopping-view">
        <div class="cart-summary">
          <h3>Cart ({{ state.cart.length }} items)</h3>
          <button 
            v-if="state.cart.length > 0"
            @click="setStep('checkout')" 
            class="checkout-btn"
          >
            Proceed to Checkout
          </button>
        </div>
        
        <div class="products-grid">
          <ProductCard
            v-for="product in products"
            :key="product.id"
            :product="product"
            @add-to-cart="addToCart"
            @track-interaction="handleTrackInteraction"
          />
        </div>
      </div>
      
      <CheckoutProcess
        v-if="state.currentStep === 'checkout'"
        :cart="state.cart"
        @add-to-cart="addToCart"
        :onComplete="handleCheckoutComplete"
      />
      
      <div v-if="state.currentStep === 'survey'" class="survey-container">
        <ExitSurvey 
          :state="state" 
          @complete="handleSurveyComplete" 
        />
        
        <AnalyticsDashboard 
          :state="state"
        />
      </div>
    </main>
  </div>
</template>

<style scoped>
.app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

header {
  margin-bottom: 2rem;
  text-align: center;
}

.shopping-view {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.cart-summary {
  background: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.checkout-btn {
  background: #2c3e50;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.survey-container {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 992px) {
  .survey-container {
    grid-template-columns: 1fr 1fr;
  }
}
</style>