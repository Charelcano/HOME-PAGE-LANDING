<template>
  <div class="dashboard-page">
    <div class="container-fluid">
      <!-- Page Header -->
      <div class="dashboard-header">
        <h2 class="dashboard-title">Dashboard</h2>
        <div class="user-actions">
          <span class="user-name" v-if="me">
            {{ me.firstName }} {{ me.lastName }}
          </span>
          <button class="logout-btn" @click="handleLogout" :disabled="loggingOut">
            <span v-if="loggingOut" class="logout-spinner"></span>
            <i class="fas fa-sign-out-alt logout-icon"></i>
          </button>
        </div>
      </div>

      <!-- Welcome Alert -->
      <div class="alert alert-success alert-dashboard">
        <div class="alert-content">
          <i class="fas fa-check-circle alert-icon"></i>
          <span>You are successfully logged in.</span>
        </div>
      </div>

      <!-- User Profile Card -->
      <div v-if="me" class="card profile-card">
        <div class="card-body">
          <div class="profile-content">
            <div class="profile-info">
              <h5 class="profile-title">
                Welcome back, {{ me.firstName }} {{ me.lastName }}!
              </h5>
              <div class="profile-details">
                <p class="profile-detail">
                  <i class="fas fa-user detail-icon"></i>
                  <strong>Username:</strong> {{ me.username }}
                </p>
                <p class="profile-detail">
                  <i class="fas fa-envelope detail-icon"></i>
                  <strong>Email:</strong> {{ me.email }}
                </p>
              </div>
            </div>
            <div class="profile-avatar">
              <div class="avatar-placeholder">
                {{ getInitials(me.firstName, me.lastName) }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-item" v-for="stat in stats" :key="stat.id">
          <div class="stat-card">
            <div class="stat-content">
              <div class="stat-icon" :class="'stat-icon-' + stat.color">
                <i :class="stat.icon"></i>
              </div>
              <div class="stat-info">
                <h6 class="stat-label">{{ stat.label }}</h6>
                <h4 class="stat-value">{{ stat.value }}</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Recent Activity -->
      <div class="dashboard-content">
        <div class="activity-section">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Recent Activity</h5>
            </div>
            <div class="card-body">
              <div class="activity-list">
                <div class="activity-item" v-for="activity in recentActivities" :key="activity.id">
                  <div class="activity-icon" :class="'activity-icon-' + activity.color">
                    <i :class="activity.icon"></i>
                  </div>
                  <div class="activity-content">
                    <p class="activity-message">{{ activity.message }}</p>
                    <small class="activity-time">{{ activity.time }}</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="actions-section">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Quick Actions</h5>
            </div>
            <div class="card-body">
              <div class="actions-grid">
                <button class="action-btn action-btn-primary">
                  <i class="fas fa-plus action-icon"></i>
                  <span>Create New Project</span>
                </button>
                <button class="action-btn action-btn-success">
                  <i class="fas fa-upload action-icon"></i>
                  <span>Upload Files</span>
                </button>
                <button class="action-btn action-btn-info">
                  <i class="fas fa-cog action-icon"></i>
                  <span>Settings</span>
                </button>
                <button class="action-btn action-btn-warning">
                  <i class="fas fa-question-circle action-icon"></i>
                  <span>Get Help</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const me = ref(null)
const loggingOut = ref(false)
const auth = useAuthStore()
const router = useRouter()

const stats = ref([
  {
    id: 1,
    label: 'Performance',
    value: '98%',
    icon: 'fas fa-chart-line',
    color: 'primary'
  },
  {
    id: 2,
    label: 'Tasks Done',
    value: '24/30',
    icon: 'fas fa-check-circle',
    color: 'success'
  },
  {
    id: 3,
    label: 'Active Projects',
    value: '12',
    icon: 'fas fa-clock',
    color: 'warning'
  },
  {
    id: 4,
    label: 'Team Members',
    value: '8',
    icon: 'fas fa-users',
    color: 'info'
  }
])

const recentActivities = ref([
  {
    id: 1,
    icon: 'fas fa-file-alt',
    message: 'You created a new project',
    time: '2 hours ago',
    color: 'primary'
  },
  {
    id: 2,
    icon: 'fas fa-user-plus',
    message: 'New team member joined',
    time: '4 hours ago',
    color: 'success'
  },
  {
    id: 3,
    icon: 'fas fa-chart-bar',
    message: 'Monthly report generated',
    time: '1 day ago',
    color: 'info'
  },
  {
    id: 4,
    icon: 'fas fa-tasks',
    message: 'Completed project milestone',
    time: '2 days ago',
    color: 'warning'
  }
])

onMounted(() => {
  me.value = auth.user
})

const getInitials = (firstName, lastName) => {
  return `${firstName?.charAt(0) || ''}${lastName?.charAt(0) || ''}`.toUpperCase()
}

const handleLogout = async () => {
  loggingOut.value = true
  try {
    await auth.logout()
    router.push('/') // Redirects to home page
  } catch (error) {
    console.error('Logout error:', error)
  } finally {
    loggingOut.value = false
  }
}
</script>

<style scoped>
.dashboard-page {
  background-color: #f8f9fa;
  min-height: 100vh;
  padding: 1rem;
}

/* Header Styles */
.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}

.dashboard-title {
  color: #2d3748;
  font-weight: 700;
  margin: 0;
  font-size: 1.5rem;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.user-name {
  color: #4a5568;
  font-weight: 500;
}

/* Logout Button Styles - ADDED BACK */
.logout-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: auto;
}

.logout-btn:hover:not(:disabled) {
  background: #c53030;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(229, 62, 62, 0.3);
}

.logout-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
}

.logout-text {
  font-size: 0.875rem;
}

.logout-icon {
  font-size: 0.875rem;
}

.logout-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid transparent;
  border-top: 2px solid white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Alert */
.alert-dashboard {
  border-left: 4px solid #38a169;
  border-radius: 8px;
  margin-bottom: 1.5rem;
}

.alert-content {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.alert-icon {
  color: #38a169;
}

/* Profile Card */
.profile-card {
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-left: 4px solid #3182ce;
  margin-bottom: 1.5rem;
}

.profile-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.profile-info {
  flex: 1;
}

.profile-title {
  color: #2d3748;
  font-weight: 600;
  margin-bottom: 1rem;
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.profile-detail {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0;
  color: #4a5568;
}

.detail-icon {
  color: #718096;
  width: 16px;
}

.profile-avatar {
  flex-shrink: 0;
}

.avatar-placeholder {
  width: 70px;
  height: 70px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.25rem;
  font-weight: bold;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.stat-card {
  background: white;
  border: none;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  transition: transform 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.stat-icon-primary { background: #3182ce; }
.stat-icon-success { background: #38a169; }
.stat-icon-warning { background: #d69e2e; }
.stat-icon-info { background: #00b5d8; }

.stat-info {
  flex: 1;
}

.stat-label {
  color: #718096;
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0;
}

.stat-value {
  color: #2d3748;
  font-weight: 700;
  margin: 0;
  font-size: 1.5rem;
}

/* Dashboard Content */
.dashboard-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
}

/* Activity Section */
.activity-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.activity-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.75rem 0;
}

.activity-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
}

.activity-icon-primary { background: #3182ce; }
.activity-icon-success { background: #38a169; }
.activity-icon-warning { background: #d69e2e; }
.activity-icon-info { background: #00b5d8; }

.activity-content {
  flex: 1;
}

.activity-message {
  color: #2d3748;
  margin: 0 0 0.25rem 0;
  font-weight: 500;
}

.activity-time {
  color: #718096;
}

/* Actions Section */
.actions-grid {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  background: white;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  width: 100%;
}

.action-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.action-btn-primary { border-left: 4px solid #3182ce; }
.action-btn-success { border-left: 4px solid #38a169; }
.action-btn-info { border-left: 4px solid #00b5d8; }
.action-btn-warning { border-left: 4px solid #d69e2e; }

.action-icon {
  color: #718096;
  width: 16px;
}

/* Card Styles */
.card {
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.card-header {
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 1.25rem;
}

.card-title {
  color: #2d3748;
  font-weight: 600;
  margin: 0;
}

.card-body {
  padding: 1.25rem;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .dashboard-content {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

@media (max-width: 768px) {
  .dashboard-page {
    padding: 0.75rem;
  }

  .dashboard-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .user-actions {
    width: 100%;
    justify-content: space-between;
  }

  .logout-btn {
    padding: 0.5rem 0.75rem;
  }

  .profile-content {
    flex-direction: column;
    text-align: center;
  }

  .profile-details {
    align-items: center;
  }

  .stats-grid {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .stat-content {
    flex-direction: column;
    text-align: center;
    gap: 0.75rem;
  }
}

@media (max-width: 480px) {
  .dashboard-page {
    padding: 0.5rem;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .user-actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }

  .logout-btn {
    width: 100%;
    justify-content: center;
  }

  .activity-item {
    flex-direction: column;
    text-align: center;
    gap: 0.5rem;
  }

  .action-btn {
    justify-content: center;
    text-align: center;
  }
}

@media (max-width: 320px) {
  .dashboard-title {
    font-size: 1.25rem;
  }

  .stat-card {
    padding: 1rem;
  }

  .card-body {
    padding: 1rem;
  }
}
</style>