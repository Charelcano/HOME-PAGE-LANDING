<template>
  <div class="landing-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="hero-wrapper">
        <div class="hero-content">
          <h1 class="hero-title">
            LANDING PAGE
            <span class="hero-subtitle">CREATIVE</span>
          </h1>
          <button class="btn-learn-more" @click="navigateToLearnMore">LEARN MORE</button>
        </div>
        
        <!-- Organic Shapes -->
        <div class="organic-shape shape-1"></div>
        <div class="organic-shape shape-2"></div>
        <div class="organic-shape shape-3"></div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-title">
          <h2>Why Choose Us</h2>
          <p>Experience the difference with our premium features</p>
        </div>
        <div class="features-grid">
          <div class="feature-card" v-for="feature in features" :key="feature.id">
            <div class="feature-icon">{{ feature.icon }}</div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-column">
          <h3>MyApp</h3>
          <p>Creating exceptional digital experiences</p>
        </div>
        <div class="footer-column">
          <h3>Quick Links</h3>
          <ul class="footer-links">
            <li><a href="#" @click.prevent="navigateToHome">Home</a></li>
            <li><a href="#" @click.prevent="navigateToDashboard">Dashboard</a></li>
            <li><a href="#" @click.prevent="navigateToLogin">Login</a></li>
          </ul>
        </div>
        <div class="footer-column">
          <h3>Connect</h3>
          <ul class="footer-links">
            <li><a href="#">Twitter</a></li>
            <li><a href="#">Facebook</a></li>
            <li><a href="#">Instagram</a></li>
          </ul>
        </div>
      </div>
      <div class="copyright">
        &copy; 2023 MyApp. All rights reserved.
      </div>
    </footer>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'HomePage',
  setup() {
    const router = useRouter()
    
    const features = [
      {
        id: 1,
        icon: '⚡',
        title: 'Fast Performance',
        description: 'Lightning fast loading times and smooth interactions'
      },
      {
        id: 2,
        icon: '🎨',
        title: 'Creative Design',
        description: 'Beautiful, modern design that captivates your audience'
      },
      {
        id: 3,
        icon: '🔒',
        title: 'Secure & Safe',
        description: 'Enterprise-grade security to protect your data'
      }
    ]

    const navigateToLearnMore = () => {
      document.querySelector('.features-section').scrollIntoView({ 
        behavior: 'smooth' 
      })
    }

    const navigateToDashboard = () => {
      router.push('/dashboard')
    }

    const navigateToLogin = () => {
      router.push('/login')
    }

    const navigateToHome = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return {
      features,
      navigateToLearnMore,
      navigateToDashboard,
      navigateToLogin,
      navigateToHome
    }
  }
}
</script>

<style scoped>
.landing-page {
  background: #0a0a0a;
  color: #ffffff;
  overflow-x: hidden;
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  display: flex;
  align-items: center;
  overflow: hidden;
}

.hero-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  padding: 2rem;
  position: relative;
  z-index: 10;
  animation: fadeInUp 1s ease-out;
}

.hero-title {
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 1.1;
  margin-bottom: 1.5rem;
  letter-spacing: 0.1em;
  background: linear-gradient(135deg, #ffffff, #ff2d75);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.hero-subtitle {
  display: block;
  font-size: clamp(1.25rem, 4vw, 2.5rem);
  font-weight: 300;
  letter-spacing: 0.3em;
  margin-top: 0.5rem;
  color: #ff5e9a;
}

.btn-learn-more {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 45, 117, 0.8);
  padding: 0.875rem 2.5rem;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  margin-top: 1.5rem;
  background: linear-gradient(135deg, rgba(255, 45, 117, 0.2), rgba(255, 94, 154, 0.1));
}

.btn-learn-more:hover {
  background: rgba(255, 45, 117, 0.3);
  border-color: #ff2d75;
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(255, 45, 117, 0.4);
}

/* Organic Shapes */
.organic-shape {
  position: absolute;
  background: #ff2d75;
  border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
  opacity: 0.1;
  z-index: 1;
}

.shape-1 {
  width: 300px;
  height: 300px;
  top: -50px;
  right: -50px;
  animation: morphShape1 20s ease-in-out infinite;
}

.shape-2 {
  width: 400px;
  height: 400px;
  bottom: -100px;
  left: -50px;
  animation: morphShape2 25s ease-in-out infinite;
}

.shape-3 {
  width: 250px;
  height: 250px;
  bottom: -50px;
  right: -75px;
  animation: morphShape3 18s ease-in-out infinite;
}

/* Features Section */
.features-section {
  padding: 4rem 1rem;
  background-color: #111111;
  position: relative;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.section-title {
  text-align: center;
  margin-bottom: 3rem;
}

.section-title h2 {
  font-size: 2rem;
  color: #ff2d75;
  margin-bottom: 1rem;
  font-weight: 700;
}

.section-title p {
  color: #cccccc;
  max-width: 600px;
  margin: 0 auto;
  font-size: 1rem;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

.feature-card {
  background: linear-gradient(145deg, #1a1a1a, #151515);
  border-radius: 12px;
  padding: 2rem 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #333;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: #ff2d75;
  box-shadow: 0 10px 25px rgba(255, 45, 117, 0.2);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
}

.feature-card h3 {
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: #ffffff;
  font-weight: 600;
}

.feature-card p {
  color: #aaaaaa;
  line-height: 1.6;
  font-size: 0.9rem;
}

/* Footer */
.footer {
  background-color: #0a0a0a;
  color: #cccccc;
  padding: 3rem 1rem 1rem;
  border-top: 1px solid #333;
}

.footer-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto 2rem;
}

.footer-column h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: #ff5e9a;
  font-weight: 600;
}

.footer-links {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: #aaaaaa;
  text-decoration: none;
  transition: color 0.3s;
  font-size: 0.9rem;
}

.footer-links a:hover {
  color: #ff2d75;
}

.copyright {
  text-align: center;
  padding-top: 1rem;
  border-top: 1px solid #333;
  color: #888888;
  font-size: 0.8rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes morphShape1 {
  0%, 100% {
    border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
    transform: rotate(0deg) scale(1);
  }
  50% {
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    transform: rotate(180deg) scale(1.1);
  }
}

@keyframes morphShape2 {
  0%, 100% {
    border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
    transform: rotate(0deg) translate(0, 0);
  }
  50% {
    border-radius: 70% 30% 50% 50% / 60% 60% 40% 40%;
    transform: rotate(-90deg) translate(20px, -15px);
  }
}

@keyframes morphShape3 {
  0%, 100% {
    border-radius: 60% 40% 50% 50% / 70% 30% 70% 30%;
    transform: rotate(0deg);
  }
  50% {
    border-radius: 40% 60% 40% 60% / 50% 70% 30% 70%;
    transform: rotate(120deg);
  }
}

/* Tablet Styles */
@media (min-width: 768px) {
  .hero-content {
    padding: 3rem 2rem;
  }
  
  .hero-title {
    font-size: clamp(3rem, 8vw, 5rem);
  }
  
  .hero-subtitle {
    font-size: clamp(1.5rem, 4vw, 2rem);
  }
  
  .btn-learn-more {
    padding: 1rem 3rem;
    font-size: 1rem;
  }
  
  .features-section {
    padding: 5rem 2rem;
  }
  
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  .feature-card {
    padding: 2.5rem 2rem;
  }
  
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
    gap: 2.5rem;
  }
  
  .organic-shape {
    opacity: 0.08;
  }
  
  .shape-1 {
    width: 400px;
    height: 400px;
    top: -100px;
    right: -100px;
  }
  
  .shape-2 {
    width: 500px;
    height: 500px;
    bottom: -150px;
    left: -100px;
  }
  
  .shape-3 {
    width: 350px;
    height: 350px;
    bottom: -75px;
    right: -100px;
  }
}

/* Desktop Styles */
@media (min-width: 1024px) {
  .hero-content {
    max-width: 900px;
    padding: 4rem 2rem;
  }
  
  .hero-title {
    font-size: clamp(4rem, 8vw, 6rem);
    margin-bottom: 2rem;
  }
  
  .hero-subtitle {
    font-size: clamp(2rem, 4vw, 3rem);
  }
  
  .btn-learn-more {
    padding: 1.125rem 4rem;
    font-size: 1.125rem;
    margin-top: 2rem;
  }
  
  .features-section {
    padding: 6rem 2rem;
  }
  
  .features-grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 2.5rem;
  }
  
  .section-title h2 {
    font-size: 2.5rem;
  }
  
  .footer-content {
    grid-template-columns: repeat(3, 1fr);
    gap: 3rem;
  }
  
  .shape-1 {
    width: 600px;
    height: 600px;
    top: -150px;
    right: -150px;
  }
  
  .shape-2 {
    width: 700px;
    height: 700px;
    bottom: -200px;
    left: -150px;
  }
  
  .shape-3 {
    width: 450px;
    height: 450px;
    bottom: -100px;
    right: -150px;
  }
}

/* Large Desktop */
@media (min-width: 1440px) {
  .hero-content {
    max-width: 1000px;
  }
  
  .hero-title {
    font-size: clamp(5rem, 10vw, 8rem);
  }
  
  .hero-subtitle {
    font-size: clamp(2.5rem, 5vw, 4rem);
  }
  
  .shape-1 {
    width: 800px;
    height: 800px;
  }
  
  .shape-2 {
    width: 900px;
    height: 900px;
  }
  
  .shape-3 {
    width: 550px;
    height: 550px;
  }
}
</style>