<script lang="ts">
import { defineComponent } from 'vue'
import Avatar from '@/components/reusable/Avatar.vue'
export default defineComponent({
  name: 'CommentItem',
  components: { Avatar },
})
</script>

<template>
  <div class="flex items-start gap-x-4">
    <Avatar size="md" />
    <div class="flex flex-col gap-2">
      <h6>Safdar Azeem</h6>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque mollitia aliquam
        eligendi ab esse dol
      </p>
    </div>
  </div>
</template>
