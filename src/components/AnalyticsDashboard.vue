<script setup lang="ts">
import { computed } from 'vue';
import type { ExperimentState, InteractionEvent } from '../types';

const props = defineProps<{
  state: ExperimentState;
}>();

const totalTimeSpent = computed(() => {
  return Math.floor((Date.now() - props.state.startTime) / 1000);
});

const conversionRate = computed(() => {
  const viewedProducts = props.state.viewedProducts.size;
  const purchasedProducts = props.state.cart.length;
  return viewedProducts ? (purchasedProducts / viewedProducts) * 100 : 0;
});

const averageViewTime = computed(() => {
  const viewEvents = props.state.interactionLog.filter(
    event => event.type === 'product_viewed'
  );
  if (!viewEvents.length) return 0;
  const totalTime = viewEvents.reduce((sum, event) => sum + event.details.timeSpent, 0);
  return totalTime / viewEvents.length;
});

const triggerEffectiveness = computed(() => {
  const triggerShown = props.state.interactionLog.filter(
    event => event.type === 'urgency_trigger_shown'
  );
  const purchases = new Set(
    props.state.cart.map(product => product.id)
  );
  
  const effectiveCount = triggerShown.filter(
    event => purchases.has(event.details.productId)
  ).length;
  
  return triggerShown.length ? 
    (effectiveCount / triggerShown.length) * 100 : 0;
});
</script>

<template>
  <div class="analytics-dashboard">
    <h2>Session Analytics</h2>
    
    <div class="metrics-grid">
      <div class="metric-card">
        <h3>Session Duration</h3>
        <div class="value">{{ totalTimeSpent }}s</div>
      </div>
      
      <div class="metric-card">
        <h3>Conversion Rate</h3>
        <div class="value">{{ conversionRate.toFixed(1) }}%</div>
      </div>
      
      <div class="metric-card">
        <h3>Avg. View Time</h3>
        <div class="value">{{ averageViewTime.toFixed(1) }}s</div>
      </div>
      
      <div class="metric-card">
        <h3>Trigger Effectiveness</h3>
        <div class="value">{{ triggerEffectiveness.toFixed(1) }}%</div>
      </div>
    </div>

    <div class="interaction-timeline">
      <h3>Interaction Timeline</h3>
      <div class="timeline">
        <div 
          v-for="(event, index) in state.interactionLog"
          :key="index"
          class="timeline-event"
        >
          <div class="event-time">
            {{ new Date(event.timestamp).toLocaleTimeString() }}
          </div>
          <div class="event-type">{{ event.type }}</div>
          <div class="event-details">
            {{ JSON.stringify(event.details) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.analytics-dashboard {
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.metric-card {
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.metric-card h3 {
  margin: 0;
  font-size: 0.9rem;
  color: #6c757d;
}

.value {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 10px;
}

.interaction-timeline {
  margin-top: 30px;
}

.timeline {
  margin-top: 15px;
  max-height: 300px;
  overflow-y: auto;
}

.timeline-event {
  padding: 10px;
  border-left: 3px solid #2c3e50;
  margin-bottom: 10px;
  background: white;
}

.event-time {
  font-size: 0.8rem;
  color: #6c757d;
}

.event-type {
  font-weight: bold;
  margin: 5px 0;
}

.event-details {
  font-size: 0.9rem;
  color: #495057;
  word-break: break-all;
}

@media (max-width: 768px) {
  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
</style>
