<template>
  <div class="home-content">
    <!-- Hero Section -->
    <section class="hero" style="background-color: #6b8068; margin-top: 0; padding-top: 0;">
      <div class="container px-4 py-4"> 
        <div class="row flex-lg-row-reverse align-items-center g-4"> 
          <div class="col-10 col-sm-8 col-lg-6">
            <div class="placeholder-image bg-light rounded shadow d-flex align-items-center justify-content-center" style="height: 300px;">
              <i class="bi bi-pie-chart-fill text-muted" style="font-size: 5rem; color: #6b8068;"></i>
            </div>
          </div>
          <div class="col-lg-6 text-white">
            <h1 class="display-5 fw-bold lh-1 mb-3">Take Control of Your Finances</h1>
            <p class="lead">TrackSpend helps you manage expenses, set budgets, and achieve financial goals with our intuitive platform.</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <router-link to="/register" class="btn btn-light btn-lg px-4 me-md-2" style="color: #6b8068;">Get started</router-link>
              <router-link to="/about" class="btn btn-outline-light btn-lg px-4">Learn more</router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <div class="container px-4 py-5" id="featured-3">
      <h2 class="pb-2 border-bottom text-center" style="color: #2c463f;">Why Choose TrackSpend?</h2>
      <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
        <div class="feature col">
          <div class="feature-icon rounded-3 mb-3" style="background-color: #6b8068; color: white;">
            <i class="bi bi-cash-stack"></i>
          </div>
          <h3 style="color: #2c463f;">Expense Tracking</h3>
          <p>Easily log and categorize your daily expenses. Keep all your financial records in one place with our simple interface.</p>
          <router-link to="/expenses/create" class="icon-link" style="color: #6b8068;">
            Add your first expense
            <i class="bi bi-chevron-right"></i>
          </router-link>
        </div>

        <div class="feature col">
          <div class="feature-icon rounded-3 mb-3" style="background-color: #6b8068; color: white;">
            <i class="bi bi-graph-up"></i>
          </div>
          <h3 style="color: #2c463f;">Budget Management</h3>
          <p>Set monthly budgets and get alerts when you're approaching your limits. Stay on track with your financial goals.</p>
          <router-link to="/budgets/create" class="icon-link" style="color: #6b8068;">
            Create a budget
            <i class="bi bi-chevron-right"></i>
          </router-link>
        </div>

        <div class="feature col">
          <div class="feature-icon rounded-3 mb-3" style="background-color: #6b8068; color: white;">
            <i class="bi bi-shield-lock"></i>
          </div>
          <h3 style="color: #2c463f;">Secure & Private</h3>
          <p>Your data is protected with bank-level security. We never share your financial information with third parties.</p>
          <router-link to="/privacy" class="icon-link" style="color: #6b8068;">
            Privacy policy
            <i class="bi bi-chevron-right"></i>
          </router-link>
        </div>
      </div>
    </div>

    <!-- How It Works -->
    <div class="bg-light">
      <div class="container px-4 py-5">
        <h2 class="text-center mb-5" style="color: #2c463f;">How TrackSpend Works</h2>
        <div class="row g-4 py-5">
          <div class="col-md-4">
            <div class="step-card p-4 text-center">
              <div class="step-number rounded-circle mx-auto mb-3" style="background-color: #6b8068; color: white;">1</div>
              <h3 style="color: #2c463f;">Sign Up</h3>
              <p>Create your free account in less than a minute. No credit card required.</p>
              <router-link to="/register" class="btn btn-outline" style="border-color: #6b8068; color: #6b8068;">Get Started</router-link>
            </div>
          </div>
          <div class="col-md-4">
            <div class="step-card p-4 text-center">
              <div class="step-number rounded-circle mx-auto mb-3" style="background-color: #6b8068; color: white;">2</div>
              <h3 style="color: #2c463f;">Add Expenses</h3>
              <p>Start logging your expenses. Our smart categories make it easy to organize.</p>
              <router-link to="/expenses/create" class="btn btn-outline" style="border-color: #6b8068; color: #6b8068;">Try It Now</router-link>
            </div>
          </div>
          <div class="col-md-4">
            <div class="step-card p-4 text-center">
              <div class="step-number rounded-circle mx-auto mb-3" style="background-color: #6b8068; color: white;">3</div>
              <h3 style="color: #2c463f;">Set Budgets</h3>
              <p>Create budgets for different categories and watch your savings grow.</p>
              <router-link to="/budgets/create" class="btn btn-outline" style="border-color: #6b8068; color: #6b8068;">Set Budget</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Testimonials -->
    <div class="container px-4 py-5">
      <h2 class="text-center mb-5" style="color: #2c463f;">What Our Users Say</h2>
      <div class="row">
        <div class="col-lg-4 mb-4">
          <div class="card h-100">
            <div class="card-body text-center p-4">
              <div class="placeholder-avatar rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 100px; height: 100px; background-color: rgba(107, 128, 104, 0.1);">
                <i class="bi bi-person-fill" style="font-size: 3rem; color: #6b8068;"></i>
              </div>
              <p class="card-text">"TrackSpend helped me save $500 in my first month by showing me where I was overspending!"</p>
              <h5 class="card-title mb-1" style="color: #2c463f;">Sarah J.</h5>
              <p class="text-muted small">Freelance Designer</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 mb-4">
          <div class="card h-100">
            <div class="card-body text-center p-4">
              <div class="placeholder-avatar rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 100px; height: 100px; background-color: rgba(107, 128, 104, 0.1);">
                <i class="bi bi-person-fill" style="font-size: 3rem; color: #6b8068;"></i>
              </div>
              <p class="card-text">"As a small business owner, the budgeting tools have been invaluable for managing cash flow."</p>
              <h5 class="card-title mb-1" style="color: #2c463f;">Michael T.</h5>
              <p class="text-muted small">Small Business Owner</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 mb-4">
          <div class="card h-100">
            <div class="card-body text-center p-4">
              <div class="placeholder-avatar rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style="width: 100px; height: 100px; background-color: rgba(107, 128, 104, 0.1);">
                <i class="bi bi-person-fill" style="font-size: 3rem; color: #6b8068;"></i>
              </div>
              <p class="card-text">"The reports made tax season so much easier. I'll never go back to spreadsheets!"</p>
              <h5 class="card-title mb-1" style="color: #2c463f;">Lisa M.</h5>
              <p class="text-muted small">Accountant</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Final CTA -->
    <div class="py-5 text-white" style="background-color: #2c463f;">
      <div class="container text-center py-4">
        <h2 class="display-5 mb-4">Ready to Transform Your Finances?</h2>
        <p class="lead mb-4">Join thousands of users taking control of their money today.</p>
        <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <router-link to="/register" class="btn btn-lg px-4 gap-3" style="background-color: #6b8068;">Get Started for Free</router-link>
          <router-link to="/contact" class="btn btn-outline-light btn-lg px-4">Contact Us</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home-content {
  margin: 0;
  padding: 0;
}

.hero {
  margin-top: 0 !important;
  padding-top: 0 !important;
}
.hero .container {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}
.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  font-size: 2rem;
}

.step-number {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
}

.step-card {
  background: white;
  border-radius: 0.5rem;
  height: 100%;
  transition: transform 0.3s ease;
}

.step-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
}

.icon-link {
  display: inline-flex;
  align-items: center;
  text-decoration: none;
}

.icon-link:hover {
  text-decoration: underline;
}

.icon-link i {
  margin-left: 0.25rem;
  transition: transform 0.25s ease;
}

.icon-link:hover i {
  transform: translateX(0.25rem);
}

.placeholder-image {
  background-color: #f8f9fa;
  border: 2px dashed #dee2e6;
}

.btn {
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
}

.card {
  border: none;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-cta {
    flex-direction: column;
    align-items: center;
  }
}
</style>