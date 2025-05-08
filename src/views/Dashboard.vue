<script>
import { onMounted, computed } from "vue";
import { APIService } from "@/http/APIService";
const apiService = new APIService();

export default {
    name: "Dashboard",
    data() {
        return {
            loading: true,
            error: "",
            expenses: [],
            pendingFriendRequests: [], // Placeholder for now
        };
    },
    setup() {
        // This is the correct way to use onMounted in the Composition API
        onMounted(async () => {
            // This will be called when the component is mounted
        });
    },
    computed: {
        totalExpenses() {
            return this.expenses.reduce((total, expense) => total + parseFloat(expense.amount), 0);
        },
        recentExpenses() {
            // Return the 5 most recent expenses
            return [...this.expenses].sort((a, b) => 
                new Date(b.date) - new Date(a.date)
            ).slice(0, 5);
        }
    },
    mounted() {
        // Using Options API lifecycle hook
        this.fetchExpenses();
    },
    methods: {
        async fetchExpenses() {
            try {
                this.loading = true;
                const response = await apiService.getExpenseList();
                console.log('API Response:', response); // Debug log
                if (response?.data && Array.isArray(response.data)) {
                    this.expenses = response.data;
                    console.log('Expenses set:', this.expenses); // Debug log
                } else {
                    this.expenses = [];
                    this.error = "Invalid response format from server.";
                }
            } catch (error) {
                this.error = "Failed to load expenses. Please try again later.";
                console.error("Error fetching expenses:", error);
            } finally {
                this.loading = false;
            }
        },

        formatCurrency(amount) {
            return new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);
        },
    },
};
</script>

<template>
    <div class="dashboard-container">
        <Navbar />

        <div class="py-4">
            <header>
                <div class="container">
                    <h1 class="display-4 fw-bold mb-4">
                        Dashboard
                    </h1>
                </div>
            </header>
            <main>
                <div class="container">
                    <!-- Summary Cards -->
                    <div class="mb-4">
                        <div class="row g-4">
                            <!-- Total Expenses Card -->
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center">
                                            <div class="icon-container bg-primary rounded p-3 me-3">
                                                <svg
                                                    class="icon text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <h6 class="text-muted mb-1">
                                                    Total Expenses
                                                </h6>
                                                <div class="fs-5 fw-semibold">
                                                    {{ formatCurrency(totalExpenses) }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer bg-light">
                                        <router-link
                                            to="/reports"
                                            class="link-primary text-decoration-none"
                                        >
                                            View reports<span class="visually-hidden"> on expenses</span>
                                        </router-link>
                                    </div>
                                </div>
                            </div>

                            <!-- Pending Friend Requests Card -->
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <div class="d-flex align-items-center">
                                            <div class="icon-container bg-primary rounded p-3 me-3">
                                                <svg
                                                    class="icon text-white"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <h6 class="text-muted mb-1">
                                                    Pending Friend Requests
                                                </h6>
                                                <div class="fs-5 fw-semibold">
                                                    {{ pendingFriendRequests.length }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="card-footer bg-light">
                                        <router-link
                                            to="/friends"
                                            class="link-primary text-decoration-none"
                                        >
                                            View all<span class="visually-hidden">friend requests</span>
                                        </router-link>
                                    </div>
                                </div>
                            </div>

                            <!-- Quick Add Expense Card -->
                            <div class="col-12 col-sm-6 col-lg-4">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <h5 class="card-title">Quick Add</h5>
                                        <p class="card-text text-muted">Add a new expense quickly.</p>
                                        <router-link
                                            to="/expenses/create"
                                            class="btn btn-primary d-inline-flex align-items-center"
                                        >
                                            <svg
                                                class="me-2 icon"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                                />
                                            </svg>
                                            Add Expense
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Recent Expenses -->
                    <div class="mb-4">
                        <h2 class="h4 mb-3">Recent Expenses</h2>
                        <div class="card">
                            <ul class="list-group list-group-flush">
                                <li
                                    v-for="expense in recentExpenses"
                                    :key="expense.id"
                                    class="list-group-item"
                                >
                                    <div class="d-flex justify-content-between align-items-center">
                                        <div class="text-primary fw-medium text-truncate">
                                            {{ expense.description }}
                                        </div>
                                        <div>
                                            <span class="badge bg-success rounded-pill">
                                                {{ expense.category.name }}
                                            </span>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between mt-2">
                                        <div class="d-flex align-items-center text-muted">
                                            <svg
                                                class="icon me-2"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                />
                                            </svg>
                                            {{ new Date(expense.date).toLocaleDateString() }}
                                        </div>
                                        <div class="d-flex align-items-center text-muted">
                                            <svg
                                                class="icon me-2"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            {{ formatCurrency(expense.amount) }}
                                        </div>
                                    </div>
                                </li>
                                <li
                                    v-if="!loading && recentExpenses.length === 0"
                                    class="list-group-item text-center text-muted"
                                >
                                    No expenses found. Add your first expense!
                                </li>
                            </ul>
                        </div>
                        <div class="d-flex justify-content-end mt-3">
                            <router-link
                                to="/expenses"
                                class="link-primary text-decoration-none"
                            >
                                View all expenses →
                            </router-link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    </div>
</template>

<style scoped>
.dashboard-container {
    min-height: 100vh;
    background-color: #f8f9fa;
}

.icon {
    width: 1.5rem;
    height: 1.5rem;
}

.icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
