<!-- src/components/login.vue -->
<template>
  <div class="auth-page">
       <main class="auth-container">
      <div class="auth-card">
        <div class="auth-logo">
          <img 
            src="@/assets/images/TrackSpendLogo.png" 
            alt="TrackSpend Logo"
            class="logo-image"
          >
        </div>
        <h2 class="auth-title">TrackSpend</h2>
        <p class="subtitle">The Smart, Personalized Way to Track & Budget.</p>
     
        
        <div v-if="showMsg" class="auth-alert error">
          {{ showMsg }}
        </div>

        <form @submit.prevent="login" class="auth-form">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              id="username"
              v-model="credentials.username"
              type="text"
              required
              class="form-input"
              placeholder="Enter your username"
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <div class="password-input">
              <input
                id="password"
                v-model="credentials.password"
                :type="showPassword ? 'text' : 'password'"
                required
                class="form-input"
                placeholder="Enter your password"
              />
              <button
                type="button"
                class="password-toggle"
                @click="showPassword = !showPassword"
              >
                {{ showPassword ? 'Hide' : 'Show' }}
              </button>
            </div>
          </div>

          <button type="submit" class="auth-button">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <div class="auth-footer">
          <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:8000';
import axios from 'axios';
import router from '../router';
import { mapMutations } from 'vuex';


export default {
  name: 'AuthPage',
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      showMsg: '',
      loading: false,
      showPassword: false,
    };
  },
  methods: {
    ...mapMutations(['SET_AUTHENTICATED', 'SET_USER']), // Add SET_USER mutation
    
    async login() {
      this.loading = true;
      this.showMsg = '';
      
      try {
      const tokenResponse = await axios.post(`${API_URL}/api/token/`, this.credentials)
      localStorage.setItem('access_token', tokenResponse.data.access)
      localStorage.setItem('refresh_token', tokenResponse.data.refresh)

      const userResponse = await axios.get(`${API_URL}/api/getUser/`, {
        headers: {
          Authorization: `Bearer ${tokenResponse.data.access}`
        }
      })

      // Store user data
      localStorage.setItem('user', JSON.stringify(userResponse.data))
      
      // Commit both mutations
      this.SET_AUTHENTICATED(true)
      this.SET_USER(userResponse.data) // This now works

      await router.push({ name: 'Home' })
    } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },

    handleError(error) {
      if (error.response) {
        if (error.response.data && error.response.data.detail) {
          this.showMsg = error.response.data.detail;
        } else {
          switch (error.response.status) {
            case 401:
              this.showMsg = 'Invalid credentials';
              break;
            case 400:
              this.showMsg = 'Missing required fields';
              break;
            default:
              this.showMsg = 'Server error. Please try again later.';
          }
        }
      } else {
        this.showMsg = 'Network error. Please check your connection.';
      }
    }
  }
};
</script>

<style scoped>
.auth-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.auth-container {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f5f7fb;
}

.auth-card {
  background: white;
  padding: 2.5rem;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
}

.auth-title {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}
.subtitle {
    text-align: center;
    font-size: 1.2rem;
    color: #666;
    margin-bottom: 2rem;
  }

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-input {
  padding: 0.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #42b983;
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #6b8068;
  cursor: pointer;
  font-size: 0.9rem;
}

.auth-button {
  background-color: #2c463f;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 6px;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.auth-button:hover {
  background-color: #6b8068;
}

.auth-alert {
  padding: 1rem;
  border-radius: 6px;
  margin-bottom: 1.5rem;
}

.error {
  background-color: #fee2e2;
  color: #dc2626;
  border: 1px solid #fca5a5;
}

.auth-footer {
  text-align: center;
  margin-top: 1.5rem;
  color: #666;
}

.auth-footer a {
  color: #2c463f;
  text-decoration: none;
  font-weight: 500;
}

.auth-footer a:hover {
  text-decoration: underline;
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

.nav-links {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.sign-in-button {
  background-color: #42b983;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  text-decoration: none;
}

.sign-in-button:hover {
  background-color: #359768;
}

.auth-logo {
  text-align: center;
  margin: 1rem 0 2rem;
}

.logo-image {
  max-width: 150px;
  height: auto;
  margin-bottom: 1.5rem;
  transition: transform 0.3s ease;
}

.logo-image:hover {
  transform: scale(1.05);
}

/* animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.auth-logo {
  animation: fadeInUp 0.6s ease;
}
</style>