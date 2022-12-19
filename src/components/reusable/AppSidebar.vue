<script lang="ts">
import { defineComponent } from 'vue'
import Avatar from './Avatar.vue'
import NavLink from './NavLink.vue'
import Button from './Button.vue'
import navigationJson from '@/json/navigation.json'
export default defineComponent({
  name: 'AppSidebar',
  components: { Avatar, NavLink, Button },
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
      <header class="bg-gray-200 p-2 py-3 w-full rounded h-max">
        <Avatar
          src="https://res.cloudinary.com/dhewumbfe/image/upload/v1648113156/avatarsAndCover/tmp-1-1648113156237_wgdjpo.png"
          text="Safdar Azeem" />
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
        fullWidth />
    </footer>
  </aside>
</template>
