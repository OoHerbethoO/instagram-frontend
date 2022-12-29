<script lang="ts">
import Avatar from '@/components/reusable/Avatar.vue'
import ProfileCover from '@/components/profile/ProfileCover.vue'
import ProfileHeader from '@/components/profile/ProfileHeader.vue'
import UserInfo from '@/components/profile/UserInfo.vue'
import UserAbout from '@/components/profile/UserAbout.vue'
import Button from '@/components/reusable/Button.vue'
import { useGetPostsByUserQuery, useGetUserByIdQuery, useMeQuery } from '@/types/graphql.types'
import type { IPost } from '@/types/graphql.types'
import { defineComponent, reactive, toRefs, watch } from 'vue'
import PhotoCardList from '@/components/profile/PhotoCardList.vue'
import { AppRoutes } from '@/constants/routes.constant'
export default defineComponent({
  components: {
    Avatar,
    Button,
    UserInfo,
    UserAbout,
    ProfileCover,
    ProfileHeader,
    PhotoCardList,
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
    <ProfileCover
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
          buttonClass="px-1 -text-fs-1"
          class="mt-11" />
      </router-link>
    </ProfileHeader>
  </header>
  <section class="flex flex-col md:flex-row mt-12 gap-x-14 gap-y-10">
    <aside class="md:w-[300px]">
      <UserInfo
        :user="user?.getUserById"
        variant="bg"
        class="mb-6" />
      <UserAbout
        :user="user?.getUserById"
        variant="bg" />
    </aside>
    <PhotoCardList
      :posts="posts?.getPostsByUser"
      :loading="postLoading"
      v-if="posts?.getPostsByUser" />
  </section>
</template>
