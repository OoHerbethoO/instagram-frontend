<script lang="ts">
import type { IPost } from '@/types/graphql.types'
import { defineComponent, reactive, toRefs } from 'vue'
import Button from '@/components/reusable/Button.vue'
import PostCardFooter from '@/components/post/PostCardFooter.vue'

export default defineComponent({
  name: 'PhotoCard',
  components: {
    Button,
    PostCardFooter,
  },
  props: {
    post: {
      type: Object as () => IPost,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      isHovered: false,
    })

    return {
      ...toRefs(state),
    }
  },
})
</script>

<template>
  <router-link
    :to="`/post/${post?._id}`"
    class="post-card relative"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false">
    <figure class="card-image cursor-pointer">
      <img
        class="w-full h-full rounded-md"
        :src="post?.photo || ''" />
    </figure>
    <footer
      v-if="isHovered"
      class="overlay absolute top-0 grid place-items-center">
      <!-- <PostCardFooter
        :likes="post.likes"
        :isLiked="isLiked"
        :postId="post?._id"
        :me="meData?.me"
        :comments="post?.comments.length"
        variant="white"
        :isIconVariantSolid="true"
        :hideBookmark="true" /> -->
    </footer>
  </router-link>
</template>
