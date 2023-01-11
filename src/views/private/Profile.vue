<script lang="ts">
import PostList from '@/components/post/PostList.vue'
import CoverPhoto from '@/components/profile/CoverPhoto.vue'
import ProfileHeader from '@/components/profile/ProfileHeader.vue'
import UserAbout from '@/components/profile/UserAbout.vue'
import UserStats from '@/components/profile/UserStats.vue'
import Avatar from '@/components/reusable/Avatar.vue'
import Button from '@/components/reusable/Button.vue'
import EmptyState from '@/components/reusable/EmptyState.vue'
import FollowOrUnfollowBtn from '@/components/reusable/FollowOrUnfollowBtn.vue'
import { AppRoutes } from '@/constants/routes.constant'
import { useGetPostsByUserQuery, useGetUserByIdQuery, useMeQuery } from '@/types/graphql.types'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Avatar,
    Button,
    UserStats,
    UserAbout,
    CoverPhoto,
    ProfileHeader,
    EmptyState,
    PostList,
    FollowOrUnfollowBtn,
  },
  name: 'Profile',
  props: ['id'],
  setup(props) {
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

    return {
      user,
      userLoading,
      userError,
      posts,
      postLoading,
      postError,
      AppRoutes,
      me,
    }
  },
  computed: {
    isOwner() {
      return this.user?.getUserById?._id === this.me?.me?._id
    },
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
      <section v-if="!userLoading">
        <router-link
          :to="AppRoutes.SETTINGS"
          v-if="isOwner">
          <Button
            text="Edit Profile"
            variant="outline"
            buttonClass="-text-fs-1"
            class="mt-11" />
        </router-link>
        <FollowOrUnfollowBtn
          :userId="user?.getUserById?._id"
          v-else
          class="mt-11" />
      </section>
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
      <PostList
        :posts="posts?.getPostsByUser"
        :loading="postLoading"
        :columnsOnLgScreens="2"
        :columnsOnMdScreens="2"
        :isPostForProfile="true" />
      <EmptyState
        v-if="!postLoading && posts?.getPostsByUser.length === 0"
        title="You haven't made any posts yet"
        height="h-80"
        description="Click the 'Add Post' button to share something with your followers."
        icon="/emptyFeed.svg" />
    </div>
  </section>
</template>
