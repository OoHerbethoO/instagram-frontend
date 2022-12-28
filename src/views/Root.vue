<script lang="ts">
import { defineComponent } from 'vue'
import AppSidebar from '@/components/reusable/AppSidebar.vue'
import AppHeader from '@/components/reusable/AppHeader.vue'
import { useMeQuery } from '@/types/graphql.types'

export default defineComponent({
  name: 'Root',
  components: {
    AppSidebar,
    AppHeader,
  },

  setup() {
    const { result, loading, error } = useMeQuery()
    return {
      result,
      loading,
      error,
    }
  },
})
</script>

<template>
  <div class="app-layout">
    <aside class="app-sidebar">
      <AppSidebar />
    </aside>
    <main class="app-main w-full">
      <AppHeader />
      <section class="py-10">
        <router-view />
      </section>
    </main>
  </div>
</template>
