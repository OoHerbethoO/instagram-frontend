<script lang="ts">
import { defineComponent } from 'vue'
import Avatar from '@/components/reusable/Avatar.vue'
export default defineComponent({
  name: 'CommentItem',
  components: { Avatar },
})
</script>

<template>
  <div class="flex items-start gap-x-2">
    <Avatar size="md" />
    <div class="flex flex-col gap-1">
      <h6>Safdar Azeem</h6>
      <p class="text-[14px]">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque mollitia aliquam
        eligendi ab esse dol
      </p>
    </div>
  </div>
</template>
