<template>
    <div class="admin-container">
      <div class="admin-header">
        <h1>Create New Category</h1>
        <router-link :to="{ name: 'AdminCategories' }" class="btn btn-secondary">
          <i class="fas fa-arrow-left"></i> Back
        </router-link>
      </div>
  
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label class="form-label">Category Name</label>
          <input
            type="text"
            class="form-control"
            v-model="category.name"
            required
            minlength="2"
            maxlength="100"
          >
          <small class="form-text text-muted">Between 2-100 characters</small>
        </div>
  
        <div class="mb-3 form-check">
          <input
            type="checkbox"
            class="form-check-input"
            id="isDefault"
            v-model="category.is_default"
          >
          <label class="form-check-label" for="isDefault">Default Category</label>
        </div>
  
        <button type="submit" class="btn btn-primary" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm"></span>
          Create Category
        </button>
  
        <div v-if="error" class="alert alert-danger mt-3">
          {{ error }}
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import APIService from '@/http/APIService';
  
  export default {
    data() {
      return {
        category: {
          name: '',
          is_default: false
        },
        loading: false,
        error: null
      }
    },
    methods: {
      async submitForm() {
        this.loading = true;
        this.error = null;
  
        try {
          // Trim and validate input
          const categoryData = {
            name: this.category.name.trim(),
            is_default: this.category.is_default
          };
  
          if (!categoryData.name) {
            throw new Error('Category name is required');
          }
  
          const response = await APIService.createAdminCategory(categoryData);
          
          if (response.status === 201) {
            this.$router.push({
              name: 'AdminCategories',
              query: { created: 'true' }
            });
          }
        } catch (error) {
          console.error('Creation Error:', {
            status: error.response?.status,
            data: error.response?.data,
            config: error.config
          });
  
          // Handle validation errors
          if (error.response?.data) {
            if (typeof error.response.data === 'object') {
              this.error = Object.entries(error.response.data)
                .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
                .join('\n');
            } else {
              this.error = error.response.data;
            }
          } else {
            this.error = error.message || 'Failed to create category. Please check your entries.';
          }
        } finally {
          this.loading = false;
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
  
  .form-text.text-muted {
    font-size: 0.875em;
    color: #6c757d !important;
  }
  </style>