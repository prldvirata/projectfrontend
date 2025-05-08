<template>
    <div class="modal">
      <div class="modal-content">
        <h2>{{ user.id ? 'Edit User' : 'Create User' }}</h2>
        <form @submit.prevent="handleSubmit">
          <div>
            <label>Username:</label>
            <input v-model="formData.username" required>
          </div>
          <div>
            <label>Email:</label>
            <input v-model="formData.email" type="email" required>
          </div>
          <div>
            <label>First Name:</label>
            <input v-model="formData.first_name" required>
          </div>
          <div>
            <label>Last Name:</label>
            <input v-model="formData.last_name" required>
          </div>
          <div>
            <label>User Type:</label>
            <select v-model="formData.user_type" required>
              <option value="1">Regular</option>
              <option value="2">Staff</option>
            </select>
          </div>
          <div v-if="user.id">
            <label>Status:</label>
            <select v-model="formData.is_active">
              <option :value="true">Active</option>
              <option :value="false">Inactive</option>
            </select>
          </div>
          <div v-if="!user.id">
            <label>Password:</label>
            <input v-model="formData.password" type="password" required>
          </div>
          <div class="modal-actions">
            <button type="button" @click="$emit('close')">Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      user: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        formData: {
          username: '',
          email: '',
          first_name: '',
          last_name: '',
          user_type: 1,
          is_active: true,
          password: ''
        }
      }
    },
    watch: {
      user: {
        immediate: true,
        handler(user) {
          if (user.id) {
            this.formData = { ...user };
          } else {
            this.resetForm();
          }
        }
      }
    },
    methods: {
      resetForm() {
        this.formData = {
          username: '',
          email: '',
          first_name: '',
          last_name: '',
          user_type: 1,
          is_active: true,
          password: ''
        };
      },
      handleSubmit() {
        this.$emit('save', { ...this.formData });
      }
    }
  }
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 5px;
    width: 500px;
  }
  
  form div {
    margin-bottom: 15px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input, select {
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
  }
  
  .modal-actions {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  </style>