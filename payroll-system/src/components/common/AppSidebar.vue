<template>
  <aside class="app-sidebar">
    <div class="sidebar-header">
      <h2>Payroll System</h2>
    </div>
    <nav>
      <ul>
        <li><router-link to="/dashboard">Dashboard</router-link></li>
        <li><router-link to="/payroll">Manajemen Gaji</router-link></li>
        <li><router-link to="/salary-slips">Slip Gaji</router-link></li>
        <li><router-link to="/shifts">Manajemen Shift</router-link></li>
      </ul>
    </nav>
  </aside>
</template>

<script>
export default {
  name: 'AppSidebar',
}
</script>

<style scoped>
.app-sidebar {
  width: 250px;
  background-color: #f8f9fa;
  padding: 20px;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  margin-bottom: 20px;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  margin: 10px 0;
}

nav ul li a {
  text-decoration: none;
  color: #333;
}

nav ul li a:hover {
  color: #007bff;
}
</style>