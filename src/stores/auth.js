import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') || null)
  const user = ref(JSON.parse(localStorage.getItem('user') || 'null'))

  const isAuthenticated = computed(() => !!token.value)

  function setAuth(data) {
    token.value = data.token
    user.value = data.user
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))
    console.log('✅ Token saved:', data.token) // 👈 ADD THIS LINE
  }

  function clearAuth() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    console.log('🚪 Logged out, token cleared.')
  }

  return { token, user, isAuthenticated, setAuth, clearAuth }
})
