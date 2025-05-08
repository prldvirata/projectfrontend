<template>
  <div class="privacy-page">
    <!-- Hero Section -->
    <section class="privacy-hero" style="background-color: #6b8068;">
      <div class="container py-5 text-center text-white">
        <h1 class="display-4 fw-bold mb-3">Privacy Policy</h1>
        <p class="lead mb-0">Your trust is important to us</p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <div class="card shadow-sm border-0">
            <div class="card-body p-4 p-md-5">
              <!-- Last Updated -->
              <div class="text-end mb-4 text-muted">
                <p class="mb-0"><strong>Last Updated:</strong> March 2025</p>
              </div>

              <!-- Introduction -->
              <div class="mb-5">
                <h2 class="fw-bold mb-3" style="color: #2c463f; border-bottom: 2px solid #e9ecef; padding-bottom: 0.5rem;">Introduction</h2>
                <p class="lead">At TrackSpend, we are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your personal information when you use our services.</p>
              </div>

              <!-- Information We Collect -->
              <div class="mb-5">
                <h2 class="fw-bold mb-4" style="color: #2c463f; border-bottom: 2px solid #e9ecef; padding-bottom: 0.5rem;">Information We Collect</h2>
                
                <div class="row g-4 mb-4">
                  <div class="col-md-6">
                    <div class="info-card h-100 p-4">
                      <div class="d-flex align-items-center mb-3">
                        <div class="feature-icon-sm rounded-circle me-3" style="background-color: #6b8068; color: white;">
                          <i class="bi bi-person"></i>
                        </div>
                        <h3 class="h5 mb-0" style="color: #2c463f;">Personal Information</h3>
                      </div>
                      <ul class="list-unstyled">
                        <li class="mb-2 d-flex align-items-start">
                          <i class="bi bi-check-circle-fill me-2 mt-1" style="color: #6b8068;"></i>
                          <span>Account details (username, email)</span>
                        </li>
                        <li class="mb-2 d-flex align-items-start">
                          <i class="bi bi-check-circle-fill me-2 mt-1" style="color: #6b8068;"></i>
                          <span>Financial transactions you input</span>
                        </li>
                        <li class="d-flex align-items-start">
                          <i class="bi bi-check-circle-fill me-2 mt-1" style="color: #6b8068;"></i>
                          <span>Budget preferences and settings</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div class="col-md-6">
                    <div class="info-card h-100 p-4">
                      <div class="d-flex align-items-center mb-3">
                        <div class="feature-icon-sm rounded-circle me-3" style="background-color: #6b8068; color: white;">
                          <i class="bi bi-laptop"></i>
                        </div>
                        <h3 class="h5 mb-0" style="color: #2c463f;">Technical Data</h3>
                      </div>
                      <ul class="list-unstyled">
                        <li class="mb-2 d-flex align-items-start">
                          <i class="bi bi-check-circle-fill me-2 mt-1" style="color: #6b8068;"></i>
                          <span>Device information</span>
                        </li>
                        <li class="mb-2 d-flex align-items-start">
                          <i class="bi bi-check-circle-fill me-2 mt-1" style="color: #6b8068;"></i>
                          <span>IP address</span>
                        </li>
                        <li class="d-flex align-items-start">
                          <i class="bi bi-check-circle-fill me-2 mt-1" style="color: #6b8068;"></i>
                          <span>Usage patterns</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <!-- How We Use Your Information -->
              <div class="mb-5">
                <h2 class="fw-bold mb-4" style="color: #2c463f; border-bottom: 2px solid #e9ecef; padding-bottom: 0.5rem;">How We Use Your Information</h2>
                <div class="row g-4">
                  <div class="col-md-4">
                    <div class="usage-card text-center p-4 h-100">
                      <div class="feature-icon-md rounded-circle mx-auto mb-3" style="background-color: rgba(107, 128, 104, 0.1); color: #6b8068;">
                        <i class="bi bi-shield-lock"></i>
                      </div>
                      <h3 class="h5" style="color: #2c463f;">Service Security</h3>
                      <p class="mb-0">Protect against unauthorized access</p>
                    </div>
                  </div>
                  
                  <div class="col-md-4">
                    <div class="usage-card text-center p-4 h-100">
                      <div class="feature-icon-md rounded-circle mx-auto mb-3" style="background-color: rgba(107, 128, 104, 0.1); color: #6b8068;">
                        <i class="bi bi-graph-up"></i>
                      </div>
                      <h3 class="h5" style="color: #2c463f;">Improve Services</h3>
                      <p class="mb-0">Enhance features and performance</p>
                    </div>
                  </div>
                  
                  <div class="col-md-4">
                    <div class="usage-card text-center p-4 h-100">
                      <div class="feature-icon-md rounded-circle mx-auto mb-3" style="background-color: rgba(107, 128, 104, 0.1); color: #6b8068;">
                        <i class="bi bi-bell"></i>
                      </div>
                      <h3 class="h5" style="color: #2c463f;">Communications</h3>
                      <p class="mb-0">Important service updates</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Your Rights -->
              <div class="mb-5">
                <h2 class="fw-bold mb-4" style="color: #2c463f; border-bottom: 2px solid #e9ecef; padding-bottom: 0.5rem;">Your Rights</h2>
                <div class="row g-3">
                  <div class="col-sm-6 col-md-3" v-for="(right, index) in rights" :key="index">
                    <div class="rights-card p-3 text-center h-100">
                      <i class="bi bi-check-circle-fill mb-2" style="color: #6b8068; font-size: 1.5rem;"></i>
                      <p class="mb-0">{{ right }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contact Section -->
              <div class="contact-section p-4 p-md-5 rounded text-center" style="background-color: #f8f9fa;">
                <h3 class="h4 mb-3" style="color: #2c463f;">Questions about our privacy practices?</h3>
                <p class="lead mb-4">We're here to help clarify anything about how we handle your data.</p>
                <router-link to="/contact" class="btn px-4" style="background-color: #6b8068; color: white;">
                  Contact Us
                </router-link>
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
  name: 'PrivacyPage',
  data() {
    return {
      rights: [
        'Access your personal data',
        'Request data correction',
        'Delete your account',
        'Opt-out of communications'
      ]
    }
  }
}
</script>

<style scoped>
.feature-icon-sm {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
}

.feature-icon-md {
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.info-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.usage-card {
  background-color: white;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid rgba(0,0,0,0.05);
}

.usage-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.rights-card {
  background-color: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.rights-card:hover {
  background-color: white;
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.contact-section {
  transition: all 0.3s ease;
}

.contact-section:hover {
  box-shadow: 0 5px 15px rgba(0,0,0,0.05);
}

.card {
  border-radius: 12px;
}

.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  background-color: #2c463f !important;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .card-body {
    padding: 2rem !important;
  }
  
  .text-end {
    text-align: center !important;
  }
}
</style>