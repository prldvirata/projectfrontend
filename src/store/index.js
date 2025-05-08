import { createStore } from "vuex";

export default createStore({
    state: {
        authenticated: false,
        user: null,
        token: null,
        error: null
    },
    mutations: {
        SET_AUTHENTICATED(state, value) {
            state.authenticated = value;
        },
        SET_USER(state, user) {
            state.user = user;
        },
        SET_TOKEN(state, token) {
            state.token = token;
        },
        SET_ERROR(state, error) {
            state.error = error;
        },
        CLEAR_ERROR(state) {
            state.error = null;
        }
    },
    actions: {
        setError({ commit }, error) {
            commit('SET_ERROR', error);
            setTimeout(() => {
                commit('CLEAR_ERROR');
            }, 5000);
        },
        async logout({ commit }) {
            try {
                commit('SET_USER', null);
                commit('SET_TOKEN', null);
                commit('SET_AUTHENTICATED', false);
                localStorage.clear();
            } catch (error) {
                commit('SET_ERROR', 'Erreur lors de la déconnexion');
            }
        }
    },
    getters: {
        // Optional: Add getters if needed
    },
});
