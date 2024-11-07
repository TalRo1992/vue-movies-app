<template>
  <div class="loading-spinner"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() { },
});
</script>

<style scoped>
.loading-spinner {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid #ccc;
  border-top: 2px solid #f5821e;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>