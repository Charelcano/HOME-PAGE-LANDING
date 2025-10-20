<template>
  <div class="login-page">
    <div class="container-fluid">
      <div class="row justify-content-center align-items-center min-vh-100">
        <div class="col-12 col-sm-8 col-md-6 col-lg-4">
          <!-- Login Card -->
          <div class="login-card">
            <!-- Header -->
            <div class="login-header">
              <h1 class="login-title">Sign in</h1>
              <p class="login-subtitle">Welcome back! Please sign in to your account.</p>
            </div>

            <!-- Login Form -->
            <form @submit.prevent="onSubmit" class="login-form">
              <!-- Username Field -->
              <div class="form-group">
                <label class="form-label">Username</label>
                <div class="input-group">
                  <span class="input-icon">
                    <i class="fas fa-user"></i>
                  </span>
                  <input 
                    v-model.trim="username" 
                    type="text" 
                    class="form-control" 
                    placeholder="kminchelle" 
                    required
                    :disabled="loading"
                  />
                </div>
              </div>

              <!-- Password Field -->
              <div class="form-group">
                <label class="form-label">Password</label>
                <div class="input-group">
                  <span class="input-icon">
                    <i class="fas fa-lock"></i>
                  </span>
                  <input 
                    v-model.trim="password" 
                    type="password" 
                    class="form-control" 
                    placeholder="0lelplR" 
                    required
                    :disabled="loading"
                  />
                </div>
              </div>

              <!-- Login Button -->
              <button class="login-btn" :disabled="loading">
                <span v-if="loading" class="spinner"></span>
                <span>{{ loading ? 'Signing in...' : 'Login' }}</span>
              </button>

              <!-- Error Message -->
              <div v-if="error" class="error-message">
                <i class="fas fa-exclamation-circle"></i>
                {{ error }}
              </div>
            </form>

            <!-- Demo Credentials -->
            <div class="demo-credentials">
              <h6>Demo Credentials:</h6>
              <p><strong>Username:</strong> kminchelle</p>
              <p><strong>Password:</strong> 0lelplR</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import http from '@/api/http'

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

async function onSubmit() {
  error.value = ''
  loading.value = true
  
  try {
    const { data } = await http.post('/auth/login', { 
      username: username.value, 
      password: password.value 
    })
    
    const user = {
      id: data.id,
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName
    }
    
    auth.setAuth({ token: data.token, user })
    router.push(route.query.redirect || '/dashboard')
    
  } catch (e) { 
    error.value = 'Invalid credentials or server error. Please try again.'
  } finally { 
    loading.value = false 
  }
}
</script>

<style scoped>
.login-page {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  padding: 20px;
}

.login-card {
  background: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-title {
  font-size: 1.75rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  color: #718096;
  font-size: 0.9rem;
  margin-bottom: 0;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  color: #a0aec0;
  z-index: 2;
}

.form-control {
  width: 100%;
  padding: 12px 12px 12px 40px;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  background: #fafafa;
}

.form-control:focus {
  outline: none;
  border-color: #667eea;
  background: white;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-control:disabled {
  background-color: #f7fafc;
  opacity: 0.7;
  cursor: not-allowed;
}

.login-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.login-btn:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
}

.login-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  background: #fed7d7;
  color: #c53030;
  padding: 12px;
  border-radius: 8px;
  margin-top: 1rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #feb2b2;
}

.demo-credentials {
  margin-top: 2rem;
  padding: 1rem;
  background: #f7fafc;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.demo-credentials h6 {
  color: #4a5568;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
}

.demo-credentials p {
  margin-bottom: 0.25rem;
  font-size: 0.8rem;
  color: #718096;
}

.demo-credentials strong {
  color: #4a5568;
}

/* Responsive Design */
@media (max-width: 768px) {
  .login-page {
    padding: 15px;
  }
  
  .login-card {
    padding: 2rem 1.5rem;
    border-radius: 12px;
  }
  
  .login-title {
    font-size: 1.5rem;
  }
  
  .login-subtitle {
    font-size: 0.85rem;
  }
}

@media (max-width: 576px) {
  .login-card {
    padding: 1.5rem 1rem;
    border-radius: 10px;
  }
  
  .login-title {
    font-size: 1.25rem;
  }
  
  .form-control {
    padding: 10px 10px 10px 35px;
    font-size: 0.9rem;
  }
  
  .login-btn {
    padding: 12px;
    font-size: 0.9rem;
  }
  
  .input-icon {
    left: 10px;
  }
}

@media (max-width: 375px) {
  .login-page {
    padding: 10px;
  }
  
  .login-card {
    padding: 1.25rem 0.75rem;
  }
  
  .demo-credentials {
    margin-top: 1.5rem;
    padding: 0.75rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .login-card {
    background: #2d3748;
    color: #e2e8f0;
  }
  
  .login-title {
    color: #f7fafc;
  }
  
  .login-subtitle {
    color: #cbd5e0;
  }
  
  .form-label {
    color: #e2e8f0;
  }
  
  .form-control {
    background: #f174e3ff;
    border-color: #4a5568;
    color: #f7fafc;
  }
  
  .form-control:focus {
    background: #4a5568;
    border-color: #667eea;
  }
  
  .demo-credentials {
    background: #684a62ff;
    border-color: #718096;
  }
  
  .demo-credentials h6,
  .demo-credentials strong {
    color: #e2e8f0;
  }
  
  .demo-credentials p {
    color: #cbd5e0;
  }
}
</style>