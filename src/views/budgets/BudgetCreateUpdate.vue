<template>
    <div class="budget-form">
        <main class="main-content">
            <div class="auth-card">
                <h2 class="auth-title">{{ pageTitle }}</h2>

                <div v-if="showMsg === 'error'" class="auth-alert error">
                    {{ errorMessage }}
                </div>

                <form
                    @submit.prevent="handleSubmit"
                    class="budget-form-content"
                >
                    <div class="form-group">
                        <label>Category</label>
                        <select
                            v-model="budget.category_id"
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

                    <div class="form-row">
                        <div class="form-group">
                            <label>Budget Amount</label>
                            <input
                                v-model.number="budget.amount"
                                type="number"
                                step="0.01"
                                min="0"
                                required
                                class="form-input"
                                placeholder="0.00"
                                :disabled="loading"
                            />
                        </div>

                        <div class="form-group">
                            <label>Period</label>
                            <select
                                v-model="budget.period"
                                class="form-input"
                                required
                                :disabled="loading"
                            >
                                <option value="daily">Daily</option>
                                <option value="weekly">Weekly</option>
                                <option value="biweekly">Bi-Weekly</option>
                                <option value="monthly" selected>
                                    Monthly
                                </option>
                                <option value="six_month">Six Month</option>
                                <option value="yearly">Yearly</option>
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group">
                            <label>Start Date</label>
                            <input
                                v-model="budget.start_date"
                                type="date"
                                required
                                class="form-input"
                                :max="budget.end_date"
                                :disabled="loading"
                            />
                        </div>

                        <div class="form-group">
                            <label>End Date</label>
                            <input
                                v-model="budget.end_date"
                                type="date"
                                class="form-input"
                                :min="budget.start_date"
                                :disabled="loading"
                            />
                        </div>
                    </div>

                    <div class="action-buttons">
                        <button
                            type="submit"
                            class="auth-button"
                            :disabled="loading"
                        >
                            {{ loading ? "Saving..." : "Save Budget" }}
                        </button>
                        <button
                            type="button"
                            class="auth-button secondary"
                            @click="cancel"
                            :disabled="loading"
                        >
                            Cancel
                        </button>
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
    name: "BudgetCreateUpdate",
    data() {
        return {
            budget: {
                category_id: null,
                amount: 0,
                period: "monthly",
                start_date: new Date().toISOString().split("T")[0],
                end_date: this.getDefaultEndDate(),
            },
            categories: [],
            pageTitle: "Create Budget",
            showMsg: "",
            errorMessage: "",
            loading: false,
            isUpdate: false,
        };
    },
    async created() {
        await this.fetchCategories();
        if (this.$route.params.id && this.$route.params.id !== "create") {
            this.isUpdate = true;
            this.pageTitle = "Edit Budget";
            await this.fetchBudget();
        }
    },
    methods: {
        getDefaultEndDate() {
            const date = new Date();
            date.setMonth(date.getMonth() + 1);
            return date.toISOString().split("T")[0];
        },
        async fetchCategories() {
            try {
                const response = await apiService.getCategoryList();
                this.categories = response.data;
            } catch (error) {
                this.handleError(error);
            }
        },
        async fetchBudget() {
            try {
                this.loading = true;
                const response = await apiService.getBudget(
                    this.$route.params.id
                );
                const data = response.data;
                this.budget = {
                    category_id: data.category?.id || data.category_id,
                    amount: parseFloat(data.amount),
                    period: data.period,
                    start_date: data.start_date.split("T")[0],
                    end_date: data.end_date
                        ? data.end_date.split("T")[0]
                        : this.getDefaultEndDate(),
                };
            } catch (error) {
                this.handleError(error);
            } finally {
                this.loading = false;
            }
        },
        async handleSubmit() {
            this.loading = true;
            this.showMsg = "";

            try {
                // Get the current user ID from your auth system
                const userId =
                    this.$store.state.user?.id ||
                    JSON.parse(localStorage.getItem("user"))?.id;

                if (!userId) {
                    throw new Error("User not authenticated");
                }

                const budgetData = {
                    user_id: userId,
                    category_id: this.budget.category_id,
                    amount: parseFloat(this.budget.amount),
                    period: this.budget.period,
                    start_date: this.budget.start_date,
                    end_date: this.budget.end_date || null,
                };

                console.log("budgetData", budgetData);

                if (this.isUpdate) {
                    await apiService.updateBudget(
                        this.$route.params.id,
                        budgetData
                    );
                } else {
                    await apiService.createBudget(budgetData);
                }

                this.$router.push("/budgets");
            } catch (error) {
                this.handleError(error);
            } finally {
                this.loading = false;
            }
        },
        handleError(error) {
            this.showMsg = "error";
            if (error.response) {
                if (error.response.data) {
                    if (typeof error.response.data === "string") {
                        this.errorMessage = error.response.data;
                    } else if (error.response.data.detail) {
                        this.errorMessage = error.response.data.detail;
                    } else {
                        this.errorMessage = Object.entries(error.response.data)
                            .map(
                                ([field, errors]) =>
                                    `${field}: ${
                                        Array.isArray(errors)
                                            ? errors.join(", ")
                                            : errors
                                    }`
                            )
                            .join("\n");
                    }
                } else {
                    this.errorMessage = `Error: ${error.response.status}`;
                }
            } else {
                this.errorMessage =
                    "Network error. Please check your connection.";
            }
        },
        cancel() {
            this.$router.push("/budgets");
        },
    },
};
</script>

<style scoped>
.budget-form-content {
    max-width: 800px;
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

.form-input:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
}

.form-input:focus {
    outline: none;
    border-color: #42b983;
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
