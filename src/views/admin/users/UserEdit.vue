<template>
    <div class="admin-container">
      <div class="admin-header">
        <h1>Edit User</h1>
        <router-link :to="{ name: 'AdminUsers' }" class="btn btn-secondary">
          <i class="fas fa-arrow-left"></i> Back to Users
        </router-link>
      </div>
  
      <div v-if="loading" class="text-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
  
      <form @submit.prevent="submitForm" class="user-form" v-else>
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
          <label for="password" class="form-label">New Password (leave blank to keep unchanged)</label>
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="user.password"
          >
        </div>
  
        <div class="mb-3">
          <label for="first_name" class="form-label">First Name</label>
          <input
            type="text"
            class="form-control"
            id="first_name"
            v-model="user.first_name"
            required
          >
        </div>
  
        <div class="mb-3">
          <label for="last_name" class="form-label">Last Name</label>
          <input
            type="text"
            class="form-control"
            id="last_name"
            v-model="user.last_name"
            required
          >
        </div><div class="mb-3">
  <label for="phone" class="form-label">Phone Number</label>
  <input
    type="text"
    class="form-control"
    id="phone"
    v-model="user.profile.phone_number"
  >
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

<div class="mb-3">
  <label for="zip" class="form-label">Zip Code</label>
  <input
    type="text"
    class="form-control"
    id="zip"
    v-model="user.profile.zip_code"
  >
</div>

<div class="mb-3">
  <label for="state" class="form-label">State</label>
  <input
    type="text"
    class="form-control"
    id="state"
    v-model="user.profile.state"
  >
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
  
        <button type="submit" class="btn btn-primary" :disabled="submitting">
          <span v-if="submitting" class="spinner-border spinner-border-sm"></span>
          Save Changes
        </button>
  
        <div v-if="error" class="alert alert-danger mt-3">
          {{ error }}
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import APIService from '@/http/APIService';
  import { confirmDialog } from '@/utils/confirmDialog';
  
  export default {
    name: 'UserEdit',
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        user: {
          id: null,
          username: '',
          email: '',
          password: '',
          first_name: '',
          last_name: '',
          user_type: 1,
          is_active: true,},
        profile: {
            phone_number: '',
            street_address: '',
            zip_code: '',
            state: '',},
        loading: true,
        submitting: false,
        error: null
      }
    },
    async created() {
      await this.fetchUser();
    },
    methods: {
      async fetchUser() {
        this.loading = true;
        try {
          const response = await APIService.getAdminUser(this.id);
          this.user = {
            ...response.data,
            password: '' // Don't pre-fill password
          };
        } catch (error) {
          console.error('Error fetching user:', error);
          this.error = error.response?.data?.message || 'Failed to load user data';
        } finally {
          this.loading = false;
        }
      },
      async submitForm() {
  const isConfirmed = await confirmDialog(
    'Confirm Changes',
    'Are you sure you want to update this user?',
    'warning',
  );
  
  if (!isConfirmed) return;

  this.submitting = true;
  this.error = null;

  try {
    const userData = { 
      username: this.user.username,
      email: this.user.email,
      first_name: this.user.first_name,
      last_name: this.user.last_name,
      user_type: this.user.user_type,
      is_active: this.user.is_active,
      
    };

    // Only include password if provided
    if (this.user.password) {
      userData.password = this.user.password;
    }

    await APIService.updateAdminUser(this.id, userData);
    
    this.$router.push({
      name: 'AdminUsers',
      query: { updated: 'true' }
    });
  } catch (error) {
    console.error('Update error:', error);
    this.error = this.formatError(error);
  } finally {
    this.submitting = false;
  }
},
      formatError(error) {
        if (error.response?.data) {
          if (typeof error.response.data === 'object') {
            return Object.entries(error.response.data)
              .map(([field, errors]) => `${field}: ${Array.isArray(errors) ? errors.join(', ') : errors}`)
              .join('\n');
          }
          return error.response.data;
        }
        return error.message || 'Failed to update user';
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
  </style>