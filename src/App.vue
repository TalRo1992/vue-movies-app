<template>
  <div id="app">
    <header>
      <h3><a href="/">Movie Explorer</a></h3>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style scoped>
/* Ensure full viewport height for the app */
html, body {
  height: 100%;
  margin: 0;
}

#app {
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Set the minimum height to the full viewport height */
  text-align: center;
  color: white;
  background: #000000;
}

/* Header Styling */
header {
  background-color: #f5821e;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 10px;
  height: 20px;
}

header a {
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
}

/* Main Content Styling */
main {
  flex: 1; /* Make main content area take available space */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}
</style>
