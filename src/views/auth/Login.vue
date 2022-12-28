<script lang="ts">
import Button from '@/components/reusable/Button.vue'
import Input from '@/components/reusable/Input.vue'
import useForm from '@/hooks/useForm'
import { loginJson } from '@/json/login.json'
import { useLoginMutation } from '@/types/graphql.types'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'
import { AppRoutes } from '@/constants/routes.constant'
import Cookies from '@/utils/cookies'

export default defineComponent({
  name: 'Login',
  components: {
    Input,
    Button,
  },
  setup() {
    const router = useRouter()
    const toast = useToast()
    const { mutate, onDone, onError, loading } = useLoginMutation({})
    const { state, handleChange, doValidation } = useForm(loginJson)

    const handleSubmit = (e: Event) => {
      e.preventDefault()
      if (doValidation()) {
        mutate({
          email: state.email.value,
          password: state.password.value,
        })
      }
    }

    onDone((result) => {
      Cookies.setToken(result.data?.login?.token as string)
      toast.success('User logged in successfully')
      router.push(AppRoutes.HOME)
    })

    onError((error) => toast.error(error.message))

    return {
      state,
      loading,
      loginJson,
      handleChange,
      handleSubmit,
      AppRoutes,
    }
  },
})
</script>

<template>
  <section class="grid lg:grid-cols-2 place-items-center min-h-screen">
    <aside class="w-full sm:min-w-[541px] sm:w-auto px-10 grid gap-y-8">
      <header>
        <h1>Login into account</h1>
        <p class="mt-1 text-gray-700">Use your credentials to access your account.</p>
      </header>
      <form
        class="grid gap-y-5"
        @submit="handleSubmit">
        <Input
          v-for="item in loginJson"
          :key="item.name"
          :label="item.label"
          :placeholder="item.placeholder"
          :variant="item.variant"
          :name="item.name"
          :value="state[item.name].value"
          :error="state[item.name].error"
          @onChange="handleChange"
          :type="item.type" />
        <Button
          text="Login"
          :disabled="loading"
          :isLoading="loading"
          variant="neobrutalism">
          <input
            type="submit"
            class="hidden" />
        </Button>
      </form>
      <footer class="-text-fs-1 text-center">
        <span>Don’t have an account? </span>
        <router-link
          :to="AppRoutes.REGISTER"
          class="font-bold ml-1"
          >Register</router-link
        >
      </footer>
    </aside>
    <figure class="bg-[#EAE8E2] h-full w-full hidden lg:grid place-items-center">
      <img
        src="/register-illustration.svg"
        alt="" />
    </figure>
  </section>
</template>
