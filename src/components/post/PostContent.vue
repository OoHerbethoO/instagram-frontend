<script lang="ts">
import type { IPost } from '@/types/graphql.types'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PostContent',
  emits: ['openModal'],
  props: {
    post: {
      type: Object as () => IPost,
      required: true,
    },
    trimText: {
      type: Boolean,
      default: true,
    },
    isModalOpen: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<template>
  <div
    class="gray"
    :class="{ 'card-content': post.photo === null }">
    <div class="relative">
      <span
        class="card-title"
        :class="{
          'trim-text': trimText,
        }"
        v-if="post.content">
        {{ post.content }}
      </span>
      <span
        v-if="!isModalOpen && post.content.length > 400"
        @click="$emit('openModal')"
        class="absolute bottom-0 right-0 bg-[#e8e8e8] pl-2 font-bold cursor-pointer text-gray-800">
        ...Read more
      </span>
    </div>
  </div>
</template>
