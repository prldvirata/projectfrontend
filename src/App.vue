<template>
    <div id="app" class="app-container d-flex flex-column min-vh-100">
        <navbar />
        <div class="main-content">
            <router-view />
        </div>
        <footer />
    </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
    name: "App",
    components: {
        Navbar,
        Footer,
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        const authenticated = computed(() => store.state.authenticated);
        const isAdmin = computed(() => {
            // Check Vuex first, then localStorage fallback
            const user =
                store.state.user || JSON.parse(localStorage.getItem("user"));
            return (
                user &&
                (user.is_staff || user.is_superuser || user.user_type === 2)
            );
        });

        const logout = () => {
            localStorage.clear();
            store.commit("SET_AUTHENTICATED", false);
            router.push("/login");
        };

        return {
            authenticated,
            isAdmin,
            logout,
        };
    },
    async mounted() {
        try {
            const access_token = localStorage.getItem("access_token");
            if (access_token) {
                // Check if the token is expired
                const tokenData = JSON.parse(atob(access_token.split(".")[1]));
                const isExpired = tokenData.exp * 1000 < Date.now();

                if (isExpired) {
                    await this.logout();
                    return;
                }

                this.$store.commit("SET_AUTHENTICATED", true);
                this.$store.commit("SET_TOKEN", access_token);

                const user = JSON.parse(localStorage.getItem("user"));
                this.$store.commit("SET_USER", user);
            }
        } catch (error) {
            console.error("Error during auto-login:", error);
            this.logout();
        }
    },
};
</script>
<style scoped>
html,
body,
#app {
    margin: 0;
    padding: 0;
    width: 100%;
    min-height: 100vh;
}

.app-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-content {
    flex: 1 0 auto;
    margin: 0;
    padding: 0;
    width: 100%;
}
</style>
