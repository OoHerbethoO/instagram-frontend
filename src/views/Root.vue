<script lang="ts">
import { defineComponent } from 'vue'
import PageSidebar from '@/components/reusable/PageSidebar.vue'
import PageHeader from '@/components/reusable/PageHeader.vue'
import { useMeQuery } from '@/types/graphql.types'

export default defineComponent({
  name: 'Root',
  components: {
    PageSidebar,
    PageHeader,
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
      <PageSidebar />
    </aside>
    <main class="app-main w-full">
      <PageHeader />
      <section class="py-6">
        <router-view />
      </section>
    </main>
  </div>
</template>
