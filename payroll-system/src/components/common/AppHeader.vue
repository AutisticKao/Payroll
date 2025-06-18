<template>
  <header class="app-header">
    <div class="logo">
      <img src="@/assets/logo.svg" alt="Logo" />
    </div>
    <nav>
      <ul>
        <li><router-link to="/">Dashboard</router-link></li>
        <li><router-link to="/payroll">Manajemen Gaji</router-link></li>
        <li><router-link to="/salary-slips">Slip Gaji</router-link></li>
        <li><router-link to="/shifts">Manajemen Shift</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #dee2e6;
}

.logo img {
  height: 40px;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 1rem;
}

nav a {
  text-decoration: none;
  color: #007bff;
}

nav a:hover {
  text-decoration: underline;
}
</style>