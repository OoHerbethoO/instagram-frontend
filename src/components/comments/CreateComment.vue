<script lang="ts">
import { defineComponent } from 'vue'
import Input from '@/components/reusable/Input.vue'
import Button from '@/components/reusable/Button.vue'
export default defineComponent({
  name: 'CreateComment',
  components: { Input, Button },
  setup() {},
})
</script>

<template>
  <div class="relative">
    <Input type="textarea" />
    <section class="bottom-right absolute bottom-2 right-2 flex items-center">
      <Button
        icon="fluent:emoji-48-filled"
        variant="transparent"
        size="md"
        radius="rounded-full" />
      <Button
        text="Comment"
        size="sm" />
    </section>
  </div>
</template>
