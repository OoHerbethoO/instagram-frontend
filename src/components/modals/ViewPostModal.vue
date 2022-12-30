<script lang="ts">
import { defineComponent, reactive, watch } from 'vue'
import Modal from '../reusable/Modal.vue'
import type { IPost } from '@/types/graphql.types'
import PostCard from '../post/PostCard.vue'
import { useMeQuery } from '@/types/graphql.types'
import CommentList from '../comments/CommentList.vue'
import CreateComment from '../comments/CreateComment.vue'
import Button from '../reusable/Button.vue'

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
  },
  emits: ['close', 'open'],
  setup(props, { emit }) {
    const { result: meData, loading: meLoading } = useMeQuery()

    watch(
      () => props.post,
      () => {
        if (!props.post) {
          emit('close')
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
      <section class="md:flex h-full gap-10">
        <PostCard
          class="flex-1 overflow-auto"
          height="100%"
          :me="meData?.me"
          :post="post" />
        <aside class="flex-1 flex flex-col justify-between mt-6 md:mt-0">
          <CommentList class="mb-3" />
          <CreateComment />
        </aside>
      </section>
    </template>
    <Button
      icon="ph:arrow-circle-right-fill"
      variant="transparent"
      radius="rounded-full"
      class="absolute center-right right-[-31px] z-[9911]" />
  </Modal>
</template>
