<template>
  <div class="admin-container">
    <div class="admin-header">
      <h1>Create New User</h1>
      <a href="#" class="btn btn-secondary" @click.prevent="$router.go(-1)">
        <i class="fas fa-arrow-left"></i> Back
      </a>
    </div>

    <form @submit.prevent="submitForm" class="user-form">
      <div class="mb-3">
        <label for="username" class="form-label">Username</label>
        <input
          type="text"
          class="form-control"
          id="username"
          v-model="user.username"
          required
        >
      </div>

      <div class="mb-3">
        <label for="firstName" class="form-label">First Name</label>
        <input
          type="text"
          class="form-control"
          id="firstName"
          v-model="user.first_name"
          required
        >
      </div>

      <div class="mb-3">
        <label for="lastName" class="form-label">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="lastName"
          v-model="user.last_name"
          required
        >
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <input
          type="email"
          class="form-control"
          id="email"
          v-model="user.email"
          required
        >
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input
          type="password"
          class="form-control"
          id="password"
          v-model="user.password"
          required
          minlength="8"
        >
      </div>

      <!-- Profile Fields -->
      <div class="mb-3">
        <label for="phone" class="form-label">Phone Number</label>
        <input
          type="tel"
          class="form-control"
          id="phone"
          v-model="user.profile.phone_number"
          placeholder="1234567890"
          pattern="[0-9]{10}"
        >
        <small class="form-text text-muted">10 digits without dashes</small>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">Street Address</label>
        <input
          type="text"
          class="form-control"
          id="address"
          v-model="user.profile.street_address"
        >
      </div>

      <div class="row g-3">
        <div class="col-md-6">
          <label for="zip" class="form-label">Zip Code</label>
          <input
            type="text"
            class="form-control"
            id="zip"
            v-model="user.profile.zip_code"
            placeholder="12345"
            pattern="[0-9]{5}"
          >
        </div>
        <div class="col-md-6">
          <label for="state" class="form-label">State</label>
          <input
            type="text"
            class="form-control"
            id="state"
            v-model="user.profile.state"
            placeholder="CA"
            maxlength="2"
            style="text-transform: uppercase;"
          >
        </div>
      </div>

      <div class="mb-3">
        <label for="userType" class="form-label">User Type</label>
        <select class="form-select" id="userType" v-model="user.user_type">
          <option value="1">Regular User</option>
          <option value="2">Admin</option>
        </select>
      </div>

      <div class="mb-3 form-check">
        <input
          type="checkbox"
          class="form-check-input"
          id="isActive"
          v-model="user.is_active"
        >
        <label class="form-check-label" for="isActive">Active User</label>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm"></span>
        Create User
      </button>

      <div v-if="error" class="alert alert-danger mt-3">
        {{ error }}
      </div>
    </form>
  </div>
</template>

<script>
import APIService from '@/http/APIService';

export default {
  name: 'UserCreate',
  data() {
    return {
      user: {
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        user_type: 1,
        is_active: true,
        profile: {
          phone_number: '',
          street_address: '',
          zip_code: '',
          state: ''
        }
      },
      loading: false,
      error: null
    }
  },
  methods: {
    async submitForm() {
      this.loading = true;
      this.error = null;

      try {
        // Format data for backend
        const formattedData = {
          ...this.user,
          profile: {
            phone_number: this.user.profile.phone_number,
            street_address: this.user.profile.street_address,
            zip_code: this.user.profile.zip_code,
            state: this.user.profile.state.toUpperCase()
          }
        };

        const response = await APIService.createAdminUser(formattedData);
        
        if (response.status === 201) {
          this.$router.push({
            name: 'AdminUsers',
            query: { created: 'true' }
          });
        }
      } catch (error) {
        this.handleError(error);
      } finally {
        this.loading = false;
      }
    },
    handleError(error) {
      console.error('Creation error:', error);
      
      if (error.response?.status === 401) {
        this.error = 'Session expired. Please login again.';
        this.$router.push('/login');
      } else if (error.response?.data) {
        this.formatError(error.response.data);
      } else {
        this.error = 'Failed to create user. Please check your entries.';
      }
    },
    formatError(data) {
      if (data.profile) {
        this.error = Object.entries(data.profile)
          .map(([field, errors]) => `${field}: ${errors.join(', ')}`)
          .join('\n');
      } else if (typeof data === 'object') {
        this.error = Object.entries(data)
          .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
          .join('\n');
      } else {
        this.error = data;
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

.user-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-check {
  margin-bottom: 20px;
}

.form-text.text-muted {
  font-size: 0.875em;
  color: #6c757d !important;
}
</style>