<template>
    <div class="search-input-container">
      <input
        type="text"
        class="search-input"
        v-model="query"
        :placeholder="placeholder"
        @input="handleInput"
      />
      <LoadingSpinner v-if="isLoading" style="right: 0.5rem;"/>
      <!-- <div v-if="isLoading" class="loading-spinner"></div> -->
  
      <div v-if="isDropdownVisible && query && results.length" class="search-dropdown">
        <div class="dropdown-item" v-for="(item, index) in results" :key="index" @click="handleItemClick(item)">
          {{ item.title || item.name }}
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { debounce } from '@/utils/debounce';
    import { defineComponent, ref, watch, PropType } from 'vue';
    import LoadingSpinner from './LoadingSpinner.vue' 
  
  export default defineComponent({
    components: {LoadingSpinner},
    props: {
      placeholder: {
        type: String,
        default: 'Search movies...',
      },
      isLoading: {
        type: Boolean,
        default: false,
      },
      results: {
        type: Array as PropType<any[]>,
        default: () => [],
      },
    },
    emits: ['search', 'select'],
    setup(props, { emit }) {
      const query = ref<string>('');
      const isDropdownVisible = ref<boolean>(false);
  
      const debouncedSearch = debounce((searchTerm: string) => { // Use debounce to reduce api calls
        emit('search', searchTerm);
        isDropdownVisible.value = true;
      }, 1000);
  
      const handleInput = () => {
        debouncedSearch(query.value);
      };
  
      const handleItemClick = (item: any) => {
        emit('select', item); 
        isDropdownVisible.value = false;
      };
  
      watch(query, (newQuery) => {
        if (!newQuery) {
          isDropdownVisible.value = false;
        }
      });
  
      return { query, isDropdownVisible, handleInput, handleItemClick };
    },
  });
  </script>
  
<style scoped>
.search-input-container {
  position: relative;
  display: flex;
  align-items: center;
  width: 300px; 
  margin: 0 auto;
}

.search-input {
  flex: 1;
  padding: 0.5rem 2rem 0.5rem 0.75rem; 
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 0.9rem;
}

/* .loading-spinner {
  position: absolute;
  right: 0.5rem; 
  width: 16px; 
  height: 16px;
  border: 2px solid #ccc; 
  border-top: 2px solid #f5821e;
  border-radius: 50%;
  animation: spin 1s linear infinite;
} */

/* @keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
} */

.search-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  color: black;
  border-radius: 4px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 10;
}

.dropdown-item {
  padding: 0.5rem;
  cursor: pointer;
}

.dropdown-item:hover {
  background-color: #f0f0f0;
}

</style>
  