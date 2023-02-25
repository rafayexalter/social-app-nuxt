<template>
  <div>
    <div v-if="loading" class="flex items-center justify-center py-6">
      <UISpinner />
    </div>
    <div v-else>
      <TweetFormInput
        :placeholder="props.placeholder"
        :user="props.user"
        @onSubmit="handleFormSubmit"
      />
    </div>
  </div>
</template>

<script setup>
const { postTweet } = useTweets();
const loading = ref(false);

const props = defineProps({
  user: {
    type: Object,
    required: true,
  },
  placeholder: {
    type: String,
    default: "What's happening",
    required: false,
  },
});

async function handleFormSubmit(data) {
  loading.value = true;
  try {
    const resposne = await postTweet({
      text: data.text,
      mediaFiles: data.mediaFiles,
    });
    console.log(resposne);
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>
