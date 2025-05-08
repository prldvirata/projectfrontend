<template>
    <div class="expense-list">
       
      <main class="main-content">
        <div class="auth-card">
          <h2 class="auth-title">Expenses</h2>
          <div class="nav-links">
            <router-link to="/expenses/create" class="sign-in-button">
              + New Expense
            </router-link>
          </div>
        <div></div>
          <div v-if="loading" class="loading-message">
            <i class="fas fa-spinner fa-spin"></i> Loading expenses...
          </div>
  
          <div v-if="error" class="auth-alert error">
            {{ error }}
          </div>
  
          <!-- Mobile View -->
          <div class="mobile-view d-md-none">
            <div class="expense-card" v-for="expense in expenses || []" :key="expense.id">
              <div class="card-header">
                <h3>{{ expense.description }}</h3>
                <p>{{ formatCurrency(expense.amount) }}</p>
              </div>
              <div class="card-body">
                <p><strong>Date:</strong> {{ formatDate(expense.date) }}</p>
                <p><strong>Category:</strong> {{ expense.category.name }}</p>
                <div class="actions">
                  <button @click="editExpense(expense.id)" class="icon-button">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button @click="deleteExpense(expense.id)" class="icon-button">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Desktop View -->
          <table class="expense-table" v-if="!loading && expenses && expenses.length > 0">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="expense in expenses" :key="expense.id">
                <td>{{ formatDate(expense.date) }}</td>
                <td>{{ expense.description }}</td>
                <td>{{ formatCurrency(expense.amount) }}</td>
                <td>{{ expense.category.name }}</td>
                <td class="actions">
                  <button @click="editExpense(expense.id)" class="icon-button">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button @click="deleteExpense(expense.id)" class="icon-button">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
  
          <div v-if="!loading && (!expenses || expenses.length === 0)" class="no-expenses">
            <p>No expenses found. <router-link to="/expenses/create">Add your first expense</router-link></p>
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
    name: 'ExpensesList',
    data() {
      return {
        expenses: [],
        loading: true,
        error: '',
        currentPage: 1,
        totalPages: 1,
        itemsPerPage: 10
      };
    },
    async created() {
      await this.fetchExpenses();
    },
    methods: {
      async fetchExpenses() {
        try {
          this.loading = true;
          const response = await apiService.getExpenseList({
            page: this.currentPage,
            page_size: this.itemsPerPage
          });
          
          if (response && response.data) {
            this.expenses = response.data || [];
            this.totalPages = Math.ceil((response.data.count || 0) / this.itemsPerPage);
          } else {
            this.expenses = [];
            this.totalPages = 1;
            this.error = 'Invalid response format from server.';
          }
        } catch (error) {
          this.error = 'Failed to load expenses. Please try again later.';
          console.error('Error fetching expenses:', error);
          this.expenses = [];
          this.totalPages = 1;
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
  
      editExpense(expenseId) {
        this.$router.push(`/expenses/${expenseId}`);
      },
  
      async deleteExpense(expenseId) {
        if (confirm('Are you sure you want to delete this expense?')) {
          try {
            await apiService.deleteExpense(expenseId);
            this.expenses = this.expenses.filter(e => e.id !== expenseId);
          } catch (error) {
            this.error = 'Failed to delete expense. Please try again.';
            console.error('Error deleting expense:', error);
          }
        }
      },
  
      changePage(page) {
        this.currentPage = page;
        this.fetchExpenses();
      }
    }
  };
  </script>
  
  <style scoped>
  .expense-list {
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
  
  .expense-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
  }
  
  .expense-table th,
  .expense-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  .expense-table th {
    background-color: #f8f9fa;
  }
  
  .mobile-view {
    display: none;
  }
  
  .expense-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 1rem;
    padding: 1rem;
  }
  
  .actions {
    display: flex;
    gap: 1rem;
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
  
  .no-expenses {
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
    .expense-table {
      display: none;
    }
    
    .mobile-view {
      display: block;
    }
  }
  
  /* Reuse header styles from previous components */
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