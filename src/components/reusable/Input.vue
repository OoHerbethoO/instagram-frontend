<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
export default defineComponent({
  name: 'Input',
  emits: ['onChange'],
  props: {
    value: String,
    error: String,
    label: String,
    name: String,
    placeholder: String,
    disabled: Boolean,
    required: Boolean,
    slotDirection: {
      type: String as () => 'left' | 'right',
      default: 'right',
    },
    type: {
      type: String as () => 'text' | 'email' | 'password' | 'number' | 'date',
      default: 'text',
    },
    variant: {
      type: String as () => 'primary' | 'neobrutalism',
      default: 'primary',
    },
  },

  setup(props, { emit }) {
    const isFocus = ref(false)
    const onFocus = () => (isFocus.value = true)
    const onBlur = () => (isFocus.value = false)

    return {
      isFocus,
      onFocus,
      onBlur,
    }
  },
})
</script>

<template>
  <section>
    <label
      for="{}"
      class="label">
      {{ label }}
    </label>
    <div
      class="input-group"
      :class="{
        [`${variant}`]: variant,
        focus: isFocus,
        error: error,
      }">
      <div
        v-if="slotDirection === 'left'"
        class="slot">
        <slot></slot>
      </div>
      <input
        ref="input"
        class="input"
        :name="name"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        @focus="onFocus"
        @blur="onBlur"
        v-model="value"
        @input="$emit('onChange', $event)" />
      <div
        v-if="slotDirection === 'right'"
        class="slot">
        <slot></slot>
      </div>
    </div>
    <p
      v-if="error"
      class="text-danger mt-2 -text-fs-1">
      {{ error }}
    </p>
  </section>
</template>
