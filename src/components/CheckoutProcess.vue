<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Product } from '../types';
import { upsellProducts, premiumUpsellProducts } from '../data/products';

const props = defineProps<{
  cart: Product[];
  onComplete: (data: any) => void;
}>();

const timer = ref<number>(300);
const showUrgencyAlert = ref(false);

const subtotal = computed(() => {
  return props.cart.reduce((sum, item) => sum + item.currentPrice, 0);
});

const savings = computed(() => {
  return props.cart.reduce((sum, item) => sum + (item.originalPrice - item.currentPrice), 0);
});

const recommendedProducts = computed(() => {
  return subtotal.value < 100 ? upsellProducts : premiumUpsellProducts;
});

const startCheckoutTimer = () => {
  const interval = setInterval(() => {
    timer.value--;
    if (timer.value <= 60) {
      showUrgencyAlert.value = true;
    }
    if (timer.value <= 0) {
      clearInterval(interval);
    }
  }, 1000);
};

const handleCheckout = () => {
  props.onComplete({
    total: subtotal.value,
    savings: savings.value,
    timestamp: Date.now()
  });
};

// Start timer when component mounts
startCheckoutTimer();
</script>

<template>
  <div class="checkout">
    <h2>Checkout</h2>
    
    <!-- Cart Summary -->
    <div class="cart-summary">
      <h3>Order Summary</h3>
      <div v-for="item in cart" :key="item.id" class="cart-item">
        <span>{{ item.name }}</span>
        <span>${{ item.currentPrice }}</span>
      </div>
      
      <div class="savings-alert" v-if="savings > 0">
        <strong>You saved ${{ savings }}!</strong>
      </div>
      
      <div class="total">
        <span>Total:</span>
        <span>${{ subtotal }}</span>
      </div>
    </div>

    <!-- Urgency Timer -->
    <div v-if="showUrgencyAlert" class="urgency-alert">
      ⚠️ Hurry! Your cart will expire in {{ Math.floor(timer / 60) }}:{{ timer % 60 }} minutes
    </div>

    <!-- Upsell Recommendations -->
    <div class="upsell-section" v-if="recommendedProducts.length">
      <h3>Recommended Add-ons</h3>
      <div class="upsell-grid">
        <div v-for="product in recommendedProducts" :key="product.id" class="upsell-item">
          <img :src="product.image" :alt="product.name">
          <h4>{{ product.name }}</h4>
          <p>${{ product.currentPrice }}</p>
          <button @click="$emit('add-to-cart', product)" class="add-upsell">Add</button>
        </div>
      </div>
    </div>

    <!-- Checkout Button -->
    <button @click="handleCheckout" class="checkout-button">
      Complete Purchase
    </button>
  </div>
</template>

<style scoped>
.checkout {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
}

.cart-summary {
  background: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #dee2e6;
}

.savings-alert {
  margin: 1rem 0;
  padding: 0.5rem;
  background: #d4edda;
  color: #155724;
  border-radius: 4px;
  text-align: center;
}

.total {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 2px solid #dee2e6;
  font-weight: bold;
  font-size: 1.2rem;
}

.urgency-alert {
  background: #fff3cd;
  color: #856404;
  padding: 1rem;
  border-radius: 4px;
  margin: 1rem 0;
  text-align: center;
}

.upsell-section {
  margin: 2rem 0;
}

.upsell-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.upsell-item {
  padding: 1rem;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  text-align: center;
}

.upsell-item img {
  width: 100px;
  height: 100px;
  object-fit: contain;
}

.add-upsell {
  background: #28a745;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.checkout-button {
  width: 100%;
  padding: 1rem;
  background: #2c3e50;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 2rem;
}

.checkout-button:hover {
  background: #34495e;
}

@media (max-width: 768px) {
  .checkout {
    padding: 1rem;
  }
  
  .upsell-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
