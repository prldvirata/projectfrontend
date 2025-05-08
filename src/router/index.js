import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
    },
    {
        path: "/about",
        name: "About",
        component: () => import("@/views/About.vue"),
    },
    {
        path: "/contact",
        name: "Contact",
        component: () => import("@/views/Contact.vue"),
    },
    {
        path: "/privacy",
        name: "Privacy",
        component: () => import("@/views/Privacy.vue"),
    },
    {
        path: "/login",
        name: "Login",
        component: () => import("@/views/Login.vue"),
    },
    {
        path: "/register",
        name: "Register",
        component: () => import("@/views/Register.vue"),
    },
    // Dashboard
    {
        path: "/dashboard",
        name: "Dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: { requiresAuth: true },
    },
    // Reports
    {
        path: "/reports",
        name: "Reports",
        component: () => import("@/views/Reports.vue"),
        meta: { requiresAuth: true },
    },
    // Expenses
    {
        path: "/expenses",
        name: "ExpensesList",
        component: () => import("@/views/expenses/ExpensesList.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/expenses/:id",
        name: "ExpenseUpdate",
        component: () => import("@/views/expenses/ExpenseCreateUpdate.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/expenses/create",
        name: "ExpenseCreate",
        component: () => import("@/views/expenses/ExpenseCreateUpdate.vue"),
        meta: { requiresAuth: true },
    },
    // Budgets
    {
        path: "/budgets",
        name: "BudgetsList",
        component: () => import("@/views/budgets/BudgetsList.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/budgets/:id",
        name: "BudgetUpdate",
        component: () => import("@/views/budgets/BudgetCreateUpdate.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/budgets/create",
        name: "BudgetCreate",
        component: () => import("@/views/budgets/BudgetCreateUpdate.vue"),
        meta: { requiresAuth: true },
    },
    // Users
    {
        path: "/users",
        name: "UserList",
        component: () => import("@/views/users/UserList.vue"),
        meta: { requiresAuth: true },
    },
    {
        path: "/users/create",
        name: "UserCreate",
        component: () => import("@/views/admin/users/UserCreate.vue"),
        meta: { requiresAuth: true, requiresAdmin: true },
    },
    {
        path: "/users/edit/:id",
        name: "UserEdit",
        component: () => import("@/views/admin/users/UserEdit.vue"),
        meta: { requiresAuth: true, requiresAdmin: true },
        props: true,
    },
    // Admin Dashboard - Nested Routes
    {
        path: "/admin",
        component: () => import("@/components/admin/AdminLayout.vue"),
        meta: { requiresAuth: true, requiresAdmin: true },
        children: [
            {
                path: "",
                name: "Admin",
                redirect: { name: "AdminUsers" },
            },
            // Users
            {
                path: "users",
                children: [
                    {
                        path: "",
                        name: "AdminUsers",
                        component: () =>
                            import("@/components/admin/AdminUserList.vue"),
                    },
                    {
                        path: "create",
                        name: "AdminUserCreate",
                        component: () =>
                            import("@/views/admin/users/UserCreate.vue"),
                    },
                    {
                        path: "edit/:id",
                        name: "AdminUserEdit",
                        component: () =>
                            import("@/views/admin/users/UserEdit.vue"),
                        props: true,
                    },
                ],
            },
            // Categories
            {
                path: "categories",
                children: [
                    {
                        path: "",
                        name: "AdminCategories",
                        component: () =>
                            import("@/components/admin/AdminCategoryList.vue"),
                    },
                    {
                        path: "create",
                        name: "CategoryCreate",
                        component: () =>
                            import(
                                "@/views/admin/categories/CategoryCreate.vue"
                            ),
                    },
                    {
                        path: "edit/:id",
                        name: "CategoryEdit",
                        component: () =>
                            import("@/views/admin/categories/CategoryEdit.vue"),
                        props: true,
                    },
                ],
            },
            // Budgets
            {
                path: "budgets",
                children: [
                    {
                        path: "",
                        name: "AdminBudgets",
                        component: () =>
                            import("@/components/admin/AdminBudgetList.vue"),
                    },
                    {
                        path: "create",
                        name: "BudgetCreate",
                        component: () =>
                            import("@/views/admin/budgets/BudgetCreate.vue"),
                    },
                    {
                        path: "edit/:id",
                        name: "BudgetEdit",
                        component: () =>
                            import("@/views/admin/budgets/BudgetEdit.vue"),
                        props: true,
                    },
                ],
            },
        ],
    },
    // 404 Not Found - Doit être placé à la fin du tableau des routes
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("@/views/NotFound.vue")
    }
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

// Enhanced navigation guard
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem("access_token");
    const user = JSON.parse(localStorage.getItem("user")); // Assuming you store user data

    // Check if route requires authentication
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (!isAuthenticated) {
            // Redirect to NotFound page if not authenticated
            next({ name: "Home" });
            return;
        }

        // Check if route requires admin privileges
        if (to.matched.some((record) => record.meta.requiresAdmin)) {
            if (!user || user.user_type !== 2) {
                // Assuming user_type 2 is admin
                // Redirect to NotFound page
                next({ name: "Home" });
                return;
            }
        }
    }

    // Proceed to the route
    next();
});

export default router;
