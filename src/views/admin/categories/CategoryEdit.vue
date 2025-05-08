<template>
    <div class="admin-container">
      <div class="admin-header">
        <h1>Edit Category</h1>
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
          >
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
          Save Changes
        </button>
  
        <div v-if="error" class="alert alert-danger mt-3">
          {{ error }}
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import APIService from '@/http/APIService';
  import { confirmDialog } from '@/utils/confirmDialog';
  
  export default {
    props: ['id'],
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
    async created() {
      await this.fetchCategory();
    },
    methods: {
      async fetchCategory() {
        try {
          const response = await APIService.getAdminCategory(this.id);
          this.category = response.data;
        } catch (error) {
          this.error = error.response?.data?.message || error.message;
        }
      },
      async submitForm() {
        const isConfirmed = await confirmDialog(
          'Confirm Changes',
          'Are you sure you want to update this category?',
          'warning'
        );
        
        if (!isConfirmed) return;
  
        this.loading = true;
        this.error = null;
  
        try {
          await APIService.updateAdminCategory(this.id, this.category);
          this.$router.push({
            name: 'AdminCategories',
            query: { updated: 'true' }
          });
        } catch (error) {
          this.error = error.response?.data?.message || error.message;
        } finally {
          this.loading = false;
        }
      }
    }
  }
  </script>