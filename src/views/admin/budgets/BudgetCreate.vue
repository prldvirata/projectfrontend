<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1>Create New Budget</h1>
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
        Create Budget
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
      budget: {
        user_id: null,  // Changed from user to user_id
        category_id: null,  // Changed from category to category_id
        amount: 0,
        period: 'monthly',
        start_date: new Date().toISOString().split('T')[0],
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
    await this.fetchOptions();
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
        
        // Set default selections if needed
        if (this.users.length > 0 && !this.budget.user_id) {
          this.budget.user_id = this.users[0].id;
          console.log("user_id", this.budget.user_id);
        }
        if (this.categories.length > 0 && !this.budget.category_id) {
          this.budget.category_id = this.categories[0].id;
        }
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    },
    async submitForm() {
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

        console.log('Sending:', budgetData);
        
        await APIService.createAdminBudget(budgetData);
        this.$router.push({
          name: 'AdminBudgets',
          query: { created: 'true' }
        });
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },
    handleError(error) {
      console.error('Creation Error:', error);
      if (error.response?.data) {
        // Improved error display
        if (typeof error.response.data === 'string') {
          this.error = error.response.data;
        } else {
          this.error = Object.entries(error.response.data)
            .map(([field, errors]) => {
              if (Array.isArray(errors)) {
                return `${field}: ${errors.join(', ')}`;
              }
              return `${field}: ${errors}`;
            })
            .join('\n');
        }
      } else {
        this.error = 'Failed to create budget. Please check your entries.';
      }
    }
  }
}
</script>