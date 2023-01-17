<script lang="ts">
import { defineComponent, defineAsyncComponent, watch } from 'vue'
import type { IPost } from '@/types/graphql.types'
import { useMeQuery } from '@/types/graphql.types'
const Modal = defineAsyncComponent(() => import('../reusable/Modal.vue'))
const PostCard = defineAsyncComponent(() => import('./PostCard.vue'))
const CommentList = defineAsyncComponent(() => import('../comments/CommentList.vue'))
const CreateComment = defineAsyncComponent(() => import('../comments/CreateComment.vue'))
const Button = defineAsyncComponent(() => import('../reusable/Button.vue'))

export default defineComponent({
  name: 'ViewPostModal',
  components: {
    Modal,
    PostCard,
    CommentList,
    CreateComment,
    Button,
  },
  props: {
    isModalOpen: {
      type: Boolean,
      required: true,
    },
    post: {
      type: Object as () => IPost,
      required: true,
    },
    isPrevBtnDisabled: {
      type: Boolean,
      default: false,
    },
    isNextBtnDisabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['close', 'open', 'next', 'prev', 'handleDeletePost'],
  setup(props, { emit }) {
    const { result: meData, loading: meLoading } = useMeQuery()

    watch(
      () => props.post,
      () => {
        if (!props.post) {
          emit('next')
        }
      }
    )

    return { meData }
  },
})
</script>

<template>
  <Modal
    title="Post"
    @close="$emit('close')"
    @open="$emit('open')"
    modalClass="post-modal"
    class="relative"
    :is-open="isModalOpen">
    <template v-slot:modal-body>
      <section class="md:flex h-full gap-8 relative">
        <PostCard
          class="md:w-[46%] overflow-auto"
          height="100%"
          :key="post._id"
          :isModalOpen="isModalOpen"
          :me="meData?.me"
          @handleDeletePost="$emit('handleDeletePost', post._id)"
          :trimText="false"
          :post="post" />
        <aside class="flex-1 flex flex-col justify-between mt-5 md:mt-0">
          <CommentList
            class="mb-3"
            :key="post._id"
            :post="post" />
          <CreateComment
            class="sticky bottom-0 bg-white"
            :postId="post?._id" />
        </aside>
      </section>
    </template>
    <template v-slot:modal-aside>
      <Button
        icon="ic:round-keyboard-arrow-left"
        radius="rounded-full"
        variant="secondary"
        size="sm"
        iconClass="text-fs-7"
        buttonClass="border border-gray-300"
        @click="$emit('prev')"
        :disabled="isPrevBtnDisabled"
        class="absolute center-left md:left-[-20px] z-[1199]" />
      <Button
        icon="ic:round-keyboard-arrow-right"
        radius="rounded-full"
        size="sm"
        variant="secondary"
        iconClass="text-fs-7"
        buttonClass="border border-gray-300"
        :disabled="isNextBtnDisabled"
        @click="$emit('next')"
        class="absolute center-right md:right-[-20px] z-[1199]" />
    </template>
  </Modal>
</template>
