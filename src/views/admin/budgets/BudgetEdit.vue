<template>
    <div class="admin-container">
      <div class="admin-header">
        <h1>Edit Budget</h1>
        <router-link :to="{ name: 'AdminBudgets' }" class="btn btn-secondary">
          <i class="fas fa-arrow-left"></i> Back
        </router-link>
      </div>
  
      <form @submit.prevent="submitForm">
        <div class="row g-3">
          <!-- User Selection -->
          <div class="col-md-6">
  <label class="form-label">User</label>
  <select class="form-select" v-model="budget.user_id" required>
    <option v-for="user in users" :key="user.id" :value="user.id">
      {{ user.username }}
    </option>
  </select>
</div>
  
          <!-- Category Selection -->
          <div class="col-md-6">
  <label class="form-label">Category</label>
  <select class="form-select" v-model="budget.category_id" required>
    <option v-for="category in categories" :key="category.id" :value="category.id">
      {{ category.name }}
    </option>
  </select>
</div>
  
          <!-- Amount -->
          <div class="col-md-6">
            <label class="form-label">Amount</label>
            <div class="input-group">
              <span class="input-group-text">$</span>
              <input
                type="number"
                class="form-control"
                v-model="budget.amount"
                step="0.01"
                min="0"
                required
              >
            </div>
          </div>
  
          <!-- Period Selection -->
          <div class="col-md-6">
            <label class="form-label">Period</label>
            <select class="form-select" v-model="budget.period" required>
              <option v-for="period in periodOptions" :key="period.value" :value="period.value">
                {{ period.label }}
              </option>
            </select>
          </div>
  
          <!-- Dates -->
          <div class="col-md-6">
            <label class="form-label">Start Date</label>
            <input
              type="date"
              class="form-control"
              v-model="budget.start_date"
              required
            >
          </div>
  
          <div class="col-md-6">
            <label class="form-label">End Date (optional)</label>
            <input
              type="date"
              class="form-control"
              v-model="budget.end_date"
            >
          </div>
        </div>
  
        <button type="submit" class="btn btn-primary mt-4" :disabled="loading">
          <span v-if="loading" class="spinner-border spinner-border-sm"></span>
          Update Budget
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
        budget: {
          user_id: null,  // Changed from user to user_id
          category_id: null,  // Changed from category to category_id
          amount: 0,
          period: 'monthly',
          start_date: '',
          end_date: null
        },
        users: [],
        categories: [],
        periodOptions: [
          { value: 'daily', label: 'Daily' },
          { value: 'weekly', label: 'Weekly' },
          { value: 'biweekly', label: 'Bi-Weekly' },
          { value: 'monthly', label: 'Monthly' },
          { value: 'six_month', label: 'Six Month' },
          { value: 'yearly', label: 'Yearly' },
          { value: 'five_year', label: 'Five Year' },
          { value: 'ten_year', label: 'Ten Year' }
        ],
        loading: false,
        error: null
      }
    },
    async created() {
      await Promise.all([this.fetchOptions(), this.fetchBudget()]);
    },
    methods: {
      async fetchOptions() {
        try {
          const [usersRes, categoriesRes] = await Promise.all([
            APIService.getAdminUserList(),
            APIService.getAdminCategoryList()
          ]);
          this.users = usersRes.data;
          this.categories = categoriesRes.data;
        } catch (error) {
          console.error('Error fetching options:', error);
        }
      },
      async fetchBudget() {
  this.loading = true;
  try {
    const response = await APIService.getAdminBudget(this.id);
    const data = response.data;
    
    // Handle both nested (object) and flat (ID) responses
    const userId = data.user?.id || data.user_id || data.user;
    const categoryId = data.category?.id || data.category_id || data.category;
    
    this.budget = {
      user_id: userId,
      category_id: categoryId,
      amount: parseFloat(data.amount),
      period: data.period,
      start_date: data.start_date.split('T')[0],
      end_date: data.end_date ? data.end_date.split('T')[0] : null
    };
    
    console.log('Loaded budget:', this.budget); // Debug log
  } catch (error) {
    console.error('Error fetching budget:', error);
    this.error = error.response?.data?.message || error.message;
  } finally {
    this.loading = false;
  }
},
      async submitForm() {
        const isConfirmed = await confirmDialog(
          'Confirm Changes',
          'Are you sure you want to update this budget?',
          'warning'
        );
        if (!isConfirmed) return;
  
        this.loading = true;
        this.error = null;
  
        try {
          const budgetData = {
            user_id: this.budget.user_id,  // Changed to match serializer
            category_id: this.budget.category_id,  // Changed to match serializer
            amount: parseFloat(this.budget.amount),
            period: this.budget.period,
            start_date: this.budget.start_date,
            end_date: this.budget.end_date || null
          };
  
          console.log('Sending update:', budgetData);  // Debug log
          
          await APIService.updateAdminBudget(this.id, budgetData);
          this.$router.push({
            name: 'AdminBudgets',
            query: { updated: 'true' }
          });
        } catch (error) {
          console.error('Update Error:', error);
          if (error.response?.data) {
            this.error = Object.entries(error.response.data)
              .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
              .join('\n');
          } else {
            this.error = 'Failed to update budget. Please check your entries.';
          }
        } finally {
          this.loading = false;
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Reuse the same styles as BudgetCreate.vue */
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