<script lang="ts">
import { defineComponent } from 'vue'
import Input from './Input.vue'
import CreatePostModal from '../modals/CreatePostModal.vue'
import Button from './Button.vue'

export default defineComponent({
  name: 'AppHeader',
  components: { Input, Button, CreatePostModal },
})
</script>

<template>
  <header class="sticky top-0 py-3 z-[999] flex items-center justify-between bg-white">
    <Input
      placeholder="Search"
      slotDirection="left"
      className="pl-1  w-60 ">
      <Button
        icon="charm:search"
        variant="transparent"
        size="md"
        buttonClass="ml-1 mr-0"
        iconClass="text-fs-2" />
    </Input>
    <aside class="flex gap-x-4">
      <Button
        icon="jam:messages-f"
        variant="transparent" />
      <Button
        icon="fa-solid:bell"
        variant="transparent" />
      <Button
        data-modal-target="#postModal"
        text="Add Post"
        icon="ion:add-circle" />
    </aside>
  </header>
  <CreatePostModal />
</template>
