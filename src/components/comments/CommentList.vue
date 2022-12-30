<script lang="ts">
import { defineComponent } from 'vue'
import CommentItem from './CommentItem.vue'
export default defineComponent({
  name: 'CommentList',
  components: { CommentItem },
})
</script>

<template>
  <div class="md:max-h pb-5 overflow-auto">
    <header class="h4 font-medium mb-3 pb-2 sticky top-0 bg-white w-full">Comments</header>
    <section class="flex flex-col items-start gap-6">
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
      <CommentItem />
    </section>
  </div>
</template>
