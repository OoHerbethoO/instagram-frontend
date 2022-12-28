<script lang="ts">
import type { IPost, IUser } from '@/types/graphql.types'
import { defineComponent, reactive, toRefs, watch } from 'vue'
import Avatar from '../reusable/Avatar.vue'
import Button from '../reusable/Button.vue'
import PostActionMenu from './PostActionMenu.vue'
import PostCardFooter from './PostCardFooter.vue'

export default defineComponent({
  name: 'PostCard',
  components: { Avatar, Button, PostActionMenu, PostCardFooter },
  props: {
    post: {
      type: Object as () => IPost,
      required: true,
    },
    me: {
      type: Object as () => IUser | null,
      required: true,
    },
  },
  setup(props) {
    const state = reactive({
      isLiked: false,
      isCurrentUserPost: false,
      isBookmark: false,
    })

    watch(
      () => [props.post, props.me],
      () => {
        if (props.me) {
          state.isCurrentUserPost = props.post.user._id === props.me._id
          state.isLiked = props.post.likes.includes(props.me._id)
          state.isBookmark = props.me.bookmarks.includes(props.post._id)
        }
      },
      { immediate: true }
    )

    return { ...toRefs(state) }
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
    <PostCardFooter
      :isLiked="isLiked"
      :totalLikes="post?.likes.length"
      :isBookmark="isBookmark"
      :postId="post?._id"
      :me="me"
      :totalComments="post?.comments.length" />
  </article>
</template>
