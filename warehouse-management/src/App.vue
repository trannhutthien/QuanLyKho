<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
// Không import gì cả để tránh lỗi
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
}

#app {
  width: 100%;
  height: 100vh;
}
</style>


