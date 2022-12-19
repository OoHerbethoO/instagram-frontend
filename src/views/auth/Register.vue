<script lang="ts">
import Button from '@/components/reusable/Button.vue'
import Input from '@/components/reusable/Input.vue'
import useForm from '@/hooks/useForm'
import { registerJson } from '@/json/register.json'
import { useRegisterMutation } from '@/types/graphql.types'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

export default defineComponent({
  name: 'Register',
  components: {
    Input,
    Button,
  },
  setup() {
    const router = useRouter()
    const toast = useToast()
    const { mutate, onDone, onError, loading } = useRegisterMutation({})
    const { state, handleChange, doValidation } = useForm(registerJson)

    const handleSubmit = (e: Event) => {
      e.preventDefault()
      if (doValidation()) {
        mutate({
          name: state.name.value,
          email: state.email.value,
          password: state.password.value,
        })
      }
    }

    onDone(() => {
      toast.success('Login successful')
      router.push('/login')
    })

    onError((error) => toast.error(error.message))

    return {
      state,
      loading,
      registerJson,
      handleChange,
      handleSubmit,
    }
  },
})
</script>

<template>
  <section class="grid lg:grid-cols-2 place-items-center min-h-screen">
    <aside class="w-full sm:min-w-[541px] sm:w-auto px-10 grid gap-y-8">
      <header>
        <h1>Create New Account.</h1>
        <p class="mt-1 text-gray-700">Add your credentials to create a new account.</p>
      </header>
      <form
        class="grid gap-y-5"
        @submit="handleSubmit">
        <Input
          v-for="item in registerJson"
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
          type="submit"
          :disabled="loading"
          :isLoading="loading"
          variant="neobrutalism" />
      </form>
      <footer class="-text-fs-1 text-center">
        <span>Already have an account? </span>
        <router-link
          to="/login"
          class="font-bold ml-1"
          >Login</router-link
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
