<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useLoginStore } from './store/login';

const loginStore = useLoginStore();

const busy = computed(() => loginStore.busy);
onMounted(() => {
  if (!loginStore.loggedIn) {
    loginStore.getLogin();
  }
});


const urlLink = `${import.meta.env.VITE_AUTH_CLIENT}/login/discord`;

const onClick = () => {
  window.location.href = urlLink;
}
</script>

<template>
  <div class="flex flex-col h-screen p-2">
    <div v-if="loginStore.loggedIn">User Logged In</div>
    <div v-else-if="loginStore.busy"></div>
    <div v-else>
      <button type="button"
        :disabled="busy"
        @click="onClick">{{ busy ? 'Loading...' : 'LOGIN DISCORD' }}</button>
    </div>
  </div>
</template>