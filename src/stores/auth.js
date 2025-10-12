import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // ✅ Add 'computed' here

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const user = ref(null)

  const isAuthenticated = computed(() => !!token.value)

  function setAuth(data) {
    token.value = data.token
    user.value = data.user
  }

  function clearAuth() {
    token.value = null
    user.value = null
  }

  return { token, user, isAuthenticated, setAuth, clearAuth }
})
