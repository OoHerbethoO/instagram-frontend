<script lang="ts">
import { defineComponent } from 'vue'
import navigationJson from '@/json/navigation.json'
import { useMeQuery } from '@/types/graphql.types'
import Cookies from '@/utils/cookies'
import { useRouter } from 'vue-router'
import { AppRoutes } from '@/constants/routes.constant'

export default defineComponent({
  name: 'AppSidebarSkeleton',
  setup() {
    return {
      navigationJson,
    }
  },
})
</script>

<template>
  <aside class="w-full flex flex-col justify-between">
    <header class="w-full">
      <header class="py-3 w-full rounded h-max flex gap-x-3 items-center">
        <div class="avatar skeleton bg-gray-300"></div>
        <div class="h-6 w-28 rounded skeleton bg-gray-300"></div>
      </header>
      <section class="flex justify-between text-center gap-x-3 mt-6">
        <div
          class="flex items-center flex-col"
          v-for="i in 3"
          :key="i">
          <div class="h-4 w-6 rounded-full skeleton bg-gray-300"></div>
          <div class="h-4 w-16 rounded skeleton bg-gray-300 mt-2"></div>
        </div>
      </section>
      <nav class="mt-10">
        <div
          v-for="item in navigationJson"
          :key="item.text"
          class="h-10 w-full rounded skeleton bg-gray-300 mb-3"></div>
      </nav>
    </header>
    <footer>
      <div class="h-10 w-full rounded skeleton bg-gray-300 mb-3"></div>
    </footer>
  </aside>
</template>
