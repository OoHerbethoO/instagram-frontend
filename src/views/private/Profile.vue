<script lang="ts">
import Avatar from '@/components/reusable/Avatar.vue'
import CoverPhoto from '@/components/profile/CoverPhoto.vue'
import ProfileHeader from '@/components/profile/ProfileHeader.vue'
import UserStats from '@/components/profile/UserStats.vue'
import UserAbout from '@/components/profile/UserAbout.vue'
import Button from '@/components/reusable/Button.vue'
import { useGetPostsByUserQuery, useGetUserByIdQuery, useMeQuery } from '@/types/graphql.types'
import type { IPost } from '@/types/graphql.types'
import { defineComponent, reactive, toRefs, watch } from 'vue'
import { AppRoutes } from '@/constants/routes.constant'
import EmptyState from '@/components/reusable/EmptyState.vue'
import PostCardList from '@/components/post/PostList.vue'

export default defineComponent({
  components: {
    Avatar,
    Button,
    UserStats,
    UserAbout,
    CoverPhoto,
    ProfileHeader,
    EmptyState,
    PostCardList,
  },
  name: 'Profile',
  props: ['id'],
  setup(props) {
    const state = reactive({
      isOwner: false,
    })

    const { result: me, loading: meLoading, error: meError } = useMeQuery()

    const {
      result: user,
      loading: userLoading,
      error: userError,
    } = useGetUserByIdQuery({
      id: props.id,
    })

    const {
      result: posts,
      loading: postLoading,
      error: postError,
    } = useGetPostsByUserQuery({
      userId: props.id,
    })

    watch(me, (val) => {
      if (val?.me?._id === props.id) {
        state.isOwner = true
      }
    })

    return {
      ...toRefs(state),
      user,
      userLoading,
      userError,
      posts,
      postLoading,
      postError,
      AppRoutes,
    }
  },
})
</script>

<template>
  <header class="-mt-1">
    <CoverPhoto
      :cover="user?.getUserById?.cover || ''"
      :isLoading="userLoading" />
    <ProfileHeader
      :avatar="user?.getUserById?.avatar || ''"
      :name="user?.getUserById?.name || ''"
      :isLoading="userLoading"
      :isOwner="isOwner">
      <router-link :to="AppRoutes.SETTINGS">
        <Button
          text="Edit Profile"
          variant="outline"
          v-if="isOwner"
          buttonClass="-text-fs-1"
          class="mt-11" />
      </router-link>
    </ProfileHeader>
  </header>
  <section class="profile-section-grid">
    <aside>
      <UserStats
        :user="user?.getUserById"
        variant="bg"
        class="mb-6" />
      <UserAbout
        :user="user?.getUserById"
        variant="bg" />
    </aside>
    <div>
      <PostCardList
        :posts="posts?.getPostsByUser"
        :loading="postLoading"
        :columnsOnLgScreens="2"
        :columnsOnMdScreens="2"
        :isPostForProfile="true"
        v-if="posts?.getPostsByUser" />
      <EmptyState
        v-if="posts?.getPostsByUser.length === 0"
        title="You haven't made any posts yet"
        height="h-80"
        description="Click the 'Add Post' button to share something with your followers."
        icon="/emptyFeed.svg" />
    </div>
  </section>
</template>
