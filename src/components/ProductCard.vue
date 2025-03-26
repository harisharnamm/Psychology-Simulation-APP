<script setup lang="ts">
import { defineProps, defineEmits, ref, onMounted } from 'vue';
import type { Product } from '../types';

const props = defineProps<{
  product: Product;
}>();

const emit = defineEmits<{
  (e: 'add-to-cart', product: Product): void;
  (e: 'track-interaction', type: string, details: any): void;
}>();

const timeSpent = ref(0);
const timer = ref<number | null>(null);
const showUrgencyMessage = ref(false);

onMounted(() => {
  timer.value = window.setInterval(() => {
    timeSpent.value += 1;
    if (timeSpent.value === 10 && props.product.stock < 5) {
      showUrgencyMessage.value = true;
      emit('track-interaction', 'urgency_trigger_shown', {
        productId: props.product.id,
        timeSpent: timeSpent.value
      });
    }
  }, 1000);

  return () => {
    if (timer.value) clearInterval(timer.value);
  };
});

const handleProductView = () => {
  emit('track-interaction', 'product_viewed', {
    productId: props.product.id,
    timeSpent: timeSpent.value
  });
};

const handleAddToCart = () => {
  emit('add-to-cart', props.product);
  emit('track-interaction', 'add_to_cart', {
    productId: props.product.id,
    timeSpent: timeSpent.value
  });
};
</script>

<template>
  <div class="product-card" @mouseenter="handleProductView">
    <div class="badges">
      <span v-if="product.sales > 5000" class="badge bestseller">Bestseller</span>
      <span v-if="product.stock < 5" class="badge low-stock">Low Stock</span>
    </div>
    
    <div class="product-image-container">
      <img :src="product.image" :alt="product.name" class="product-image">
    </div>
    
    <div class="product-info">
      <h3>{{ product.name }}</h3>
      <div class="rating">
        ★ {{ product.rating }} ({{ product.sales }} sold)
      </div>
      <p>{{ product.description }}</p>
      <div class="price-info">
        <span class="original-price">${{ product.originalPrice }}</span>
        <span class="current-price">${{ product.currentPrice }}</span>
        <span class="savings">Save {{ Math.round((1 - product.currentPrice/product.originalPrice) * 100) }}%</span>
      </div>
      
      <div v-if="showUrgencyMessage" class="urgency-message">
        🔥 Hot item! {{ product.stock }} left in stock
      </div>
      
      <button 
        @click="handleAddToCart"
        class="add-to-cart-btn"
        :class="{ 'pulse': showUrgencyMessage }"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  background: white;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.product-image-container {
  height: 250px;
  width: 100%;
  overflow: hidden;
  position: relative;
  background-color: #f8f8f8;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-info {
  padding: 20px;
}

.product-info h3 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 1.2rem;
  color: #333;
}

.product-info p {
  color: #666;
  font-size: 0.9rem;
  line-height: 1.5;
  margin-bottom: 15px;
}

.price-info {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  flex-wrap: wrap;
  gap: 8px;
}

.original-price {
  color: #999;
  text-decoration: line-through;
  font-size: 0.9rem;
}

.current-price {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin-left: 8px;
}

.add-to-cart-btn {
  width: 100%;
  padding: 12px;
  background-color: #2c3e50;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #1e2b38;
}

.badges {
  position: absolute;
  top: 10px;
  left: 10px;
  display: flex;
  gap: 5px;
}

.badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.bestseller {
  background: #ffd700;
  color: #000;
}

.low-stock {
  background: #ff4444;
  color: white;
}

.urgency-message {
  color: #ff4444;
  font-size: 0.9rem;
  margin: 8px 0;
  animation: fadeIn 0.5s ease-in;
}

.rating {
  color: #ffa41c;
  margin: 5px 0;
}

.savings {
  background: #28a745;
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-left: 8px;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
}

.pulse {
  animation: pulse 2s infinite;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
