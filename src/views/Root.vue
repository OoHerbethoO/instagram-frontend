<script lang="ts">
import { defineComponent, ref } from 'vue'
import PageSidebar from '@/components/reusable/PageSidebar.vue'
import PageHeader from '@/components/reusable/PageHeader.vue'
import { useMeQuery } from '@/types/graphql.types'
import type { OnClickOutsideHandler } from '@vueuse/core'
import { onClickOutside } from '@vueuse/core'

export default defineComponent({
  name: 'Root',
  components: {
    PageSidebar,
    PageHeader,
  },

  setup() {
    const sidebarRef = ref(null)
    const isSidebarOpen = ref(false)

    const sidebarHandler: OnClickOutsideHandler = (event) => (isSidebarOpen.value = false)
    onClickOutside(sidebarRef, (event) => (isSidebarOpen.value = false))

    const { result, loading, error } = useMeQuery()
    return {
      result,
      loading,
      error,
      isSidebarOpen,
      sidebarRef,
      sidebarHandler,
    }
  },
  computed: {
    routePath() {
      return this.$route.path
    },
  },
})
</script>

<template>
  <div class="app-layout">
    <aside
      class="app-sidebar"
      ref="sidebarRef"
      v-on-click-outside.bubble="sidebarHandler"
      :class="{
        'hidden lg:flex': !isSidebarOpen,
        flex: isSidebarOpen,
      }">
      <PageSidebar @closeSidebar="isSidebarOpen = false" />
    </aside>
    <main class="app-main w-full">
      <PageHeader @openSidebar="isSidebarOpen = !isSidebarOpen" />
      <section class="py-6">
        <router-view :key="routePath" />
      </section>
    </main>
  </div>
</template>
