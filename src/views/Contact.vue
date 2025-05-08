<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="contact-hero" style="background-color: #6b8068; margin-top: 0;">
      <div class="container py-4 text-center text-white"> 
        <h1 class="display-4 fw-bold mb-3">Get In Touch</h1>
        <p class="lead mb-0">We'd love to hear from you</p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card shadow-sm border-0">
            <div class="card-body p-4 p-md-5">
              <div class="row g-4 g-lg-5">
                <!-- Contact Information -->
                <div class="col-lg-5">
                  <div class="pe-lg-4">
                    <h2 class="fw-bold mb-4" style="color: #2c463f;">Contact Information</h2>
                    
                    <div class="d-flex mb-4">
                      <div class="feature-icon-sm rounded-circle me-4" style="background-color: #6b8068; color: white;">
                        <i class="bi bi-envelope"></i>
                      </div>
                      <div>
                        <h4 class="h5 mb-1" style="color: #2c463f;">Email</h4>
                        <a href="mailto:support@trackspend.com" class="text-decoration-none">support@trackspend.com</a>
                      </div>
                    </div>
                    
                    <div class="d-flex mb-4">
                      <div class="feature-icon-sm rounded-circle me-4" style="background-color: #6b8068; color: white;">
                        <i class="bi bi-telephone"></i>
                      </div>
                      <div>
                        <h4 class="h5 mb-1" style="color: #2c463f;">Phone</h4>
                        <a href="tel:5551234567" class="text-decoration-none">(555) 123-4567</a>
                      </div>
                    </div>
                    
                    <div class="d-flex">
                      <div class="feature-icon-sm rounded-circle me-4" style="background-color: #6b8068; color: white;">
                        <i class="bi bi-geo-alt"></i>
                      </div>
                      <div>
                        <h4 class="h5 mb-1" style="color: #2c463f;">Address</h4>
                        <p class="mb-0">1110 S 67th St, Omaha, NE</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Contact Form -->
                <div class="col-lg-7">
                  <form @submit.prevent="submitForm">
                    <div class="mb-4">
                      <label for="name" class="form-label fw-semibold" style="color: #2c463f;">Your Name</label>
                      <input 
                        id="name" 
                        v-model="form.name" 
                        type="text" 
                        class="form-control form-control-lg" 
                        required
                      >
                    </div>
                    
                    <div class="mb-4">
                      <label for="email" class="form-label fw-semibold" style="color: #2c463f;">Email</label>
                      <input 
                        id="email" 
                        v-model="form.email" 
                        type="email" 
                        class="form-control form-control-lg" 
                        required
                      >
                    </div>
                    
                    <div class="mb-4">
                      <label for="message" class="form-label fw-semibold" style="color: #2c463f;">Message</label>
                      <textarea 
                        id="message" 
                        v-model="form.message" 
                        rows="5" 
                        class="form-control form-control-lg" 
                        required
                      ></textarea>
                    </div>
                    
                    <button type="submit" class="btn px-4" style="background-color: #6b8068; color: white;">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactPage',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // Add form submission logic here
      alert('Thank you for your message! We\'ll get back to you soon.');
      this.form = { name: '', email: '', message: '' };
    }
  }
}
</script>

<style scoped>
.contact-hero {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
.contact-hero > .container {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.contact-page {
  margin: 0;
  padding: 0;
}
.feature-icon-sm {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  flex-shrink: 0;
}

.card {
  border-radius: 12px;
}

.form-control {
  border: 1px solid #dee2e6;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #6b8068;
  box-shadow: 0 0 0 0.25rem rgba(107, 128, 104, 0.25);
}

.btn {
  transition: all 0.3s ease;
  padding: 0.5rem 1.5rem;
  font-size: 1.1rem;
}

.btn:hover {
  background-color: #2c463f !important;
  color: white;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .card-body {
    padding: 2rem !important;
  }
  
  .feature-icon-sm {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }
}
</style>