<template>
  <div class="about-page">
    <!-- Hero Section -->
    <section class="about-hero" style="background-color: #6b8068;">
      <div class="container py-5 text-center text-white">
        <h1 class="display-4 fw-bold mb-3">About TrackSpend</h1>
        <p class="lead mb-0">Smart finance management made simple</p>
      </div>
    </section>

    <!-- Main Content -->
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-lg-10">
          <!-- Mission Section -->
          <div class="card shadow-sm mb-5 border-0">
            <div class="card-body p-5">
              <div class="row align-items-center">
                <div class="col-md-6 mb-4 mb-md-0">
                  <h2 class="fw-bold mb-4" style="color: #2c463f;">Our Mission</h2>
                  <p class="lead">We believe financial management should be accessible to everyone. TrackSpend helps you take control of your money without complex spreadsheets or expensive software.</p>
                </div>
                <div class="col-md-6">
                  <div class="d-flex justify-content-center">
                    <div class="feature-icon-lg rounded-circle" style="background-color: rgba(107, 128, 104, 0.1); color: #6b8068;">
                      <i class="bi bi-bullseye"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Features Section -->
          <div class="card shadow-sm mb-5 border-0">
            <div class="card-body p-5">
              <h2 class="fw-bold mb-4 text-center" style="color: #2c463f;">Key Features</h2>
              <div class="row g-4">
                <div class="col-md-6" v-for="(feature, index) in features" :key="index">
                  <div class="d-flex">
                    <div class="feature-icon-sm rounded-circle me-4" style="background-color: #6b8068; color: white;">
                      <i :class="feature.icon"></i>
                    </div>
                    <div>
                      <h4 class="mb-2" style="color: #2c463f;">{{ feature.title }}</h4>
                      <p class="mb-0">{{ feature.description }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Team Section -->
          <div class="card shadow-sm border-0">
            <div class="card-body p-5">
              <h2 class="fw-bold mb-5 text-center" style="color: #2c463f;">Meet The Team</h2>
              <div class="row g-4">
                <div class="col-md-4" v-for="(member, index) in team" :key="index">
                  <div class="team-member text-center p-4">
                    <img 
                      :src="member.image" 
                      :alt="member.name"
                      class="team-avatar mb-3"
                      style="border-color: #6b8068;"
                    >
                    <h3 class="h5 mb-2" style="color: #2c463f;">{{ member.name }}</h3>
                    <p class="text-muted mb-0">{{ member.position }}</p>
                  </div>
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
  name: 'AboutPage',
  data() {
    return {
      features: [
        {
          icon: 'bi bi-graph-up',
          title: 'Expense Tracking',
          description: 'Monitor your spending as it happens with our intuitive dashboard.'
        },
        {
          icon: 'bi bi-wallet2',
          title: 'Budget Management',
          description: 'Create personalized categories that match your spending habits.'
        },
        {
          icon: 'bi bi-pie-chart',
          title: 'Spending Analytics',
          description: 'Visual reports help you understand your financial patterns.'
        },
        {
          icon: 'bi bi-shield-lock',
          title: 'Secure Cloud Sync',
          description: 'Your data is protected and accessible across all devices.'
        }
      ],
      team: [
        {
          name: 'Leo Torres',
          position: 'Founder & Lead Developer',
          image: require('@/assets/images/leo.jpg')
        },
        {
          name: 'Patrice Virata',
          position: 'Application Architect',
          image: require('@/assets/images/patrice.jpg')
        },
        {
          name: 'Félix Scherer',
          position: 'UX Designer',
          image: require('@/assets/images/felix.jpg')
        }
      ]
    }
  }
}
</script>

<style scoped>
.feature-icon-lg {
  width: 150px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
}

.feature-icon-sm {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.team-avatar {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: transform 0.3s ease;
}

.team-avatar:hover {
  transform: scale(1.05);
}

.team-member {
  transition: all 0.3s ease;
}

.team-member:hover {
  transform: translateY(-5px);
}

.card {
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}

@media (max-width: 768px) {
  .feature-icon-lg {
    width: 100px;
    height: 100px;
    font-size: 3rem;
  }
  
  .card-body {
    padding: 2rem !important;
  }
}
</style>