<template>
  <div>
    <label
      :for="props.label"
      v-if="props.label"
      class="block pl-3 ml-px text-sm font-medium text-gray-700"
      >{{ props.label }}</label
    >
    <div class="mt-1">
      <input
        :name="props.label"
        :id="props.label"
        :value="props.modelValue"
        class="block px-4 w-full border-gray-300 rounded-full shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        :placeholder="props.placeholder"
        :type="props.type"
        @input="(event) => emits('update:modelValue', event.target.value)"
      />
    </div>
  </div>
</template>
<script setup>
const emits = defineEmits(["update:modelValue"]);

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: null,
  },
  placeholder: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
});
</script>
