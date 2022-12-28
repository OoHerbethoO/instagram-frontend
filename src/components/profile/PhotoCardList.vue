<script lang="ts">
import type { IPost } from '@/types/graphql.types'
import { defineComponent } from 'vue'
import PhotoCard from './PhotoCard.vue'

export default defineComponent({
  name: 'PhotoCardList',
  components: { PhotoCard },
  props: {
    posts: {
      type: Object as () => IPost[],
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
})
</script>

<template>
  <main class="grid sm:grid-cols-2 gap-10 flex-1">
    <PhotoCard
      v-for="post in posts"
      :key="post?._id"
      :post="post" />
  </main>
</template>
