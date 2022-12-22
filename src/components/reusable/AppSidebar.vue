<script lang="ts">
import { defineComponent } from 'vue'
import Avatar from './Avatar.vue'
import NavLink from './NavLink.vue'
import Button from './Button.vue'
import navigationJson from '@/json/navigation.json'
import { useMeQuery } from '@/types/graphql.types'
import Cookies from '@/utils/cookies'
import { useRouter } from 'vue-router'
import { AppRoutes } from '@/constants/routes.constant'
import AppSidebarSkeleton from '../skeletons/AppSidebarSkeleton.vue'

export default defineComponent({
  name: 'AppSidebar',
  components: { Avatar, NavLink, Button, AppSidebarSkeleton },
  setup() {
    const router = useRouter()
    const { result, loading } = useMeQuery()

    const handleLougout = () => {
      Cookies.removeToken()
      router.push(AppRoutes.LOGIN)
    }

    return {
      navigationJson,
      result,
      loading,
      handleLougout,
    }
  },
})
</script>

<template>
  <AppSidebarSkeleton v-if="!result && loading" />

  <aside
    class="w-full flex flex-col justify-between faideIn"
    v-else>
    <header class="w-full">
      <header class="bg-gray-200 p-2 py-3 w-full rounded h-max">
        <Avatar
          :src="result?.me?.avatar || ''"
          className="bg-gray-300"
          :text="result?.me?.name || ''" />
      </header>
      <section class="flex justify-between text-center gap-x-3 mt-6">
        <div>
          <p>{{ result?.me?.posts?.length }}</p>
          <p class="-text-fs-1 text-gray-500 font-medium">Posts</p>
        </div>
        <div>
          <p>{{ result?.me?.followers?.length }}</p>
          <p class="-text-fs-1 text-gray-500 font-medium">Followers</p>
        </div>
        <div>
          <p>{{ result?.me?.following?.length }}</p>
          <p class="-text-fs-1 text-gray-500 font-medium">Following</p>
        </div>
      </section>
      <nav class="mt-10">
        <NavLink
          v-for="item in navigationJson"
          :key="item.text"
          :to="item.to"
          :icon="item.icon"
          :text="item.text" />
      </nav>
    </header>
    <footer>
      <Button
        text="Log Out"
        icon="material-symbols:logout-rounded"
        variant="secondary"
        fullWidth
        @click="handleLougout" />
    </footer>
  </aside>
</template>
