<template>
    <div class="auth-page">
      <header class="header">
        <nav class="navbar">
          <div class="logo">
            <router-link to="/">TrackSpend</router-link>
          </div>
          <div class="nav-links">
            <router-link to="/" class="sign-in-button">Dashboard</router-link>
          </div>
        </nav>
      </header>
  
      <main class="user-list-container">
        <div class="auth-card">
          <h2 class="auth-title">User Management</h2>
          <blockquote class="welcome-message">
            Welcome {{ validUserName }}!
            <footer>
              <small><em>&mdash; TrackSpend Administration Panel</em></small>
            </footer>
          </blockquote>
  
          <div class="status-alerts">
            <div v-if="showMsg === 'new'" class="auth-alert success">
              New user has been created
            </div>
            <div v-if="showMsg === 'update'" class="auth-alert success">
              User information updated
            </div>
            <div v-if="showMsg === 'deleted'" class="auth-alert success">
              User has been deleted
            </div>
          </div>
  
          <!-- Mobile View -->
          <div class="mobile-view d-md-none">
            <button class="auth-button" @click="addNewUser">
              <span>+ New User</span>
            </button>
  
            <div class="user-card" v-for="user in users" :key="user.id">
              <div class="card-header">
                <h3>{{ user.username }}</h3>
                <p>{{ user.email }}</p>
              </div>
              <div class="card-body">
                <p><strong>Name:</strong> {{ user.first_name }} {{ user.last_name }}</p>
                <p><strong>Role:</strong> {{ user.is_staff ? 'Admin' : 'User' }}</p>
                <div class="actions">
                  <button @click="updateUser(user)" class="icon-button">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button @click="deleteUser(user)" class="icon-button">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Desktop View -->
          <div class="desktop-view d-none d-md-block">
            <table class="user-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>Email</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td>{{ user.username }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.first_name }}</td>
                  <td>{{ user.last_name }}</td>
                  <td>{{ user.is_staff ? 'Admin' : 'User' }}</td>
                  <td class="actions">
                    <button @click="updateUser(user)" class="icon-button">
                      <i class="fas fa-edit"></i>
                    </button>
                    <button @click="deleteUser(user)" class="icon-button">
                      <i class="fas fa-trash"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            
            <button class="auth-button" @click="addNewUser">
              <span>+ New User</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  </template>
  
  <script>
  const API_URL = process.env.VUE_APP_API_URL || 'http://localhost:8000';
  import axios from 'axios';
  import router from '../../router';
  
  export default {
    name: 'UserList',
    data() {
      return {
        users: [],
        validUserName: 'Admin',
        showMsg: '',
        authenticated: false
      };
    },
    beforeCreate() {
      const isAuthenticated = localStorage.getItem('access_token');
      const isAdmin = JSON.parse(localStorage.getItem('is_staff') || false)
      
      if (!isAuthenticated || !isAdmin) {
        router.push('/login');
      }
    },
    async mounted() {
      await this.getUsers();
      this.showMessages();
    },
    methods: {
      async getUsers() {
        try {
          const response = await axios.get(API_URL, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access_token')}`
            }
          });
          this.users = response.data;
        } catch (error) {
          this.handleError(error);
        }
      },
      showMessages() {
        if (this.$route.params.msg) {
          this.showMsg = this.$route.params.msg;
        }
      },
      addNewUser() {
        router.push('/users/create');
      },
      updateUser(user) {
        router.push(`/users/edit/${user.id}`);
      },
      async deleteUser(user) {
        if (confirm(`Are you sure you want to delete ${user.username}?`)) {
          try {
            await axios.delete(`${API_URL}/api/users/${user.id}/`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`
              }
            });
            router.push('/users/deleted');
            await this.getUsers();
          } catch (error) {
            this.handleError(error);
          }
        }
      },
      handleError(error) {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              localStorage.clear();
              router.push('/login');
              break;
            case 403:
              alert('You do not have permission for this action');
              break;
            default:
              alert('Error processing request');
          }
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .user-list-container {
    padding: 2rem;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .welcome-message {
    text-align: center;
    margin-bottom: 2rem;
    color: #2c3e50;
  }
  
  .status-alerts {
    margin-bottom: 2rem;
  }
  
  .success {
    background-color: #d4edda;
    color: #155724;
    border-color: #c3e6cb;
  }
  
  /* Mobile View Styles */
  .mobile-view {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .user-card {
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    padding: 1rem;
  }
  
  .card-header {
    border-bottom: 1px solid #eee;
    padding-bottom: 0.5rem;
    margin-bottom: 0.5rem;
  }
  
  .actions {
    display: flex;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  .icon-button {
    background: none;
    border: none;
    color: #42b983;
    cursor: pointer;
    padding: 0.5rem;
  }
  
  /* Desktop View Styles */
  .user-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 2rem;
  }
  
  .user-table th,
  .user-table td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  .user-table th {
    background-color: #f8f9fa;
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
  
  .auth-button {
    background-color: #42b983;
    color: white;
    padding: 0.8rem 1.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .auth-button:hover {
    background-color: #359768;
  }
  
  @media (max-width: 768px) {
    .user-table {
      display: none;
    }
  }
  </style>