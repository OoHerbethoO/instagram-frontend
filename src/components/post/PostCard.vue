<script lang="ts">
import { useLikePostMutation, useMeQuery } from '@/types/graphql.types'
import type { IPost } from '@/types/graphql.types'
import { defineComponent, reactive, watch, toRefs, onMounted } from 'vue'
import Avatar from '../reusable/Avatar.vue'
import Button from '../reusable/Button.vue'
import PostActionMenu from './PostActionMenu.vue'

export default defineComponent({
  name: 'PostCard',
  components: { Avatar, Button, PostActionMenu },
  props: {
    post: {
      type: Object as () => IPost,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      isLiked: false,
      isCurrentUserPost: false,
    })

    const { result: meData } = useMeQuery()
    const { mutate: likePost } = useLikePostMutation({
      refetchQueries: ['GetPosts'],
    })

    const handleLikePost = () => {
      likePost({
        postId: props.post._id,
      })
    }

    watch(
      () => [props.post, meData.value?.me],
      () => {
        if (meData.value?.me) {
          state.isLiked = props.post.likes.includes(meData.value.me._id)
          state.isCurrentUserPost = props.post.user._id === meData.value.me._id
        }
      },
      { immediate: true }
    )

    return { ...toRefs(state), handleLikePost }
  },
})
</script>

<template>
  <article class="post-card">
    <header class="card-header">
      <Avatar
        :src="post?.user?.avatar || ''"
        :text="post?.user.name"
        size="md"
        class="card-avatar" />
      <PostActionMenu
        :postId="post._id"
        :isCurrentUserPost="isCurrentUserPost" />
    </header>
    <p>{{ post.content }}</p>
    <figure>
      <img
        :src="post?.photo || ''"
        class="card-image"
        alt="" />
    </figure>
    <footer class="card-footer">
      <div class="flex gap-x-5">
        <div class="flex items-center gap-1">
          <Button
            :icon="isLiked ? 'mdi:cards-heart' : 'mdi:cards-heart-outline'"
            button-class="font-normal"
            size="md"
            radius="rounded-full"
            :variant="isLiked ? 'like' : 'transparent'"
            @click="handleLikePost" />
          <span :class="isLiked ? 'text-danger' : ''">{{ String(post?.likes?.length) }}</span>
        </div>
        <div class="flex items-center gap-1">
          <Button
            icon="ph:chat-circle-dots-fill"
            button-class="font-normal"
            size="md"
            radius="rounded-full"
            variant="transparent" />
          <span>{{ String(post?.comments?.length) }}</span>
        </div>
      </div>
      <Button
        icon="humbleicons:bookmark"
        radius="rounded-full"
        size="md"
        variant="transparent" />
    </footer>
  </article>
</template>
