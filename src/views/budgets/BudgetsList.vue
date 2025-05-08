<template>
    <div class="budget-list">
    
      <main class="main-content">
        <div class="auth-card">
          <h2 class="auth-title">Budgets</h2>
          <div>
            <router-link to="/budgets/create" class="sign-in-button">
              + New Budget
            </router-link>
          </div>
          <div v-if="loading" class="loading-message">
            <i class="fas fa-spinner fa-spin"></i> Loading budgets...
          </div>
  
          <div v-if="error" class="auth-alert error">
            {{ error }}
          </div>
  
          <!-- Mobile View -->
          <div class="mobile-view d-md-none">
            <div class="budget-card" v-for="budget in budgets" :key="budget.id">
              <div class="card-header">
                <h3>{{ budget.category }}</h3>
                <p>{{ formatCurrency(budget.amount) }}</p>
              </div>
              <div class="card-body">
                <p><strong>Period:</strong> {{ formatDate(budget.start_date) }} - {{ formatDate(budget.end_date) }}</p>
                <p><strong>Spent:</strong> {{ formatCurrency(budget.current_spending) }}</p>
                <div class="progress-container">
                  <div class="progress-bar" :style="progressWidth(budget)"></div>
                </div>
                <div class="actions">
                  <button @click="editBudget(budget)" class="icon-button">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button @click="deleteBudget(budget.id)" class="icon-button">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Desktop View -->
          <table class="budget-table" v-if="!loading && budgets.length">
            <thead>
              <tr>
                <th>Category</th>
                <th>Budget Amount</th>
                <th>Spent</th>
                <th>Period</th>
                <th>Progress</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="budget in budgets" :key="budget.id">
                <td>{{ budget.category }}</td>
                <td>{{ formatCurrency(budget.amount) }}</td>
                <td>{{ formatCurrency(budget.current_spending) }}</td>
                <td>{{ formatDate(budget.start_date) }} - {{ formatDate(budget.end_date) }}</td>
                <td>
                  <div class="progress-container">
                    <div class="progress-bar" :style="progressWidth(budget)"></div>
                  </div>
                  <span class="progress-text">
                    {{ progressPercentage(budget) }}%
                  </span>
                </td>
                <td class="actions">
                  <button @click="editBudget(budget.id)" class="icon-button">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button @click="deleteBudget(budget.id)" class="icon-button">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
  
          <div v-if="!loading && !budgets.length" class="no-budgets">
            <p>No budgets found. <router-link to="/budgets/create">Create your first budget</router-link></p>
          </div>
  
          <div class="pagination" v-if="totalPages > 1">
            <button 
              v-for="page in totalPages" 
              :key="page" 
              @click="changePage(page)"
              :class="{ active: currentPage === page }"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  import { APIService } from '@/http/APIService';
  const apiService = new APIService();
  
  export default {
    name: 'BudgetsList',
    data() {
      return {
        budgets: [],
        loading: true,
        error: '',
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 10
      };
    },
    async created() {
      await this.fetchBudgets();
    },
    methods: {
      async fetchBudgets() {
  try {
    this.loading = true;
    const response = await apiService.getBudgetList({
      page: this.currentPage,
      page_size: this.itemsPerPage
    });

    // Handle different response structures
    const responseData = response.data;
    let budgetsArray = [];
    let totalCount = 0;

    if (Array.isArray(responseData)) {
      // Response is a direct array
      budgetsArray = responseData;
      totalCount = responseData.length;
    } else if (responseData.results) {
      // Standard DRF paginated response
      budgetsArray = responseData.results;
      totalCount = responseData.count;
    } else if (responseData.items) {
      // Alternative pagination format
      budgetsArray = responseData.items;
      totalCount = responseData.total;
    } else {
      // Fallback to empty array
      budgetsArray = [];
      totalCount = 0;
    }

    this.budgets = budgetsArray.map(budget => ({
      ...budget,
      category: budget.category?.name || 
               (typeof budget.category === 'object' ? budget.category.name : `Category ${budget.category}`),
      amount: parseFloat(budget.amount) || 0,
      current_spending: budget.current_spending || 0
    }));

    this.totalPages = Math.ceil(totalCount / this.itemsPerPage);
  } catch (error) {
    console.error('Budget fetch error:', error);
    this.error = error.response?.data?.message || 
                'Failed to load budgets. Please try again.';
  } finally {
    this.loading = false;
  }
},
  
      formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
      },
  
      formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(amount);
      },
  
      progressWidth(budget) {
        const percentage = Math.min((budget.current_spending / budget.amount) * 100, 100);
        return { width: percentage + '%' };
      },
  
      progressPercentage(budget) {
        return Math.min(Math.round((budget.current_spending / budget.amount) * 100), 100);
      },
  
      editBudget(budgetId) {
        this.$router.push(`/budgets/${budgetId}`);
      },
  
      async deleteBudget(budgetId) {
        if (confirm('Are you sure you want to delete this budget?')) {
          try {
            await apiService.deleteBudget(budgetId);
            this.budgets = this.budgets.filter(b => b.id !== budgetId);
          } catch (error) {
            this.error = 'Failed to delete budget. Please try again.';
            console.error('Error deleting budget:', error);
          }
        }
      },
  
      changePage(page) {
        this.currentPage = page;
        this.fetchBudgets();
      }
    }
  };
  </script>
  
  <style scoped>
  .budget-list {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
  
  .main-content {
    flex: 1;
    padding: 2rem;
  }
  
  .auth-card {
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .budget-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }
  
  .budget-table th,
  .budget-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  .budget-table th {
    background-color: #f8f9fa;
  }
  
  .mobile-view {
    display: none;
  }
  
  .budget-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 1rem;
    padding: 1rem;
  }
  
  .progress-container {
    height: 10px;
    background-color: #eee;
    border-radius: 5px;
    overflow: hidden;
    margin: 0.5rem 0;
  }
  
  .progress-bar {
    height: 100%;
    background-color: #42b983;
    transition: width 0.3s ease;
  }
  
  .progress-text {
    font-size: 0.9rem;
    color: #666;
  }
  
  .actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .icon-button {
    background: none;
    border: none;
    color: #42b983;
    cursor: pointer;
    padding: 0.5rem;
  }
  
  .pagination {
    margin-top: 2rem;
    display: flex;
    gap: 0.5rem;
    justify-content: center;
  }
  
  .pagination button {
    padding: 0.5rem 1rem;
    border: 1px solid #42b983;
    background: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .pagination button.active {
    background-color: #42b983;
    color: white;
  }
  
  .no-budgets {
    text-align: center;
    padding: 2rem;
    color: #666;
  }
  
  .loading-message {
    text-align: center;
    padding: 2rem;
    color: #42b983;
  }
  
  @media (max-width: 768px) {
    .budget-table {
      display: none;
    }
    
    .mobile-view {
      display: block;
    }
  }
  
  .header {
    background-color: #2c3e50;
    padding: 1rem 2rem;
  }
  
  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .logo a {
    color: white;
    font-size: 1.5rem;
    font-weight: bold;
    text-decoration: none;
  }
  
  .sign-in-button {
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    text-decoration: none;
    background-color: #2c463f;
    color: white;
  }
  
  .sign-in-button:hover {
    background-color: #6b8068;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  </style>