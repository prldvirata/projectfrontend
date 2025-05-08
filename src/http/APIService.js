// http/APIService.js
import axios from "axios";

// Verify environment variable is set
const API_URL = process.env.VUE_APP_API_URL || "http://localhost:8000";

export class APIService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: API_URL,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    // ==================== Authentication ====================
    authenticateLogin(credentials) {
        return this.apiClient.post("/api/token/", credentials);
    }

    refreshToken() {
        return this.apiClient.post("/api/token/refresh/", {
            refresh: localStorage.getItem("refresh_token"),
        });
    }

    registerUser(userData) {
        return this.apiClient.post("/register/", userData);
    }

    // ==================== Expenses ====================
    getExpense(expenseId) {
        return this.apiClient.get(
            `/api/expenses/${expenseId}/`,
            this.getAuthHeader()
        );
    }

    getExpenseList() {
        return this.apiClient.get("/api/expenses/", this.getAuthHeader());
    }

    createExpense(expenseData) {
        return this.apiClient.post(
            "/api/expenses/",
            expenseData,
            this.getAuthHeader()
        );
    }

    updateExpense(expenseId, expenseData) {
        return this.apiClient.put(
            `/api/expenses/${expenseId}/`,
            expenseData,
            this.getAuthHeader()
        );
    }

    deleteExpense(expenseId) {
        return this.apiClient.delete(
            `/api/expenses/${expenseId}/`,
            this.getAuthHeader()
        );
    }

    // ==================== Categories ====================
    getCategoryList() {
        return this.apiClient.get("/api/categories/", this.getAuthHeader());
    }

    getCategory(categoryId) {
        return this.apiClient.get(
            `/api/categories/${categoryId}/`,
            this.getAuthHeader()
        );
    }

    // ==================== Budgets ====================
    getBudget(budgetId) {
        return this.apiClient.get(
            `/api/budgets/${budgetId}/`,
            this.getAuthHeader()
        );
    }

    getBudgetList() {
        return this.apiClient.get("/api/budgets/", this.getAuthHeader());
    }

    createBudget(budgetData) {
        return this.apiClient.post(
            "/api/budgets/",
            budgetData,
            this.getAuthHeader()
        );
    }

    updateBudget(budgetId, budgetData) {
        return this.apiClient.put(
            `/api/budgets/${budgetId}/`,
            budgetData,
            this.getAuthHeader()
        );
    }

    deleteBudget(budgetId) {
        return this.apiClient.delete(
            `/api/budgets/${budgetId}/`,
            this.getAuthHeader()
        );
    }

    // ==================== Users ====================
    getUserProfile() {
        return this.apiClient.get("/api/getUser/", this.getAuthHeader());
    }

    updateUserProfile(userData) {
        return this.apiClient.put(
            "/api/getUser/",
            userData,
            this.getAuthHeader()
        );
    }

    // ==================== Helper Methods ====================
    getAuthHeader() {
        return {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
        };
    }

    // ==================== Admin Endpoints ====================
    // Users
    getAdminUserList() {
        return this.apiClient.get("/api/admin/users/", this.getAuthHeader());
    }

    getAdminUser(userId) {
        return this.apiClient.get(
            `/api/admin/users/${userId}/`,
            this.getAuthHeader()
        );
    }

    createAdminUser(userData) {
        return this.apiClient.post(
            "/api/admin/users/",
            userData,
            this.getAuthHeader()
        );
    }

    updateAdminUser(userId, userData) {
        const config = {
            ...this.getAuthHeader(),
            headers: {
                ...this.getAuthHeader().headers,
                "Content-Type": "application/json",
            },
        };

        return this.apiClient.put(
            `/api/admin/users/${userId}/`,
            userData,
            config
        );
    }

    deleteAdminUser(userId) {
        return this.apiClient.delete(
            `/api/admin/users/${userId}/`,
            this.getAuthHeader()
        );
    }

    // Categories
    getAdminCategoryList() {
        return this.apiClient.get(
            "/api/admin/categories/",
            this.getAuthHeader()
        );
    }

    getAdminCategory(id) {
        return this.apiClient.get(
            `/api/admin/categories/${id}/`,
            this.getAuthHeader()
        );
    }

    createAdminCategory(data) {
        return this.apiClient.post(
            "/api/admin/categories/",
            data,
            this.getAuthHeader()
        );
    }

    updateAdminCategory(id, data) {
        return this.apiClient.put(
            `/api/admin/categories/${id}/`,
            data,
            this.getAuthHeader()
        );
    }

    deleteAdminCategory(id) {
        return this.apiClient.delete(
            `/api/admin/categories/${id}/`,
            this.getAuthHeader()
        );
    }

    // Budgets
    getAdminBudgetList() {
        return this.apiClient.get("/api/admin/budgets/", this.getAuthHeader());
    }

    getAdminBudget(budgetId) {
        return this.apiClient.get(
            `/api/admin/budgets/${budgetId}/`,
            this.getAuthHeader()
        );
    }

    createAdminBudget(budgetData) {
        return this.apiClient.post(
            "/api/admin/budgets/",
            budgetData,
            this.getAuthHeader()
        );
    }

    updateAdminBudget(budgetId, budgetData) {
        return this.apiClient.put(
            `/api/admin/budgets/${budgetId}/`,
            budgetData,
            this.getAuthHeader()
        );
    }

    deleteAdminBudget(budgetId) {
        return this.apiClient.delete(
            `/api/admin/budgets/${budgetId}/`,
            this.getAuthHeader()
        );
    }

    // Add request interceptor for token refresh
    setupInterceptors(store) {
        this.apiClient.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("access_token");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        this.apiClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;

                if (error.response.status === 401 && !originalRequest._retry) {
                    originalRequest._retry = true;

                    try {
                        const response = await this.refreshToken();
                        localStorage.setItem(
                            "access_token",
                            response.data.access
                        );
                        return this.apiClient(originalRequest);
                    } catch (refreshError) {
                        localStorage.removeItem("access_token");
                        localStorage.removeItem("refresh_token");
                        store.dispatch("logout");
                        return Promise.reject(refreshError);
                    }
                }
                return Promise.reject(error);
            }
        );
    }
}
// Export both the class and a pre-configured instance
export default new APIService();
