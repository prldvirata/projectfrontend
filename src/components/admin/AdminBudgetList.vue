<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1>User Budget Management</h1>
      <router-link :to="{ name: 'BudgetCreate' }" class="btn btn-primary">
        <i class="fas fa-plus"></i> Create Budget
      </router-link>
    </div>

    <div v-if="loading" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>

    <table v-else class="table table-hover">
      <thead class="table-dark">
        <tr>
          <th>User</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Period</th>
          <th>Start Date</th>
          <th>End Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="budget in budgets" :key="budget.id">
          <td>{{ getUserName(budget) }}</td>
          <td>{{ getCategoryName(budget) }}</td>
          <td>{{ formatAmount(budget.amount) }}</td>
          <td>{{ formatPeriod(budget.period) }}</td>
          <td>{{ formatDate(budget.start_date) }}</td>
          <td>{{ formatDate(budget.end_date) }}</td>
          <td>
            <div class="btn-group">
              <router-link 
                :to="{ name: 'BudgetEdit', params: { id: budget.id } }"
                class="btn btn-sm btn-outline-primary"
              >
                <i class="fas fa-edit"></i> Edit
              </router-link>
              <button 
                @click="confirmDelete(budget.id)" 
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
</template>

<script>
import APIService from '@/http/APIService';
import { confirmDialog } from '@/utils/confirmDialog';

export default {
  name: 'AdminBudgetList',
  data() {
    return {
      budgets: [],
      loading: true,
      error: null
    }
  },
  async created() {
    await this.fetchBudgets();
  },
  methods: {
    getUserName(budget) {
      if (!budget.user) return 'N/A';
      return budget.user.username || `User ${budget.user.id}`;
    },
    getCategoryName(budget) {
      if (!budget.category) return 'N/A';
      return budget.category.name || `Category ${budget.category.id}`;
    },
    async fetchBudgets() {
      try {
        const response = await APIService.getAdminBudgetList();
        console.log('Budget data:', response.data);
        this.budgets = response.data.map(budget => ({
          ...budget,
          amount: parseFloat(budget.amount) || 0
        }));
      } catch (error) {
        console.error('Error:', error);
        this.error = error.response?.data?.message || error.message;
      } finally {
        this.loading = false;
      }
    },
    formatAmount(amount) {
      return amount.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      });
    },
    formatPeriod(period) {
      const periodMap = {
        daily: 'Daily',
        weekly: 'Weekly',
        biweekly: 'Bi-Weekly',
        monthly: 'Monthly',
        six_month: 'Six Month',
        yearly: 'Yearly',
        five_year: 'Five Year',
        ten_year: 'Ten Year'
      };
      return periodMap[period] || period;
    },
    formatDate(dateString) {
      return dateString ? new Date(dateString).toLocaleDateString() : '-';
    },
    async confirmDelete(budgetId) {
      const budget = this.budgets.find(b => b.id === budgetId);
      const { isConfirmed } = await confirmDialog(
        `Delete Budget for ${budget.user.username}?`,
        `This will delete the ${budget.category.name} budget`,
        'warning'
      );
      
      if (isConfirmed) {
        try {
          await APIService.deleteAdminBudget(budgetId);
          this.budgets = this.budgets.filter(b => b.id !== budgetId);
        } catch (error) {
          console.error('Delete error:', error);
          alert(`Failed to delete budget: ${error.response?.data?.message || error.message}`);
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