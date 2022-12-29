<script lang="ts">
import { AppRoutes } from '@/constants/routes.constant'
import type { IPost, IUser } from '@/types/graphql.types'
import { defineComponent, reactive, toRefs, watch } from 'vue'
import Avatar from '../reusable/Avatar.vue'
import Button from '../reusable/Button.vue'
import PostActionMenu from './PostActionMenu.vue'
import PostCardFooter from './PostCardFooter.vue'
import moment from 'moment'

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
    height: String,
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

    return { ...toRefs(state), AppRoutes, moment }
  },

  computed: {
    time() {
      console.log(this.post.createdAt)
      return moment(this.post.createdAt).fromNow()
    },
  },
})
</script>

<template>
  <Transition name="card">
    <article class="post-card">
      <header class="card-header mb-1">
        <router-link :to="`${AppRoutes.PROFILE}/${post?.user?._id}`">
          <Avatar
            :src="post?.user?.avatar || ''"
            :text="post?.user.name"
            :time="time"
            size="md"
            class="card-avatar" />
        </router-link>
        <PostActionMenu
          :postId="post._id"
          :isCurrentUserPost="isCurrentUserPost" />
      </header>
      <p
        class="text-gray-700"
        v-if="post.content">
        {{ post.content }}
      </p>
      <figure>
        <img
          :src="post?.photo || ''"
          class="card-image"
          @click="$emit('openModal')"
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
  </Transition>
</template>
