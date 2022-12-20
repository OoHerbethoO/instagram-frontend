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

export default defineComponent({
  name: 'AppSidebar',
  components: { Avatar, NavLink, Button },
  setup() {
    const router = useRouter()
    const { result } = useMeQuery()

    const handleLougout = () => {
      Cookies.removeToken()
      router.push(AppRoutes.LOGIN)
    }

    return {
      navigationJson,
      result,
      handleLougout,
    }
  },
})
</script>

<template>
  <aside class="w-full flex flex-col justify-between">
    <header class="w-full">
      <header class="bg-gray-200 p-2 py-3 w-full rounded h-max">
        <Avatar
          :src="result?.me?.avatar || ''"
          :text="result?.me?.name || ''" />
      </header>
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
