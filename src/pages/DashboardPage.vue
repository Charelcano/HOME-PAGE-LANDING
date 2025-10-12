<template>
  <div>
    <h2 class="h4 mb-3">Dashboard</h2>
    <div class="alert alert-success">You are logged in.</div>

    <div v-if="me" class="card mt-3">
      <div class="card-body">
        <h5 class="card-title mb-2">
          Welcome, {{ me.firstName }} {{ me.lastName }}
        </h5>
        <p class="mb-0 text-muted">
          Username: {{ me.username }} • Email: {{ me.email }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const me = ref(null)
const auth = useAuthStore()

onMounted(() => {
  // ✅ Use the user data already stored during login
  me.value = auth.user
})
</script>