<template>
    <div class="expense-form">
        <main class="main-content">
            <div class="auth-card">
                <h2 class="auth-title">{{ pageTitle }}</h2>

                <div v-if="showMsg === 'error'" class="auth-alert error">
                    {{ errorMessage }}
                </div>

                <form
                    @submit.prevent="handleSubmit"
                    class="expense-form-content"
                >
                    <div class="form-group">
                        <label>Description</label>
                        <input
                            v-model="expense.description"
                            type="text"
                            required
                            class="form-input"
                            placeholder="Enter description"
                        />
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Amount ($)</label>
                            <input
                                v-model="expense.amount"
                                type="number"
                                step="0.01"
                                required
                                class="form-input"
                                placeholder="0.00"
                            />
                        </div>

                        <div class="form-group">
                            <label>Date</label>
                            <input
                                v-model="expense.date"
                                type="date"
                                required
                                class="form-input"
                            />
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Category</label>
                        <select
                            v-model="expense.category_id"
                            class="form-input"
                            required
                            :disabled="loading"
                        >
                            <option value="">Select Category</option>
                            <option
                                v-for="category in categories"
                                :key="category.id"
                                :value="category.id"
                            >
                                {{ category.name }}
                            </option>
                        </select>
                    </div>

                    <div class="form-group">
                        <label>Notes</label>
                        <textarea
                            v-model="expense.notes"
                            class="form-input"
                            placeholder="Additional notes..."
                            rows="3"
                        ></textarea>
                    </div>

                    <div class="action-buttons">
                        <button
                            type="submit"
                            class="auth-button"
                            :disabled="loading"
                        >
                            {{ loading ? "Processing..." : "Save Expense" }}
                        </button>
                        <button
                            type="button"
                            class="auth-button secondary"
                            @click="cancel"
                        >
                            Cancel
                        </button>
                        <router-link to="/expenses" class="sign-in-button">
                            Back to Expenses
                        </router-link>
                    </div>
                </form>
            </div>
        </main>
    </div>
</template>

<script>
import { APIService } from "@/http/APIService";
const apiService = new APIService();

export default {
    name: "ExpenseCreateUpdate",
    data() {
        return {
            expense: {
                description: "",
                amount: 0,
                date: new Date().toISOString().split("T")[0],
                category_id: "",
                notes: "",
            },
            categories: [],
            pageTitle: "New Expense",
            showMsg: "",
            errorMessage: "",
            loading: false,
            isUpdate: false,
        };
    },
    beforeCreate() {
        const isAuthenticated = localStorage.getItem("access_token");
        if (!isAuthenticated) {
            this.$router.push("/login");
        }
    },
    async mounted() {
        await this.fetchCategories();
        if (this.$route.params.id && this.$route.params.id !== "create") {
            console.log(this.$route.params.id);
            this.isUpdate = true;
            this.pageTitle = "Edit Expense";
            await this.fetchExpense();
        }
    },
    methods: {
        async fetchCategories() {
            try {
                const response = await apiService.getCategoryList();
                this.categories = response.data;
            } catch (error) {
                this.handleError(error);
            }
        },
        async fetchExpense() {
            try {
                const response = await apiService.getExpense(
                    this.$route.params.id
                );
                this.expense = {
                    ...response.data,
                    date: response.data.date.split("T")[0],
                    category_id: response.data.category.id,
                };
            } catch (error) {
                this.handleError(error);
            }
        },
        async fetchExpenseList() {
            try {
                const response = await apiService.getExpenseList(
                    this.$route.params.id
                );
                this.expense = {
                    ...response.data,
                    date: response.data.date.split("T")[0],
                };
            } catch (error) {
                this.handleError(error);
            }
        },
        async handleSubmit() {
            this.loading = true;
            this.showMsg = "";

            try {
                const expenseData = {
                    ...this.expense,
                    amount: parseFloat(this.expense.amount),
                };

                if (this.isUpdate) {
                    await apiService.updateExpense(
                        this.$route.params.id,
                        expenseData
                    );
                } else {
                    await apiService.createExpense(expenseData);
                }

                this.$router.push("/expenses");
            } catch (error) {
                this.handleError(error);
            } finally {
                this.loading = false;
            }
        },
        handleError(error) {
            this.showMsg = "error";
            if (error.response) {
                switch (error.response.status) {
                    case 400:
                        this.errorMessage =
                            "Invalid expense data. Please check your inputs.";
                        break;
                    case 401:
                        localStorage.removeItem("access_token");
                        this.$router.push("/login");
                        break;
                    default:
                        this.errorMessage =
                            "Error saving expense. Please try again.";
                }
            } else {
                this.errorMessage =
                    "Network error. Please check your connection.";
            }
        },
        cancel() {
            this.$router.push("/expenses");
        },
    },
};
</script>

<style scoped>
.expense-form-content {
    max-width: 600px;
    margin: 0 auto;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-bottom: 1rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-input {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #e0e0e0;
    border-radius: 6px;
    font-size: 1rem;
}

.form-input:focus {
    outline: none;
    border-color: #42b983;
}

textarea.form-input {
    resize: vertical;
    min-height: 100px;
}

.action-buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

.secondary {
    background-color: #6c757d;
}

.secondary:hover {
    background-color: #5a6268;
}

@media (max-width: 768px) {
    .form-row {
        grid-template-columns: 1fr;
    }
}

/* Reuse existing header styles */
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
    background-color: #42b983;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    text-decoration: none;
}

.auth-card {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
}

.auth-title {
    text-align: center;
    margin-bottom: 2rem;
}

.auth-alert.error {
    background-color: #fee2e2;
    color: #dc2626;
    border: 1px solid #fca5a5;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 6px;
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
