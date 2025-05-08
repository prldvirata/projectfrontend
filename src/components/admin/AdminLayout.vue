<template>
  <div class="admin-layout">
    <div class="admin-sidebar">
      <h2>Admin Dashboard</h2>
      <nav>
        <router-link to="/admin/users">Users</router-link>
        <router-link to="/admin/categories">Expense Categories</router-link>
        <router-link to="/admin/budgets">User Budgets</router-link>
      </nav>
    </div>
    <div class="admin-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLayout'
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.admin-sidebar {
  width: 250px;
  background: #2c463f;
  padding: 20px;
  color: white;
}

.admin-sidebar nav {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
}

.admin-sidebar a {
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 4px;
}

.admin-sidebar a:hover {
  background: black;
}

.admin-sidebar a.router-link-exact-active {
  background: White;
  color: black;
}

.admin-content {
  flex: 1;
  padding: 20px;
}
</style>