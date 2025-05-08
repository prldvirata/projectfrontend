<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1>Expense Category Management</h1>
      <router-link 
        :to="{ name: 'CategoryCreate' }" 
        class="btn btn-primary"
      >
        <i class="fas fa-plus"></i> Create Category
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
            <th>Name</th>
            <th>Created By</th>
            <th>Default</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>{{ category.name }}</td>
            <td>{{ category.created_by.username }}</td>
            <td>
              <span :class="['badge', category.is_default ? 'bg-success' : 'bg-secondary']">
                {{ category.is_default ? 'Yes' : 'No' }}
              </span>
            </td>
            <td>
              <div class="btn-group">
                <router-link 
                  :to="{ name: 'CategoryEdit', params: { id: category.id } }"
                  class="btn btn-sm btn-outline-primary"
                >
                  <i class="fas fa-edit"></i> Edit
                </router-link>
                <button 
                  @click="confirmDelete(category.id)" 
                  class="btn btn-sm btn-outline-danger"
                >
                  <i class="fas fa-trash"></i> Delete
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
  name: 'AdminCategoryList',
  data() {
    return {
      categories: [],
      loading: true,
      error: null
    }
  },
  async created() {
    await this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await APIService.getAdminCategoryList();
        this.categories = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
        this.error = error.response?.data?.message || error.message;
      } finally {
        this.loading = false;
      }
    },
    async confirmDelete(categoryId) {
  const category = this.categories.find(c => c.id === categoryId);
  const { isConfirmed } = await confirmDialog(
    `Delete Category "${category.name}"?`,
    'This action cannot be undone',
    'warning'  // Simple string value for icon type
  );
  
  if (isConfirmed) {
    try {
      await APIService.deleteAdminCategory(categoryId);
      this.categories = this.categories.filter(c => c.id !== categoryId);
    } catch (error) {
      console.error('Delete error:', error);
      alert(`Failed to delete category: ${error.response?.data?.message || error.message}`);
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

.badge {
  font-size: 0.9em;
  padding: 0.5em 0.75em;
}
</style>