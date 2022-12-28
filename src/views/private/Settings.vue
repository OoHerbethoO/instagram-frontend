<script lang="ts">
import { defineComponent, reactive, toRefs, watch } from 'vue'
import { useToast } from 'vue-toastification'
import { updateProfileJson } from '@/json/updateProfile.json'
import ProfileCover from '@/components/profile/ProfileCover.vue'
import ProfileHeader from '@/components/profile/ProfileHeader.vue'
import Input from '@/components/reusable/Input.vue'
import Button from '@/components/reusable/Button.vue'
import { useMeQuery, useUpdateProfileMutation, useUploadPhotoMutation } from '@/types/graphql.types'
import SettingActionBtns from '@/components/settings/SettingActionBtns.vue'
import useForm from '@/hooks/useForm'
import useUploadPhoto from '@/hooks/useUploadPhoto'

export default defineComponent({
  name: 'Settings',
  components: {
    Input,
    Button,
    ProfileCover,
    ProfileHeader,
    SettingActionBtns,
  },
  setup() {
    const toast = useToast()
    const {
      mutate: updateProfile,
      onError: onUpdateProfileError,
      loading: updateProfileLoading,
    } = useUpdateProfileMutation({
      refetchQueries: ['Me'],
    })

    const { result: me, loading: meLoading, error: meError } = useMeQuery()
    const { handleUploadPhoto, uploadPhotoLoading } = useUploadPhoto()
    const { state: formState, handleChange, doValidation, updateForm } = useForm(updateProfileJson)
    const state = reactive({
      avatar: '',
      cover: '',
    })

    watch(
      () => me.value,
      (newVal) => {
        if (newVal?.me) {
          updateForm(newVal.me)
        }
      },
      { immediate: true }
    )

    const handleAvatar = (file: any) => (state.avatar = file)
    const handleCover = (file: any) => (state.cover = file)

    const upoadPhotos = async () => {
      if (!state.avatar && !state.cover) return
      const data: any = {}
      if (state.avatar) {
        const avatar = await handleUploadPhoto(state.avatar)
        data['avatar'] = avatar
      }
      if (state.cover) {
        const cover = await handleUploadPhoto(state.cover)
        data['cover'] = cover
      }
      return data
    }

    const handleSubmit = async () => {
      const isValid = await doValidation()
      if (!isValid) return
      const photos = await upoadPhotos()
      console.log('formState', formState)
      const formValues: any = {}
      for (const key in formState) {
        formValues[key] = formState[key].value
      }
      const data = { ...formValues, ...photos }
      const result: any = await updateProfile(data)
      if (result.data?.updateProfile) {
        toast.success('Profile updated successfully')
      }
    }

    onUpdateProfileError((error) => toast.error(error.message))

    return {
      ...toRefs(state),
      updateProfileJson,
      me,
      meLoading,
      meError,
      formState,
      handleChange,
      handleAvatar,
      handleCover,
      handleSubmit,
      uploadPhotoLoading,
      updateProfileLoading,
    }
  },
})
</script>

<template>
  <section class="flex gap-x-10 lg:gap-x-20">
    <section class="flex-1">
      <ProfileCover
        :cover="me?.me?.cover || ''"
        :isLoading="meLoading"
        @handleImage="handleCover"
        :edit="true" />
      <ProfileHeader
        :avatar="me?.me?.avatar || ''"
        @handleImage="handleAvatar"
        @handleName="handleChange"
        :name="me?.me?.name || ''"
        :error="formState.name.error"
        :isLoading="meLoading"
        :edit="true">
        <SettingActionBtns
          class="hidden lg:flex"
          :loading="uploadPhotoLoading || updateProfileLoading"
          @handleSubmit="handleSubmit" />
      </ProfileHeader>
      <form class="mt-7">
        <section class="grid md:grid-cols-2 gap-x-6 xl:gap-x-10 gap-y-7">
          <template v-for="input in updateProfileJson">
            <Input
              v-if="input.name !== 'name'"
              :key="input.name"
              :name="input.name"
              :label="input.label"
              :value="formState[input.name].value"
              @input="handleChange"
              :class="input.cols"
              :type="input.type"
              :placeholder="input.placeholder" />
          </template>
        </section>
      </form>
      <SettingActionBtns
        class="lg:hidden flex justify-end"
        :loading="uploadPhotoLoading || updateProfileLoading"
        @handleSubmit="handleSubmit" />
    </section>
    <figure class="hidden md:block">
      <img
        src="/setting-illustration.svg"
        alt="" />
    </figure>
  </section>
</template>
