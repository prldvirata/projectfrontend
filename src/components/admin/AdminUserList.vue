<template>
  <div v-if="successMessage" class="alert alert-success mt-3">
  {{ successMessage }}
</div>
  <div class="admin-container">
    <div class="admin-header">
      <h1>User Management</h1>
      <router-link to="/users/create" class="btn btn-primary">
        <i class="fas fa-plus"></i> Create User
      </router-link>
    </div>

    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <div v-else>
      <table class="table table-hover">
        <thead class="table-dark">
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Type</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.id }}</td>
            <td>{{ user.username }}</td>
            <td>{{ user.email }}</td>
            <td>
              <span :class="['badge', user.user_type === 2 ? 'bg-primary' : 'bg-secondary']">
                {{ user.user_type === 2 ? 'Admin' : 'Regular' }}
              </span>
            </td>
            <td>
              <span :class="['badge', user.is_active ? 'bg-success' : 'bg-danger']">
                {{ user.is_active ? 'Active' : 'Inactive' }}
              </span>
            </td>
            <td>
              <div class="btn-group">
                <router-link 
                  :to="`/users/edit/${user.id}`" 
                  class="btn btn-sm btn-outline-primary"
                >
                  <i class="fas fa-edit"></i>
                </router-link>
                <button 
                  @click="confirmDelete(user.id)" 
                  class="btn btn-sm btn-outline-danger"
                >
                  <i class="fas fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import APIService from '@/http/APIService';
import { confirmDialog } from '@/utils/confirmDialog';

export default {
  name: 'AdminUserList',
  data() {
  return {
    users: [],
    loading: true,
    error: null,
    successMessage: null
  }
},
async created() {
  // Check for success query parameter
  if (this.$route.query.created) {
    this.successMessage = 'User created successfully!';
    // Clear the query parameter
    this.$router.replace({ query: null });
  }
  await this.fetchUsers();
},
  methods: {
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      
      try {
        const response = await APIService.getAdminUserList();
        this.users = response.data;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        console.error('Error fetching users:', {
          error: error.response?.data,
          status: error.response?.status,
          headers: error.config?.headers
        });
      } finally {
        this.loading = false;
      }
    },
    async confirmDelete(userId) {
      const user = this.users.find(u => u.id === userId);
      const isConfirmed = await confirmDialog(
        `Delete User ${user.username}?`,
        'This action cannot be undone',
        'warning'
      );
      
      if (isConfirmed) {
        try {
          await APIService.deleteAdminUser(userId);
          this.users = this.users.filter(u => u.id !== userId);
        } catch (error) {
          alert(`Failed to delete user: ${error.response?.data?.message || error.message}`);
        }
      }
    }
  }
}
</script>

<style scoped>
.admin-container {
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.table {
  margin-top: 20px;
}

.btn-group {
  display: flex;
  gap: 5px;
}
</style>