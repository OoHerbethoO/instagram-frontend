<script lang="ts">
import { AppRoutes } from '@/constants/routes.constant'
import type { IPost, IUser } from '@/types/graphql.types'
import moment from 'moment'
import { defineComponent, reactive, toRefs } from 'vue'
import Avatar from '../reusable/Avatar.vue'
import Button from '../reusable/Button.vue'
import PostActionsDropdown from './PostActionsDropdown.vue'
import PostContent from './PostContent.vue'
import PostFooter from './PostFooter.vue'
import PostHeader from './PostHeader.vue'
import PostImage from './PostImage.vue'

export default defineComponent({
  name: 'Post',
  components: {
    Avatar,
    Button,
    PostActionsDropdown,
    PostFooter,
    PostHeader,
    PostContent,
    PostImage,
  },
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
    trimText: {
      type: Boolean,
      default: true,
    },
    isCardPhotoOnly: {
      type: Boolean,
      default: false,
    },
    isModalOpen: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const state = reactive({
      isHovered: false,
    })

    return { ...toRefs(state), AppRoutes, moment }
  },
})
</script>

<template>
  <Transition
    name="card"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false">
    <article
      class="post-card"
      :class="{
        'gap-0': isCardPhotoOnly && !post?.photo,
        'gap-3': isCardPhotoOnly && post?.photo,
      }">
      <PostHeader
        :post="post"
        v-if="!isCardPhotoOnly"
        :me="me" />
      <PostContent
        @openModal="$emit('openModal')"
        :post="post"
        :isModalOpen="isModalOpen"
        :trimText="trimText" />
      <figure
        class="cursor-pointer relative"
        v-if="post?.photo">
        <PostImage
          :photo="post?.photo"
          @click="$emit('openModal')" />
        <footer
          v-if="isHovered && isCardPhotoOnly"
          class="overlay absolute top-0 grid place-items-center">
          <PostFooter
            :post="post"
            variant="white"
            :isIconVariantSolid="true"
            :hideBookmark="true" />
        </footer>
      </figure>
      <PostFooter
        v-if="!isCardPhotoOnly"
        @openModal="$emit('openModal')"
        :post="post"
        :me="me" />
    </article>
  </Transition>
</template>
