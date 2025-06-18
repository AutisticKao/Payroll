<template>
  <div id="app">
    <AppHeader />
    <div class="main-content">
      <AppSidebar />
      <router-view />
    </div>
    <AppFooter />
  </div>
</template>

<script>
import AppHeader from './components/common/AppHeader.vue';
import AppSidebar from './components/common/AppSidebar.vue';
import AppFooter from './components/common/AppFooter.vue';

export default {
  components: {
    AppHeader,
    AppSidebar,
    AppFooter
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.main-content {
  display: flex;
}
</style>