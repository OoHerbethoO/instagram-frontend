<script lang="ts">
import { defineComponent } from 'vue'
import AppSidebar from '@/components/reusable/AppSidebar.vue'

export default defineComponent({
  name: 'Root',
  components: {
    AppSidebar,
  },
})
</script>

<template>
  <div class="app-layout">
    <aside class="app-sidebar">
      <AppSidebar />
    </aside>
    <main class="app-main">
      <router-view />
    </main>
  </div>
</template>
